import { useState } from 'react'
import { useCart } from '../components/CartContext'
import { formatToman, products } from '../data/store'

export default function CheckoutPage() {
  const { items } = useCart()
  const [feedback, setFeedback] = useState('')
  const amountIrr = items.reduce((sum, item) => {
    const product = products.find(entry => entry.slug === item.slug)
    const variant = product?.variants.find(entry => entry.id === item.variantId)
    return sum + (variant?.priceAmount ?? 0) * item.quantity
  }, 0)
  return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><a href="/cart">سبد خرید</a><span>/</span><b>تکمیل سفارش</b></div><div className="page-heading-row"><div><span className="page-kicker">CHECKOUT</span><h1>تکمیل سفارش</h1><p>اطلاعات تماس را وارد کن تا سفارش برایت ثبت شود.</p></div></div>{items.length ? <div className="checkout-layout"><form className="checkout-form" onSubmit={event => { event.preventDefault(); setFeedback('اطلاعات فرم معتبر است؛ ثبت سفارش بعد از اتصال API فعال می‌شود.') }}><h2>اطلاعات خریدار</h2><label>نام و نام خانوادگی<input name="full_name" autoComplete="name" required placeholder="نام شما"/></label><label>ایمیل<input name="email" autoComplete="email" required type="email" placeholder="name@example.com"/></label><label>شماره تماس<input name="phone" autoComplete="tel" required type="tel" inputMode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label><button type="submit" className="button button-primary">بررسی اطلاعات سفارش</button>{feedback && <p className="form-feedback" role="status">{feedback}</p>}<p>این صفحه پیش‌نمایش است؛ هنوز سفارش یا پرداختی ثبت نمی‌شود.</p></form><aside className="cart-summary"><h2>مبلغ سفارش</h2><div className="summary-total"><span>جمع کل</span><b>{formatToman(amountIrr)} تومان</b></div><a className="continue-shopping" href="/cart">بازگشت به سبد خرید</a></aside></div> : <div className="empty-state"><h2>سبد خریدت خالی است</h2><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>}</div>
}
