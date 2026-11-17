import { useState, type FormEvent } from 'react'
import { articles, products } from '../data/store'
import { Icon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../components/FavoritesContext'
import { clearDemoSession, readDemoOrders, readDemoSession, saveDemoSession, type DemoOrder, type DemoSession } from '../lib/demoData'

type ContentKind = 'journal' | 'help' | 'about' | 'contact' | 'account' | 'favorites'

const content: Record<ContentKind, { kicker: string; title: string; intro: string }> = {
  journal: { kicker: 'NEXORA JOURNAL', title: 'مجله و راهنماها', intro: 'راهنماها و نکته‌هایی برای انتخاب بهتر سرویس‌های دیجیتال.' },
  help: { kicker: 'HELP CENTER', title: 'راهنما و پرسش‌های متداول', intro: 'پاسخ پرسش‌های پرتکرار دربارهٔ خرید، فعال‌سازی و پشتیبانی.' },
  about: { kicker: 'ABOUT NEXORA', title: 'دربارهٔ نکسورا', intro: 'نکسورا کمک می‌کند سرویس‌های دیجیتال موردنیازت را ساده‌تر پیدا کنی.' },
  contact: { kicker: 'CONTACT', title: 'با ما در ارتباط باش', intro: 'برای راهنمایی خرید یا پیگیری سفارش، پیام خودت را برای ما بفرست.' },
  account: { kicker: 'YOUR ACCOUNT', title: 'حساب کاربری', intro: 'مدیریت حساب و مشاهده سفارش‌ها.' },
  favorites: { kicker: 'SAVED ITEMS', title: 'علاقه‌مندی‌ها', intro: 'محصولاتی که برای بررسی بعدی ذخیره کرده‌ای.' },
}

const money = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export default function ContentPage({ kind }: { kind: ContentKind }) {
  const page = content[kind]

  if (kind === 'journal') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>مجله</b></div><div className="page-heading-row"><div><span className="page-kicker">{page.kicker}</span><h1>{page.title}</h1><p>{page.intro}</p></div></div><div className="article-list">{articles.map((article, index) => <a className="article-list-card" href={`/journal/${index + 1}`} key={article.title}><img src={article.image} alt=""/><span><small>{article.category}</small><h2>{article.title}</h2><p>نکته‌های کاربردی برای انتخاب سرویس مناسب و استفادهٔ بهتر از دنیای دیجیتال.</p><b>مطالعه مقاله <Icon name="arrow" size={16}/></b></span></a>)}</div></div>

  if (kind === 'contact') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>تماس با ما</b></div><PageHeader {...page}/><ContactForm/></div>

  if (kind === 'about') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>درباره ما</b></div><PageHeader {...page}/><div className="about-grid"><article><Icon name="grid" size={25}/><h2>انتخاب ساده‌تر</h2><p>سرویس‌های پرکاربرد را کنار هم می‌آوریم تا مقایسه و انتخاب برایت آسان‌تر شود.</p></article><article><Icon name="shield" size={25}/><h2>اطلاعات شفاف</h2><p>جزئیات هر اشتراک باید پیش از خرید به‌روشنی در صفحه محصول ارائه شود.</p></article><article><Icon name="headphones" size={25}/><h2>پشتیبانی مشتری</h2><p>مسیر ارتباط با پشتیبانی برای پرسش‌ها و پیگیری سفارش در دسترس است.</p></article></div></div>

  if (kind === 'account') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>حساب کاربری</b></div><PageHeader {...page}/><AccountPanel/></div>

  if (kind === 'favorites') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>علاقه‌مندی‌ها</b></div><PageHeader {...page}/><FavoritesPanel/></div>

  if (kind === 'help') return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>{page.title}</b></div><PageHeader {...page}/><div className="help-list">{['چطور سفارش ثبت کنم؟', 'اشتراک چه زمانی تحویل داده می‌شود؟', 'اگر برای فعال‌سازی به مشکل بخورم چه کار کنم؟', 'آیا امکان لغو یا بازپرداخت وجود دارد؟'].map((question, index) => <details key={question}><summary>{question}<Icon name="chevron" size={18}/></summary><p>{[
    'محصول دلخواهت را به سبد اضافه کن و اطلاعات تماس را در مرحله تکمیل سفارش وارد کن. ثبت نهایی و پرداخت پس از فعال‌شدن سرویس بک‌اند انجام خواهد شد.',
    'زمان تحویل هر محصول باید در صفحه همان محصول درج شود. در نسخه نهایی، وضعیت سفارش از حساب کاربری قابل پیگیری خواهد بود.',
    'از صفحه تماس با ما درخواست پشتیبانی ثبت کن. فرم فعلی نمایشی است و پس از اتصال API پیام را ارسال خواهد کرد.',
    'شرایط لغو و بازپرداخت باید متناسب با نوع اشتراک و قوانین فروشگاه پیش از شروع فروش نهایی شود.',
  ][index]}</p></details>)}<a className="support-link" href="/contact">پرسش دیگری داری؟ با پشتیبانی تماس بگیر <Icon name="arrow" size={16}/></a></div></div>

  return null
}

function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <div className="page-heading-row"><div><span className="page-kicker">{kicker}</span><h1>{title}</h1><p>{intro}</p></div></div>
}

