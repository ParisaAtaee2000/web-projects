import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/catalog";
import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { BRAND_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `مدل‌های زمستانه مردانه | ${BRAND_NAME}`,
  description: `مدل‌های کاپشن، کت و پالتو مردانه برای خرید عمده فروشگاه‌ها و بوتیک‌ها؛ هر محصول در جین ۸تایی عرضه می‌شود.`,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `مدل‌های زمستانه مردانه | ${BRAND_NAME}`,
    description: `مدل‌های زمستانه برای خرید عمده؛ شرایط سفارش هر محصول را در صفحه خودش ببینید.`,
    type: "website",
  },
};

type ShopPageProps={searchParams?:Promise<Record<string,string|string[]|undefined>>};
function valueOf(value:string|string[]|undefined){return Array.isArray(value)?value[0]??"":value??""}

export default async function ShopPage({searchParams}:ShopPageProps){
 const params=(await searchParams)??{}; const q=valueOf(params.q).trim().toLocaleLowerCase("fa-IR"); const category=valueOf(params.category); const sort=valueOf(params.sort)||"new";
 let filtered=products.filter(p=>{const query=!q||`${p.name} ${p.code} ${p.categoryLabel}`.toLocaleLowerCase("fa-IR").includes(q); const categoryMatch=!category||p.category===category; return query&&categoryMatch;});
 if(sort==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price); if(sort==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price); if(sort==="moq") filtered=[...filtered].sort((a,b)=>a.moq-b.moq);
 return <main dir="rtl"><Header/><section className="container section"><div className="section-head"><div><div className="section-kicker">SHOP / WHOLESALE</div><h1 className="section-title" style={{fontSize:52}}>مدل‌های زمستانه</h1><p className="muted">مدل‌ها را ببینید، فیلتر کنید و وارد صفحه هر محصول شوید؛ شرایط جین و قیمت هر عدد همان‌جا مشخص است.</p></div></div><div className="shop-toolbar"><div className="filters"><form method="get" className="filters"><input name="q" defaultValue={valueOf(params.q)} placeholder="نام یا کد محصول را جستجو کنید" className="filter-pill" aria-label="جستجو در محصولات"/><select name="sort" defaultValue={sort} className="sort"><option value="new">جدیدترین</option><option value="price-asc">ارزان‌تر</option><option value="price-desc">گران‌تر</option><option value="moq">حداقل سفارش</option></select><button className="btn primary" type="submit">جستجو</button></form><ShopFilters/></div><span className="muted">{filtered.length.toLocaleString("fa-IR")} مدل</span></div>{filtered.length?<ProductGrid products={filtered}/>:<div className="section alt" style={{padding:40,textAlign:"center"}}><h2 className="section-title">مدلی با این مشخصات پیدا نشد</h2><p className="muted">فیلترها یا عبارت جستجو را کمی تغییر دهید.</p><Link className="btn primary" href="/shop">برگردیم به همه مدل‌ها</Link></div>}</section><Footer/><MobileNav/></main>;
}
