import { useEffect, useMemo, useState } from "react";
import { Heart, Search, ShoppingCart, SlidersHorizontal, Star } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { addToCart } from "../../lib/demoCart";
import { readFavoriteIds, subscribeToFavorites, toggleFavoriteId } from "../../lib/demoFavorites";
import "./products.css";

type ProductCategory = "printed" | "printer" | "accessory" | "material";
type SortOption = "featured" | "price-low" | "price-high" | "rating";
type Product = {
  id: string; title: string; maker: string; category: ProductCategory; categoryLabel: string;
  price: number; priceLabel: string; rating: number; reviews: number; image: string; alt: string; featured?: boolean;
};
const products: Product[] = [
  { id: "geometric-planter", title: "گلدان هندسی لایه‌ای", maker: "استودیو فرمینو", category: "printed", categoryLabel: "محصول چاپی", price: 420000, priceLabel: "۴۲۰٬۰۰۰", rating: 4.9, reviews: 28, image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "گلدان دکوراتیو ساخته‌شده با چاپ سه‌بعدی", featured: true },
  { id: "core-printer", title: "پرینتر سه‌بعدی Core", maker: "کارگاه نوا", category: "printer", categoryLabel: "پرینتر سه‌بعدی", price: 18900000, priceLabel: "۱۸٬۹۰۰٬۰۰۰", rating: 4.8, reviews: 16, image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "پرینتر سه‌بعدی روی میز کار", featured: true },
  { id: "nozzle-toolkit", title: "کیت نگهداری چاپگر", maker: "تک‌میکر", category: "accessory", categoryLabel: "لوازم جانبی", price: 680000, priceLabel: "۶۸۰٬۰۰۰", rating: 4.7, reviews: 12, image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "ابزار و قطعات فنی", featured: false },
  { id: "matte-purple-pla", title: "فیلامنت PLA بنفش مات", maker: "متریال‌لب", category: "material", categoryLabel: "مواد مصرفی", price: 520000, priceLabel: "۵۲۰٬۰۰۰", rating: 4.9, reviews: 34, image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200", alt: "فیلامنت رنگی", featured: true },
  { id: "desk-organizer", title: "ارگانایزر رومیزی ماژولار", maker: "استودیو فرمینو", category: "printed", categoryLabel: "محصول چاپی", price: 350000, priceLabel: "۳۵۰٬۰۰۰", rating: 4.6, reviews: 9, image: "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "ارگانایزر رومیزی" },
  { id: "precision-nozzle", title: "نازل دقیق ۰٫۴ میلی‌متری", maker: "تک‌میکر", category: "accessory", categoryLabel: "لوازم جانبی", price: 190000, priceLabel: "۱۹۰٬۰۰۰", rating: 4.8, reviews: 21, image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "قطعات فنی" },
  { id: "pla-starter-pack", title: "بسته شروع فیلامنت PLA", maker: "متریال‌لب", category: "material", categoryLabel: "مواد مصرفی", price: 790000, priceLabel: "۷۹۰٬۰۰۰", rating: 4.7, reviews: 18, image: "https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "مواد چاپ سه‌بعدی" },
  { id: "mini-planter", title: "گلدان مینیمال مینی", maker: "میکر روم", category: "printed", categoryLabel: "محصول چاپی", price: 240000, priceLabel: "۲۴۰٬۰۰۰", rating: 4.5, reviews: 7, image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "گلدان کوچک" },
];
const categories: { id: "all" | ProductCategory; label: string; href?: string }[] = [
  { id: "all", label: "همه محصولات" }, { id: "printed", label: "محصولات چاپی" },
  { id: "printer", label: "پرینترها", href: ROUTES.printers }, { id: "accessory", label: "لوازم جانبی", href: ROUTES.accessories },
  { id: "material", label: "مواد مصرفی", href: ROUTES.materials },
];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "مرتب‌سازی: پیشنهاد Makerā" }, { value: "price-low", label: "ارزان‌ترین" },
  { value: "price-high", label: "گران‌ترین" }, { value: "rating", label: "بالاترین امتیاز" },
];
export function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteIds());
  useEffect(() => subscribeToFavorites(() => setFavorites(readFavoriteIds())), []);
  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fa");
    const filtered = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const searchableText = `${product.title} ${product.maker} ${product.categoryLabel}`.toLocaleLowerCase("fa");
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [query, category, sort]);
  return (
    <main className="page products-page" dir="rtl">
      <div className="products-page__topline"><SlidersHorizontal size={15} aria-hidden="true" /> بازار سازندگان</div>
      <header className="products-page__heading"><div className="products-page__heading-copy"><h1>چیزهای خاص برای ساختن</h1><p>محصولات چاپ سه‌بعدی، پرینترها، لوازم جانبی و مواد مصرفی را از سازندگان مستقل پیدا کن.</p></div><div className="products-page__count"><strong>{visibleProducts.length.toLocaleString("fa-IR")}</strong> محصول نمایشی</div></header>
      <div className="products-page__toolbar"><label className="products-page__search"><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی محصول، سازنده یا دسته‌بندی..." aria-label="جست‌وجوی محصولات" /></label><select className="products-page__sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="مرتب‌سازی محصولات">{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      <div className="products-page__filters" role="group" aria-label="فیلتر دسته‌بندی محصولات">{categories.map((item) => {
        const active = category === item.id;
        return item.href ? <a className={`products-page__filter${active ? " is-active" : ""}`} href={item.href} key={item.id}>{item.label}</a> : <button key={item.id} type="button" className={`products-page__filter${active ? " is-active" : ""}`} aria-pressed={active} onClick={() => setCategory(item.id)}>{item.label}</button>;
      })}</div>
      {visibleProducts.length ? <div className="products-page__grid">{visibleProducts.map((product) => {
        const favorite = favorites.includes(product.id);
        return <article className="products-page__card" key={product.id}>
          <a className="products-page__media" href={`${ROUTES.products}/${product.id}`} aria-label={`مشاهده ${product.title}`}><img src={product.image} alt={product.alt} loading="lazy" /><span className="products-page__category">{product.categoryLabel}</span></a>
          <button type="button" className={`products-page__favorite${favorite ? " is-favorite" : ""}`} onClick={() => toggleFavoriteId(product.id)} aria-label={favorite ? `حذف ${product.title} از علاقه‌مندی‌ها` : `افزودن ${product.title} به علاقه‌مندی‌ها`} aria-pressed={favorite}><Heart size={16} fill={favorite ? "currentColor" : "none"} aria-hidden="true" /></button>
          <div className="products-page__body"><span className="products-page__maker">{product.maker}</span><h2 className="products-page__title"><a href={`${ROUTES.products}/${product.id}`}>{product.title}</a></h2>
            <div className="products-page__meta"><span className="products-page__rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {product.rating.toLocaleString("fa-IR")} <span>({product.reviews.toLocaleString("fa-IR")} نظر نمونه)</span></span><span>موجودی نمایشی</span></div>
            <div className="products-page__price-row"><span className="products-page__price">{product.priceLabel}<span className="products-page__currency">تومان</span></span><button className="products-page__add-cart" type="button" onClick={() => addToCart({ id: product.id, title: product.title, maker: product.maker, price: product.price, image: product.image, alt: product.alt, categoryLabel: product.categoryLabel })}><ShoppingCart size={14} aria-hidden="true" /> افزودن به سبد</button></div>
          </div>
        </article>;
      })}</div> : <div className="products-page__empty"><h2>محصولی پیدا نشد</h2><p>عبارت جست‌وجو یا دسته‌بندی را تغییر بده و دوباره امتحان کن.</p></div>}
      <p className="marketplace-catalog__notice">قیمت‌ها و امتیازها داده‌های نمونه‌اند؛ خرید واقعی یا پرداخت آنلاین فعال نیست.</p>
    </main>
  );
}
