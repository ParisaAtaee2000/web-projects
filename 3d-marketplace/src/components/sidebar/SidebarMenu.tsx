import { Box, Boxes, FileBox, House, ShoppingBag, UserRound } from "lucide-react";
import { SidebarMenuItem } from "./SidebarMenuItem";

const items = [
  { label: "صفحه اصلی", href: "/", Icon: House, active: true },
  { label: "محصولات", href: "/products", Icon: Box },
  { label: "تجهیزات و لوازم جانبی", href: "/accessories", Icon: Boxes },
  { label: "فایل سه‌بعدی", href: "/3d-files", Icon: FileBox },
  { label: "سفارش اختصاصی", href: "/custom-orders", Icon: ShoppingBag },
  { label: "فروشندگی", href: "/seller", Icon: UserRound },
];

export function SidebarMenu() {
  return (
    <nav className="sidebar-menu" aria-label="منوی کناری">
      {items.map((item) => (
        <SidebarMenuItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
