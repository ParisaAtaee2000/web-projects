import { useState } from 'react'
import { products } from '../data/store'
import { BrandLogo } from '../components/ProductCard'
import { useCart } from '../components/CartContext'
import { Icon } from '../components/Icons'

export default function ProductPage({ slug }: { slug: string }) {
  const product = products.find(item => item.slug === slug)
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  if (!product) return <div className="page-shell wrap empty-state"><h1>این محصول پیدا نشد</h1><a className="button button-primary" href="/shop">بازگشت به فروشگاه</a></div>

  function addItem() {
    if (!product) return
    add(product.slug)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return <div className="page-shell wrap product-detail-page">
    <div className="breadcrumbs"><a href="/">خانه</a><span>/</span><a href="/shop">فروشگاه</a><span>/</span><b>{product.name}</b></div>
    <div className="product-detail-layout"><section className="product-visual"><span className="detail-badge">{product.badge || 'اشتراک دیجیتال'}</span><BrandLogo brand={product.brand}/><small>NEXORA DIGITAL MARKETPLACE</small></section>
      <section className="product-detail-copy"><span className="page-kicker">{product.category}</span><h1>{product.name}</h1><div className="detail-rating">★★★★★ <span>۴٫۹ (بر اساس دیدگاه کاربران)</span></div><p className="detail-description">{product.description} با فعال‌سازی سریع و پشتیبانی نکسورا. مشخصات و شرایط این اشتراک را پیش از خرید بررسی کن.</p><div className="detail-term"><span>مدت اشتراک</span><b>{product.term}</b></div><ul className="feature-list">{product.features.map(feature => <li key={feature}><Icon name="check" size={17}/>{feature}</li>)}</ul><div className="detail-buy-row"><div className="detail-price"><strong>{product.price}</strong><small>تومان</small></div><button className="button button-primary" onClick={addItem}><Icon name={added ? 'check' : 'cart'} size={19}/>{added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}</button></div><p className="secure-note"><Icon name="shield" size={17}/> خرید امن · تحویل سریع · پشتیبانی فارسی</p></section>
    </div>
    <section className="detail-more"><h2>دربارهٔ این اشتراک</h2><p>این محصول به‌صورت دیجیتال ارائه می‌شود. پس از ثبت سفارش، اطلاعات فعال‌سازی و راهنمای استفاده برای شما ارسال خواهد شد. برای پرسش دربارهٔ سازگاری یا تمدید، با پشتیبانی نکسورا در تماس باش.</p><a href="/help">شرایط خرید و پرسش‌های متداول <Icon name="arrow" size={16}/></a></section>
  </div>
}
