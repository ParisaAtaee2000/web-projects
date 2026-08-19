"use client";
import Link from "next/link";
import { products } from "@/data/products";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
export default function WishlistPage(){const {ids,toggle}=useWishlist();const saved=products.filter(product=>ids.includes(product.id));return <><Header/><main dir="rtl"><section className="container section"><div className="section-head"><div><div className="section-kicker">WISHLIST / SAVED</div><h1 className="section-title">علاقه‌مندی‌ها</h1><p className="muted">محصولاتی که برای سفارش بعدی ذخیره کرده‌اید.</p></div></div>{saved.length===0?<div className="empty-state"><h2>هنوز محصولی ذخیره نکرده‌اید</h2><p className="muted">از روی محصولات روی قلب بزنید تا اینجا ذخیره شوند.</p><Link className="btn primary" href="/shop">مشاهده محصولات</Link></div>:<div className="products-grid">{saved.map(product=><article className="product-card" key={product.id}><Link href={`/product/${product.slug}`}><div className="product-image"><span className="product-tag">ذخیره‌شده</span><div className="product-art"/></div><div className="product-body"><div className="product-meta mono">{product.code}</div><h3>{product.name}</h3><div className="price-main">{product.wholesalePrice.toLocaleString("fa-IR")} تومان</div><span className="moq">حداقل سفارش ۸ عدد</span></div></Link><button className="btn" style={{width:"100%",marginTop:8}} onClick={()=>toggle(product)}>حذف از علاقه‌مندی</button></article>)}</div>}</section></main><Footer/></>;
}
