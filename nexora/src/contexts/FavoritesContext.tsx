import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products, type Product } from '../data/store'

export type FavoriteItem = { slug: string; productSnapshot?: Product }
type FavoritesValue = {
  items: FavoriteItem[]
  count: number
  has: (slug: string) => boolean
  toggle: (product: Product | string) => void
  remove: (slug: string) => void
}

const FavoritesContext = createContext<FavoritesValue | null>(null)
const STORAGE_KEY = 'nexora-favorites'

function readFavorites(): FavoriteItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    const unique = new Map<string, FavoriteItem>()
    value.forEach(candidate => {
      if (typeof candidate === 'string' && candidate.trim()) {
        unique.set(candidate, { slug: candidate, productSnapshot: products.find(p => p.slug === candidate) })
      } else if (candidate && typeof candidate === 'object' && 'slug' in candidate && typeof candidate.slug === 'string') {
        const item = candidate as FavoriteItem
        unique.set(item.slug, { slug: item.slug, productSnapshot: item.productSnapshot ?? products.find(p => p.slug === item.slug) })
      }
    })
    return [...unique.values()]
  } catch { return [] }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>(readFavorites)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {
      // Keep favorites available for this session if browser storage is unavailable.
    }
  }, [items])

  const value = useMemo<FavoritesValue>(() => ({
    items,
    count: items.length,
    has: slug => items.some(item => item.slug === slug),
    toggle: productOrSlug => setItems(current => {
      const product = typeof productOrSlug === 'string' ? products.find(p => p.slug === productOrSlug) : productOrSlug
      const slug = typeof productOrSlug === 'string' ? productOrSlug : productOrSlug.slug
      if (current.some(item => item.slug === slug)) return current.filter(item => item.slug !== slug)
      return [...current, { slug, productSnapshot: product }]
    }),
    remove: slug => setItems(current => current.filter(item => item.slug !== slug)),
  }), [items])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
