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
        این محصول فقط به‌صورت جین عمده عرضه می‌شود. داخل هر جین، ترکیب کامل رنگ و سایز طبق بسته‌بندی تولیدکننده قرار دارد و انتخاب جداگانهٔ رنگ یا سایز امکان‌پذیر نیست.
      </p>

      <div className={styles.priceBox}>
        <div className={styles.unitPrice}>{money(unitPrice)}</div>
        <small className={styles.priceNote}>قیمت واحد هر عدد کاپشن · سفارش عمده فقط در جین ۸تایی انجام می‌شود.</small>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>نوع فروش عمده</span>
        <div className={styles.fixedBox}>
          <strong>جین ۸تایی</strong>
          <span>{product.wholesalePackLabel}</span>
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>محتوای جین</span>
        <div className={styles.fixedBox}>
          <strong>رنگ‌بندی و سایزبندی کامل</strong>
          <span>سایزها: L / XL / 2XL / 3XL · رنگ‌ها مطابق ترکیب آمادهٔ تولید.</span>
        </div>
      </div>

      <div className={`${styles.quantityBox} qty-box`}>
        <div>
          <strong>تعداد جین</strong>
          <div className={styles.label}>حداقل سفارش: ۱ جین = ۸ عدد</div>
        </div>
        <div className="qty-controls">
          <button type="button" disabled={packCount <= product.minWholesalePacks} onClick={removePack} aria-label="کاهش تعداد جین">-</button>
          <strong>{packCount.toLocaleString("fa-IR")}</strong>
          <button type="button" onClick={addPack} aria-label="افزایش تعداد جین">+</button>
        </div>
      </div>

      <div className={styles.breakdown} aria-live="polite">
        <div className={styles.breakdownRow}><span>قیمت واحد هر کاپشن</span><strong>{money(unitPrice)}</strong></div>
        <div className={styles.breakdownRow}><span>تعداد جین</span><strong>{packCount.toLocaleString("fa-IR")} جین</strong></div>
        <div className={styles.breakdownRow}><span>تعداد کل کاپشن</span><strong>{totalPieces.toLocaleString("fa-IR")} عدد</strong></div>
        <div className={`${styles.breakdownRow} ${styles.totalRow}`}><span>قیمت کل سفارش این محصول</span><strong>{money(totalPrice)}</strong></div>
      </div>

      <button className={`${styles.cta} btn primary`} type="button" onClick={() => addItem(product, packCount)}>
        افزودن {packCount.toLocaleString("fa-IR")} جین به سفارش عمده
      </button>
      <a className={`${styles.detailLink} btn`} href="#details">مشخصات و ترکیب محصول</a>
    </div>
  );
}
