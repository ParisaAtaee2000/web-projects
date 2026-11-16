import type { ReactNode } from "react";
import {
  Boxes,
  Heart,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./account-dashboard.css";

export type AccountDashboardSection = "overview" | "cart" | "favorites" | "messages";

type AccountDashboardLayoutProps = {
  active: AccountDashboardSection;
  title: string;
  description: string;
  eyebrow?: string;
  icon: ReactNode;
  children: ReactNode;
};

const navigation = [
  { id: "overview", label: "داشبورد", href: ROUTES.account, Icon: Home },
  { id: "products", label: "محصولات من", href: ROUTES.products, Icon: Boxes },
  { id: "cart", label: "سفارش‌ها", href: ROUTES.cart, Icon: ShoppingBag },
  { id: "messages", label: "پیام‌ها", href: ROUTES.accountMessages, Icon: MessageSquare },
  { id: "favorites", label: "علاقه‌مندی‌ها", href: ROUTES.accountFavorites, Icon: Heart },
  { id: "settings", label: "تنظیمات", href: ROUTES.account, Icon: Settings },
] as const;

export function AccountDashboardProfile() {
  return (
    <a className="account-dashboard-profile" href={ROUTES.account} aria-label="پروفایل پریسا عطائی">
      <span className="account-dashboard-profile__avatar" aria-hidden="true">پ</span>
      <span className="account-dashboard-profile__details">
        <strong>پریسا عطائی</strong>
        <small>حساب شخصی</small>
      </span>
    </a>
  );
}

export function AccountDashboardSidebar({
  active,
}: {
  active: AccountDashboardSection;
}) {
  return (
    <aside className="account-dashboard-sidebar">
      <AccountDashboardProfile />

      <nav aria-label="منوی حساب کاربری">
        {navigation.map(({ id, label, href, Icon }) => (
          <a
            className={active === id ? "is-active" : ""}
            href={href}
            key={id}
            aria-current={active === id ? "page" : undefined}
          >
            <Icon size={17} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <a className="account-dashboard-sidebar__logout" href={ROUTES.home}>
        <LogOut size={16} aria-hidden="true" />
        <span>خروج</span>
      </a>
    </aside>
  );
}

export function AccountDashboardLayout({
  active,
  title,
  description,
  eyebrow = "فضای کاربری",
  icon,
  children,
}: AccountDashboardLayoutProps) {
  return (
    <main className="page account-dashboard-page" dir="rtl">
      <div className="account-dashboard-layout">
        <AccountDashboardSidebar active={active} />

        <section className="account-dashboard-main">
          <header className="account-dashboard-header">
            <div className="account-dashboard-header__icon" aria-hidden="true">
              {icon}
            </div>
            <div className="account-dashboard-header__copy">
              <span>{eyebrow}</span>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </header>

          <div className="account-dashboard-content">{children}</div>
        </section>
      </div>
    </main>
  );
}
