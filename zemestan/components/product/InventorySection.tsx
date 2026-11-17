import type { Product } from "@/types/product";
import { InventoryStyles } from "./InventoryStyles";

export function InventorySection({ product }: { product: Product }) {
  return (
    <section className="container section inventory-section">
      <InventoryStyles />
      <div className="section-head">
        <div>
          <div className="section-kicker">WHOLESALE PACK / COMPOSITION</div>
          <h2 className="section-title">ترکیب ثابت جین</h2>
          <p className="muted">این جدول برای اطلاع خریدار است؛ ترکیب جین از قبل توسط تولیدکننده تعیین شده و امکان انتخاب جداگانه رنگ یا سایز وجود ندارد.</p>
        </div>
        <div className="fixed-wholesale-box">
          <strong>{product.wholesalePackLabel}</strong>
          <span>هر جین = {product.wholesalePackSize.toLocaleString("fa-IR")} عدد</span>
        </div>
      </div>

      <div className="inventory-grid">
        <div className="inventory-card">
          <div className="section-kicker">SIZE BREAKDOWN</div>
          <div className="inventory-size-list">
            {product.sizes.map((size) => (
              <div className="inventory-size-row" key={size}>
                <span>{size}</span>
                <strong>{(product.jeanPack.sizeBreakdown[size] ?? 0).toLocaleString("fa-IR")} عدد</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="inventory-card">
          <div className="section-kicker">COLOR BREAKDOWN</div>
          <div className="inventory-size-list">
            {product.colors.map((color) => (
              <div className="inventory-size-row" key={color}>
                <span>{color}</span>
                <strong>{(product.jeanPack.colorBreakdown[color] ?? 0).toLocaleString("fa-IR")} عدد</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
