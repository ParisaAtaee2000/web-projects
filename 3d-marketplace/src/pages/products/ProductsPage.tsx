import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Heart, Search, ShoppingCart, SlidersHorizontal, Star, X } from "lucide-react";
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

const PAGE_SIZE = 6;
const MAX_PRICE = 20000000;

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
const makers = Array.from(new Set(products.map((product) => product.maker)));

export function ProductsPage() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("q") ?? "");
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteIds());

  useEffect(() => subscribeToFavorites(() => setFavorites(readFavoriteIds())), []);
  useEffect(() => setPage(1), [query, category, sort, maxPrice, selectedMakers]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fa");
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const searchableText = `${product.title} ${product.maker} ${product.categoryLabel}`.toLocaleLowerCase("fa");
      const matchesMaker = selectedMakers.length === 0 || selectedMakers.includes(product.maker);
      return matchesCategory && matchesMaker && product.price <= maxPrice &&
        (!normalizedQuery || searchableText.includes(normalizedQuery));
    }).sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [query, category, sort, maxPrice, selectedMakers]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageProducts = visibleProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasActiveFilters = Boolean(query.trim()) || category !== "all" || maxPrice !== MAX_PRICE || selectedMakers.length > 0;

  function clearFilters() {
    setCategory("all");
    setMaxPrice(MAX_PRICE);
    setQuery("");
    setSelectedMakers([]);
    setPage(1);
  }

  function toggleMaker(maker: string) {
    setSelectedMakers((current) => current.includes(maker)
      ? current.filter((item) => item !== maker)
      : [...current, maker]);
  }

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
            <button type="button" onClick={clearFilters}><X size={13} aria-hidden="true" /> پاک کردن</button>
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
            <input className="products-page__range" aria-label="حداکثر قیمت" type="range" min="100000" max={MAX_PRICE} step="100000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
            <div className="products-page__range-limits"><span>۱۰۰ هزار</span><span>۲۰ میلیون</span></div>
          </fieldset>
          <fieldset className="products-page__filter-group">
            <legend>سازنده</legend>
            {makers.map((maker) => (
              <label className="products-page__check" key={maker}>
                <span>{maker}</span>
                <input type="checkbox" checked={selectedMakers.includes(maker)} onChange={() => toggleMaker(maker)} />
                <i aria-hidden="true"><Check size={11} /></i>
              </label>
            ))}
          </fieldset>
          <button className="products-page__apply-filter" type="button" onClick={() => setFilterOpen(false)}>نمایش {visibleProducts.length.toLocaleString("fa-IR")} محصول</button>
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
            <button className="products-page__mobile-filter" type="button" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={15} aria-hidden="true" /> فیلترها</button>
            <select className="products-page__sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="مرتب‌سازی محصولات">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <div className="products-page__active-filters" role="group" aria-label="فیلتر سریع دسته‌بندی">
            {categories.map((item) => <button key={item.id} type="button" className={"products-page__filter" + (category === item.id ? " is-active" : "")} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
          </div>
          {hasActiveFilters && <div className="products-page__filter-summary">
            <span>{visibleProducts.length.toLocaleString("fa-IR")} نتیجه</span>
            <button type="button" onClick={clearFilters}>حذف همه فیلترها <X size={12} aria-hidden="true" /></button>
          </div>}
          {visibleProducts.length ? (
            <>
              <div className="products-page__grid">
                {pageProducts.map((product) => {
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
              {pageCount > 1 && <nav className="products-page__pagination" aria-label="صفحه‌بندی محصولات">
                <button type="button" aria-label="صفحه قبل" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronRight size={14} aria-hidden="true" /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" className={currentPage === pageNumber ? "is-active" : ""} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber.toLocaleString("fa-IR")}</button>)}
                <button type="button" aria-label="صفحه بعد" disabled={currentPage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronLeft size={14} aria-hidden="true" /></button>
              </nav>}
            </>
          ) : (
            <div className="products-page__empty"><h2>محصولی پیدا نشد</h2><p>جستجو، سازنده یا فیلتر قیمت را تغییر بده و دوباره امتحان کن.</p><button type="button" onClick={clearFilters}>پاک کردن فیلترها</button></div>
          )}
          <p className="marketplace-catalog__notice">قیمت‌ها، امتیازها و نام فروشندگان داده‌های نمونه‌اند؛ پرداخت واقعی فعال نیست.</p>
        </section>
      </div>
    </main>
  );
}
