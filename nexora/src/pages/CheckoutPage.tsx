import { useCart } from '../components/CartContext'
import { products } from '../data/store'

export default function CheckoutPage() {
  const { items } = useCart()
  const amount = items.reduce((sum, item) => sum + (products.find(product => product.slug === item.slug)?.priceValue ?? 0) * item.quantity, 0)
  return <div className="page-shell wrap"><div className="breadcrumbs"><a href="/">خانه</a><span>/</span><a href="/cart">سبد خرید</a><span>/</span><b>تکمیل سفارش</b></div><div className="page-heading-row"><div><span className="page-kicker">CHECKOUT</span><h1>تکمیل سفارش</h1><p>اطلاعات تماس را وارد کن تا سفارش برایت ثبت شود.</p></div></div>{items.length ? <div className="checkout-layout"><form className="checkout-form" onSubmit={event => event.preventDefault()}><h2>اطلاعات خریدار</h2><label>نام و نام خانوادگی<input required placeholder="نام شما"/></label><label>ایمیل<input required type="email" placeholder="name@example.com"/></label><label>شماره تماس<input required type="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label><button className="button button-primary">ثبت سفارش نمایشی</button><p>درگاه پرداخت پس از اتصال بک‌اند در این مرحله قرار می‌گیرد.</p></form><aside className="cart-summary"><h2>مبلغ سفارش</h2><div className="summary-total"><span>جمع کل</span><b>{new Intl.NumberFormat('fa-IR').format(amount)} تومان</b></div><a className="continue-shopping" href="/cart">بازگشت به سبد خرید</a></aside></div> : <div className="empty-state"><h2>سبد خریدت خالی است</h2><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>}</div>
}
