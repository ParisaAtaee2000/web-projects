import { useState } from 'react'
import type { Product } from '../data/store'
import { useCart } from './CartContext'
import { Icon } from './Icons'

function BrandLogo({ brand }: { brand: Product['brand'] }) {
  if (brand === 'microsoft') return <span className="ms-logo"><i/><i/><i/><i/></span>
  if (brand === 'netflix') return <span className="netflix-logo">N</span>
  if (brand === 'youtube') return <span className="youtube-logo">▶</span>
  if (brand === 'spotify') return <span className="spotify-logo">●</span>
  if (brand === 'google') return <span className="google-logo">G</span>
  return <span className="chat-logo"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c-8.8 0-15.5 5.9-15.5 13.4 0 4 1.9 7.4 5.2 9.8l-1 6 6-3.1c1.7.5 3.5.8 5.3.8 8.8 0 15.5-5.9 15.5-13.4S28.8 4 20 4Zm-6.8 9.5 6 6 7.4-6.2-5.8 7.2 6 6-7.2-4.4-7.6 4.2 6.1-6.7-4.9-6.1Z"/></svg></span>
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function addToCart() {
    add(product.slug)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return <article className="product-card">
    <button className="favorite" aria-label={`افزودن ${product.name} به علاقه‌مندی‌ها`}><Icon name="heart" size={20}/></button>
    {product.badge && <span className={`product-badge ${product.brand === 'netflix' ? 'dark-badge' : ''}`}>{product.badge}</span>}
    <a href={`/product/${product.slug}`} className="product-card-link"><BrandLogo brand={product.brand}/><h3>{product.name}</h3><p className="product-description">{product.description}</p><strong className="price">{product.price} <small>تومان</small></strong></a>
    <button className={`add-cart${added ? ' is-added' : ''}`} onClick={addToCart} aria-label={`افزودن ${product.name} به سبد خرید`}><Icon name={added ? 'check' : 'cart'} size={21}/><span>{added ? 'اضافه شد' : ''}</span></button>
  </article>
}

export { BrandLogo }
