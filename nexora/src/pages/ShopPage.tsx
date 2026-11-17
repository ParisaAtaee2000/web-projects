import { useMemo, useState } from 'react'
import { categories, products } from '../data/store'
import ProductCard from '../components/ProductCard'
import { Icon } from '../components/Icons'

export default function ShopPage() {
  const params = new URLSearchParams(window.location.search)
  const [category, setCategory] = useState(params.get('category') ?? 'همه')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState('popular')
  const filtered = useMemo(() => {
    const result = products.filter(product => (category === 'همه' || product.category === category)
      && `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('fa').includes(query.trim().toLocaleLowerCase('fa')))
    return sort === 'price-low' ? [...result].sort((a, b) => a.priceValue - b.priceValue)
      : sort === 'price-high' ? [...result].sort((a, b) => b.priceValue - a.priceValue) : result
  }, [category, query, sort])

  return <div className="page-shell wrap">
    <div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>فروشگاه</b></div>
    <div className="page-heading-row"><div><span className="page-kicker">NEXORA STORE</span><h1>فروشگاه اشتراک‌های دیجیتال</h1><p>سرویس موردنظرت را پیدا کن و هوشمندانه انتخاب کن.</p></div><span className="catalog-count">{filtered.length} محصول</span></div>
    <div className="catalog-layout">
      <aside className="catalog-sidebar"><h2>دسته‌بندی‌ها</h2><button className={category === 'همه' ? 'selected' : ''} onClick={() => setCategory('همه')}>همه محصولات <span>{products.length}</span></button>{categories.map(item => <button key={item.title} className={category === item.title ? 'selected' : ''} onClick={() => setCategory(item.title)}>{item.title}<span>{products.filter(p => p.category === item.title).length}</span></button>)}</aside>
      <section className="catalog-main"><div className="catalog-toolbar"><label className="catalog-search"><Icon name="search" size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="جست‌وجو در محصولات"/></label><label className="sort-label">مرتب‌سازی:<select value={sort} onChange={e => setSort(e.target.value)}><option value="popular">محبوب‌ترین</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option></select></label></div>
        {filtered.length ? <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="empty-state"><Icon name="search" size={28}/><h2>محصولی پیدا نشد</h2><p>عبارت یا دسته‌بندی دیگری را امتحان کن.</p><button className="button button-primary" onClick={() => { setQuery(''); setCategory('همه') }}>پاک‌کردن فیلترها</button></div>}
      </section>
    </div>
  </div>
}
