import { useEffect, useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { addToCart, parseLocalizedPrice } from "../../lib/demoCart";
import { readFavoriteIds, subscribeToFavorites, toggleFavoriteId } from "../../lib/demoFavorites";
import { ROUTES } from "../../app/router/routeNames";

const products = [
  {
    id: "astronaut-figure",
    title: "فیگور فضانورد",
    maker: "Maker Studio",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۱٬۴۸۰٬۰۰۰",
    image: "/images/maker-category-printed.webp",
    imagePosition: "0% 0%",
    alt: "مدل سه‌بعدی فضانورد",
    rating: "۴٫۸",
    reviews: "۹۶",
  },
  {
    id: "ender-3-v3-se",
    title: "پرینتر FDM - Ender 3 V3",
    maker: "Creality Official",
    categoryLabel: "تجهیزات چاپ سه‌بعدی",
    price: "۱۹٬۹۰۰٬۰۰۰",
    image: "/images/maker-category-equipment.webp",
    imagePosition: "50% 0%",
    alt: "پرینتر سه‌بعدی رومیزی",
    rating: "۴٫۸",
    reviews: "۲۱۰",
  },
  {
    id: "pla-filament",
    title: "فیلامنت PLA (رنگی)",
    maker: "Print Lab",
    categoryLabel: "مواد مصرفی",
    price: "۱٬۲۹۰٬۰۰۰",
    image: "/images/maker-category-equipment.webp",
    imagePosition: "100% 0%",
    alt: "قرقره‌های فیلامنت رنگی",
    rating: "۴٫۹",
    reviews: "۱۵۶",
  },
  {
    id: "phone-tablet-stand",
    title: "پایه موبایل و تبلت",
    maker: "Maker Studio",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۵۸۰٬۰۰۰",
    image: "/images/maker-category-custom.webp",
    imagePosition: "0% 100%",
    alt: "پایه رومیزی موبایل چاپ سه‌بعدی",
    rating: "۴٫۷",
    reviews: "۷۲",
  },
  {
    id: "articulated-dragon",
    title: "اژدهای مفصلی",
    maker: "Artemis3D",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۳٬۲۵۰٬۰۰۰",
    image: "/images/maker-category-files.webp",
    imagePosition: "50% 100%",
    alt: "مدل اژدهای مفصلی سه‌بعدی",
    rating: "۴٫۹",
    reviews: "۹۸",
  },
  {
    id: "modern-lamp",
    title: "آباژور مدرن",
    maker: "PixelCraft",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۱٬۸۹۰٬۰۰۰",
    image: "/images/maker-category-printed.webp",
    imagePosition: "100% 100%",
    alt: "آباژور دکوراتیو چاپ سه‌بعدی",
    rating: "۴٫۸",
    reviews: "۱۲۴",
  },
];

export function FeaturedProductsSection() {
  const [favorites, setFavorites] = useState<string[]>(() => readFavoriteIds());
  useEffect(() => subscribeToFavorites(() => setFavorites(readFavoriteIds())), []);

  function toggleFavorite(productId: string) {
    toggleFavoriteId(productId);
  }

  return (
    <section
      className="home-section featured-products"
      id="products"
      dir="rtl"
      aria-labelledby="featured-products-title"
    >
      <div className="home-section__header">
        <div>
          <h2 className="home-section__title" id="featured-products-title">
            محصولات ویژه <span aria-hidden="true">🔥</span>
          </h2>
        </div>
        <a className="home-text-link" href={ROUTES.products}>
          مشاهده همه <ArrowLeft size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="home-product-grid">
        {products.map((product) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <article className="home-product-card" key={product.id}>
              <a
                className="home-product-card__media"
                href={ROUTES.products + "/" + product.id}
                aria-label={"مشاهده " + product.title + "؛ " + product.alt}
                style={{
                  backgroundImage: "url('/images/maker-products-sprite.webp')",
                  backgroundSize: "300% 200%",
                  backgroundPosition: product.imagePosition,
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#071326",
                }}
              />
              <button
                className={"home-product-card__favorite" + (isFavorite ? " is-favorite" : "")}
                type="button"
                aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                aria-pressed={isFavorite}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart size={15} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
              </button>
              <div className="home-product-card__body">
                <h3><a href={ROUTES.products + "/" + product.id}>{product.title}</a></h3>
                <div className="home-product-card__rating">
                  <Star size={11} fill="currentColor" aria-hidden="true" />
                  <span>{product.rating}</span>
                  <span className="home-product-card__rating-label">({product.reviews})</span>
                </div>
                <div className="home-product-card__footer">
                  <div><strong>{product.price}</strong><small>تومان</small></div>
                  <button
                    className="home-product-card__add"
                    type="button"
                    aria-label={"افزودن " + product.title + " به سبد خرید"}
                    onClick={() => addToCart({
                      id: product.id,
                      title: product.title,
                      maker: product.maker,
                      price: parseLocalizedPrice(product.price),
                      image: product.image,
                      alt: product.alt,
                      categoryLabel: product.categoryLabel,
                    })}
                  >
                    <ShoppingCart size={13} aria-hidden="true" />
                    <span>افزودن به سبد</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
