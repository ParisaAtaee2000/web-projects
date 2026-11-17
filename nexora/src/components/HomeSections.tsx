import { articles, categories, products } from '../data/store'
import { Icon } from './Icons'

function SectionTitle({ eyebrow, title, href = '#products' }: { eyebrow?: string; title: string; href?: string }) {
  return <div className="section-heading"><div><span className="heading-line"/><div>{eyebrow && <span className="section-eyebrow">{eyebrow}</span>}<h2>{title}</h2></div></div><a href={href}>مشاهده همه <Icon name="arrow" size={17}/></a></div>
}

export function Hero() {
  return <section className="hero wrap" id="home">
    <div className="hero-copy"><span className="eyebrow-pill"><b>NEXORA</b><i/> Digital Marketplace</span><h1>انتخاب هوشمندانه<br/>در <em>دنیای دیجیتال</em></h1><p>از ابزارهای هوش مصنوعی تا سرویس‌های سرگرمی و بهره‌وری،<br className="desktop-break"/> همه‌چیز در یک‌جا برای شما.</p><div className="hero-actions"><a className="button button-primary" href="#products">شروع کاوش <Icon name="arrow" size={19}/></a><a className="play-link" href="#about">معرفی نکسورا <Icon name="play" size={26}/></a></div></div>
    <div className="hero-art"><img src="/assets/nexora-hero.jpg" alt="دنیای نکسورا و سرویس‌های دیجیتال"/><span className="hero-orbit"/><span className="spark spark-one">✦</span><span className="spark spark-two">✦</span></div>
    <a className="floating-caption" href="#categories"><span className="heading-line"/>دسته‌بندی‌ها</a>
  </section>
}

export function Categories() {
  return <section className="section wrap category-section" id="categories"><SectionTitle eyebrow="" title="دنبال چی هستی؟"/><div className="category-grid">{categories.map((item, i) => <a className="category-card" href="#products" key={item.title}><span className={`category-icon tone-${i}`}><Icon name={item.icon} size={36}/></span><strong>{item.title}</strong><small>({item.count})</small></a>)}</div></section>
}

function BrandLogo({ brand }: { brand: string }) {
  if (brand === 'microsoft') return <span className="ms-logo"><i/><i/><i/><i/></span>
  if (brand === 'netflix') return <span className="netflix-logo">N</span>
  return <span className="chat-logo"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c-8.8 0-15.5 5.9-15.5 13.4 0 4 1.9 7.4 5.2 9.8l-1 6 6-3.1c1.7.5 3.5.8 5.3.8 8.8 0 15.5-5.9 15.5-13.4S28.8 4 20 4Zm-6.8 9.5 6 6 7.4-6.2-5.8 7.2 6 6-7.2-4.4-7.6 4.2 6.1-6.7-4.9-6.1Z"/></svg></span>
}

function ProductCard({ product }: { product: typeof products[number] }) {
  return <article className="product-card"><button className="favorite" aria-label="افزودن به علاقه‌مندی‌ها"><Icon name="heart" size={20}/></button>{product.badge && <span className={`product-badge ${product.brand === 'netflix' ? 'dark-badge' : ''}`}>{product.badge}</span>}<BrandLogo brand={product.brand}/><h3>{product.name}</h3><p className="product-description">{product.description}</p><strong className="price">{product.price} <small>تومان</small></strong><button className="add-cart" aria-label={`افزودن ${product.name} به سبد خرید`}><Icon name="cart" size={22}/></button></article>
}

export function ProductSection() {
  return <section className="section wrap product-section" id="products"><div className="product-heading"><SectionTitle title="محصولات پرفروش"/></div><div className="product-layout"><a href="#products" className="promo-card"><img src="/assets/promo-portal.jpg" alt="درگاه درخشان نکسورا"/><span className="promo-pill">پیشنهاد ویژه</span><div><small>پیشنهاد ویژه</small><h3>تا ۵۰٪ تخفیف</h3><p>برای محصولات منتخب</p><span className="promo-cta">مشاهده پیشنهادها <Icon name="arrow" size={16}/></span></div></a><div className="product-grid">{products.map(p => <ProductCard key={p.brand} product={p}/>)}</div></div></section>
}

export function JournalAndTrust() {
  return <section className="section wrap journal-section" id="journal"><div className="journal-column"><SectionTitle title="مجله و راهنماها" href="#journal"/><div className="journal-grid">{articles.map(a => <a href="#journal" className={`article-card ${a.className}`} key={a.title}><img src={a.image} alt=""/><span className="article-copy"><small>{a.category}</small><strong>{a.title}</strong>{a.className && <em>مطالعه بیشتر <Icon name="arrow" size={15}/></em>}</span></a>)}</div></div><aside className="trust-card" id="about"><img src="/assets/shield.jpg" alt=""/><h2>چرا NEXORA؟</h2><div className="trust-list"><div><Icon name="shield"/><p><b>خرید امن و مطمئن</b><span>با خیال راحت خرید کنید</span></p></div><div><Icon name="support"/><p><b>پشتیبانی حرفه‌ای</b><span>همیشه در کنار شما هستیم</span></p></div><div><Icon name="clock"/><p><b>تحویل فوری</b><span>در کوتاه‌ترین زمان ممکن</span></p></div></div></aside></section>
}

export function Newsletter() {
  return <section className="newsletter wrap" id="contact"><img src="/assets/newsletter-plane.jpg" alt=""/><div className="newsletter-copy"><h2>با ما در ارتباط باشید</h2><p>برای دریافت جدیدترین تخفیف‌ها و مطالب، ایمیل خود را وارد کنید.</p></div><form className="newsletter-form" onSubmit={e => e.preventDefault()}><Icon name="mail" size={17}/><input type="email" placeholder="ایمیل شما" aria-label="ایمیل شما"/><button type="submit">عضویت</button></form></section>
}
