import { Box, Boxes, FileBox, House, ShoppingBag, UsersRound } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { SidebarMenuItem } from "./SidebarMenuItem";

const items = [
  { label: "صفحه اصلی", href: ROUTES.home, Icon: House },
  { label: "محصولات", href: ROUTES.products, Icon: Box },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories, Icon: Boxes },
  { label: "فایل سه‌بعدی", href: ROUTES.files3d, Icon: FileBox },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders, Icon: ShoppingBag },
  { label: "فروشندگان", href: ROUTES.makers, Icon: UsersRound },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

function isActiveRoute(href: string, pathname: string) {
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarMenu() {
  const pathname = normalizePath(window.location.pathname);

  return (
    <nav className="sidebar-menu" aria-label="منوی کناری">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.href}
          {...item}
          active={isActiveRoute(item.href, pathname)}
        />
      ))}
    </nav>
  );
}
