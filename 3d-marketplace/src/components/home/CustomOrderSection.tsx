import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function CustomOrderSection() {
  return (
    <section className="home-section custom-order custom-order--banner" id="custom-orders" dir="rtl" aria-labelledby="custom-order-title">
      <div className="custom-order__banner">
        <div className="custom-order__banner-copy">
          <span className="custom-order__banner-mark"><Sparkles size={16} aria-hidden="true" /></span>
          <h2 id="custom-order-title">سفارش اختصاصی خود را ثبت کنید</h2>
          <p>ایده‌تان را با ما در میان بگذارید؛ از طراحی تا ساخت، همراه شما هستیم.</p>
          <a href={ROUTES.customOrders}>
            ثبت سفارش اختصاصی <ArrowLeft size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="custom-order__banner-benefits">
          <span><CheckCircle2 size={17} aria-hidden="true" /> طراحی دقیق</span>
          <span><CheckCircle2 size={17} aria-hidden="true" /> چاپ باکیفیت</span>
          <span><CheckCircle2 size={17} aria-hidden="true" /> تحویل مطمئن</span>
        </div>
      </div>
    </section>
  );
}
