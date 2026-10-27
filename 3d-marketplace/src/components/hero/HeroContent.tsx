import { Sparkles } from "lucide-react";
import { HeroActions } from "./HeroActions";
import { HeroTitle } from "./HeroTitle";

export function HeroContent() {
  return (
    <div className="hero-content">
      <p className="hero-content__eyebrow">
        <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" />
        بازار تخصصی ساخت سه‌بعدی
      </p>

      <HeroTitle />

      <p className="hero-content__description">
        از انتخاب پرینتر و مواد مصرفی تا کشف مدل‌های آماده و سفارش ساخت قطعه؛
        ابزارهای دنیای چاپ سه‌بعدی را در یک‌جا پیدا کن.
      </p>

      <HeroActions />
    </div>
  );
}
