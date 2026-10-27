import type { LucideIcon } from "lucide-react";
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

const homeItem = { label: "صفحه اصلی", href: ROUTES.home, Icon: House };

const marketItems: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "محصولات", href: ROUTES.products, Icon: Box },
  { label: "دسته‌بندی‌ها", href: ROUTES.categories, Icon: LayoutGrid },
  { label: "پرینترهای سه‌بعدی", href: ROUTES.printers, Icon: Printer },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories, Icon: Boxes },
  { label: "مواد مصرفی", href: ROUTES.materials, Icon: Layers3 },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d, Icon: FileBox },
];

const serviceItems: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "سفارش اختصاصی", href: ROUTES.customOrders, Icon: ShoppingBag },
  { label: "فروشندگان", href: ROUTES.makers, Icon: UsersRound },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\\/+$/, "") : "/";
}

function isActiveRoute(href: string, pathname: string) {
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname === href || pathname.startsWith(href + "/");
}

function renderItem(
  item: { label: string; href: string; Icon: LucideIcon },
  pathname: string,
) {
  return (
    <SidebarMenuItem
      key={item.href}
      {...item}
      active={isActiveRoute(item.href, pathname)}
    />
  );
}

export function SidebarMenu() {
  const pathname = normalizePath(window.location.pathname);

  return (
    <nav className="sidebar-menu" aria-label="ناوبری اصلی">
      <div className="sidebar-menu__primary">
        {renderItem(homeItem, pathname)}
      </div>

      <div className="sidebar-menu__group">
        <h2 className="sidebar-menu__heading">بازار و محصولات</h2>
        {marketItems.map((item) => renderItem(item, pathname))}
      </div>

      <div className="sidebar-menu__group">
        <h2 className="sidebar-menu__heading">خدمات و جامعه</h2>
        {serviceItems.map((item) => renderItem(item, pathname))}
      </div>
    </nav>
  );
}
