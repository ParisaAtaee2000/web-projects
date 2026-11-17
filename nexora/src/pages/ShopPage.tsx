import { useMemo, useState } from 'react'
import { categories, products } from '../data/store'
import ProductCard from '../components/ProductCard'
import { Icon } from '../components/Icons'

export default function ShopPage() {
  const params = new URLSearchParams(window.location.search)
  const [category, setCategory] = useState(params.get('category') ?? 'همه')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState('default')
  const [isSpecialOffer, setIsSpecialOffer] = useState(params.get('offer') === 'special')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fa')
    const result = products.filter(product =>
      (category === 'همه' || product.category === category)
      && (!isSpecialOffer || product.badge === 'پیشنهاد ویژه')
      && `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('fa').includes(normalizedQuery),
    )
    return sort === 'price-low' ? [...result].sort((a, b) => a.priceValue - b.priceValue)
      : sort === 'price-high' ? [...result].sort((a, b) => b.priceValue - a.priceValue) : result
  }, [category, query, sort, isSpecialOffer])

  function clearFilters() {
    setQuery('')
    setCategory('همه')
    setSort('default')
    setIsSpecialOffer(false)
    window.history.replaceState({}, '', '/shop')
  }

  return <div className="page-shell wrap">
    <div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>فروشگاه</b></div>
    <div className="page-heading-row"><div><span className="page-kicker">NEXORA STORE</span><h1>{isSpecialOffer ? 'پیشنهادهای ویژه' : 'فروشگاه اشتراک‌های دیجیتال'}</h1><p>سرویس موردنظرت را پیدا کن و هوشمندانه انتخاب کن.</p></div><span className="catalog-count">{new Intl.NumberFormat('fa-IR').format(filtered.length)} محصول</span></div>
    <div className="catalog-layout">
      <aside className="catalog-sidebar"><h2>دسته‌بندی‌ها</h2><button type="button" className={category === 'همه' ? 'selected' : ''} onClick={() => setCategory('همه')}>همه محصولات <span>{products.length}</span></button>{categories.map(item => <button type="button" key={item.title} className={category === item.title ? 'selected' : ''} onClick={() => setCategory(item.title)}>{item.title}<span>{item.count}</span></button>)}</aside>
      <section className="catalog-main"><div className="catalog-toolbar"><label className="catalog-search"><Icon name="search" size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="جست‌وجو در محصولات" aria-label="جست‌وجو در محصولات"/></label><label className="sort-label">مرتب‌سازی:<select value={sort} onChange={e => setSort(e.target.value)}><option value="default">پیش‌فرض</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option></select></label></div>
        {filtered.length ? <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="empty-state"><Icon name="search" size={28}/><h2>محصولی پیدا نشد</h2><p>عبارت یا دسته‌بندی دیگری را امتحان کن.</p><button type="button" className="button button-primary" onClick={clearFilters}>پاک‌کردن فیلترها</button></div>}
      </section>
    </div>
  </div>
}
