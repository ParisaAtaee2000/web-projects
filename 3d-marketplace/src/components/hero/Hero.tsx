import { HeroBenefits } from "./HeroBenefits";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
import "./hero.css";

interface HeroProps {
  imageUrl?: string;
}

export function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVisual imageUrl={imageUrl} />

      <div className="hero__inner">
        <div className="hero__main">
          <HeroContent />
        </div>

        <aside className="hero__features" aria-label="بخش‌های اصلی مارکت‌پلیس">
          <HeroBenefits />
        </aside>
      </div>
    </section>
  );
}
