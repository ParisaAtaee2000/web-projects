import { useState, type FormEvent } from 'react'
import { articles, categories, products } from '../data/store'
import { Icon } from './Icons'
import ProductCard from './ProductCard'

function SectionTitle({ eyebrow, title, href = '/shop' }: { eyebrow?: string; title: string; href?: string }) {
  return <div className="section-heading"><div><span className="heading-line"/><div>{eyebrow && <span className="section-eyebrow">{eyebrow}</span>}<h2>{title}</h2></div></div><a href={href}>مشاهده همه <Icon name="arrow" size={17}/></a></div>
}
export function Hero() {
  return <section className="hero wrap" id="home">
    <div className="hero-copy"><span className="eyebrow-pill"><b>NEXORA</b><i/> Digital Marketplace</span><h1>انتخاب هوشمندانه<br/>در <em>دنیای دیجیتال</em></h1><p>از ابزارهای هوش مصنوعی تا سرویس‌های سرگرمی و بهره‌وری،<br className="desktop-break"/> همه‌چیز در یک‌جا برای شما.</p><div className="hero-actions"><a className="button button-primary" href="/shop">شروع کاوش <Icon name="arrow" size={19}/></a><a className="play-link" href="/about">معرفی نکسورا <Icon name="play" size={26}/></a></div></div>
    <div className="hero-art"><img src="/assets/nexora-hero.jpg" alt="دنیای نکسورا و سرویس‌های دیجیتال"/><span className="hero-orbit"/><span className="spark spark-one">✦</span><span className="spark spark-two">✦</span></div>
    <a className="floating-caption" href="#categories"><span className="heading-line"/>دسته‌بندی‌ها</a>
  </section>
}
export function Categories() {
  return <section className="section wrap category-section" id="categories"><SectionTitle eyebrow="" title="دنبال چی هستی؟"/><div className="category-grid">{categories.map((item, i) => <a className="category-card" href={\`/shop?category=\${encodeURIComponent(item.title)}\`} key={item.title}><span className={\`category-icon tone-\${i}\`}><Icon name={item.icon} size={36}/></span><strong>{item.title}</strong><small>({new Intl.NumberFormat('fa-IR').format(item.count)})</small></a>)}</div></section>
}
export function ProductSection() {
  return <section className="section wrap product-section" id="products"><div className="product-heading"><SectionTitle title="محصولات منتخب"/></div><div className="product-layout"><a href="/shop?offer=special" className="promo-card"><img src="/assets/promo-portal.jpg" alt="پیشنهادهای ویژه نکسورا"/><span className="promo-pill">پیشنهاد ویژه</span><div><small>انتخاب‌های منتخب</small><h3>پیشنهادهای ویژه</h3><p>محصولات دارای پیشنهاد ویژه را ببین</p><span className="promo-cta">مشاهده پیشنهادها <Icon name="arrow" size={16}/></span></div></a><div className="product-grid">{products.slice(0, 3).map(p => <ProductCard key={p.slug} product={p}/>)}</div></div></section>
}
export function JournalAndTrust() {
  return <section className="section wrap journal-section" id="journal"><div className="journal-column"><SectionTitle title="مجله و راهنماها" href="/journal"/><div className="journal-grid">{articles.map((a, i) => <a href={\`/journal/\${i + 1}\`} className={\`article-card \${a.className}\`} key={a.title}><img src={a.image} alt=""/><span className="article-copy"><small>{a.category}</small><strong>{a.title}</strong>{a.className && <em>مطالعه بیشتر <Icon name="arrow" size={15}/></em>}</span></a>)}</div></div><aside className="trust-card" id="about"><img src="/assets/shield.jpg" alt=""/><h2>چرا NEXORA؟</h2><div className="trust-list"><div><Icon name="shield"/><p><b>اطلاعات شفاف</b><span>جزئیات هر محصول پیش از خرید</span></p></div><div><Icon name="support"/><p><b>مسیر پشتیبانی</b><span>راه ارتباط با تیم نکسورا</span></p></div><div><Icon name="clock"/><p><b>اطلاع از تحویل</b><span>شرایط تحویل برای هر محصول</span></p></div></div></aside></section>
}
export function Newsletter() {
  const [notice, setNotice] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('فرم آماده است؛ عضویت خبرنامه پس از اتصال API فعال می‌شود.')
  }
  return <section className="newsletter wrap" id="contact"><img src="/assets/newsletter-plane.jpg" alt=""/><div className="newsletter-copy"><h2>با ما در ارتباط باشید</h2><p>برای دریافت جدیدترین پیشنهادها و مطالب، ایمیل خود را وارد کنید.</p></div><form className="newsletter-form" onSubmit={submit}><Icon name="mail" size={17}/><input name="email" type="email" required placeholder="ایمیل شما" aria-label="ایمیل شما"/><button type="submit">عضویت</button></form>{notice && <p className="newsletter-feedback" role="status">{notice}</p>}</section>
}
