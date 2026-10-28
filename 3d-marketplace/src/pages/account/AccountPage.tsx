import { useEffect, useState } from "react";
import { ArrowLeft, Heart, MessageSquare, Package, ShoppingBag, UserRound } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { marketplaceProducts, formatToman } from "../../data/marketplace";
import { readCart, subscribeToCart, type CartItem } from "../../lib/demoCart";
import "../../components/catalog/marketplace-pages.css";

export function AccountPage() {
  const path = window.location.pathname;
  const isFavorites = path.endsWith("/favorites");
  const isMessages = path.endsWith("/messages");
  const [cart, setCart] = useState<CartItem[]>(() => readCart());
  const [favorites] = useState<string[]>(() => {
    try { const raw = window.localStorage.getItem("makera-demo-favorites"); const value: unknown = JSON.parse(raw ?? "[]"); return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; } catch { return []; }
  });
  useEffect(() => subscribeToCart(() => setCart(readCart())), []);
  const favoriteProducts = marketplaceProducts.filter((product) => favorites.includes(product.id));
  if (isFavorites) return <div className="page" dir="rtl"><header className="form-page__header"><span className="marketplace-catalog__eyebrow"><Heart size={15} aria-hidden="true" /> علاقه‌مندی‌ها</span><h1>چیزهایی که نشان کرده‌ای</h1><p>موارد منتخب در همین مرورگر نگهداری می‌شوند.</p></header>{favoriteProducts.length ? <div className="market-product-grid">{favoriteProducts.map((product) => <article key={product.id} className="market-product-card"><a className="market-product-card__media" href={`${ROUTES.products}/${product.id}`}><img src={product.image} alt={product.alt} /><span className="market-product-card__category">{product.categoryLabel}</span></a><div className="market-product-card__body"><h2>{product.title}</h2><p>{product.description}</p><div className="market-product-card__price"><strong>{formatToman(product.price)}</strong><small>تومان</small></div></div></article>)}</div> : <div className="cart-empty"><h2>هنوز محصولی نشان نکرده‌ای</h2><p>از صفحه محصولات روی قلب کنار کالاها بزن تا اینجا نمایش داده شوند.</p><a href={ROUTES.products}>مشاهده محصولات <ArrowLeft size={15} aria-hidden="true" /></a></div>}</div>;
  if (isMessages) return <div className="page" dir="rtl"><header className="form-page__header"><span className="marketplace-catalog__eyebrow"><MessageSquare size={15} aria-hidden="true" /> پیام‌ها</span><h1>گفتگوهای Makerā</h1><p>فضای پیام‌رسانی با سازندگان در نسخهٔ فعلی به سرور متصل نیست.</p></header><div className="form-panel"><h2>هنوز گفتگویی وجود ندارد</h2><p>بعد از اتصال حساب‌ها و سیستم پیام‌رسانی، گفتگوهای مربوط به سفارش‌های اختصاصی و محصولات اینجا نمایش داده می‌شوند.</p><a className="form-secondary-link" href={ROUTES.makers}>پیدا کردن سازندگان <ArrowLeft size={14} aria-hidden="true" /></a></div></div>;
  return (
    <div className="page" dir="rtl">
      <header className="form-page__header"><span className="marketplace-catalog__eyebrow"><UserRound size={15} aria-hidden="true" /> فضای کاربری</span><h1>حساب کاربری</h1><p>این صفحه پیش‌نمایش بخش کاربری Makerā است؛ ورود و اطلاعات حساب هنوز به سرویس احراز هویت متصل نیست.</p></header>
      <div className="makers-page__grid">
        <a className="maker-profile-card" href={ROUTES.cart}><div className="maker-profile-card__avatar"><ShoppingBag size={24} aria-hidden="true" /></div><h2>سبد خرید</h2><p>{cart.reduce((sum,item)=>sum+item.quantity,0).toLocaleString("fa-IR")} قلم در مرورگر ذخیره شده است.</p><div className="maker-profile-card__metrics"><span>{formatToman(cart.reduce((sum,item)=>sum+item.price*item.quantity,0))} تومان</span></div><span className="maker-profile-card__link">باز کردن سبد <ArrowLeft size={14} aria-hidden="true" /></span></a>
        <a className="maker-profile-card" href={ROUTES.accountFavorites}><div className="maker-profile-card__avatar"><Heart size={24} aria-hidden="true" /></div><h2>علاقه‌مندی‌ها</h2><p>فهرست کالاهایی که برای بعد نشان کرده‌ای.</p><span className="maker-profile-card__link">دیدن علاقه‌مندی‌ها <ArrowLeft size={14} aria-hidden="true" /></span></a>
        <a className="maker-profile-card" href={ROUTES.accountMessages}><div className="maker-profile-card__avatar"><MessageSquare size={24} aria-hidden="true" /></div><h2>پیام‌ها</h2><p>گفتگو با سازندگان در نسخه‌های آینده.</p><span className="maker-profile-card__link">مشاهده پیام‌ها <ArrowLeft size={14} aria-hidden="true" /></span></a>
        <a className="maker-profile-card" href={ROUTES.products}><div className="maker-profile-card__avatar"><Package size={24} aria-hidden="true" /></div><h2>ادامهٔ خرید</h2><p>از میان محصولات، پرینترها و مواد مصرفی نمونه انتخاب کن.</p><span className="maker-profile-card__link">رفتن به بازار <ArrowLeft size={14} aria-hidden="true" /></span></a>
      </div>
    </div>
  );
}
