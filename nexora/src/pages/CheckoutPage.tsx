import { useRef, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { formatToman, products } from '../data/store'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'
import type { ApiOrder } from '../types/api'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import DemoNotice from '../components/ui/DemoNotice'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [feedback, setFeedback] = useState('')
  const [order, setOrder] = useState<ApiOrder | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const idempotencyKey = useRef('')
  const amountIrr = items.reduce((sum, item) => {
    const product = item.productSnapshot ?? products.find(entry => entry.slug === item.slug)
    const variant = product?.variants.find(entry => entry.id === item.variantId)
    return sum + (variant?.priceAmount ?? 0) * item.quantity
  }, 0)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('')
    if (!isApiConfigured()) {
      setFeedback('این فقط پیش‌نمایش است؛ برای ثبت سفارش واقعی باید API بک‌اند متصل شود.')
      return
    }
    const form = new FormData(event.currentTarget)
    const customer = {
      full_name: String(form.get('full_name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
    }
    if (!idempotencyKey.current) {
      idempotencyKey.current = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : 'nexora-' + Date.now() + '-' + Math.random().toString(36).slice(2)
    }
    setSubmitting(true)
    try {
      const created = await storefrontApi.createOrder({
        items: items.map(item => ({ variant_id: item.variantId, quantity: item.quantity })),
        customer,
        idempotency_key: idempotencyKey.current,
      })
      setOrder(created)
      clear()
      idempotencyKey.current = ''
      setFeedback('سفارش در سرور ثبت شد. پرداخت هنوز باید از درگاه مورد تأیید فروشگاه آغاز شود.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'ثبت سفارش ناموفق بود. دوباره تلاش کن.')
    } finally {
      setSubmitting(false)
    }
  }

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'سبد خرید', href: '/cart' }, { label: 'تکمیل سفارش' }]} />
    <div className="page-heading-row"><div><span className="page-kicker">CHECKOUT</span><h1>تکمیل سفارش</h1><p>اطلاعات تماس را وارد کن تا سفارش برایت ثبت شود.</p></div></div>
    {!isApiConfigured() && <DemoNotice>اتصال بک‌اند و درگاه پرداخت هنوز فعال نیست؛ این فرم در حال حاضر فقط پیش‌نمایش است.</DemoNotice>}
    {order && <div className="order-preview" role="status"><strong>سفارش {order.id} ثبت شد</strong><p>وضعیت: {order.status} · مبلغ: {formatToman(order.total_amount)} تومان. برای پرداخت، درگاه باید به بک‌اند متصل شود.</p></div>}
    {items.length ? (
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>اطلاعات خریدار</h2>
          <label>نام و نام خانوادگی<input name="full_name" autoComplete="name" required placeholder="نام شما" /></label>
          <label>ایمیل<input name="email" autoComplete="email" required type="email" placeholder="name@example.com" /></label>
          <label>شماره تماس<input name="phone" autoComplete="tel" required type="tel" inputMode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷" /></label>
          <button type="submit" className="button button-primary" disabled={submitting}>{submitting ? 'در حال ثبت…' : isApiConfigured() ? 'ثبت سفارش' : 'بررسی اطلاعات سفارش'}</button>
          {feedback && <p className="form-feedback" role="status">{feedback}</p>}
          <p>قیمت و موجودی نهایی باید در سمت سرور دوباره بررسی شوند.</p>
        </form>
        <aside className="cart-summary"><h2>مبلغ سفارش</h2><div className="summary-total"><span>جمع کل نمونه</span><b>{formatToman(amountIrr)} تومان</b></div><a className="continue-shopping" href="/cart">بازگشت به سبد خرید</a></aside>
      </div>
    ) : !order ? <div className="empty-state"><h2>سبد خریدت خالی است</h2><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div> : null}
  </div>
}
