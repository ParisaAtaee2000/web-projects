import { Route, Routes, useParams } from 'react-router-dom'
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

function ProductRoute() {
  const { slug = '' } = useParams()
  return <ProductPage slug={slug} />
}

function ArticleRoute() {
  const { id = '' } = useParams()
  return <ArticlePage id={id} />
}

export default function AppRouter() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/product/:slug" element={<ProductRoute />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/journal" element={<JournalPage />} />
    <Route path="/journal/:id" element={<ArticleRoute />} />
    <Route path="/help" element={<HelpPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/account" element={<AccountPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
}
