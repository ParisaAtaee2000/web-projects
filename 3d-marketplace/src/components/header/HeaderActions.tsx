import { Heart, MessageSquare, ShoppingCart, UserRound } from "lucide-react";
const actions = [
  { label: "پیام‌ها", Icon: MessageSquare, href: "/account/messages" },
  { label: "علاقه‌مندی‌ها", Icon: Heart, href: "/account/favorites" },
  { label: "سبد خرید", Icon: ShoppingCart, href: "/cart" },
  { label: "حساب کاربری", Icon: UserRound, href: "/account" },
];
export function HeaderActions() {
  return <div className="header-actions">{actions.map(({label, Icon, href}) =>
    <a key={href} href={href} aria-label={label} title={label}><Icon size={17} strokeWidth={1.8}/></a>
  )}</div>;
}
