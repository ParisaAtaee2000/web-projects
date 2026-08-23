"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/components/cart/CartProvider";

const money = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

export default function CartPage() {
  const { items, itemCount, packCount, subtotal, hasInvalidItems, setPackCount, removeItem } = useCart();
  return <>
    <Header />
    <main className="container section">
      <div className="section-head"><div><span className="section-kicker">YOUR ORDER</span><h1 className="section-title">سفارش شما</h1><p className="muted">{packCount.toLocaleString("fa-IR")} جین · {itemCount.toLocaleString("fa-IR")} عدد</p></div><Link className="btn" href="/shop">برگردیم به مدل‌ها</Link></div>
      {items.length === 0 ? <section className="empty-state"><span className="section-kicker">EMPTY ORDER</span><h2 className="serif">هنوز چیزی انتخاب نکرده‌اید.</h2><p className="muted">مدل‌ها را ببینید و هر محصول را به تعداد جین موردنیازتان به سفارش اضافه کنید.</p><Link className="btn primary" href="/shop">دیدن مدل‌ها</Link></section> :
      <div className="cart-layout"><section className="cart-list">{items.map((item) => <article className="cart-item" key={item.product.id}><div className="cart-art"><span className="cap">{item.product.code}</span></div><div className="cart-content"><div className="cart-copy"><span className="section-kicker">{item.product.category.toUpperCase()}</span><h2>{item.product.name}</h2><p className="muted">هر جین ۸ عدد با ترکیب کامل رنگ و سایز · L / XL / 2XL / 3XL</p><p className="muted">قیمت هر کاپشن: {money(item.product.wholesalePrice)}</p><p className="live-total-price"><span>جمع این مدل</span><strong>{money(item.product.wholesalePrice * item.packCount * item.product.wholesalePackSize)}</strong></p></div><div className="cart-controls"><div className="qty-box"><span>تعداد جین</span><div className="qty-controls"><button type="button" onClick={() => setPackCount(item.product.id, item.packCount + 1)}>+</button><strong>{item.packCount.toLocaleString("fa-IR")}</strong><button type="button" disabled={item.packCount <= 1} onClick={() => setPackCount(item.product.id, item.packCount - 1)}>-</button></div></div><span className="cart-warning">{(item.packCount * item.product.wholesalePackSize).toLocaleString("fa-IR")} عدد</span><button className="text-button" type="button" onClick={() => removeItem(item.product.id)}>حذف</button></div></div></article>)}</section><aside className="order-summary"><span className="section-kicker">ORDER SUMMARY</span><h2 className="serif">خلاصه سفارش</h2><div className="summary-row"><span>تعداد جین</span><strong>{packCount.toLocaleString("fa-IR")}</strong></div><div className="summary-row"><span>تعداد کل کاپشن</span><strong>{itemCount.toLocaleString("fa-IR")} عدد</strong></div><div className="summary-row"><span>ارسال</span><strong>محاسبه در ادامه</strong></div>{hasInvalidItems&&<p className="cart-warning">هر محصول حداقل با ۱ جین قابل سفارش است.</p>}<div className="summary-total-price"><span>جمع کل سفارش</span><strong>{money(subtotal)}</strong></div><Link className={`btn primary product-cta ${hasInvalidItems?"disabled-link":""}`} aria-disabled={hasInvalidItems} href={hasInvalidItems?"/cart":"/checkout"}>ادامه سفارش</Link><small className="muted">رنگ و سایز داخل جین از قبل مشخص شده و جداگانه انتخاب نمی‌شود.</small></aside></div>}
    </main><Footer />
  </>;
}
