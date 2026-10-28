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
        محصولات تخصصی دنیای چاپ سه‌بعدی را کشف کن؛ از پرینترهای حرفه‌ای و مواد مصرفی
        تا فایل‌های آماده و قطعاتی که سازندگان با دقت تولید می‌کنند.
      </p>

      <HeroActions />
    </div>
  );
}
