"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/components/cart/CartProvider";
import { getWholesalePackPrice } from "@/types/product";

const money = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

export default function CartPage() {
  const { items, itemCount, packCount, subtotal, hasInvalidItems, setPackCount, removeItem } = useCart();
  return <>
    <Header />
    <main className="container section">
      <div className="section-head"><div><span className="section-kicker">WHOLESALE ORDER</span><h1 className="section-title">سفارش عمده</h1><p className="muted">{packCount.toLocaleString("fa-IR")} جین · {itemCount.toLocaleString("fa-IR")} عدد در سبد سفارش</p></div><Link className="btn" href="/shop">ادامه انتخاب محصولات</Link></div>
      {items.length === 0 ? <section className="empty-state"><span className="section-kicker">YOUR ORDER IS EMPTY</span><h2 className="serif">سبد سفارش شما خالی است.</h2><p className="muted">هر محصول به‌صورت جین ۸تایی با ترکیب کامل رنگ و سایز عرضه می‌شود.</p><Link className="btn primary" href="/shop">مشاهده محصولات</Link></section> :
      <div className="cart-layout"><section className="cart-list">{items.map((item) => <article className="cart-item" key={item.product.id}><div className="cart-art"><span className="cap">{item.product.code}</span></div><div className="cart-content"><div className="cart-copy"><span className="section-kicker">{item.product.category.toUpperCase()}</span><h2>{item.product.name}</h2><p className="muted">هر جین: ۸ عدد · ترکیب کامل رنگ و سایز · L / XL / 2XL / 3XL</p><p className="muted">قیمت هر جین: {money(getWholesalePackPrice(item.product))}</p><p className="live-total-price"><span>قیمت کل این محصول</span><strong>{money(getWholesalePackPrice(item.product) * item.packCount)}</strong></p></div><div className="cart-controls"><div className="qty-box"><span>تعداد جین</span><div className="qty-controls"><button type="button" onClick={() => setPackCount(item.product.id, item.packCount + 1)}>+</button><strong>{item.packCount.toLocaleString("fa-IR")}</strong><button type="button" disabled={item.packCount <= 1} onClick={() => setPackCount(item.product.id, item.packCount - 1)}>-</button></div></div><span className="cart-warning">{(item.packCount * item.product.wholesalePackSize).toLocaleString("fa-IR")} عدد در این محصول</span><button className="text-button" type="button" onClick={() => removeItem(item.product.id)}>حذف</button></div></div></article>)}</section><aside className="order-summary"><span className="section-kicker">ORDER SUMMARY</span><h2 className="serif">خلاصه سفارش</h2><div className="summary-row"><span>تعداد جین</span><strong>{packCount.toLocaleString("fa-IR")}</strong></div><div className="summary-row"><span>تعداد کل لباس</span><strong>{itemCount.toLocaleString("fa-IR")} عدد</strong></div><div className="summary-row"><span>قیمت کل سفارش</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>ارسال</span><strong>محاسبه در ادامه</strong></div>{hasInvalidItems&&<p className="cart-warning">هر محصول باید حداقل ۱ جین ۸تایی داشته باشد.</p>}<div className="summary-total-price"><span>جمع کل</span><strong>{money(subtotal)}</strong></div><Link className={`btn primary product-cta ${hasInvalidItems?"disabled-link":""}`} aria-disabled={hasInvalidItems} href={hasInvalidItems?"/cart":"/checkout"}>ادامه به اطلاعات سفارش</Link><small className="muted">انتخاب جداگانه رنگ یا سایز در خرید عمده فعال نیست.</small></aside></div>}
    </main><Footer />
  </>;
}
