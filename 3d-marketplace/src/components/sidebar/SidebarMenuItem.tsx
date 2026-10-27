import type { LucideIcon } from "lucide-react";
interface SidebarMenuItemProps { label: string; href: string; Icon: LucideIcon; active?: boolean; }
export function SidebarMenuItem({label, href, Icon, active = false}: SidebarMenuItemProps) {
  return <a className={active ? "sidebar-item is-active" : "sidebar-item"} href={href}>
    <span>{label}</span><Icon size={16} strokeWidth={1.7} aria-hidden="true"/>
  </a>;
}
