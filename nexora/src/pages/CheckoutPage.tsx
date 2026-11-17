import { useState, type FormEvent } from 'react'
import { useCart } from '../components/CartContext'
import { products } from '../data/store'
import { saveDemoOrder, type DemoOrder } from '../lib/demoData'
import { Icon } from '../components/Icons'

const money = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export default function CheckoutPage() {
  const { items } = useCart()
  const [previewOrder, setPreviewOrder] = useState<DemoOrder | null>(null)
  const lines = items.map(item => ({
    ...item,
    product: products.find(product => product.slug === item.slug),
  })).filter(item => item.product)
  const amount = lines.reduce((sum, item) => sum + (item.product?.priceValue ?? 0) * item.quantity, 0)

  function preparePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const order: DemoOrder = {
      id: 'NX-' + Date.now().toString().slice(-8),
      createdAt: new Date().toISOString(),
      status: 'awaiting_api',
      customer: {
        name: String(formData.get('fullName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
      },
      items: lines.map(item => ({
        slug: item.slug,
        name: item.product?.name ?? '',
        quantity: item.quantity,
        unitPrice: item.product?.priceValue ?? 0,
      })),
      total: amount,
    }
    saveDemoOrder(order)
    setPreviewOrder(order)
  }

  return <div className="page-shell wrap">
    <div className="breadcrumbs"><a href="/">خانه</a><span>/</span><a href="/cart">سبد خرید</a><span>/</span><b>تکمیل سفارش</b></div>
    <div className="page-heading-row"><div><span className="page-kicker">CHECKOUT</span><h1>تکمیل سفارش</h1><p>اطلاعات تماس را وارد کن تا پیش‌نمایش سفارش آماده شود.</p></div></div>
    {lines.length ? <div className="checkout-layout">
      <form className="checkout-form" onSubmit={preparePreview}>
        <div className="checkout-title-row"><h2>اطلاعات خریدار</h2><span className="demo-pill">حالت نمایشی</span></div>
        <div className="demo-notice"><Icon name="info" size={18}/><p>این نسخه به API و درگاه پرداخت متصل نیست. فرم فقط برای آزمایش تجربه کاربری و تحویل به تیم بک‌اند است؛ هیچ پرداخت یا سفارش واقعی ثبت نمی‌شود.</p></div>
        <label>نام و نام خانوادگی<input name="fullName" autoComplete="name" required minLength={3} placeholder="نام شما"/></label>
        <label>ایمیل<input name="email" autoComplete="email" required type="email" placeholder="name@example.com"/></label>
        <label>شماره تماس<input name="phone" autoComplete="tel" required type="tel" inputMode="tel" minLength={8} maxLength={20} placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label>
        <label>توضیحات سفارش <span className="optional-label">اختیاری</span><textarea name="notes" rows={3} placeholder="نکته‌ای درباره سفارش داری؟"/></label>
        <label className="terms-check"><input type="checkbox" required/><span>شرایط و اطلاعات محصول را مطالعه کرده‌ام.</span></label>
        <button type="submit" className="button button-primary">آماده‌سازی پیش‌نمایش سفارش <Icon name="arrow" size={18}/></button>
      </form>
      <aside className="cart-summary checkout-summary">
        <h2>خلاصه سفارش</h2>
        {lines.map(item => item.product && <div className="checkout-line" key={item.slug}><span>{item.product.name} × {money(item.quantity)}</span><b>{money(item.product.priceValue * item.quantity)} تومان</b></div>)}
        <hr/>
        <div className="summary-total"><span>مبلغ نهایی</span><b>{money(amount)} تومان</b></div>
        <small><Icon name="info" size={15}/> پرداخت واقعی پس از اتصال درگاه فعال می‌شود.</small>
      </aside>
      {previewOrder && <section className="order-preview">
        <span className="preview-icon"><Icon name="check" size={22}/></span>
        <div><strong>پیش‌نمایش سفارش آماده شد</strong><p>شناسه آزمایشی: <bdi>{previewOrder.id}</bdi> · مبلغ: {money(previewOrder.total)} تومان</p><p>این رکورد فقط در مرورگر ذخیره شده و هنوز سفارشی به سرور ارسال نشده است.</p></div>
        <a href="/account" className="support-link">مشاهده در حساب نمایشی <Icon name="arrow" size={16}/></a>
      </section>}
    </div> : <div className="empty-state"><h2>سبد خریدت خالی است</h2><p>برای تکمیل سفارش ابتدا محصولی به سبد خرید اضافه کن.</p><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>}
  </div>
}
