import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { addToCart, parseLocalizedPrice } from "../../lib/demoCart";
import { readFavoriteIds, subscribeToFavorites, toggleFavoriteId } from "../../lib/demoFavorites";
import { ROUTES } from "../../app/router/routeNames";

type ProductFilter = "all" | "printed" | "printer" | "accessory" | "material";

const products = [
  { id: "geometric-planter", title: "گلدان هندسی لایه‌ای", maker: "استودیو فرمینو", category: "printed" as const, categoryLabel: "محصول چاپی", price: "۴۲۰٬۰۰۰", image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "قطعه‌ای ساخته‌شده با چاپگر سه‌بعدی", rating: "۴٫۹", badge: "انتخاب ویراستار" },
  { id: "core-printer", title: "پرینتر سه‌بعدی Core", maker: "کارگاه نوا", category: "printer" as const, categoryLabel: "پرینتر سه‌بعدی", price: "۱۸٬۹۰۰٬۰۰۰", image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "پرینتر سه‌بعدی روی میز کار", rating: "۴٫۸" },
  { id: "nozzle-toolkit", title: "کیت نگهداری چاپگر", maker: "تک‌میکر", category: "accessory" as const, categoryLabel: "لوازم جانبی", price: "۶۸۰٬۰۰۰", image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "جزئیات قطعات و ابزار فنی", rating: "۴٫۷" },
  { id: "matte-purple-pla", title: "فیلامنت PLA بنفش مات", maker: "متریال‌لب", category: "material" as const, categoryLabel: "مواد مصرفی", price: "۵۲۰٬۰۰۰", image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200", alt: "قرقره‌های فیلامنت رنگی", rating: "۴٫۹", badge: "پرطرفدار" },
];

const filters: { id: ProductFilter; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "printed", label: "محصولات چاپی" },
  { id: "printer", label: "پرینترها" },
  { id: "accessory", label: "لوازم جانبی" },
  { id: "material", label: "مواد مصرفی" },
];

export function FeaturedProductsSection() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("all");
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteIds());
  useEffect(() => subscribeToFavorites(() => setFavorites(readFavoriteIds())), []);
  const visibleProducts = useMemo(
    () => activeFilter === "all" ? products : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  function toggleFavorite(productId: string) {
    toggleFavoriteId(productId);
  }

  return (
    <section className="home-section featured-products" id="products" dir="rtl" aria-labelledby="featured-products-title">
      <div className="home-section__header">
        <div>
          <span className="home-eyebrow">انتخاب‌های Makerā</span>
          <h2 className="home-section__title" id="featured-products-title">چیزهای خاص، <span>ساخته‌شده برای ساختن</span></h2>
          <p className="home-section__lead">محصولات چاپی، تجهیزات و مواد مصرفی را یک‌جا کشف کن.</p>
        </div>
        <a className="home-text-link" href={ROUTES.products}>همه محصولات <ArrowLeft size={16} aria-hidden="true" /></a>
      </div>
      <div className="home-filter-row" role="group" aria-label="فیلتر محصولات نمونه">
        {filters.map((filter) => (
          <button className={`home-filter-chip${activeFilter === filter.id ? " is-active" : ""}`} type="button" key={filter.id} aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>
            {filter.label}
          </button>
        ))}
      </div>
      <div className="home-product-grid">
        {visibleProducts.map((product, index) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <article className="home-product-card" key={product.id}>
              <a className="home-product-card__media" href={`${ROUTES.products}/${product.id}`} aria-label={`مشاهده ${product.title}`}>
                <img src={product.image} alt={product.alt} loading="lazy" />
                <span className="home-product-card__category">{product.categoryLabel}</span>
                {product.badge && <span className="home-product-card__badge">{product.badge}</span>}
                <span className="home-product-card__index">{String(index + 1).padStart(2, "0")}</span>
              </a>
              <button className={`home-product-card__favorite${isFavorite ? " is-favorite" : ""}`} type="button" aria-label={isFavorite ? `حذف ${product.title} از علاقه‌مندی‌ها` : `افزودن ${product.title} به علاقه‌مندی‌ها`} aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)}>
                <Heart size={17} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
              </button>
              <div className="home-product-card__body">
                <span className="home-product-card__maker">{product.maker}</span>
                <h3><a href={`${ROUTES.products}/${product.id}`}>{product.title}</a></h3>
                <div className="home-product-card__rating"><Star size={14} fill="currentColor" aria-hidden="true" /><span>{product.rating}</span><span className="home-product-card__rating-label">امتیاز نمایشی</span></div>
                <div className="home-product-card__footer"><div><strong>{product.price}</strong><small>تومان</small></div><button className="home-product-card__add" type="button" onClick={() => addToCart({ id: product.id, title: product.title, maker: product.maker, price: parseLocalizedPrice(product.price), image: product.image, alt: product.alt, categoryLabel: product.categoryLabel })}><ShoppingCart size={14} aria-hidden="true" /><span>افزودن</span></button></div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="home-section__footnote">قیمت‌ها، امتیازها و نام فروشندگان داده‌های نمونه‌اند؛ هنوز به موجودی یا فروش واقعی متصل نیستند.</p>
    </section>
  );
}
