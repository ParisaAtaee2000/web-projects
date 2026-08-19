import type { Product } from "@/types/product";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <Link href={`/product/${product.slug}`}>
      <div className="product-image"><span className="product-tag">{product.id === "p-1001" ? "جدید" : "کالکشن"}</span><span className="product-wish">♡</span><div className="product-art" /></div>
      <div className="product-body"><div className="product-meta mono">{product.code} · {product.category}</div><h3>{product.name}</h3><div className="product-row"><div><div className="price-main">{product.wholesalePrice.toLocaleString("fa-IR")} تومان</div><span className="price-note">قیمت عمده / هر عدد</span></div></div><span className="moq">حداقل سفارش {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</span></div>
    </Link>
  </article>;
}
