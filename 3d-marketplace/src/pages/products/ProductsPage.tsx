import { useEffect, useMemo, useState } from "react";
import { Check, Heart, Search, ShoppingCart, SlidersHorizontal, Star, X } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { addToCart } from "../../lib/demoCart";
import { readFavoriteIds, subscribeToFavorites, toggleFavoriteId } from "../../lib/demoFavorites";
import "./products.css";

type ProductCategory = "printed" | "printer" | "accessory" | "material";
type SortOption = "featured" | "price-low" | "price-high" | "rating";
type Product = {
  id: string;
  title: string;
  maker: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  priceLabel: string;
  rating: number;
  reviews: number;
  image: string;
  alt: string;
  featured?: boolean;
};

const products: Product[] = [
  { id: "geometric-planter", title: "گلدان هندسی لایه‌ای", maker: "استودیو فرمینو", category: "printed", categoryLabel: "محصول چاپی", price: 420000, priceLabel: "۴۲۰٬۰۰۰", rating: 4.9, reviews: 28, image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "گلدان دکوراتیو چاپ سه‌بعدی", featured: true },
  { id: "core-printer", title: "پرینتر سه‌بعدی Core", maker: "کارگاه نوا", category: "printer", categoryLabel: "پرینتر سه‌بعدی", price: 18900000, priceLabel: "۱۸٬۹۰۰٬۰۰۰", rating: 4.8, reviews: 16, image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "پرینتر سه‌بعدی", featured: true },
  { id: "nozzle-toolkit", title: "کیت نگهداری چاپگر", maker: "تک‌میکر", category: "accessory", categoryLabel: "لوازم جانبی", price: 680000, priceLabel: "۶۸۰٬۰۰۰", rating: 4.7, reviews: 12, image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "ابزار و قطعات فنی", featured: false },
  { id: "matte-purple-pla", title: "فیلامنت PLA بنفش مات", maker: "متریال‌لب", category: "material", categoryLabel: "مواد مصرفی", price: 520000, priceLabel: "۵۲۰٬۰۰۰", rating: 4.9, reviews: 34, image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200", alt: "قرقره‌های فیلامنت رنگی", featured: true },
  { id: "desk-organizer", title: "ارگانایزر رومیزی ماژولار", maker: "استودیو فرمینو", category: "printed", categoryLabel: "محصول چاپی", price: 350000, priceLabel: "۳۵۰٬۰۰۰", rating: 4.6, reviews: 9, image: "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "ارگانایزر رومیزی" },
  { id: "precision-nozzle", title: "نازل دقیق ۰٫۴ میلی‌متری", maker: "تک‌میکر", category: "accessory", categoryLabel: "لوازم جانبی", price: 190000, priceLabel: "۱۹۰٬۰۰۰", rating: 4.8, reviews: 21, image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "قطعات فنی" },
  { id: "pla-starter-pack", title: "بسته شروع فیلامنت PLA", maker: "متریال‌لب", category: "material", categoryLabel: "مواد مصرفی", price: 790000, priceLabel: "۷۹۰٬۰۰۰", rating: 4.7, reviews: 18, image: "https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "مواد اولیه چاپ سه‌بعدی" },
  { id: "mini-planter", title: "گلدان مینیمال مینی", maker: "میکر روم", category: "printed", categoryLabel: "محصول چاپی", price: 240000, priceLabel: "۲۴۰٬۰۰۰", rating: 4.5, reviews: 7, image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "گلدان کوچک" },
];
const categories: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "printed", label: "محصولات چاپی" },
  { id: "printer", label: "پرینترها" },
  { id: "accessory", label: "لوازم جانبی" },
  { id: "material", label: "مواد مصرفی" },
];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "مرتب‌سازی: پیشنهاد Maker" },
  { value: "price-low", label: "ارزان‌ترین" },
  { value: "price-high", label: "گران‌ترین" },
  { value: "rating", label: "بالاترین امتیاز" },
];

