import Link from "next/link";
import { products } from "@/data/catalog";
import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";

type ShopPageProps={searchParams?:Promise<Record<string,string|string[]|undefined>>};
function valueOf(value:string|string[]|undefined){return Array.isArray(value)?value[0]??"":value??""}

export default async function ShopPage({searchParams}:ShopPageProps){
 const params=(await searchParams)??{}; const q=valueOf(params.q).trim().toLocaleLowerCase("fa-IR"); const category=valueOf(params.category); const stock=valueOf(params.stock); const sort=valueOf(params.sort)||"new";
 let filtered=products.filter(p=>{const query=!q||`${p.name} ${p.code} ${p.categoryLabel}`.toLocaleLowerCase("fa-IR").includes(q); const categoryMatch=!category||p.category===category; return query&&categoryMatch;});
 if(sort==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price); if(sort==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price); if(sort==="moq") filtered=[...filtered].sort((a,b)=>a.moq-b.moq);
 return <main dir="rtl"><Header/><section className="container section"><div className="section-head"><div><div className="section-kicker">SHOP / WHOLESALE</div><h1 className="section-title" style={{fontSize:52}}>محصولات زمستانه</h1><p className="muted">جستجو بر اساس نام یا کد محصول و فیلتر بر اساس دسته و ترتیب قیمت.</p></div></div><div className="shop-toolbar"><div className="filters"><form method="get" className="filters"><input name="q" defaultValue={valueOf(params.q)} placeholder="جستجو نام یا کد محصول" className="filter-pill" aria-label="جستجو در محصولات"/><select name="sort" defaultValue={sort} className="sort"><option value="new">جدیدترین</option><option value="price-asc">قیمت صعودی</option><option value="price-desc">قیمت نزولی</option><option value="moq">MOQ کمتر</option></select><button className="btn primary" type="submit">جستجو</button></form><ShopFilters/></div><span className="muted">{filtered.length.toLocaleString("fa-IR")} محصول</span></div>{filtered.length?<ProductGrid products={filtered}/>:<div className="section alt" style={{padding:40,textAlign:"center"}}><h2 className="section-title">محصولی پیدا نشد</h2><p className="muted">عبارت جستجو یا فیلترها را تغییر دهید.</p><Link className="btn primary" href="/shop">مشاهده همه محصولات</Link></div>}</section><Footer/><MobileNav/></main>;
}
