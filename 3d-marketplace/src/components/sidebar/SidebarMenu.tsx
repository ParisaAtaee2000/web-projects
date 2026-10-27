import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  CircleHelp,
  FileText,
  House,
  Info,
  Layers3,
  LayoutGrid,
  Mail,
  Printer,
} from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { SidebarMenuItem } from "./SidebarMenuItem";

const homeItem = { label: "صفحه اصلی", href: ROUTES.home, Icon: House };

const marketItems: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "همه دسته‌بندی‌ها", href: ROUTES.categories, Icon: LayoutGrid },
  { label: "پرینترهای سه‌بعدی", href: ROUTES.printers, Icon: Printer },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories, Icon: Boxes },
  { label: "مواد مصرفی", href: ROUTES.materials, Icon: Layers3 },
];

const informationItems: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "راهنما و پشتیبانی", href: ROUTES.support, Icon: CircleHelp },
  { label: "درباره Makerā", href: ROUTES.about, Icon: Info },
  { label: "تماس با ما", href: ROUTES.contact, Icon: Mail },
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
    <nav className="sidebar-menu" aria-label="ناوبری سایت">
      <div className="sidebar-menu__primary">
        {renderItem(homeItem, pathname)}
      </div>

      <div className="sidebar-menu__group">
        <h2 className="sidebar-menu__heading">کاوش در بازار</h2>
        {marketItems.map((item) => renderItem(item, pathname))}
      </div>

      <div className="sidebar-menu__group">
        <h2 className="sidebar-menu__heading">اطلاعات و راهنما</h2>
        {informationItems.map((item) => renderItem(item, pathname))}
      </div>
    </nav>
  );
}
