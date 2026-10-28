import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShoppingBag } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { formatToman } from "../../data/marketplace";
import { readCart, type CartItem } from "../../lib/demoCart";
import "../../components/catalog/marketplace-pages.css";

export function CheckoutPage() {
  const [cart] = useState<CartItem[]>(() => readCart());
  const [previewReady, setPreviewReady] = useState(false);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewReady(true);
  }
  if (!cart.length) return <div className="page" dir="rtl"><div className="cart-empty"><h1>برای ادامه، سبد خریدت را پر کن</h1><p>فعلاً کالایی برای پیش‌نمایش سفارش در سبد نیست.</p><a href={ROUTES.products}>رفتن به محصولات <ArrowLeft size={15} aria-hidden="true" /></a></div></div>;
  return (
    <div className="page form-page" dir="rtl">
      <header className="form-page__header"><span className="marketplace-catalog__eyebrow"><LockKeyhole size={15} aria-hidden="true" /> تکمیل اطلاعات</span><h1>پیش‌نمایش سفارش</h1><p>اطلاعات تماس و نشانی را وارد کن تا شکل مرحلهٔ نهایی سفارش را ببینی.</p></header>
      <div className="form-page__layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>اطلاعات تحویل</h2>
          <div className="form-grid">
            <label className="form-field">نام و نام خانوادگی<input required autoComplete="name" name="name" /></label>
            <label className="form-field">شماره تماس<input required type="tel" autoComplete="tel" name="phone" /></label>
            <label className="form-field form-field--wide">ایمیل<input required type="email" autoComplete="email" name="email" /></label>
            <label className="form-field form-field--wide">نشانی تحویل<textarea required name="address" autoComplete="street-address" /></label>
            <label className="form-field form-field--wide">توضیح برای سفارش (اختیاری)<textarea name="notes" /></label>
          </div>
          <div className="form-action"><button className="form-primary-button" type="submit"><ShoppingBag size={16} aria-hidden="true" /> ساخت پیش‌نمایش سفارش</button></div>
          {previewReady && <div className="form-status" role="status"><CheckCircle2 size={17} aria-hidden="true" /> فرم معتبر است و پیش‌نمایش آماده شد؛ اطلاعات ارسال نشده و هیچ سفارش یا پرداخت واقعی ثبت نشده است.</div>}
          <p className="form-note">برای پرداخت واقعی، بک‌اند، درگاه پرداخت امن و فرایند ثبت سفارش سمت سرور باید پیاده‌سازی شود.</p>
        </form>
        <aside className="form-panel cart-summary"><h2>خلاصهٔ سبد</h2>{cart.map((item) => <div className="cart-summary__row" key={item.id}><span>{item.title} × {item.quantity.toLocaleString("fa-IR")}</span><strong>{formatToman(item.price*item.quantity)}</strong></div>)}<div className="cart-summary__row cart-summary__total"><span>جمع نمونه</span><strong>{formatToman(total)} تومان</strong></div><p className="form-note">قیمت‌ها آزمایشی‌اند و هزینه ارسال یا مالیات محاسبه نشده است.</p><a className="form-secondary-link" href={ROUTES.cart}>بازگشت به سبد <ArrowLeft size={14} aria-hidden="true" /></a></aside>
      </div>
    </div>
  );
}
