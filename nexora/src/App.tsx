import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Categories, Hero, JournalAndTrust, Newsletter, ProductSection } from './components/HomeSections'
import { CartProvider } from './components/CartContext'
import { FavoritesProvider } from './components/FavoritesContext'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ArticlePage from './pages/ArticlePage'
import ContentPage from './pages/ContentPage'
import NotFoundPage from './pages/NotFoundPage'

function RouteView() {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '') || '/'
  if (path === '/') return <><Hero/><Categories/><ProductSection/><JournalAndTrust/><Newsletter/></>
  if (path === '/shop') return <ShopPage/>
  if (path === '/cart') return <CartPage/>
  if (path === '/checkout') return <CheckoutPage/>
  if (path.startsWith('/product/')) return <ProductPage slug={path.slice('/product/'.length)}/>
  if (path.startsWith('/journal/')) return <ArticlePage id={path.slice('/journal/'.length)}/>
  if (path === '/journal') return <ContentPage kind="journal"/>
  if (path === '/help') return <ContentPage kind="help"/>
  if (path === '/about') return <ContentPage kind="about"/>
  if (path === '/contact') return <ContentPage kind="contact"/>
  if (path === '/account') return <ContentPage kind="account"/>
  if (path === '/favorites') return <ContentPage kind="favorites"/>
  return <NotFoundPage/>
}

export default function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], main > .page-shell'))
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <CartProvider><FavoritesProvider><Header/><main><RouteView/></main><Footer/></FavoritesProvider></CartProvider>
}