export function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteIds());

  useEffect(() => subscribeToFavorites(() => setFavorites(readFavoriteIds())), []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fa");
    const filtered = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const searchableText = `${product.title} ${product.maker} ${product.categoryLabel}`.toLocaleLowerCase("fa");
      return matchesCategory && product.price <= maxPrice && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [query, category, sort, maxPrice]);

  return (
    <main className="page products-page" dir="rtl">
      <div className="products-page__hero">
        <div className="products-page__hero-copy">
          <span className="products-page__eyebrow">بازار سازندگان Maker</span>
          <h1>دنیای چاپ سه‌بعدی در دستان شما</h1>
          <p>از تجهیزات چاپ تا محصولات آماده و مدل‌های سه‌بعدی، چیز بعدی‌ات را پیدا کن.</p>
        </div>
      </div>

      <div className="products-page__layout">
        {filterOpen && <button className="products-page__scrim" aria-label="بستن فیلترها" onClick={() => setFilterOpen(false)} />}
        <aside className={"products-page__sidebar" + (filterOpen ? " is-open" : "")} aria-label="فیلتر محصولات">
          <div className="products-page__filter-heading">
            <h2><SlidersHorizontal size={15} aria-hidden="true" /> فیلترها</h2>
            <button type="button" onClick={() => { setCategory("all"); setMaxPrice(20000000); setQuery(""); }}><X size={13} aria-hidden="true" /> پاک کردن</button>
            <button className="products-page__close-filter" type="button" aria-label="بستن فیلترها" onClick={() => setFilterOpen(false)}><X size={17} /></button>
          </div>
          <fieldset className="products-page__filter-group">
            <legend>دسته‌بندی</legend>
            {categories.map((item) => (
              <label className="products-page__check" key={item.id}>
                <span>{item.label}</span>
                <input type="radio" name="category" checked={category === item.id} onChange={() => setCategory(item.id)} />
                <i aria-hidden="true"><Check size={11} /></i>
              </label>
            ))}
          </fieldset>
          <fieldset className="products-page__filter-group">
            <legend>فیلتر قیمت</legend>
            <div className="products-page__price-range-label">
              <span>تا {maxPrice.toLocaleString("fa-IR")} تومان</span>
            </div>
            <input className="products-page__range" aria-label="حداکثر قیمت" type="range" min="100000" max="20000000" step="100000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
            <div className="products-page__range-limits"><span>۱۰۰ هزار</span><span>۲۰ میلیون</span></div>
          </fieldset>
          <div className="products-page__filter-group">
            <h3>برند</h3>
            {["Creality", "Anycubic", "Bambu Lab", "Elegoo", "Prusa"].map((brand, index) => (
              <div className="products-page__check products-page__check--static" key={brand}><span>{brand}</span><input aria-label={brand} type="checkbox" disabled={index > 0} checked={index === 0} readOnly /><i aria-hidden="true"><Check size={11} /></i></div>
            ))}
            <small className="products-page__filter-hint">فیلتر برند در نسخه بعدی به داده‌های فروشگاه متصل می‌شود.</small>
          </div>
          <button className="products-page__apply-filter" type="button" onClick={() => setFilterOpen(false)}>اعمال فیلترها</button>
        </aside>

        <section className="products-page__results">
          <div className="products-page__heading">
            <div className="products-page__heading-copy">
              <h2>محصولات چاپ سه‌بعدی</h2>
              <p>محصولات منتخب از فروشندگان و سازندگان بازار</p>
            </div>
            <div className="products-page__count"><strong>{visibleProducts.length.toLocaleString("fa-IR")}</strong> محصول</div>
          </div>
          <div className="products-page__toolbar">
            <label className="products-page__search"><Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجوی محصول، فروشنده..." aria-label="جستجوی محصولات" /></label>
            <button className="products-page__mobile-filter" type="button" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={15} /> فیلترها</button>
            <select className="products-page__sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="مرتب‌سازی محصولات">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <div className="products-page__active-filters" role="group" aria-label="فیلتر سریع دسته‌بندی">
            {categories.map((item) => <button key={item.id} type="button" className={"products-page__filter" + (category === item.id ? " is-active" : "")} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
          </div>
          {visibleProducts.length ? (
            <div className="products-page__grid">
              {visibleProducts.map((product) => {
                const favorite = favorites.includes(product.id);
                return (
                  <article className="products-page__card" key={product.id}>
                    <a className="products-page__media" href={`${ROUTES.products}/${product.id}`} aria-label={`مشاهده ${product.title}`}>
                      <img src={product.image} alt={product.alt} loading="lazy" />
                      {product.featured && <span className="products-page__badge">پیشنهاد Maker</span>}
                    </a>
                    <button type="button" className={"products-page__favorite" + (favorite ? " is-favorite" : "")} onClick={() => toggleFavoriteId(product.id)} aria-label={favorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"} aria-pressed={favorite}><Heart size={15} fill={favorite ? "currentColor" : "none"} aria-hidden="true" /></button>
                    <div className="products-page__body">
                      <span className="products-page__maker">{product.maker}</span>
                      <h3 className="products-page__title"><a href={`${ROUTES.products}/${product.id}`}>{product.title}</a></h3>
                      <div className="products-page__meta"><span className="products-page__rating"><Star size={12} fill="currentColor" aria-hidden="true" /> {product.rating.toLocaleString("fa-IR")} <span>({product.reviews.toLocaleString("fa-IR")})</span></span><span>{product.categoryLabel}</span></div>
                      <div className="products-page__price-row"><span className="products-page__price">{product.priceLabel}<small>تومان</small></span><button className="products-page__add-cart" type="button" aria-label={`افزودن ${product.title} به سبد`} onClick={() => addToCart({ id: product.id, title: product.title, maker: product.maker, price: product.price, image: product.image, alt: product.alt, categoryLabel: product.categoryLabel })}><ShoppingCart size={13} aria-hidden="true" /></button></div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="products-page__empty"><h2>محصولی پیدا نشد</h2><p>جستجو یا فیلتر قیمت را تغییر بده و دوباره امتحان کن.</p><button type="button" onClick={() => { setCategory("all"); setMaxPrice(20000000); setQuery(""); }}>پاک کردن فیلترها</button></div>
          )}
          <nav className="products-page__pagination" aria-label="صفحه‌بندی"><button type="button" disabled>‹</button><button type="button" className="is-active">۱</button><button type="button" onClick={() => setSort("rating")}>۲</button><button type="button" onClick={() => setSort("price-low")}>۳</button><button type="button">›</button></nav>
          <p className="marketplace-catalog__notice">قیمت‌ها، امتیازها و نام فروشندگان داده‌های نمونه‌اند؛ پرداخت واقعی فعال نیست.</p>
        </section>
      </div>
    </main>
  );
}
