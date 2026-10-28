import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Ruler, Sparkles, UploadCloud } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

export function CustomOrdersPage() {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState("1");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <div className="page form-page" dir="rtl">
      <header className="form-page__header">
        <span className="marketplace-catalog__eyebrow"><Sparkles size={15} aria-hidden="true" /> سفارش ساخت اختصاصی</span>
        <h1>ایده‌ات را به یک قطعهٔ واقعی تبدیل کن</h1>
        <p>نیاز، ابعاد و جنس مدنظرت را بنویس تا درخواست ساخت برای بررسی آماده شود.</p>
      </header>
      <div className="form-page__layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>مشخصات درخواست</h2>
          <div className="form-grid">
            <label className="form-field">نام و نام خانوادگی<input required name="name" autoComplete="name" placeholder="نام شما" /></label>
            <label className="form-field">ایمیل تماس<input required type="email" name="email" autoComplete="email" placeholder="name@example.com" /></label>
            <label className="form-field form-field--wide">عنوان قطعه یا پروژه<input required name="title" placeholder="مثلاً قاب اختصاصی برای حسگر" /></label>
            <label className="form-field">جنس پیشنهادی<select name="material" defaultValue="PLA"><option>PLA</option><option>PETG</option><option>ABS</option><option>TPU</option><option>مطمئن نیستم؛ راهنمایی می‌خواهم</option></select></label>
            <label className="form-field">تعداد موردنیاز<input required type="number" min="1" max="10000" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label>
            <label className="form-field">ابعاد تقریبی<input name="dimensions" placeholder="مثلاً ۸ × ۵ × ۳ سانتی‌متر" /></label>
            <label className="form-field">بودجهٔ تقریبی<input name="budget" inputMode="numeric" placeholder="اختیاری، به تومان" /></label>
            <label className="form-field form-field--wide">توضیح نیاز و شرایط ساخت<textarea required name="description" placeholder="کاربرد قطعه، محدودیت‌ها، ظاهر یا جزئیات مهم را توضیح بده..." /></label>
            <label className="form-field form-field--wide">فایل یا تصویر مرجع (اختیاری)<input type="file" accept=".stl,.obj,.3mf,.step,.stp,.png,.jpg,.jpeg,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} /><small>{fileName ? `فایل انتخاب‌شده: ${fileName}` : "فایل فقط در این فرم انتخاب می‌شود و هنوز آپلود نخواهد شد."}</small></label>
          </div>
          <div className="form-action"><button className="form-primary-button" type="submit"><UploadCloud size={16} aria-hidden="true" /> بررسی فرم درخواست <ArrowLeft size={15} aria-hidden="true" /></button><span className="form-secondary-link">تعداد: {Number(quantity || 0).toLocaleString("fa-IR")}</span></div>
          {submitted && <div className="form-status" role="status"><CheckCircle2 size={17} aria-hidden="true" /> فرم از نظر مرورگر معتبر است؛ چون بک‌اند متصل نیست، درخواست یا فایل به جایی ارسال نشده است.</div>}
        </form>
        <aside className="form-side-card">
          <h2><Ruler size={17} aria-hidden="true" /> برای برآورد بهتر</h2>
          <p>هرچه مشخصات روشن‌تر باشند، سازنده راحت‌تر می‌تواند امکان ساخت را ارزیابی کند.</p>
          <ul><li>کاربرد قطعه و محیط استفاده</li><li>ابعاد دقیق یا عکس همراه با مقیاس</li><li>تعداد قطعات و میزان استحکام موردنیاز</li><li>جنس یا شرایط محیطی مورد انتظار</li></ul>
          <p>در نسخهٔ نهایی، بارگذاری فایل، بررسی سازنده، گفتگو و اعلام قیمت باید به API و فضای ذخیره‌سازی امن متصل شود.</p>
          <a className="form-secondary-link" href={ROUTES.makers}>آشنایی با سازندگان <ArrowLeft size={14} aria-hidden="true" /></a>
        </aside>
      </div>
    </div>
  );
}
