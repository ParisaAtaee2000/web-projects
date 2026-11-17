import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartItem = { slug: string; quantity: number }

type CartValue = {
  items: CartItem[]
  count: number
  add: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
}

const CartContext = createContext<CartValue | null>(null)
const STORAGE_KEY = 'nexora-cart'

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) as CartItem[] : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: slug => setItems(current => {
      const existing = current.find(item => item.slug === slug)
      return existing
        ? current.map(item => item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { slug, quantity: 1 }]
    }),
    setQuantity: (slug, quantity) => setItems(current => quantity < 1
      ? current.filter(item => item.slug !== slug)
      : current.map(item => item.slug === slug ? { ...item, quantity } : item)),
    remove: slug => setItems(current => current.filter(item => item.slug !== slug)),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
