import { BadgeCheck, LayoutDashboard } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function SellerCard() {
  return (
    <section className="seller-card" aria-labelledby="seller-card-title">
      <LayoutDashboard size={23} strokeWidth={1.6} aria-hidden="true" />
      <h2 id="seller-card-title">پنل فروشندگان</h2>
      <p>محصولات، سفارش‌ها و درخواست‌های ساخت را از داشبورد پیگیری کن.</p>
      <div className="seller-card__actions">
        <a className="seller-card__dashboard" href={ROUTES.sellerDashboard}>
          ورود به داشبورد
        </a>
        <a className="seller-card__register" href={ROUTES.sellerRegister}>
          <BadgeCheck size={14} aria-hidden="true" />
          ثبت‌نام فروشنده
        </a>
      </div>
    </section>
  );
}
