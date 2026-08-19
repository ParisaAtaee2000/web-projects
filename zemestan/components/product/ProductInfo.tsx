"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { getWholesalePackPrice } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";

const money = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

export function ProductInfo({ product }: { product: Product }) {
  const [packCount, setPackCount] = useState(product.minWholesalePacks);
  const { addItem } = useCart();
  const packPrice = getWholesalePackPrice(product);
  const totalPieces = packCount * product.wholesalePackSize;
  const totalPrice = useMemo(() => packPrice * packCount, [packPrice, packCount]);

  const addPack = () => setPackCount((value) => value + product.quantityStep);
  const removePack = () => setPackCount((value) => Math.max(product.minWholesalePacks, value - product.quantityStep));

  return (
    <div className="product-info">
      <div className="kicker mono">PRODUCT / {product.code}</div>
      <h1>{product.name}</h1>
      <p className="product-copy">این محصول فقط به‌صورت جین عمده عرضه می‌شود. داخل هر جین، ترکیب کامل رنگ و سایز طبق بسته‌بندی تولیدکننده قرار دارد و انتخاب جداگانه رنگ یا سایز امکان‌پذیر نیست.</p>

      <div className="price-box">
        <div className="wholesale-price">{money(packPrice)}</div>
        <small>قیمت هر جین ۸تایی · هر جین شامل {product.wholesalePackSize.toLocaleString("fa-IR")} عدد با ترکیب کامل رنگ و سایز</small>
        <div className="live-total-price">
          <span>قیمت کل سفارش فعلی</span>
          <strong>{money(totalPrice)}</strong>
        </div>
      </div>

      <div className="variant-group">
        <div className="variant-label">نوع فروش عمده</div>
        <div className="fixed-wholesale-box">
          <strong>جین ۸تایی</strong>
          <span>{product.wholesalePackLabel}</span>
        </div>
      </div>

      <div className="variant-group">
        <div className="variant-label">محتوای جین</div>
        <div className="fixed-wholesale-box">
          <strong>رنگ‌بندی و سایزبندی کامل</strong>
          <span>سایزها: L / XL / 2XL / 3XL · رنگ‌ها مطابق ترکیب آماده تولید</span>
        </div>
      </div>

      <div className="qty-box">
        <div>
          <strong>تعداد جین</strong>
          <div className="variant-label">حداقل سفارش: ۱ جین = ۸ عدد</div>
        </div>
        <div className="qty-controls">
          <button type="button" disabled={packCount <= product.minWholesalePacks} onClick={removePack}>-</button>
          <strong>{packCount.toLocaleString("fa-IR")}</strong>
          <button type="button" onClick={addPack}>+</button>
        </div>
      </div>

      <div className="variant-label"><strong>{totalPieces.toLocaleString("fa-IR")} عدد</strong> در {packCount.toLocaleString("fa-IR")} جین</div>
      <div className="live-total-price live-total-price--strong">
        <span>جمع کل سفارش</span>
        <strong>{money(totalPrice)}</strong>
      </div>

      <button className="btn primary product-cta" type="button" onClick={() => addItem(product, packCount)}>
        افزودن {packCount.toLocaleString("fa-IR")} جین به سفارش عمده
      </button>
      <a className="btn product-cta" href="#details">مشخصات و ترکیب محصول</a>
    </div>
  );
}
