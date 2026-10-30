import { Box, Boxes, FileBox, House, ShoppingBag, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { SidebarMenuItem } from "./SidebarMenuItem";

const homeItem = { label: "صفحه اصلی", href: ROUTES.home, Icon: House };

const items: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "محصولات", href: ROUTES.products, Icon: Box },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories, Icon: Boxes },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d, Icon: FileBox },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders, Icon: ShoppingBag },
  { label: "فروشندگان", href: ROUTES.makers, Icon: UsersRound },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

function renderItem(
  item: { label: string; href: string; Icon: LucideIcon },
  pathname: string,
) {
  const active =
    pathname === item.href ||
    (item.href !== ROUTES.home && pathname.startsWith(item.href + "/"));

  return <SidebarMenuItem key={item.href} {...item} active={active} />;
}

interface SidebarMenuProps {
  includeHome?: boolean;
}

export function SidebarMenu({ includeHome = false }: SidebarMenuProps) {
  const pathname = normalizePath(window.location.pathname);

  return (
    <nav className="sidebar-menu" aria-label="منوی کناری">
      {includeHome && (
        <div className="sidebar-menu__primary">
          {renderItem(homeItem, pathname)}
        </div>
      )}
      <div className="sidebar-menu__group">
        {items.map((item) => renderItem(item, pathname))}
      </div>
    </nav>
  );
}
