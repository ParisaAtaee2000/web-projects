import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import type { MarketplaceProduct } from "../../data/marketplace";
import { formatToman } from "../../data/marketplace";
import { addToCart } from "../../lib/demoCart";

export function MarketplaceProductCard({ product }: { product: MarketplaceProduct }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
  }

  return (
    <article className="market-product-card">
      <a className="market-product-card__media" href={`/products/${product.id}`} aria-label={`مشاهده ${product.title}`}>
        <img src={product.image} alt={product.alt} loading="lazy" />
        <span className="market-product-card__category">{product.categoryLabel}</span>
        <span className="market-product-card__rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {product.rating.toLocaleString("fa-IR")}</span>
      </a>
      <div className="market-product-card__body">
        <a className="market-product-card__maker" href={`/makers/${product.makerId}`}>{product.maker}</a>
        <h2><a href={`/products/${product.id}`}>{product.title}</a></h2>
        <p>{product.description}</p>
        <div className="market-product-card__bottom">
          <div className="market-product-card__price"><strong>{formatToman(product.price)}</strong><small>تومان</small></div>
          <button type="button" className={`market-product-card__add${added ? " is-added" : ""}`} onClick={handleAdd} aria-label={`افزودن ${product.title} به سبد خرید`}>
            <ShoppingCart size={15} aria-hidden="true" /> {added ? "افزوده شد" : "افزودن"} <ArrowLeft size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