function ContactForm() {
  const [notice, setNotice] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('اطلاعات فرم معتبر است؛ ارسال واقعی پیام پس از اتصال API فعال می‌شود.')
  }
  return <div className="contact-layout">
    <div className="contact-card"><span className="contact-icon"><Icon name="support" size={25}/></span><h2>پشتیبانی نکسورا</h2><p>راه ارتباطی و ساعات پاسخ‌گویی پس از نهایی شدن اطلاعات کسب‌وکار در این بخش قرار می‌گیرد.</p><span className="contact-placeholder">اطلاعات تماس در حال تکمیل</span></div>
    <form className="contact-form" onSubmit={submit}>
      <h2>ارسال پیام</h2>
      <label>نام<input name="name" required minLength={2} autoComplete="name" placeholder="نام شما"/></label>
      <label>ایمیل<input name="email" required type="email" autoComplete="email" placeholder="name@example.com"/></label>
      <label>پیام<textarea name="message" required minLength={10} rows={4} placeholder="چطور می‌توانیم کمکت کنیم؟"/></label>
      <button type="submit" className="button button-primary">بررسی اطلاعات پیام</button>
      {notice && <p className="form-feedback" role="status">{notice}</p>}
    </form>
  </div>
}

function AccountPanel() {
  const [session, setSession] = useState<DemoSession | null>(() => readDemoSession())
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [orders] = useState<DemoOrder[]>(() => readDemoOrders())
  const [notice, setNotice] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const enteredName = String(data.get('fullName') ?? '').trim()
    const sessionData: DemoSession = {
      name: enteredName || email.split('@')[0] || 'کاربر نکسورا',
      email,
      phone,
    }
    saveDemoSession(sessionData)
    setSession(sessionData)
    setNotice('')
  }

  function logout() {
    clearDemoSession()
    setSession(null)
    setMode('login')
    setNotice('از حساب نمایشی خارج شدی.')
  }

  if (!session) return <section className="account-auth-card">
    <div className="demo-notice"><Icon name="info" size={18}/><p>این فرم فقط پیش‌نمایش رابط کاربری است. ورود و ثبت‌نام واقعی بعد از اتصال API بک‌اند فعال می‌شود؛ رمز عبور در این نسخه ذخیره یا ارسال نمی‌شود.</p></div>
    <div className="account-tabs" role="tablist" aria-label="نوع ورود"><button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>ورود</button><button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>ایجاد حساب</button></div>
    <form className="account-form" onSubmit={submit}>
      {mode === 'register' && <label>نام و نام خانوادگی<input name="fullName" required minLength={3} autoComplete="name" placeholder="نام شما"/></label>}
      <label>ایمیل<input name="email" type="email" required autoComplete="email" placeholder="name@example.com"/></label>
      {mode === 'register' && <label>شماره تماس<input name="phone" type="tel" required autoComplete="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label>}
      <label>رمز عبور<input name="password" type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="حداقل ۸ کاراکتر"/></label>
      <button type="submit" className="button button-primary">{mode === 'login' ? 'ورود نمایشی' : 'ساخت حساب نمایشی'}</button>
      {notice && <p className="form-feedback" role="status">{notice}</p>}
    </form>
  </section>

  return <section className="account-dashboard">
    <div className="demo-notice"><Icon name="info" size={18}/><p>حساب نمایشی مرورگر · اطلاعات این صفحه از localStorage خوانده می‌شود و هنوز به حساب واقعی سرور متصل نیست.</p></div>
    <div className="account-welcome"><div className="account-avatar">{session.name.slice(0, 1)}</div><div><small>خوش آمدی</small><h2>{session.name}</h2><p>{session.email}</p></div><button type="button" className="outline-button" onClick={logout}>خروج</button></div>
    <div className="account-stats"><article><span>سفارش‌های نمایشی</span><strong>{money(orders.length)}</strong></article><article><span>جمع مبالغ نمونه</span><strong>{money(orders.reduce((sum, order) => sum + order.total, 0))} تومان</strong></article></div>
    <div className="account-section-heading"><h2>سفارش‌های اخیر</h2><span>پیش‌نمایش محلی</span></div>
    {orders.length ? <div className="account-order-list">{orders.map(order => <article className="account-order" key={order.id}><div><bdi>{order.id}</bdi><small>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</small></div><div><strong>{money(order.total)} تومان</strong><small>وضعیت: در انتظار اتصال بک‌اند</small></div><a href="/shop">فروشگاه</a></article>)}</div> : <div className="account-empty"><Icon name="package" size={27}/><h3>هنوز سفارشی ثبت نشده</h3><p>پس از تکمیل خرید، سفارش‌های تو در این قسمت نمایش داده می‌شوند.</p><a className="support-link" href="/shop">مشاهده محصولات <Icon name="arrow" size={16}/></a></div>}
    <div className="account-profile"><h2>اطلاعات حساب</h2><p><span>نام</span><b>{session.name}</b></p><p><span>ایمیل</span><b>{session.email}</b></p><p><span>شماره تماس</span><b>{session.phone || 'ثبت نشده'}</b></p></div>
  </section>
}

function FavoritesPanel() {
  const { slugs, clear } = useFavorites()
  const favoriteProducts = products.filter(product => slugs.includes(product.slug))
  if (!favoriteProducts.length) return <div className="empty-state"><Icon name="heart" size={30}/><h2>هنوز محصولی ذخیره نکرده‌ای</h2><p>با انتخاب علامت قلب روی محصولات، آن‌ها را اینجا نگه دار.</p><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>

  return <section className="favorites-content">
    <div className="favorites-toolbar"><span>{money(favoriteProducts.length)} محصول ذخیره‌شده</span><button type="button" className="outline-button" onClick={clear}>پاک‌کردن همه</button></div>
    <div className="catalog-grid">{favoriteProducts.map(product => <ProductCard key={product.slug} product={product}/>)}</div>
  </section>
}
