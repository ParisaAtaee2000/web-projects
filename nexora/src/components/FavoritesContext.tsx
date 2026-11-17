import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type FavoritesValue = {
  slugs: string[]
  count: number
  has: (slug: string) => boolean
  toggle: (slug: string) => void
  remove: (slug: string) => void
  clear: () => void
}

const FavoritesContext = createContext<FavoritesValue | null>(null)
const STORAGE_KEY = 'nexora-favorites'

function readFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return Array.from(new Set(parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)))
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
    } catch {
      // Favorites remain available in memory when browser storage is unavailable.
    }
  }, [slugs])

  const value = useMemo<FavoritesValue>(() => ({
    slugs,
    count: slugs.length,
    has: slug => slugs.includes(slug),
    toggle: slug => setSlugs(current => current.includes(slug)
      ? current.filter(item => item !== slug)
      : [...current, slug]),
    remove: slug => setSlugs(current => current.filter(item => item !== slug)),
    clear: () => setSlugs([]),
  }), [slugs])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
