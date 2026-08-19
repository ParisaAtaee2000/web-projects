"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { InventoryMatrix } from "./InventoryMatrix";

export function InventorySection({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);

  return (
    <section className="container section inventory-section">
      <div className="inventory-color-selector">
        <div>
          <div className="section-kicker">STOCK / BY COLOR</div>
          <h2 className="section-title">سایزبندی و موجودی</h2>
        </div>
        <div className="inventory-colors" aria-label="انتخاب رنگ برای مشاهده موجودی">
          {product.colors.map((item) => (
            <button key={item} type="button" className={`filter-pill ${item === color ? "active" : ""}`} onClick={() => setColor(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <InventoryMatrix product={product} color={color} />
    </section>
  );
}
