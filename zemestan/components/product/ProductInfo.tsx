"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductColor, ProductSize } from "@/types/product";
import { getVariantStock } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState<ProductColor>(product.colors[0]);
  const [size, setSize] = useState<ProductSize>(product.sizes[0]);
  const selectedStock = getVariantStock(product, color, size);
  const [quantity, setQuantity] = useState(product.minWholesaleQuantity);
  const { addItem } = useCart();

  useEffect(() => {
    const nextStock = getVariantStock(product, color, size);
    setQuantity(Math.min(product.minWholesaleQuantity, nextStock || product.minWholesaleQuantity));
  }, [color, size, product]);

  const sizeAvailability = useMemo(() => new Map(product.sizes.map((item) => [item, getVariantStock(product, color, item)])), [product, color]);
  const canOrder = selectedStock >= product.minWholesaleQuantity;
  const increment = () => setQuantity((value) => Math.min(value + product.quantityStep, selectedStock));
  const decrement = () => setQuantity((value) => Math.max(product.minWholesaleQuantity, value - product.quantityStep));

  return (
    <div className="product-info">
      <div className="kicker mono">PRODUCT / {product.code}</div>
      <h1>{product.name}</h1>
      <p className="product-copy">فرم شهری و کاربردی برای کالکشن زمستانه فروشگاه‌های مردانه؛ طراحی شده برای خرید عمده با اطلاعات سفارش شفاف.</p>
      <div className="price-box"><div className="wholesale-price">{product.wholesalePrice.toLocaleString("fa-IR")} تومان</div><small>قیمت عمده / هر عدد · حداقل سفارش {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</small></div>

      <div className="variant-group">
        <div className="variant-label">رنگ: {color}</div>
        <div className="swatches">{product.colors.map((item) => <button key={item} type="button" aria-label={item} className="swatch" style={{ background: item === "مشکی" ? "#20221e" : item === "زغالی" ? "#4b4940" : item === "قهوه‌ای" ? "#5a4632" : item === "شتری" ? "#8c7458" : "#58604a", outline: item === color ? "2px solid #8a4a2b" : "none", outlineOffset: "3px" }} onClick={() => setColor(item)} />)}</div>
      </div>

      <div className="variant-group">
        <div className="variant-label">سایز: {size}</div>
        <div className="sizes">{product.sizes.map((item) => { const stock = sizeAvailability.get(item) ?? 0; return <button key={item} type="button" disabled={stock === 0} className={`size ${item === size ? "active" : ""} ${stock === 0 ? "disabled" : ""}`} onClick={() => setSize(item)}>{item}</button>; })}</div>
      </div>

      <div className="variant-label">موجودی این ترکیب: <strong>{selectedStock.toLocaleString("fa-IR")} عدد</strong></div>
      <div className="qty-box"><div><strong>تعداد سفارش</strong><div className="variant-label">حداقل {product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</div></div><div className="qty-controls"><button type="button" disabled={!canOrder || quantity <= product.minWholesaleQuantity} onClick={decrement}>-</button><strong>{quantity.toLocaleString("fa-IR")}</strong><button type="button" disabled={!canOrder || quantity >= selectedStock} onClick={increment}>+</button></div></div>
      <button className="btn primary product-cta" type="button" disabled={!canOrder} onClick={() => addItem(product, color, size, quantity)}>{canOrder ? `افزودن ${quantity.toLocaleString("fa-IR")} عدد به سفارش عمده` : "موجودی برای حداقل سفارش کافی نیست"}</button>
      <a className="btn product-cta" href="#details">راهنمای سایز و مشخصات</a>
    </div>
  );
}
