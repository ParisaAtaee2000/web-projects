import { articles } from '../data/store'
import { products } from '../data/store'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../components/FavoritesContext'
import { Icon } from '../components/Icons'

type ContentKind = 'journal' | 'help' | 'about' | 'contact' | 'account' | 'favorites'

const content: Record<ContentKind, { kicker: string; title: string; intro: string }> = {
  journal: { kicker: 'NEXORA JOURNAL', title: 'مجله و راهنماها', intro: 'راهنماها و نکته‌هایی برای انتخاب بهتر سرویس‌های دیجیتال.' },
  help: { kicker: 'HELP CENTER', title: 'راهنما و پرسش‌های متداول', intro: 'پاسخ پرسش‌های پرتکرار دربارهٔ خرید، فعال‌سازی و پشتیبانی.' },
  about: { kicker: 'ABOUT NEXORA', title: 'دربارهٔ نکسورا', intro: 'نکسورا کمک می‌کند سرویس‌های دیجیتال موردنیازت را ساده‌تر و مطمئن‌تر پیدا کنی.' },
  contact: { kicker: 'CONTACT', title: 'با ما در ارتباط باش', intro: 'برای راهنمایی خرید یا پیگیری سفارش، پیام خودت را برای ما بفرست.' },
  account: { kicker: 'YOUR ACCOUNT', title: 'حساب کاربری', intro: 'برای دیدن سفارش‌ها و مدیریت اشتراک‌ها وارد حساب خودت شو.' },
  favorites: { kicker: 'SAVED ITEMS', title: 'علاقه‌مندی‌ها', intro: 'محصولاتی که برای بررسی بعدی ذخیره کرده‌ای در این صفحه نمایش داده می‌شوند.' },
}

export default function ContentPage({ kind }: { kind: ContentKind }) {
  const page = content[kind]
  const favorites = useFavorites()
  const favoriteProducts = products.filter(product => favorites.items.includes(product.slug))
  if (kind === 'journal') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>مجله</b></div><div className="page-heading-row"><div><span className="page-kicker">{page.kicker}</span><h1>{page.title}</h1><p>{page.intro}</p></div></div><div className="article-list">{articles.map((article, index) => <a className="article-list-card" href={`/journal/${index + 1}`} key={article.title}><img src={article.image} alt=""/><span><small>{article.category}</small><h2>{article.title}</h2><p>نکته‌های کاربردی برای انتخاب سرویس مناسب و استفادهٔ بهتر از دنیای دیجیتال.</p><b>مطالعه مقاله <Icon name="arrow" size={16}/></b></span></a>)}</div></div>

  if (kind === 'contact') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>تماس با ما</b></div><PageHeader {...page}/><div className="contact-layout"><div className="contact-card"><span className="contact-icon"><Icon name="support" size={25}/></span><h2>پشتیبانی نکسورا</h2><p>شنبه تا پنجشنبه، ساعت ۹ تا ۱۸</p><a href="mailto:support@nexora.example">support@nexora.example</a></div><form className="contact-form" onSubmit={event => event.preventDefault()}><label>نام<input required placeholder="نام شما"/></label><label>ایمیل<input required type="email" placeholder="name@example.com"/></label><label>پیام<textarea required rows={4} placeholder="چطور می‌توانیم کمکت کنیم؟"/></label><button className="button button-primary">ارسال پیام</button></form></div></div>

  if (kind === 'about') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>درباره ما</b></div><PageHeader {...page}/><div className="about-grid"><article><Icon name="grid" size={25}/><h2>انتخاب ساده‌تر</h2><p>سرویس‌های پرکاربرد را کنار هم می‌آوریم تا مقایسه و انتخاب برایت آسان‌تر شود.</p></article><article><Icon name="shield" size={25}/><h2>خرید مطمئن</h2><p>راهنمای شفاف و پشتیبانی فارسی در مسیر خرید همراه توست.</p></article><article><Icon name="clock" size={25}/><h2>تحویل سریع</h2><p>فرایند تهیهٔ اشتراک دیجیتال را ساده و سریع طراحی کرده‌ایم.</p></article></div></div>

  if (kind === 'account') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>{page.title}</b></div><PageHeader {...page}/><div className="empty-state"><Icon name="user" size={30}/><h2>به‌زودی در دسترس</h2><p>اتصال حساب کاربری پس از آماده‌شدن سرویس ورود فعال می‌شود.</p><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div></div>

  if (kind === 'favorites') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>{page.title}</b></div><PageHeader {...page}/>{favoriteProducts.length ? <div className="catalog-grid favorites-grid">{favoriteProducts.map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="empty-state"><Icon name="heart" size={30}/><h2>هنوز محصولی ذخیره نکرده‌ای</h2><p>در فروشگاه، روی قلب کنار محصول بزن تا اینجا نمایش داده شود.</p><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>}</div>

  if (kind === 'help') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>{page.title}</b></div><PageHeader {...page}/><div className="help-list">{['چطور سفارش ثبت کنم؟', 'اشتراک چه زمانی تحویل داده می‌شود؟', 'اگر برای فعال‌سازی به مشکل بخورم چه کار کنم؟'].map((question, index) => <details key={question}><summary>{question}<Icon name="chevron" size={18}/></summary><p>{['محصول دلخواهت را به سبد اضافه کن، اطلاعات سفارش را در مرحلهٔ بعد تکمیل کن و سفارش را ثبت کن.', 'زمان تحویل هر محصول در صفحهٔ همان محصول مشخص شده است؛ جزئیات سفارش هم بعد از ثبت برایت نمایش داده می‌شود.', 'از صفحهٔ تماس با ما پیام بفرست تا تیم پشتیبانی راهنمایی‌ات کند.'][index]}</p></details>)}<a className="support-link" href="/contact">پرسش دیگری داری؟ با پشتیبانی تماس بگیر <Icon name="arrow" size={16}/></a></div></div>

  return null
}

function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <div className="page-heading-row"><div><span className="page-kicker">{kicker}</span><h1>{title}</h1><p>{intro}</p></div></div>
}
