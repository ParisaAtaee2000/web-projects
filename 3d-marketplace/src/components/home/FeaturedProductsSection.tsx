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
    image: "https://images.pexels.com/photos/24859620/pexels-photo-24859620.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "مدل سه‌بعدی تزئینی",
    rating: "۴٫۸",
    reviews: "۹۶",
  },
  {
    id: "ender-3-v3-se",
    title: "پرینتر FDM - Ender 3 V3",
    maker: "Creality Official",
    categoryLabel: "تجهیزات چاپ سه‌بعدی",
    price: "۱۹٬۹۰۰٬۰۰۰",
    image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "چاپگر سه‌بعدی",
    rating: "۴٫۸",
    reviews: "۲۱۰",
  },
  {
    id: "pla-filament",
    title: "فیلامنت PLA (رنگی)",
    maker: "Print Lab",
    categoryLabel: "مواد مصرفی",
    price: "۱٬۲۹۰٬۰۰۰",
    image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200",
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
    image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "قطعه و ابزار چاپ سه‌بعدی",
    rating: "۴٫۷",
    reviews: "۷۲",
  },
  {
    id: "articulated-dragon",
    title: "اژدهای مفصلی",
    maker: "Artemis3D",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۳٬۲۵۰٬۰۰۰",
    image: "https://images.pexels.com/photos/30658380/pexels-photo-30658380.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "مدل تزئینی سه‌بعدی",
    rating: "۴٫۹",
    reviews: "۹۸",
  },
  {
    id: "modern-lamp",
    title: "آباژور مدرن",
    maker: "PixelCraft",
    categoryLabel: "محصول چاپ سه‌بعدی",
    price: "۱٬۸۹۰٬۰۰۰",
    image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "محصول دکوراتیو ساخته‌شده با چاپ سه‌بعدی",
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
                aria-label={"مشاهده " + product.title}
              >
                <img src={product.image} alt={product.alt} loading="lazy" />
              </a>
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
