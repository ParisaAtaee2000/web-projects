import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, FileText, Ruler, Sparkles, UploadCloud } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

type FormValues = {
  name: string;
  email: string;
  title: string;
  material: string;
  quantity: string;
  dimensions: string;
  budget: string;
  description: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  title: "",
  material: "PLA",
  quantity: "1",
  dimensions: "",
  budget: "",
  description: "",
};

const steps = [
  { number: 1, label: "توضیحات" },
  { number: 2, label: "جزئیات" },
  { number: 3, label: "بررسی و ارسال" },
];

export function CustomOrdersPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setSubmitted(false);
  }

  function goNext() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    setStep((current) => Math.min(3, current + 1));
  }

  function goBack() {
    setStep((current) => Math.max(1, current - 1));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 3) return;
    setSubmitted(true);
  }

  return (
    <div className="page form-page custom-order-page" dir="rtl">
      <header className="form-page__header">
        <span className="marketplace-catalog__eyebrow"><Sparkles size={15} aria-hidden="true" /> سفارش ساخت اختصاصی</span>
        <h1>ایده‌ات را به یک قطعهٔ واقعی تبدیل کن</h1>
        <p>در سه مرحله، درخواستت را آماده کن و قبل از ثبت، تمام جزئیات را مرور کن.</p>
      </header>

      <nav className="custom-order-stepper" aria-label="مراحل ثبت سفارش اختصاصی">
        {steps.map((item, index) => (
          <div className="custom-order-stepper__group" key={item.number}>
            <div
              className={"custom-order-stepper__item" + (step === item.number ? " is-active" : "") + (step > item.number ? " is-complete" : "")}
              aria-current={step === item.number ? "step" : undefined}
            >
              <span>{step > item.number ? <Check size={13} aria-hidden="true" /> : item.number.toLocaleString("fa-IR")}</span>
              <strong>{item.label}</strong>
            </div>
            {index < steps.length - 1 && <i aria-hidden="true" className={step > item.number ? "is-complete" : ""} />}
          </div>
        ))}
      </nav>

      <div className="form-page__layout">
        <form ref={formRef} className="form-panel custom-order-form" onSubmit={handleSubmit}>
          <div className="custom-order-form__heading">
            <div>
              <span>مرحلهٔ {step.toLocaleString("fa-IR")} از ۳</span>
              <h2>{step === 1 ? "اول از همه، ایده‌ات را معرفی کن" : step === 2 ? "جزئیات فنی و فایل مرجع" : "مرور نهایی درخواست"}</h2>
            </div>
            <span className="custom-order-form__progress">{Math.round((step / 3) * 100).toLocaleString("fa-IR")}٪</span>
          </div>
          <div className="custom-order-form__progress-track" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>

          <fieldset className="custom-order-form__fieldset" disabled={step !== 1} hidden={step !== 1}>
            <legend className="custom-order-form__sr-only">توضیحات درخواست</legend>
            <div className="form-grid">
              <label className="form-field">نام و نام خانوادگی
                <input required name="name" autoComplete="name" value={values.name} onChange={(event) => updateValue("name", event.target.value)} placeholder="نام شما" />
              </label>
              <label className="form-field">ایمیل تماس
                <input required type="email" name="email" autoComplete="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} placeholder="name@example.com" />
              </label>
              <label className="form-field form-field--wide">عنوان قطعه یا پروژه
                <input required name="title" value={values.title} onChange={(event) => updateValue("title", event.target.value)} placeholder="مثلاً قاب اختصاصی برای حسگر" />
              </label>
              <label className="form-field form-field--wide">توضیح نیاز و شرایط ساخت
                <textarea required name="description" value={values.description} onChange={(event) => updateValue("description", event.target.value)} placeholder="کاربرد قطعه، محدودیت‌ها، ظاهر یا جزئیات مهم را توضیح بده..." />
              </label>
            </div>
            <p className="custom-order-form__hint">اطلاعات تماس فقط برای پیش‌نمایش فرم است و در حال حاضر به سرور ارسال نمی‌شود.</p>
          </fieldset>

          <fieldset className="custom-order-form__fieldset" disabled={step !== 2} hidden={step !== 2}>
            <legend className="custom-order-form__sr-only">جزئیات فنی سفارش</legend>
            <div className="form-grid">
              <label className="form-field">جنس پیشنهادی
                <select name="material" value={values.material} onChange={(event) => updateValue("material", event.target.value)}>
                  <option value="PLA">PLA</option><option value="PETG">PETG</option><option value="ABS">ABS</option><option value="TPU">TPU</option><option value="unsure">مطمئن نیستم؛ راهنمایی می‌خواهم</option>
                </select>
              </label>
              <label className="form-field">تعداد موردنیاز
                <input required type="number" name="quantity" min="1" max="10000" value={values.quantity} onChange={(event) => updateValue("quantity", event.target.value)} />
              </label>
              <label className="form-field">ابعاد تقریبی
                <input name="dimensions" value={values.dimensions} onChange={(event) => updateValue("dimensions", event.target.value)} placeholder="مثلاً ۸ × ۵ × ۳ سانتی‌متر" />
              </label>
              <label className="form-field">بودجهٔ تقریبی
                <input name="budget" inputMode="numeric" value={values.budget} onChange={(event) => updateValue("budget", event.target.value)} placeholder="اختیاری، به تومان" />
              </label>
              <label className="form-field form-field--wide">فایل یا تصویر مرجع (اختیاری)
                <span className="custom-order-upload">
                  <UploadCloud size={23} aria-hidden="true" />
                  <strong>{fileName || "برای انتخاب فایل کلیک کن"}</strong>
                  <small>STL، OBJ، 3MF، STEP، تصویر یا PDF</small>
                  <input type="file" accept=".stl,.obj,.3mf,.step,.stp,.png,.jpg,.jpeg,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} aria-label="انتخاب فایل مرجع" />
                </span>
                <small>{fileName ? "فایل در مرورگر انتخاب شده است؛ هنوز آپلود نشده." : "انتخاب فایل اختیاری است و به سرور ارسال نمی‌شود."}</small>
              </label>
            </div>
          </fieldset>

          <fieldset className="custom-order-form__fieldset" disabled={step !== 3} hidden={step !== 3}>
            <legend className="custom-order-form__sr-only">مرور نهایی درخواست</legend>
            <div className="custom-order-review">
              <div className="custom-order-review__title"><FileText size={19} aria-hidden="true" /><div><strong>{values.title || "عنوان درخواست"}</strong><small>خلاصهٔ اطلاعات واردشده</small></div></div>
              <div className="custom-order-review__grid">
                <div><span>نام</span><strong>{values.name || "—"}</strong></div>
                <div><span>ایمیل تماس</span><strong>{values.email || "—"}</strong></div>
                <div><span>جنس پیشنهادی</span><strong>{values.material === "unsure" ? "نیازمند راهنمایی" : values.material}</strong></div>
                <div><span>تعداد</span><strong>{Number(values.quantity || 0).toLocaleString("fa-IR")}</strong></div>
                <div><span>ابعاد تقریبی</span><strong>{values.dimensions || "ذکر نشده"}</strong></div>
                <div><span>بودجهٔ تقریبی</span><strong>{values.budget || "ذکر نشده"}</strong></div>
                <div className="custom-order-review__full"><span>توضیحات</span><p>{values.description || "—"}</p></div>
                <div className="custom-order-review__full"><span>فایل مرجع</span><strong>{fileName || "فایلی انتخاب نشده"}</strong></div>
              </div>
            </div>
            <label className="custom-order-consent"><input required type="checkbox" name="demoConsent" /> اطلاعات را بررسی کرده‌ام و می‌دانم این نسخهٔ آزمایشی، درخواست یا فایل را به جایی ارسال نمی‌کند.</label>
          </fieldset>

          <div className="form-action custom-order-form__actions">
            {step > 1 && <button className="custom-order-back" type="button" onClick={goBack}><ArrowRight size={15} aria-hidden="true" /> مرحلهٔ قبل</button>}
            <span className="custom-order-form__step-note">{step === 1 ? "حدود ۱ دقیقه" : step === 2 ? "مشخصات دقیق‌تر، برآورد بهتر" : "آخرین بررسی"}</span>
            {step < 3 ? (
              <button className="form-primary-button" type="button" onClick={goNext}>مرحلهٔ بعد <ArrowLeft size={15} aria-hidden="true" /></button>
            ) : (
              <button className="form-primary-button" type="submit"><CheckCircle2 size={16} aria-hidden="true" /> تأیید پیش‌نمایش</button>
            )}
          </div>
          {submitted && <div className="form-status custom-order-form__success" role="status"><CheckCircle2 size={18} aria-hidden="true" /><span><strong>پیش‌نمایش تکمیل شد.</strong> درخواست و فایل ذخیره یا ارسال نشده‌اند؛ برای ثبت واقعی به بک‌اند نیاز داریم.</span></div>}
        </form>

        <aside className="form-side-card custom-order-tips">
          <h2><Ruler size={17} aria-hidden="true" /> برای برآورد بهتر</h2>
          <p>هرچه مشخصات روشن‌تر باشند، سازنده راحت‌تر می‌تواند امکان ساخت را ارزیابی کند.</p>
          <ul><li>کاربرد قطعه و محیط استفاده</li><li>ابعاد دقیق یا عکس همراه با مقیاس</li><li>تعداد قطعات و میزان استحکام موردنیاز</li><li>جنس یا شرایط محیطی مورد انتظار</li></ul>
          <div className="custom-order-tips__privacy"><CheckCircle2 size={15} aria-hidden="true" /><span>فایل مرجع و اطلاعات تماس صرفاً در این فرم محلی استفاده می‌شوند.</span></div>
          <a className="form-secondary-link" href={ROUTES.makers}>آشنایی با سازندگان <ArrowLeft size={14} aria-hidden="true" /></a>
        </aside>
      </div>
    </div>
  );
}
