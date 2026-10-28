import { useEffect, useState } from "react";
import { Heart, MessageSquare, ShoppingCart, UserRound } from "lucide-react";
import { readCart, subscribeToCart } from "../../lib/demoCart";

const actions = [
  { label: "پیام‌ها", Icon: MessageSquare, href: "/account/messages" },
  { label: "علاقه‌مندی‌ها", Icon: Heart, href: "/account/favorites" },
  { label: "سبد خرید", Icon: ShoppingCart, href: "/cart" },
  { label: "حساب کاربری", Icon: UserRound, href: "/account" },
];

export function HeaderActions() {
  const [cartCount, setCartCount] = useState(() => readCart().reduce((sum, item) => sum + item.quantity, 0));
  useEffect(() => subscribeToCart(() => setCartCount(readCart().reduce((sum, item) => sum + item.quantity, 0))), []);
  return (
    <div className="header-actions">
      {actions.map(({ label, Icon, href }) => (
        <a key={href} href={href} aria-label={label} title={label} className={href === "/cart" ? "header-actions__cart" : undefined}>
          <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
          {href === "/cart" && cartCount > 0 && <span className="header-actions__count">{cartCount > 99 ? "۹۹+" : cartCount.toLocaleString("fa-IR")}</span>}
        </a>
      ))}
    </div>
  );
}
