"use client";

import { useMemo } from "react";
import type { Product, ProductColor } from "@/types/product";

export function InventoryMatrix({ product, color }: { product: Product; color: ProductColor }) {
  const rows = useMemo(() => product.sizes.map((size) => ({
    size,
    stock: product.variants.find((variant) => variant.color === color && variant.size === size)?.stock ?? 0,
  })), [product, color]);

  return (
    <section className="inventory-panel" aria-label={`موجودی زنده سایزبندی ${color}`}>
      <div className="inventory-head">
        <div>
          <div className="section-kicker">LIVE INVENTORY</div>
          <h2 className="inventory-title">موجودی زنده سایزبندی</h2>
        </div>
        <span className="inventory-live">● به‌روزرسانی لحظه‌ای</span>
      </div>
      <div className="inventory-grid">
        {rows.map(({ size, stock }) => {
          const percent = Math.min(100, Math.round((stock / Math.max(...rows.map((item) => item.stock), 1)) * 100));
          const status = stock === 0 ? "ناموجود" : stock <= 5 ? "محدود" : "موجود";
          return (
            <div className="inventory-row" key={size}>
              <div className="inventory-size">{size}</div>
              <div className="inventory-bar"><span style={{ width: `${percent}%` }} /></div>
              <div className={`inventory-stock inventory-${status === "موجود" ? "ok" : status === "محدود" ? "low" : "out"}`}>{stock.toLocaleString("fa-IR")} عدد</div>
            </div>
          );
        })}
      </div>
      <div className="inventory-note">رنگ انتخاب‌شده: <strong>{color}</strong> · سایزبندی تولید: L تا 3XL</div>
    </section>
  );
}
