import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { marketplaceProducts, type ProductCategory } from "../../data/marketplace";
import { MarketplaceProductCard } from "./MarketplaceProductCard";
import { ROUTES } from "../../app/router/routeNames";
import "./marketplace-pages.css";

type CatalogKind = ProductCategory | "all";
type SortMode = "featured" | "price-low" | "price-high" | "rating";

const categoryLinks = [
  { id: "all", label: "همه محصولات", href: ROUTES.products },
  { id: "printed", label: "محصولات چاپی", href: ROUTES.products },
  { id: "printer", label: "پرینترها", href: ROUTES.printers },
  { id: "accessory", label: "لوازم جانبی", href: ROUTES.accessories },
  { id: "material", label: "مواد مصرفی", href: ROUTES.materials },
] as const;

export function CategoryCatalogPage({
  kind,
  title,
  description,
}: {
  kind: CatalogKind;
  title: string;
  description: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("featured");
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fa");
    return marketplaceProducts
      .filter((product) => kind === "all" || product.category === kind)
      .filter((product) => !normalized || `${product.title} ${product.maker} ${product.categoryLabel}`.toLocaleLowerCase("fa").includes(normalized))
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return b.rating - a.rating;
      });
  }, [kind, query, sort]);

  return (
    <div className="page marketplace-catalog" dir="rtl">
      <div className="marketplace-catalog__eyebrow"><SlidersHorizontal size={15} aria-hidden="true" /> بازار سازندگان</div>
      <header className="marketplace-catalog__heading">
        <div><h1>{title}</h1><p>{description}</p></div>
        <div className="marketplace-catalog__count"><strong>{visibleProducts.length.toLocaleString("fa-IR")}</strong><span>نتیجهٔ نمایشی</span></div>
      </header>
      <nav className="marketplace-catalog__filters" aria-label="دسته‌بندی محصولات">
        {categoryLinks.map((item) => {
          const active = (kind === "all" && item.id === "all") || item.id === kind;
          return <a key={item.id} className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</a>;
        })}
      </nav>
      <div className="marketplace-catalog__toolbar">
        <label className="marketplace-catalog__search"><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی محصول یا سازنده..." aria-label="جست‌وجو" /></label>
        <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} aria-label="مرتب‌سازی">
          <option value="featured">پیشنهاد Makerā</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option><option value="rating">بالاترین امتیاز</option>
        </select>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="market-product-grid">{visibleProducts.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="marketplace-catalog__empty"><h2>نتیجه‌ای پیدا نشد</h2><p>عبارت جست‌وجو را تغییر بده و دوباره امتحان کن.</p><button type="button" onClick={() => setQuery("")}>پاک کردن جست‌وجو</button></div>
      )}
      <p className="marketplace-catalog__notice">این کاتالوگ فرانت‌اند آزمایشی است؛ قیمت و موجودی نمونه‌اند و خرید واقعی یا پرداخت آنلاین فعال نیست.</p>
    </div>
  );
}
