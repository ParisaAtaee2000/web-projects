import { ROUTES } from "../../app/router/routeNames";

const items = [
  { label: "خانه", href: ROUTES.home },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.accessories },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders },
  { label: "فروشندگان", href: ROUTES.makers },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

function isActiveRoute(href: string, pathname: string) {
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname === href || pathname.startsWith(href + "/");
}

export function HeaderNavigation() {
  const pathname = normalizePath(window.location.pathname);

  return (
    <nav className="header-nav" aria-label="ناوبری اصلی">
      {items.map((item) => {
        const active = isActiveRoute(item.href, pathname);
        return (
          <a
            className={active ? "header-nav__item is-active" : "header-nav__item"}
            href={item.href}
            key={item.href}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
