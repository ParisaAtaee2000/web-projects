import type { ReactNode } from 'react'
import { CartProvider } from '../contexts/CartContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'

export default function AppProviders({ children }: { children: ReactNode }) {
  return <CartProvider><FavoritesProvider>{children}</FavoritesProvider></CartProvider>
}
