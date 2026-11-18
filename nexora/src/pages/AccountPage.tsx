import { useEffect, useState } from 'react'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'
import DemoNotice from '../components/ui/DemoNotice'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'
import { formatToman } from '../data/store'
import type { ApiOrder, ApiUser } from '../types/api'

type Mode = 'login' | 'register'
const statusLabels: Record<ApiOrder['status'], string> = {
  pending_payment: 'در انتظار پرداخت', paid: 'پرداخت‌شده', processing: 'در حال پردازش',
  delivered: 'تحویل‌شده', cancelled: 'لغوشده', refunded: 'بازپرداخت‌شده',
}

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [user, setUser] = useState<ApiUser | null>(null)
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [loading, setLoading] = useState(isApiConfigured())
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!isApiConfigured()) { setLoading(false); return }
    const controller = new AbortController()
    storefrontApi.getCurrentUser(controller.signal).then(async current => {
      setUser(current)
      const history = await storefrontApi.getOrders(controller.signal)
      setOrders(history)
    }).catch(() => setUser(null)).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isApiConfigured()) { setFeedback('سرویس حساب کاربری هنوز به بک‌اند متصل نشده است.'); return }
    const form = new FormData(event.currentTarget)
    setBusy(true); setFeedback('')
    try {
      const result = mode === 'login'
        ? await storefrontApi.login({ email: String(form.get('email')), password: String(form.get('password')) })
        : await storefrontApi.register({
            full_name: String(form.get('full_name')), email: String(form.get('email')),
            phone: String(form.get('phone')), password: String(form.get('password')),
          })
      setUser(result.user)
      window.dispatchEvent(new Event('nexora:auth-changed'))
      setOrders(await storefrontApi.getOrders())
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'ورود به حساب ناموفق بود.')
    } finally { setBusy(false) }
  }

  async function handleLogout() {
    setBusy(true)
    try { await storefrontApi.logout(); setUser(null); setOrders([]); window.dispatchEvent(new Event('nexora:auth-changed')); setFeedback('از حساب خارج شدی.') }
    catch (error) { setFeedback(error instanceof Error ? error.message : 'خروج ناموفق بود.') }
    finally { setBusy(false) }
  }

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'حساب کاربری' }]} />
    <PageHeading kicker="YOUR ACCOUNT" title="حساب کاربری" intro="سفارش‌ها و اطلاعات حساب خودت را مدیریت کن." />
    {!isApiConfigured() && <DemoNotice>ورود و ثبت‌نام تا زمان آماده‌شدن API احراز هویت Django غیرفعال است؛ اطلاعاتی در این فرم ذخیره نمی‌شود.</DemoNotice>}
    {loading ? <div className="empty-state" role="status"><Icon name="clock" size={25}/><h2>در حال بررسی حساب…</h2></div> : user ? (
      <section className="account-dashboard">
        <div className="account-welcome"><span className="account-avatar"><Icon name="user" size={24}/></span><div><small>خوش آمدی</small><h2>{user.full_name}</h2><p>{user.email}</p></div><button type="button" className="outline-button" onClick={handleLogout} disabled={busy}>خروج از حساب</button></div>
        <div className="account-stats"><article><span>تعداد سفارش‌ها</span><strong>{orders.length}</strong></article><article><span>شماره تماس</span><strong>{user.phone || 'ثبت نشده'}</strong></article></div>
        <div className="account-section-heading"><h2>سفارش‌های من</h2><span>{orders.length} سفارش</span></div>
        {orders.length ? <div className="account-order-list">{orders.map(order=><article className="account-order" key={order.id}><div><small>شماره سفارش</small><bdi>{order.id}</bdi></div><div><small>مبلغ</small><strong>{formatToman(order.total_amount)} تومان</strong></div><div><small>وضعیت</small><strong>{statusLabels[order.status]}</strong></div></article>)}</div> : <div className="account-empty"><Icon name="cart" size={24}/><h3>هنوز سفارشی ثبت نکرده‌ای</h3><a className="support-link" href="/shop">مشاهده فروشگاه</a></div>}
        <div className="account-profile"><h2>اطلاعات حساب</h2><p><span>نام</span><b>{user.full_name}</b></p><p><span>ایمیل</span><b>{user.email}</b></p></div>
      </section>
    ) : (
      <section className="account-auth-card">
        <h2>{mode === 'login' ? 'ورود به حساب' : 'ساخت حساب کاربری'}</h2>
        <div className="account-tabs"><button type="button" className={mode==='login'?'active':''} onClick={()=>{setMode('login');setFeedback('')}}>ورود</button><button type="button" className={mode==='register'?'active':''} onClick={()=>{setMode('register');setFeedback('')}}>ثبت‌نام</button></div>
        <form className="account-form" onSubmit={handleAuth}>
          {mode==='register' && <><label>نام و نام خانوادگی<input name="full_name" autoComplete="name" required disabled={!isApiConfigured()} /></label><label>شماره تماس<input name="phone" autoComplete="tel" required disabled={!isApiConfigured()} /></label></>}
          <label>ایمیل<input name="email" type="email" autoComplete="email" required disabled={!isApiConfigured()} /></label>
          <label>رمز عبور<input name="password" type="password" autoComplete={mode==='login'?'current-password':'new-password'} minLength={8} required disabled={!isApiConfigured()} /></label>
          <button type="submit" className="button button-primary" disabled={!isApiConfigured()||busy}>{busy?'در حال ارسال…':mode==='login'?'ورود':'ایجاد حساب'}</button>
          {feedback && <p className="form-feedback" role="status">{feedback}</p>}
        </form>
      </section>
    )}
  </div>
}
