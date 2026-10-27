import type { Product } from "../../types/product";
interface ProductCardProps { product: Product; onAddToCart?: (product: Product) => void; }
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return <article className="product-card">
    <a href={`/products/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" /><h3>{product.name}</h3></a>
    <p>{product.maker}</p><strong>{product.price} تومان</strong>
    {onAddToCart && <button type="button" onClick={() => onAddToCart(product)}>افزودن به سبد</button>}
  </article>;
}
