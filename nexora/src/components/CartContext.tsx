import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultVariant, products } from '../data/store'

export type CartItem = { slug: string; variantId: number; quantity: number }

type CartValue = {
  items: CartItem[]
  count: number
  add: (slug: string, variantId?: number) => void
  setQuantity: (slug: string, variantId: number, quantity: number) => void
  remove: (slug: string, variantId: number) => void
}

const CartContext = createContext<CartValue | null>(null)
const STORAGE_KEY = 'nexora-cart'
const MAX_QUANTITY = 99

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    const quantities = new Map<string, CartItem>()
    for (const candidate of parsed) {
      if (!candidate || typeof candidate !== 'object') continue
      const item = candidate as { slug?: unknown; variantId?: unknown; quantity?: unknown }
      if (typeof item.slug !== 'string' || !item.slug.trim()) continue
      if (typeof item.quantity !== 'number' || !Number.isFinite(item.quantity)) continue
      const product = products.find(entry => entry.slug === item.slug)
      if (!product) continue
      const variant = product.variants.find(entry => entry.id === item.variantId) ?? defaultVariant(product)
      if (!variant) continue

      const quantity = Math.max(1, Math.min(MAX_QUANTITY, Math.floor(item.quantity)))
      const key = `${product.slug}:${variant.id}`
      const existing = quantities.get(key)
      quantities.set(key, { slug: product.slug, variantId: variant.id, quantity: Math.min(MAX_QUANTITY, (existing?.quantity ?? 0) + quantity) })
    }
    return Array.from(quantities.values())
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // The cart remains usable for this session when storage is unavailable.
    }
  }, [items])

  const value = useMemo<CartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (slug, requestedVariantId) => setItems(current => {
      const product = products.find(entry => entry.slug === slug)
      if (!product) return current
      const variant = requestedVariantId === undefined
        ? defaultVariant(product)
        : product.variants.find(entry => entry.id === requestedVariantId && entry.isAvailable)
      if (!variant) return current
      const existing = current.find(item => item.slug === slug && item.variantId === variant.id)
      return existing
        ? current.map(item => item.slug === slug && item.variantId === variant.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item)
        : [...current, { slug, variantId: variant.id, quantity: 1 }]
    }),
    setQuantity: (slug, variantId, quantity) => setItems(current => !Number.isFinite(quantity) || quantity < 1
      ? current.filter(item => item.slug !== slug || item.variantId !== variantId)
      : current.map(item => item.slug === slug && item.variantId === variantId ? { ...item, quantity: Math.max(1, Math.min(MAX_QUANTITY, Math.floor(quantity))) } : item)),
    remove: (slug, variantId) => setItems(current => current.filter(item => item.slug !== slug || item.variantId !== variantId)),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
