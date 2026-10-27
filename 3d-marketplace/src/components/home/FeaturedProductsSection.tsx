import { useMemo, useState } from "react";
import { Heart, Star } from "lucide-react";

type ProductFilter = "all" | "printed" | "printer" | "accessory" | "material";

type DemoProduct = {
  id: string;
  title: string;
  maker: string;
  category: Exclude<ProductFilter, "all">;
  categoryLabel: string;
  price: string;
  image: string;
  imageAlt: string;
  rating: string;
  badge?: string;
};

const products: DemoProduct[] = [
  {
    id: "geometric-planter",
    title: "گلدان هندسی لایه‌ای",
    maker: "استودیو فرمینو",
    category: "printed",
    categoryLabel: "محصول چاپی",
    price: "۴۲۰٬۰۰۰",
    image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "نمونه‌ای از قطعه ساخته‌شده با چاپگر سه‌بعدی",
    rating: "۴٫۹",
    badge: "انتخاب سردبیر",
  },
  {
    id: "core-printer",
    title: "پرینتر سه‌بعدی Core",
    maker: "کارگاه نوا",
    category: "printer",
    categoryLabel: "پرینتر سه‌بعدی",
    price: "۱۸٬۹۰۰٬۰۰۰",
    image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "پرینتر سه‌بعدی در فضای کار",
    rating: "۴٫۸",
    badge: "تجهیزات",
  },
  {
    id: "nozzle-toolkit",
    title: "کیت ابزار نگهداری چاپگر",
    maker: "تک‌میکر",
    category: "accessory",
    categoryLabel: "لوازم جانبی",
    price: "۶۸۰٬۰۰۰",
    image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "جزئیات قطعات و ابزار فنی",
    rating: "۴٫۷",
  },
  {
    id: "matte-purple-pla",
    title: "فیلامنت PLA بنفش مات",
    maker: "متریال‌لب",
    category: "material",
    categoryLabel: "مواد مصرفی",
    price: "۵۲۰٬۰۰۰",
    image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200",
    imageAlt: "قرقره‌های فیلامنت و تجهیزات چاپ سه‌بعدی",
    rating: "۴٫۹",
    badge: "پرطرفدار",
  },
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
  const [favorites, setFavorites] = useState<string[]>([]);

  const visibleProducts = useMemo(
    () => activeFilter === "all" ? products : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  function toggleFavorite(productId: string) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  return (
    <section className="home-section featured-products" id="products" dir="rtl" aria-labelledby="featured-products-title">
      <div className="home-section__header">
        <div>
          <span className="home-eyebrow">انتخاب‌های Makerā</span>
          <h2 className="home-section__title" id="featured-products-title">
            چیزهای خاص، <span>ساخته‌شده برای ساختن</span>
          </h2>
          <p className="home-section__lead">چند نمونه برای نمایش تجربهٔ خرید محصولات، ابزارها و مواد چاپ سه‌بعدی.</p>
        </div>
        <span className="home-demo-note">داده‌های نمونه</span>
      </div>

      <div className="home-filter-row" role="group" aria-label="فیلتر محصولات نمونه">
        {filters.map((filter) => (
          <button
            className={`home-filter-chip${activeFilter === filter.id ? " is-active" : ""}`}
            type="button"
            key={filter.id}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="home-product-grid">
        {visibleProducts.map((product, index) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <article className="home-product-card" key={product.id}>
              <div className="home-product-card__media">
                <img src={product.image} alt={product.imageAlt} loading="lazy" />
                <span className="home-product-card__category">{product.categoryLabel}</span>
                {product.badge && <span className="home-product-card__badge">{product.badge}</span>}
                <button
                  className={`home-product-card__favorite${isFavorite ? " is-favorite" : ""}`}
                  type="button"
                  aria-label={isFavorite ? `حذف ${product.title} از علاقه‌مندی‌ها` : `افزودن ${product.title} به علاقه‌مندی‌ها`}
                  aria-pressed={isFavorite}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={17} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
                </button>
                <span className="home-product-card__index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="home-product-card__body">
                <span className="home-product-card__maker">{product.maker}</span>
                <h3>{product.title}</h3>
                <div className="home-product-card__rating">
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  <span>{product.rating}</span>
                  <span className="home-product-card__rating-label">امتیاز نمونه</span>
                </div>
                <div className="home-product-card__footer">
                  <div>
                    <strong>{product.price}</strong>
                    <small>تومان</small>
                  </div>
                  <span className="home-product-card__dot" aria-hidden="true" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="home-section__footnote">قیمت‌ها، امتیازها و نام فروشندگان صرفاً محتوای نمایشی‌اند و هنوز به دادهٔ واقعی متصل نیستند.</p>
    </section>
  );
}
