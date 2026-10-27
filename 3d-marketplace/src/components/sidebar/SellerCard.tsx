import { ArrowLeft, Store } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function SellerCard() {
  return (
    <section className="seller-card" aria-labelledby="seller-card-title">
      <span className="seller-card__eyebrow">برای سازنده‌ها</span>
      <span className="seller-card__icon" aria-hidden="true">
        <Store size={19} strokeWidth={1.7} />
      </span>
      <h2 id="seller-card-title">محصولاتت را عرضه کن</h2>
      <p>به جمع سازندگان Makerā بپیوند و محصولات چاپ سه‌بعدی‌ات را معرفی کن.</p>
      <a className="seller-card__register" href={ROUTES.sellerRegister}>
        ثبت‌نام فروشنده
        <ArrowLeft size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
