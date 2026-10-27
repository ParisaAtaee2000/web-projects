import { ArrowLeft, Boxes } from "lucide-react";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="hero-button hero-button--primary" href="/products">
        <Boxes size={17} strokeWidth={1.8} aria-hidden="true" />
        کشف محصولات
        <ArrowLeft size={16} aria-hidden="true" />
      </a>

      <a className="hero-button hero-button--secondary" href="/custom-orders">
        سفارش ساخت اختصاصی
        <ArrowLeft size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
