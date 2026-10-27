import { ArrowLeft, Boxes, Store } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="hero-button hero-button--primary" href={ROUTES.products}>
        کشف محصولات
        <ArrowLeft size={16} aria-hidden="true" />
      </a>

      <a className="hero-button hero-button--secondary" href={ROUTES.sellerRegister}>
        <Store size={16} strokeWidth={1.8} aria-hidden="true" />
        فروشنده شو
      </a>
    </div>
  );
}
