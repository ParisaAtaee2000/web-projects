import { useEffect, useState } from 'react'
import { defaultVariant, formatToman, products, type Product } from '../data/store'
import { fromApiProduct } from '../adapters/productAdapter'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'
import BrandLogo from '../components/product/BrandLogo'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import DemoNotice from '../components/ui/DemoNotice'

export default function ProductPage({slug}:{slug:string}) {
  const fallback=products.find(p=>p.slug===slug)
  const [product,setProduct]=useState<Product|undefined>(fallback)
  const [loading,setLoading]=useState(isApiConfigured())
  const [apiError,setApiError]=useState('')
  const [selectedVariantId,setSelectedVariantId]=useState<number|undefined>(()=>fallback?defaultVariant(fallback)?.id:undefined)
  const [added,setAdded]=useState(false)
  const {add}=useCart()
  const favorites=useFavorites()
  useEffect(()=>{
    if(!isApiConfigured()){setProduct(fallback);setLoading(false);return}
    const controller=new AbortController();setLoading(true);setApiError('')
    storefrontApi.getProduct(slug,controller.signal).then(value=>setProduct(fromApiProduct(value))).catch(error=>{
      if(controller.signal.aborted)return
      setProduct(fallback);setApiError(error instanceof Error?error.message:'دریافت محصول ناموفق بود.')
    }).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
    return ()=>controller.abort()
  },[slug])
  useEffect(()=>setSelectedVariantId(product?defaultVariant(product)?.id:undefined),[product?.slug])
  if(loading)return <div className="page-shell wrap empty-state" role="status"><Icon name="clock" size={26}/><h1>در حال دریافت محصول…</h1></div>
  if(!product)return <div className="page-shell wrap empty-state"><h1>این محصول پیدا نشد</h1><a className="button button-primary" href="/shop">بازگشت به فروشگاه</a></div>
  const variant=product.variants.find(v=>v.id===selectedVariantId)
  function addItem(){if(!product)return;const selected=product.variants.find(item=>item.id===selectedVariantId);if(!selected?.isAvailable)return;add(product,selected.id);setAdded(true);window.setTimeout(()=>setAdded(false),1500)}
  const favorite=favorites.has(product.slug)
  return <div className="page-shell wrap product-detail-page">
    <Breadcrumbs items={[{label:'خانه',href:'/'},{label:'فروشگاه',href:'/shop'},{label:product.name}]}/>
    {(!isApiConfigured()||apiError)&&<DemoNotice>{apiError?'اتصال به API برقرار نشد؛ اطلاعات نمونه نمایش داده می‌شوند. '+apiError:'قیمت و شرایط این اشتراک نمونه‌اند و باید پیش از خرید واقعی از API تأیید شوند.'}</DemoNotice>}
    <div className="product-detail-layout">
      <section className="product-visual"><span className="detail-badge">{product.badge||'اشتراک دیجیتال'}</span><BrandLogo brand={product.brand}/><small>NEXORA DIGITAL MARKETPLACE</small></section>
      <section className="product-detail-copy">
        <span className="page-kicker">{product.category}</span><h1>{product.name}</h1>
        <button type="button" className={'detail-favorite'+(favorite?' is-favorite':'')} aria-label={favorite?'حذف از علاقه‌مندی‌ها':'افزودن به علاقه‌مندی‌ها'} aria-pressed={favorite} onClick={()=>favorites.toggle(product)}><Icon name="heart" size={20}/></button>
        <p className="detail-description">{product.description} با فعال‌سازی سریع و پشتیبانی نکسورا. مشخصات و شرایط این اشتراک را پیش از خرید بررسی کن.</p>
        <label className="variant-select-label">پلن اشتراک<select value={selectedVariantId??''} onChange={e=>setSelectedVariantId(Number(e.target.value))}>{product.variants.map(v=><option key={v.id} value={v.id} disabled={!v.isAvailable}>{v.title} · {formatToman(v.priceAmount)} تومان{!v.isAvailable?' · ناموجود':''}</option>)}</select></label>
        <div className="detail-term"><span>مدت اشتراک</span><b>{variant?.durationLabel??'نامشخص'}</b></div>
        <ul className="feature-list">{product.features.map(f=><li key={f}><Icon name="check" size={17}/>{f}</li>)}</ul>
        <div className="detail-buy-row"><div className="detail-price"><strong>{formatToman(variant?.priceAmount??0)}</strong><small>تومان</small></div><button type="button" className="button button-primary" onClick={addItem} disabled={!variant?.isAvailable}><Icon name={added?'check':'cart'} size={19}/>{added?'به سبد اضافه شد':'افزودن به سبد خرید'}</button></div>
        <p className="secure-note"><Icon name="shield" size={17}/> خرید امن · تحویل سریع · پشتیبانی فارسی</p>
      </section>
    </div>
    <section className="detail-more"><h2>دربارهٔ این اشتراک</h2><p>این محصول به‌صورت دیجیتال ارائه می‌شود. پس از ثبت سفارش، اطلاعات فعال‌سازی و راهنمای استفاده برای شما ارسال خواهد شد.</p><a href="/help">شرایط خرید و پرسش‌های متداول <Icon name="arrow" size={16}/></a></section>
  </div>
}
