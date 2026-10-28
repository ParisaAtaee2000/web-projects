import { ArrowLeft, CirclePlay } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="hero-button hero-button--primary" href={ROUTES.products}>
        مشاهده محصولات
        <ArrowLeft size={14} aria-hidden="true" />
      </a>
      <a className="hero-button hero-button--secondary" href={ROUTES.about}>
        درباره ما
        <CirclePlay size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
