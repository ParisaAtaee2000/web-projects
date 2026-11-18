import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import ArticlePage from '../pages/ArticlePage'
import JournalPage from '../pages/JournalPage'
import HelpPage from '../pages/HelpPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import AccountPage from '../pages/AccountPage'
import FavoritesPage from '../pages/FavoritesPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '') || '/'

  if (path === '/') return <HomePage />
  if (path === '/shop') return <ShopPage />
  if (path === '/cart') return <CartPage />
  if (path === '/checkout') return <CheckoutPage />
  if (path.startsWith('/product/')) return <ProductPage slug={path.slice('/product/'.length)} />
  if (path.startsWith('/journal/')) return <ArticlePage id={path.slice('/journal/'.length)} />
  if (path === '/journal') return <JournalPage />
  if (path === '/help') return <HelpPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/account') return <AccountPage />
  if (path === '/favorites') return <FavoritesPage />
  return <NotFoundPage />
}
