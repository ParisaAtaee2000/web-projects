import { ArrowRight, BadgeCheck, Box, Star } from "lucide-react";
import { marketplaceMakers, marketplaceProducts } from "../../data/marketplace";
import { ROUTES } from "../../app/router/routeNames";
import { MarketplaceProductCard } from "../../components/catalog/MarketplaceProductCard";
import "../../components/catalog/marketplace-pages.css";

export function MakerProfilePage() {
  const makerId = decodeURIComponent(window.location.pathname.split("/").filter(Boolean).at(-1) ?? "");
  const maker = marketplaceMakers.find((item) => item.id === makerId);
  if (!maker) {
    return <div className="page" dir="rtl"><h1>سازنده پیدا نشد</h1><p>این پروفایل در داده‌های نمونه موجود نیست.</p><a href={ROUTES.makers}>بازگشت به سازندگان</a></div>;
  }
  const products = marketplaceProducts.filter((product) => product.makerId === maker.id);
  return (
    <div className="page" dir="rtl">
      <a className="form-secondary-link" href={ROUTES.makers}><ArrowRight size={15} aria-hidden="true" /> بازگشت به سازندگان</a>
      <header className="maker-profile__header">
        <div className="maker-profile__avatar">{maker.initials}</div>
        <div>
          <span className="maker-profile__tag"><BadgeCheck size={14} aria-hidden="true" /> پروفایل نمایشی سازنده</span>
          <h1>{maker.name}</h1>
          <p>{maker.description}</p>
          <div className="maker-profile__stats"><span>{maker.specialty}</span><span><Star size={13} fill="currentColor" aria-hidden="true" /> {maker.rating.toLocaleString("fa-IR")} امتیاز نمونه</span><span><Box size={13} aria-hidden="true" /> {products.length.toLocaleString("fa-IR")} محصول در این نسخه</span></div>
        </div>
      </header>
      <div className="form-page__header" style={{ marginTop: 30 }}><h2>محصولات این سازنده</h2><p>برای دیدن توضیحات بیشتر، یک محصول را انتخاب کن.</p></div>
      {products.length ? <div className="market-product-grid">{products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}</div> : <p>در حال حاضر محصول نمونه‌ای برای این سازنده ثبت نشده است.</p>}
      <p className="marketplace-catalog__notice">این پروفایل فقط برای نمایش رابط کاربری ساخته شده و حساب یا فروشگاه واقعی محسوب نمی‌شود.</p>
    </div>
  );
}
