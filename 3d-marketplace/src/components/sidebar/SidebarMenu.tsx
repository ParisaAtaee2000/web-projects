import {
  Box,
  Boxes,
  FileBox,
  House,
  Layers3,
  LayoutGrid,
  Printer,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { SidebarMenuItem } from "./SidebarMenuItem";

const items = [
  { label: "صفحه اصلی", href: ROUTES.home, Icon: House },
  { label: "محصولات", href: ROUTES.products, Icon: Box },
  { label: "دسته‌بندی‌ها", href: ROUTES.categories, Icon: LayoutGrid },
  { label: "پرینترهای سه‌بعدی", href: ROUTES.printers, Icon: Printer },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories, Icon: Boxes },
  { label: "مواد مصرفی", href: ROUTES.materials, Icon: Layers3 },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d, Icon: FileBox },
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
    <nav className="sidebar-menu" aria-label="ناوبری اصلی">
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
