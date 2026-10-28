import { ArrowLeft, BadgeCheck, Box, Star } from "lucide-react";
import { marketplaceMakers, marketplaceProducts } from "../../data/marketplace";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

export function MakersPage() {
  return (
    <div className="page" dir="rtl">
      <header className="form-page__header">
        <span className="marketplace-catalog__eyebrow"><BadgeCheck size={15} aria-hidden="true" /> جامعهٔ سازندگان</span>
        <h1>سازندگان پشت هر قطعه</h1>
        <p>استودیوها و فروشندگان نمونه را ببین، تخصص‌شان را بشناس و محصولات مرتبط را پیدا کن.</p>
      </header>
      <div className="makers-page__grid">
        {marketplaceMakers.map((maker) => {
          const count = marketplaceProducts.filter((product) => product.makerId === maker.id).length;
          return (
            <article className="maker-profile-card" key={maker.id}>
              <div className="maker-profile-card__avatar">{maker.initials}</div>
              <h2>{maker.name}</h2>
              <span className="maker-profile-card__specialty">{maker.specialty}</span>
              <p>{maker.description}</p>
              <div className="maker-profile-card__metrics">
                <span><Star size={13} fill="currentColor" aria-hidden="true" /> {maker.rating.toLocaleString("fa-IR")} <span>امتیاز نمونه</span></span>
                <span><Box size={13} aria-hidden="true" /> {count.toLocaleString("fa-IR")} محصول</span>
              </div>
              <a className="maker-profile-card__link" href={`${ROUTES.makers}/${maker.id}`}>مشاهده پروفایل <ArrowLeft size={15} aria-hidden="true" /></a>
            </article>
          );
        })}
      </div>
      <p className="marketplace-catalog__notice">پروفایل‌ها، امتیازها و تعداد محصولات نمایشی‌اند و به فروشندگان واقعی متصل نیستند.</p>
    </div>
  );
}
