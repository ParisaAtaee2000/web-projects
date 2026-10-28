import { ROUTES } from "../../app/router/routeNames";

const links = [
  { label: "خانه", href: ROUTES.home },
  { label: "محصولات", href: ROUTES.products },
  { label: "تجهیزات چاپ سه‌بعدی", href: ROUTES.categories },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders },
  { label: "فروشندگان", href: ROUTES.makers },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

export function HeaderNavigation() {
  const currentPath = normalizePath(window.location.pathname);

  return (
    <nav className="header-navigation" aria-label="ناوبری اصلی">
      {links.map((link) => {
        const active =
          currentPath === link.href ||
          (link.href !== ROUTES.home && currentPath.startsWith(link.href + "/"));

        return (
          <a
            key={link.href}
            href={link.href}
            className={active ? "header-navigation__link is-active" : "header-navigation__link"}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
