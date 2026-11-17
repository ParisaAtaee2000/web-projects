import { SidebarMenu } from "./SidebarMenu";
import { SellerCard } from "./SellerCard";
import "./sidebar.css";

export function Sidebar() {
  return (
    <aside className="reference-sidebar">
      <SidebarMenu includeHome />
      <SellerCard />
    </aside>
  );
}
