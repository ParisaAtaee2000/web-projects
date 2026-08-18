"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { products } from "@/data/products";
import type { ProductColor, ProductSize } from "@/types/product";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const [color, setColor] = useState<ProductColor>(product.colors[0]);
  const [size, setSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(product.minWholesaleQuantity);
  const { addItem } = useCart();

  const increment = () => setQuantity((value) => Math.min(value + product.quantityStep, product.stock));
  const decrement = () => setQuantity((value) => Math.max(product.minWholesaleQuantity, value - product.quantityStep));

  return (
    <main dir="rtl">
      <div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>MOQ از {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</span><span>ارسال سراسر کشور</span></div></div>
      <header className="site-header"><div className="container nav"><Link href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></Link><nav className="navlinks"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/#wholesale">عمده‌فروشی</Link></nav><div className="nav-actions"><Link className="icon-btn" href="/shop">⌕</Link><Link className="btn" href="/shop">بازگشت</Link></div></div></header>
      <section className="container product-layout">
        <div><div className="gallery-main"><div className="gallery-product" /></div><div className="gallery-thumbs"><div className="thumb">01</div><div className="thumb">02</div><div className="thumb">03</div><div className="thumb">04</div></div></div>
        <div className="product-info"><div className="kicker mono">PRODUCT / {product.code}</div><h1>{product.name}</h1><p className="product-copy">فرم شهری و کاربردی برای کالکشن زمستانه فروشگاه‌های مردانه؛ طراحی شده برای خرید عمده با اطلاعات سفارش شفاف.</p><div className="price-box"><div className="wholesale-price">{product.wholesalePrice.toLocaleString("fa-IR")} تومان</div><small>قیمت عمده / هر عدد · حداقل سفارش {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</small></div>
          <div className="variant-group"><div className="variant-label">رنگ: {color}</div><div className="swatches">{product.colors.map((item, index) => <button key={item} type="button" aria-label={item} className="swatch" style={{background:["#20221e","#4b4940","#5a4632","#58604a"][index%4], outline:item===color?"2px solid #8a4a2b":"none", outlineOffset:"3px"}} onClick={() => setColor(item)} />)}</div></div>
          <div className="variant-group"><div className="variant-label">سایز: {size}</div><div className="sizes">{product.sizes.map((item) => <button key={item} type="button" className={`size ${item===size?"active":""}`} onClick={() => setSize(item)}>{item}</button>)}</div></div>
          <div className="qty-box"><div><strong>تعداد سفارش</strong><div className="variant-label">حداقل {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</div></div><div className="qty-controls"><button type="button" onClick={decrement}>-</button><strong>{quantity.toLocaleString("fa-IR")}</strong><button type="button" onClick={increment}>+</button></div></div>
          <button className="btn primary product-cta" type="button" onClick={() => addItem(product, color, size, quantity)}>افزودن {quantity.toLocaleString("fa-IR")} عدد به سفارش عمده</button>
          <Link className="btn product-cta" href="#details">راهنمای سایز و مشخصات</Link>
          <Link className="btn pine product-cta" href="/cart">مشاهده سفارش</Link>
        </div>
      </section>
      <section id="details" className="container section"><div className="section-head"><div><div className="section-kicker">PRODUCT DETAILS</div><h2 className="section-title">مشخصات محصول</h2></div></div><div className="detail-grid"><div className="detail-cell"><strong>کد محصول</strong><span>{product.code}</span></div><div className="detail-cell"><strong>حداقل سفارش</strong><span>{product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</span></div><div className="detail-cell"><strong>جنس</strong><span>{product.material}</span></div><div className="detail-cell"><strong>فیت</strong><span>{product.fit}</span></div><div className="detail-cell"><strong>فصل</strong><span>{product.season}</span></div><div className="detail-cell"><strong>وضعیت</strong><span>{product.stock.toLocaleString("fa-IR")} عدد موجود</span></div></div></section>
      <footer className="section" style={{background:"#15150f",color:"#eeece4",paddingBottom:40}}><div className="container"><div className="brand">زمستان</div><p style={{color:"#aaa697"}}>پوشاک مردانه زمستانه / فروش عمده</p></div></footer>
      <nav className="mobile-nav"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/cart">سفارش</Link></nav>
    </main>
  );
}
