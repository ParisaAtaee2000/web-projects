import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultVariant, products } from '../data/store'
import type { Product } from '../data/store'
import { fromApiProduct } from '../adapters/productAdapter'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'

export type CartItem = { slug: string; variantId: number; quantity: number; productSnapshot?: Product }
type CartValue = {
  items: CartItem[]
  count: number
  add: (product: Product | string, variantId?: number) => void
  setQuantity: (slug: string, variantId: number, quantity: number) => void
  remove: (slug: string, variantId: number) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)
const STORAGE_KEY = 'nexora-cart'
const MAX_QUANTITY = 99
const remoteCartEnabled = isApiConfigured() && (import.meta.env as unknown as Record<string, string | undefined>).VITE_ENABLE_REMOTE_CART === 'true'

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    const quantities = new Map<string, CartItem>()
    for (const candidate of parsed) {
      if (!candidate || typeof candidate !== 'object') continue
      const item = candidate as { slug?: unknown; variantId?: unknown; quantity?: unknown; productSnapshot?: Product }
      if (typeof item.slug !== 'string' || !item.slug.trim() || typeof item.quantity !== 'number' || !Number.isFinite(item.quantity)) continue
      const product = products.find(entry => entry.slug === item.slug) ?? item.productSnapshot
      if (!product) continue
      const variant = product.variants.find(entry => entry.id === item.variantId)
      if (!variant) continue
      const quantity = Math.max(1, Math.min(MAX_QUANTITY, Math.floor(item.quantity)))
      const key = product.slug + ':' + variant.id
      const existing = quantities.get(key)
      quantities.set(key, { slug: product.slug, variantId: variant.id, quantity: Math.min(MAX_QUANTITY, (existing?.quantity ?? 0) + quantity), productSnapshot: product })
    }
    return Array.from(quantities.values())
  } catch { return [] }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)
  const [remoteReady, setRemoteReady] = useState(!remoteCartEnabled)
  const [remoteAvailable, setRemoteAvailable] = useState(false)

  useEffect(() => {
    if (!remoteCartEnabled) return
    let controller: AbortController | undefined
    const loadRemoteCart = () => {
      controller?.abort()
      const requestController = new AbortController()
      controller = requestController
      setRemoteReady(false)
      setRemoteAvailable(false)
      storefrontApi.getCart(requestController.signal).then(cart => {
        const validItems = cart.items.flatMap(item => {
          const product = item.product ? fromApiProduct(item.product) : products.find(entry => entry.slug === item.product_slug)
          const variant = product?.variants.find(entry => entry.id === item.variant_id)
          if (!product || !variant || !Number.isFinite(item.quantity) || item.quantity < 1) return []
          return [{ slug: product.slug, variantId: variant.id, quantity: Math.min(MAX_QUANTITY, Math.floor(item.quantity)), productSnapshot: product }]
        })
        setItems(validItems)
        setRemoteAvailable(true)
      }).catch(() => setRemoteAvailable(false)).finally(() => {
        if (!requestController.signal.aborted) setRemoteReady(true)
      })
    }
    loadRemoteCart()
    window.addEventListener('nexora:auth-changed', loadRemoteCart)
    return () => {
      controller?.abort()
      window.removeEventListener('nexora:auth-changed', loadRemoteCart)
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {
      // Keep the cart usable for this session if browser storage is unavailable.
    }
  }, [items])

  useEffect(() => {
    if (!remoteCartEnabled || !remoteReady || !remoteAvailable) return
    const controller = new AbortController()
    storefrontApi.syncCart(items.map(item => ({ product_slug: item.slug, variant_id: item.variantId, quantity: item.quantity })), controller.signal)
      .catch(() => setRemoteAvailable(false))
    return () => controller.abort()
  }, [items, remoteReady, remoteAvailable])

  const value = useMemo<CartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (productOrSlug, requestedVariantId) => setItems(current => {
      const product = typeof productOrSlug === 'string'
        ? products.find(entry => entry.slug === productOrSlug)
        : productOrSlug
      if (!product) return current
      const variant = requestedVariantId === undefined
        ? defaultVariant(product)
        : product.variants.find(entry => entry.id === requestedVariantId && entry.isAvailable)
      if (!variant) return current
      const existing = current.find(item => item.slug === product.slug && item.variantId === variant.id)
      return existing
        ? current.map(item => item.slug === product.slug && item.variantId === variant.id
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1), productSnapshot: product }
          : item)
        : [...current, { slug: product.slug, variantId: variant.id, quantity: 1, productSnapshot: product }]
    }),
    setQuantity: (slug, variantId, quantity) => setItems(current => !Number.isFinite(quantity) || quantity < 1
      ? current.filter(item => item.slug !== slug || item.variantId !== variantId)
      : current.map(item => item.slug === slug && item.variantId === variantId
        ? { ...item, quantity: Math.max(1, Math.min(MAX_QUANTITY, Math.floor(quantity))) }
        : item)),
    remove: (slug, variantId) => setItems(current => current.filter(item => item.slug !== slug || item.variantId !== variantId)),
    clear: () => setItems([]),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
