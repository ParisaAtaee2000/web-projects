import { useState, type FormEvent } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

export function LoginPage() {
  const [checked, setChecked] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setChecked(true); }
  return (
    <div className="page form-page" dir="rtl">
      <header className="form-page__header"><span className="marketplace-catalog__eyebrow"><LockKeyhole size={15} aria-hidden="true" /> ورود به Makerā</span><h1>خوش برگشتی</h1><p>برای ادامه، فرم نمایشی ورود را تکمیل کن.</p></header>
      <div className="form-page__layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>اطلاعات ورود</h2>
          <div className="form-grid">
            <label className="form-field form-field--wide">ایمیل<input required type="email" name="email" autoComplete="email" placeholder="name@example.com" /></label>
            <label className="form-field form-field--wide">رمز عبور<input required type="password" name="password" autoComplete="current-password" minLength={8} placeholder="حداقل ۸ نویسه" /></label>
          </div>
          <div className="form-action"><button className="form-primary-button" type="submit">بررسی فرم <ArrowLeft size={15} aria-hidden="true" /></button><a className="form-secondary-link" href={ROUTES.register}>ایجاد حساب کاربری</a></div>
          {checked && <div className="form-status" role="status">فرم از نظر مرورگر معتبر است، اما احراز هویت هنوز پیاده‌سازی نشده؛ اطلاعات واردشده ارسال یا ذخیره نشد.</div>}
        </form>
        <aside className="form-side-card"><h2>امنیت حساب</h2><p>رمز عبور را در این نسخه آزمایشی وارد حساب واقعی نکن. این فرم هنوز به سرور یا سامانه احراز هویت متصل نیست.</p><p>برای فعال‌شدن ورود واقعی، سرویس احراز هویت، مدیریت نشست و مسیر بازیابی رمز باید سمت سرور پیاده‌سازی شوند.</p></aside>
      </div>
    </div>
  );
}
