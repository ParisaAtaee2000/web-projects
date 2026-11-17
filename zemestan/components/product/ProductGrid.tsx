import type { Product } from "@/types/product-model";
import { ProductCard } from "./ProductCard";

export function ProductGrid({products}:{products:Product[]}){return <div className="products-grid">{products.map((product)=><ProductCard key={product.code} product={product}/>)}</div>}
