import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
export function FeaturedProducts(){return <section className="container section"><SectionHeader kicker="NEW IN / WHOLESALE" title="محصولات منتخب" href="/shop" link="فروشگاه کامل →"/><ProductGrid products={products.slice(0,4)}/></section>}
