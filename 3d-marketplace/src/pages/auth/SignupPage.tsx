import { useState, type FormEvent } from "react";
import { ArrowLeft, Store, UserRound } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

export function SignupPage() {
  const isSeller = window.location.pathname === ROUTES.sellerRegister;
  const [checked, setChecked] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setChecked(true); }
  return (
    <div className="page form-page" dir="rtl">
      <header className="form-page__header"><span className="marketplace-catalog__eyebrow">{isSeller ? <Store size={15} aria-hidden="true" /> : <UserRound size={15} aria-hidden="true" />} {isSeller ? "پیوستن به سازندگان" : "عضویت در Makerā"}</span><h1>{isSeller ? "فروشگاهت را معرفی کن" : "حساب کاربری بساز"}</h1><p>{isSeller ? "اطلاعات اولیهٔ فروشگاه نمونه را وارد کن تا فرم ثبت‌نام فروشنده را ببینی." : "فرم اولیهٔ عضویت برای پیش‌نمایش تجربهٔ کاربری."}</p></header>
      <div className="form-page__layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>{isSeller ? "اطلاعات فروشنده" : "اطلاعات حساب"}</h2>
          <div className="form-grid">
            <label className="form-field">نام و نام خانوادگی<input required name="name" autoComplete="name" /></label>
            <label className="form-field">ایمیل<input required type="email" name="email" autoComplete="email" /></label>
            <label className="form-field">شماره تماس<input required type="tel" name="phone" autoComplete="tel" /></label>
            {isSeller && <label className="form-field">نام فروشگاه / استودیو<input required name="store" /></label>}
            {isSeller && <label className="form-field form-field--wide">تخصص اصلی<select defaultValue="products"><option value="products">محصولات چاپ سه‌بعدی</option><option value="printers">پرینتر و تجهیزات</option><option value="materials">مواد مصرفی</option><option value="files">فایل دیجیتال</option><option value="custom">ساخت سفارشی</option></select></label>}
            <label className="form-field form-field--wide">رمز عبور<input required type="password" minLength={8} name="password" autoComplete="new-password" placeholder="حداقل ۸ نویسه" /></label>
          </div>
          <div className="form-action"><button className="form-primary-button" type="submit">بررسی فرم <ArrowLeft size={15} aria-hidden="true" /></button><a className="form-secondary-link" href={ROUTES.login}>قبلاً حساب ساخته‌ای؟</a></div>
          {checked && <div className="form-status" role="status">فرم از نظر مرورگر معتبر است، اما ثبت‌نام و احراز هویت هنوز به سرور وصل نیست؛ هیچ اطلاعاتی ذخیره یا ارسال نشد.</div>}
        </form>
        <aside className="form-side-card"><h2>قبل از ثبت‌نام واقعی</h2><p>این فرم فقط برای تکمیل ظاهر و جریان کاربری ساخته شده است. اطلاعات واقعی یا رمز عبورت را در این نسخه وارد نکن.</p><p>برای فعال‌سازی نیاز به بک‌اند، اعتبارسنجی سمت سرور، سیاست رمز عبور و مدیریت نشست امن داریم.</p></aside>
      </div>
    </div>
  );
}
