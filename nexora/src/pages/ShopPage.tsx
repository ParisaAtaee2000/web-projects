import { useMemo, useState } from 'react'
import { categories, defaultVariant, products } from '../data/store'
import ProductCard from '../components/product/ProductCard'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import DemoNotice from '../components/ui/DemoNotice'

export default function ShopPage() {
  const params = new URLSearchParams(window.location.search)
  const isSpecialOffer = params.get('offer') === 'special'
  const requestedCategory = params.get('category')
  const initialCategory = categories.find(item => item.slug === requestedCategory || item.title === requestedCategory)?.slug ?? 'all'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    const result = products.filter(product => (!isSpecialOffer || product.badge === 'پیشنهاد ویژه')
      && (category === 'all' || product.categorySlug === category)
      && (product.name + ' ' + product.category + ' ' + product.description).toLocaleLowerCase('fa').includes(query.trim().toLocaleLowerCase('fa')))
    return sort === 'price-low' ? [...result].sort((a, b) => (defaultVariant(a)?.priceAmount ?? 0) - (defaultVariant(b)?.priceAmount ?? 0))
      : sort === 'price-high' ? [...result].sort((a, b) => (defaultVariant(b)?.priceAmount ?? 0) - (defaultVariant(a)?.priceAmount ?? 0))
      : result
  }, [category, isSpecialOffer, query, sort])

  function clearFilters() { window.location.href = '/shop' }

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'فروشگاه' }]} />
    <div className="page-heading-row">
      <div><span className="page-kicker">NEXORA STORE</span><h1>{isSpecialOffer ? 'پیشنهادهای ویژه' : 'فروشگاه اشتراک‌های دیجیتال'}</h1><p>سرویس موردنظرت را پیدا کن و هوشمندانه انتخاب کن.</p></div>
      <span className="catalog-count">{filtered.length} محصول</span>
    </div>
    <DemoNotice>محصول‌ها، قیمت‌ها و موجودی‌های این فروشگاه نمونه هستند و هنوز از سرور دریافت نمی‌شوند.</DemoNotice>
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <h2>دسته‌بندی‌ها</h2>
        <button type="button" className={category === 'all' ? 'selected' : ''} onClick={() => setCategory('all')}>همه محصولات <span>{products.length}</span></button>
        {categories.map(item => <button type="button" key={item.slug} disabled={item.count === 0}
          aria-label={item.title + (item.count === 0 ? '، به‌زودی' : '')}
          className={(category === item.slug ? 'selected' : '') + (item.count === 0 ? ' is-empty' : '')}
          onClick={() => setCategory(item.slug)}>
          {item.title}<span>{item.count > 0 ? item.count : 'به‌زودی'}</span>
        </button>)}
      </aside>
      <section className="catalog-main">
        <div className="catalog-toolbar">
          <label className="catalog-search"><Icon name="search" size={18} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="جست‌وجو در محصولات" /></label>
          <label className="sort-label">مرتب‌سازی:
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="popular">محبوب‌ترین</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option>
            </select>
          </label>
        </div>
        {filtered.length ? <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product} />)}</div> : (
          <div className="empty-state"><Icon name="search" size={28} /><h2>محصولی پیدا نشد</h2><p>عبارت یا دسته‌بندی دیگری را امتحان کن.</p>
            <button type="button" className="button button-primary" onClick={clearFilters}>پاک‌کردن فیلترها</button>
          </div>
        )}
      </section>
    </div>
  </div>
}
