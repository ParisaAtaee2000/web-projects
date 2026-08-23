import { products } from "@/data/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
export function FeaturedProducts(){return <section className="container section"><SectionHeader kicker="JUST IN / WHOLESALE" title="مدل‌هایی که ارزش دیدن دارند" href="/shop" link="دیدن همه مدل‌ها →"/><ProductGrid products={products.slice(0,4)}/></section>}