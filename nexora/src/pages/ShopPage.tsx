import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { categories as demoCategories, products as demoProducts, defaultVariant, type Product } from '../data/store'
import type { ApiCategory } from '../types/api'
import type { IconName } from '../components/ui/Icon'
import { fromApiProducts } from '../adapters/productAdapter'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'
import ProductCard from '../components/product/ProductCard'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import DemoNotice from '../components/ui/DemoNotice'

export default function ShopPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const isSpecialOffer = params.get('offer') === 'special'
  const requestedCategory = params.get('category')
  const [category, setCategory] = useState(demoCategories.find(item => item.slug === requestedCategory || item.title === requestedCategory)?.slug ?? 'all')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState('popular')
  const [catalog, setCatalog] = useState<Product[]>(demoProducts)
  const [categoryItems, setCategoryItems] = useState(demoCategories)
  const [loading, setLoading] = useState(isApiConfigured())
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const next = new URLSearchParams(location.search)
    const requested = next.get('category')
    setCategory(demoCategories.find(item => item.slug === requested || item.title === requested)?.slug ?? 'all')
    setQuery(next.get('q') ?? '')
  }, [location.search])

  useEffect(() => {
    if (!isApiConfigured()) { setCatalog(demoProducts); setCategoryItems(demoCategories); setLoading(false); return }
    const controller = new AbortController()
    setLoading(true)
    setApiError('')
    const ordering = sort === 'price-low' ? 'price' : sort === 'price-high' ? '-price' : 'popular'
    Promise.all([
      storefrontApi.getProducts({ category: category === 'all' ? undefined : category, search: query.trim() || undefined, ordering }, controller.signal),
      storefrontApi.getCategories(controller.signal),
    ]).then(([values, apiCategories]) => {
      setCatalog(fromApiProducts(values))
      const categoriesWithIcons = apiCategories.map((item: ApiCategory) => ({
        ...item,
        count: item.product_count,
        icon: demoCategories.find(category => category.slug === item.slug)?.icon ?? 'grid' as IconName,
      }))
      setCategoryItems(categoriesWithIcons)
    })
      .catch(error => {
        if (controller.signal.aborted) return
        setCatalog(demoProducts)
        setCategoryItems(demoCategories)
        setApiError(error instanceof Error ? error.message : 'دریافت محصولات ناموفق بود.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [category, query, sort])

  const filtered = useMemo(() => {
    const result = catalog.filter(product => !isSpecialOffer || product.badge === 'پیشنهاد ویژه')
    return sort === 'price-low' ? [...result].sort((a,b) => (defaultVariant(a)?.priceAmount ?? 0)-(defaultVariant(b)?.priceAmount ?? 0))
      : sort === 'price-high' ? [...result].sort((a,b) => (defaultVariant(b)?.priceAmount ?? 0)-(defaultVariant(a)?.priceAmount ?? 0)) : result
  }, [catalog, isSpecialOffer, sort])

  function clearFilters() { setCategory('all'); setQuery(''); setSort('popular'); navigate('/shop') }

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{label:'خانه',href:'/'},{label:'فروشگاه'}]} />
    <div className="page-heading-row"><div><span className="page-kicker">NEXORA STORE</span><h1>{isSpecialOffer?'پیشنهادهای ویژه':'فروشگاه اشتراک‌های دیجیتال'}</h1><p>سرویس موردنظرت را پیدا کن و هوشمندانه انتخاب کن.</p></div><span className="catalog-count">{filtered.length} محصول</span></div>
    {(!isApiConfigured() || apiError) && <DemoNotice>{apiError ? 'اتصال به API برقرار نشد؛ داده‌های نمونه نمایش داده می‌شوند. '+apiError : 'فروشگاه در حالت نمایشی است؛ محصولات، قیمت‌ها و موجودی‌ها نمونه هستند.'}</DemoNotice>}
    <div className="catalog-layout">
      <aside className="catalog-sidebar"><h2>دسته‌بندی‌ها</h2>
        <button type="button" className={category==='all'?'selected':''} onClick={()=>setCategory('all')}>همه محصولات <span>{catalog.length}</span></button>
        {categoryItems.map(item=><button type="button" key={item.slug} disabled={item.count===0} className={(category===item.slug?'selected ':'')+(item.count===0?'is-empty':'')} onClick={()=>setCategory(item.slug)}>{item.title}<span>{item.count||'به‌زودی'}</span></button>)}
      </aside>
      <section className="catalog-main"><div className="catalog-toolbar">
        <label className="catalog-search"><Icon name="search" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="جست‌وجو در محصولات"/></label>
        <label className="sort-label">مرتب‌سازی:<select value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">محبوب‌ترین</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option></select></label>
      </div>
      {loading?<div className="empty-state" role="status"><Icon name="clock" size={26}/><h2>در حال دریافت محصولات…</h2></div>:filtered.length?<div className="catalog-grid">{filtered.map(p=><ProductCard key={p.slug} product={p}/>)}</div>:<div className="empty-state"><Icon name="search" size={28}/><h2>محصولی پیدا نشد</h2><p>عبارت یا دسته‌بندی دیگری را امتحان کن.</p><button type="button" className="button button-primary" onClick={clearFilters}>پاک‌کردن فیلترها</button></div>}
      </section>
    </div>
  </div>
}
