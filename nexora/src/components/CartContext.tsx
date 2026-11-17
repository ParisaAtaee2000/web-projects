import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartItem = { slug: string; quantity: number }

type CartValue = {
  items: CartItem[]
  count: number
  add: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
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

    const normalized = new Map<string, number>()
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue
      const candidate = item as { slug?: unknown; quantity?: unknown }
      if (typeof candidate.slug !== 'string' || !candidate.slug.trim()) continue
      if (!Number.isFinite(candidate.quantity) || !Number.isInteger(candidate.quantity)) continue
      const quantity = Math.max(1, Math.min(MAX_QUANTITY, Number(candidate.quantity)))
      normalized.set(candidate.slug, Math.min(MAX_QUANTITY, (normalized.get(candidate.slug) ?? 0) + quantity))
    }
    return Array.from(normalized, ([slug, quantity]) => ({ slug, quantity }))
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
      // The cart remains usable in memory when browser storage is unavailable.
    }
  }, [items])

  const value = useMemo<CartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: slug => setItems(current => {
      const existing = current.find(item => item.slug === slug)
      return existing
        ? current.map(item => item.slug === slug
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) }
          : item)
        : [...current, { slug, quantity: 1 }]
    }),
    setQuantity: (slug, quantity) => setItems(current => {
      if (!Number.isFinite(quantity) || quantity < 1) return current.filter(item => item.slug !== slug)
      const safeQuantity = Math.min(MAX_QUANTITY, Math.floor(quantity))
      return current.map(item => item.slug === slug ? { ...item, quantity: safeQuantity } : item)
    }),
    remove: slug => setItems(current => current.filter(item => item.slug !== slug)),
    clear: () => setItems([]),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
