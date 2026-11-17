import { useState } from 'react'
import type { Product } from '../../data/store'
import { defaultVariant, formatToman } from '../../data/store'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { Icon } from '../ui/Icon'
import BrandLogo from './BrandLogo'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const favorites = useFavorites()
  const isFavorite = favorites.has(product.slug)
  const variant = defaultVariant(product)
  const [added, setAdded] = useState(false)

  function addToCart() {
    if (!variant) return
    add(product.slug, variant.id)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return <article className="product-card">
    <button type="button" className={'favorite' + (isFavorite ? ' is-favorite' : '')}
      aria-label={isFavorite ? 'حذف ' + product.name + ' از علاقه‌مندی‌ها' : 'افزودن ' + product.name + ' به علاقه‌مندی‌ها'}
      aria-pressed={isFavorite} onClick={() => favorites.toggle(product.slug)}>
      <Icon name="heart" size={20} />
    </button>
    {product.badge && <span className={'product-badge ' + (product.brand === 'netflix' ? 'dark-badge' : '')}>{product.badge}</span>}
    <a href={'/product/' + product.slug} className="product-card-link">
      <BrandLogo brand={product.brand} /><h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      {variant && <strong className="price">{formatToman(variant.priceAmount)} <small>تومان</small></strong>}
    </a>
    <button type="button" className={'add-cart' + (added ? ' is-added' : '')} onClick={addToCart}
      aria-label={'افزودن ' + product.name + ' به سبد خرید'} disabled={!variant?.isAvailable}>
      <Icon name={added ? 'check' : 'cart'} size={21} /><span>{added ? 'اضافه شد' : ''}</span>
    </button>
  </article>
}
