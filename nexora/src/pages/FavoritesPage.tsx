import { products } from '../data/store'
import { useFavorites } from '../contexts/FavoritesContext'
import ProductCard from '../components/product/ProductCard'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function FavoritesPage() {
  const favorites = useFavorites()
  const favoriteProducts = favorites.items.map(item => item.productSnapshot ?? products.find(product => product.slug === item.slug)).filter((product): product is NonNullable<typeof product> => Boolean(product))

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'علاقه‌مندی‌ها' }]} />
    <PageHeading kicker="SAVED ITEMS" title="علاقه‌مندی‌ها" intro="محصولاتی که برای بررسی بعدی ذخیره کرده‌ای در این صفحه نمایش داده می‌شوند." />
    {favoriteProducts.length ? (
      <div className="catalog-grid favorites-grid">{favoriteProducts.map(product => <ProductCard key={product.slug} product={product} />)}</div>
    ) : (
      <div className="empty-state">
        <Icon name="heart" size={30} /><h2>هنوز محصولی ذخیره نکرده‌ای</h2>
        <p>در فروشگاه، روی قلب کنار محصول بزن تا اینجا نمایش داده شود.</p>
        <a className="button button-primary" href="/shop">رفتن به فروشگاه</a>
      </div>
    )}
  </div>
}
