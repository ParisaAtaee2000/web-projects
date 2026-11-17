import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type FavoritesValue = {
  items: string[]
  count: number
  has: (slug: string) => boolean
  toggle: (slug: string) => void
  remove: (slug: string) => void
}

const FavoritesContext = createContext<FavoritesValue | null>(null)
const STORAGE_KEY = 'nexora-favorites'

function readFavorites(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value)
      ? [...new Set(value.filter((slug): slug is string => typeof slug === 'string' && slug.trim().length > 0))]
      : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Favorites remain available for the current session when storage is unavailable.
    }
  }, [items])

  const value = useMemo<FavoritesValue>(() => ({
    items,
    count: items.length,
    has: slug => items.includes(slug),
    toggle: slug => setItems(current => current.includes(slug)
      ? current.filter(item => item !== slug)
      : [...current, slug]),
    remove: slug => setItems(current => current.filter(item => item !== slug)),
  }), [items])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
