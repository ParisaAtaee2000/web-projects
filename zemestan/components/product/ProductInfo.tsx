"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { getWholesalePackPrice } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";
import styles from "./ProductInfo.module.css";

const money = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

export function ProductInfo({ product }: { product: Product }) {
  const [packCount, setPackCount] = useState(product.minWholesalePacks);
  const { addItem } = useCart();
  const unitPrice = product.wholesalePrice;
  const totalPrice = getWholesalePackPrice(product) * packCount;
  const totalPieces = packCount * product.wholesalePackSize;

  const addPack = () => setPackCount((value) => value + product.quantityStep);
  const removePack = () => setPackCount((value) => Math.max(product.minWholesalePacks, value - product.quantityStep));

  return (
    <div className={`${styles.productInfo} product-info`}>
      <div className="kicker mono">PRODUCT / {product.code}</div>
      <h1>{product.name}</h1>
      <p className={styles.copy}>
        برای خرید عمده این مدل، سفارش از یک جین شروع می‌شود. داخل هر جین ترکیب کامل رنگ و سایز آماده است و لازم نیست رنگ یا سایزها را جداگانه انتخاب کنید.
      </p>

      <div className={styles.priceBox}>
        <div className={styles.unitPrice}>{money(unitPrice)}</div>
        <small className={styles.priceNote}>قیمت واحد هر عدد کاپشن · فروش فقط به‌صورت جین ۸تایی</small>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>داخل هر جین</span>
        <div className={styles.fixedBox}>
          <strong>۸ عدد با ترکیب کامل رنگ و سایز</strong>
          <span>سایزبندی: L / XL / 2XL / 3XL · ترکیب رنگ طبق بسته‌بندی محصول</span>
        </div>
      </div>

      <div className={`${styles.quantityBox} qty-box`}>
        <div>
          <strong>چند جین می‌خواهید؟</strong>
          <div className={styles.label}>حداقل سفارش: ۱ جین = ۸ عدد</div>
        </div>
        <div className="qty-controls">
          <button type="button" disabled={packCount <= product.minWholesalePacks} onClick={removePack} aria-label="کاهش تعداد جین">-</button>
          <strong>{packCount.toLocaleString("fa-IR")}</strong>
          <button type="button" onClick={addPack} aria-label="افزایش تعداد جین">+</button>
        </div>
      </div>

      <div className={styles.breakdown} aria-live="polite">
        <div className={styles.breakdownRow}><span>قیمت هر کاپشن</span><strong>{money(unitPrice)}</strong></div>
        <div className={styles.breakdownRow}><span>تعداد جین</span><strong>{packCount.toLocaleString("fa-IR")} جین</strong></div>
        <div className={styles.breakdownRow}><span>تعداد کل کاپشن</span><strong>{totalPieces.toLocaleString("fa-IR")} عدد</strong></div>
        <div className={`${styles.breakdownRow} ${styles.totalRow}`}><span>جمع این محصول</span><strong>{money(totalPrice)}</strong></div>
      </div>

      <button className={`${styles.cta} btn primary`} type="button" onClick={() => addItem(product, packCount)}>
        افزودن به سفارش
      </button>
      <a className={`${styles.detailLink} btn`} href="#details">جزئیات و مشخصات مدل</a>
    </div>
  );
}
