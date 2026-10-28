import { ArrowLeft, Check, Ruler, Sparkles, UploadCloud } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

const orderSteps = [
  { number: "01", title: "ایده‌ات را توضیح بده", description: "کاربرد قطعه، تصویر مرجع یا فایل مدل را آماده کن." },
  { number: "02", title: "مشخصات را دقیق کن", description: "ابعاد، جنس و تعداد موردنیاز را مشخص کن." },
  { number: "03", title: "با سازنده هماهنگ شو", description: "امکان ساخت و جزئیات اجرا پیش از سفارش نهایی بررسی می‌شود." },
];

export function CustomOrderSection() {
  return (
    <section className="home-section custom-order" id="custom-orders" dir="rtl" aria-labelledby="custom-order-title">
      <div className="custom-order__panel">
        <div className="custom-order__copy">
          <span className="home-eyebrow">وقتی محصول آماده نیست</span>
          <h2 className="home-section__title" id="custom-order-title">ایده‌ات را به یک <span>قطعهٔ واقعی</span> تبدیل کن</h2>
          <p className="home-section__lead">برای قطعه‌ای که در بازار پیدا نمی‌کنی، مسیر ساخت اختصاصی را با توضیح نیازت شروع کن.</p>
          <a className="home-primary-link" href={ROUTES.customOrders}>شروع سفارش اختصاصی <ArrowLeft size={17} aria-hidden="true" /></a>
          <div className="custom-order__assurances">
            <span><Check size={15} aria-hidden="true" /> بررسی امکان ساخت</span>
            <span><Check size={15} aria-hidden="true" /> انتخاب جنس و ابعاد</span>
          </div>
        </div>
        <div className="custom-order__visual" aria-label="تصویرسازی مفهومی یک قطعهٔ سه‌بعدی" role="img">
          <div className="custom-order__visual-grid" />
          <div className="custom-order__axis custom-order__axis--one" />
          <div className="custom-order__axis custom-order__axis--two" />
          <div className="custom-order__part">
            <div className="custom-order__part-face custom-order__part-face--top" />
            <div className="custom-order__part-face custom-order__part-face--left" />
            <div className="custom-order__part-face custom-order__part-face--right" />
            <span className="custom-order__part-hole" />
          </div>
          <div className="custom-order__float-card custom-order__float-card--file"><span><UploadCloud size={17} aria-hidden="true" /></span><div><strong>فایل یا تصویر</strong><small>شروع از ایده</small></div></div>
          <div className="custom-order__float-card custom-order__float-card--measure"><span><Ruler size={17} aria-hidden="true" /></span><div><strong>ابعاد دقیق</strong><small>متناسب با نیاز تو</small></div></div>
          <div className="custom-order__visual-caption"><Sparkles size={15} aria-hidden="true" /> از طرح تا نمونهٔ قابل ساخت</div>
        </div>
        <div className="custom-order__steps" id="order-guide">
          {orderSteps.map((step) => (
            <article className="custom-order__step" key={step.number}>
              <span className="custom-order__step-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
