"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getWholesalePackPrice } from "@/types/product";

const money = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

export default function CheckoutPage() {
  const { items, itemCount, packCount, subtotal, hasInvalidItems } = useCart();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasInvalidItems || items.length === 0) return;
    window.alert("این مرحله نمایشی است؛ سفارش نهایی پس از اتصال Backend ثبت خواهد شد.");
  }

  if (items.length === 0) {
    return <main className="container section"><span className="section-kicker">CHECKOUT</span><h1 className="section-title">سفارش شما آماده ثبت نیست</h1><p className="muted">ابتدا حداقل یک جین ۸تایی از محصولات انتخاب کنید.</p><Link className="btn primary" href="/shop">بازگشت به محصولات</Link></main>;
  }

  return <main className="container section">
    <div className="section-head"><div><span className="section-kicker">WHOLESALE CHECKOUT</span><h1 className="section-title">تکمیل اطلاعات سفارش</h1><p className="muted">{packCount.toLocaleString("fa-IR")} جین · {itemCount.toLocaleString("fa-IR")} عدد · {money(subtotal)}</p></div></div>
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section"><span className="section-kicker">BUYER</span><h2 className="serif">اطلاعات خریدار</h2><div className="form-grid"><label>نام و نام خانوادگی<input required name="name" /></label><label>نام فروشگاه<input required name="store" /></label><label>شماره تماس<input required name="phone" inputMode="tel" /></label><label>استان<input required name="province" /></label><label>شهر<input required name="city" /></label><label>کد پستی<input required name="postalCode" inputMode="numeric" /></label></div></div>
        <div className="form-section"><span className="section-kicker">DELIVERY</span><h2 className="serif">آدرس ارسال</h2><label>آدرس کامل<textarea required name="address" rows={4} /></label><label>توضیحات سفارش<textarea name="notes" rows={4} placeholder="توضیحات مربوط به ارسال" /></label></div>
        <div className="form-section"><span className="section-kicker">WHOLESALE PACK</span><h2 className="serif">ترکیب جین‌ها</h2><p className="muted">هر جین دقیقاً ۸ عدد است و ترکیب کامل رنگ و سایز از قبل توسط تولیدکننده تعیین شده؛ انتخاب جداگانه رنگ یا سایز در این مرحله وجود ندارد.</p></div>
        <div className="form-section"><span className="section-kicker">SHIPPING</span><h2 className="serif">روش ارسال</h2><label className="choice"><input type="radio" name="shipping" value="postal" defaultChecked /> <span>ارسال با پست</span><small>هزینه نهایی پس از بررسی سفارش محاسبه می‌شود.</small></label></div>
        {hasInvalidItems&&<p className="cart-warning">هر محصول باید حداقل ۱ جین ۸تایی داشته باشد.</p>}
        <button className={`btn primary product-cta ${hasInvalidItems ? "disabled-link" : ""}`} disabled={hasInvalidItems} type="submit">ثبت درخواست سفارش عمده</button>
        <p className="muted small-note">پرداخت و ثبت نهایی سفارش پس از اتصال Backend و تأیید موجودی انجام می‌شود.</p>
      </form>
      <aside className="order-summary checkout-summary"><span className="section-kicker">YOUR ORDER</span><h2 className="serif">اقلام سفارش</h2>{items.map((item)=><div className="summary-product" key={item.product.id}><div><strong>{item.product.name}</strong><span>{item.packCount.toLocaleString("fa-IR")} جین · { (item.packCount * item.product.wholesalePackSize).toLocaleString("fa-IR")} عدد · رنگ و سایز کامل</span></div><b>{money(getWholesalePackPrice(item.product) * item.packCount)}</b></div>)}<div className="summary-row total"><span>جمع سفارش</span><strong>{money(subtotal)}</strong></div></aside>
    </div>
  </main>;
}
