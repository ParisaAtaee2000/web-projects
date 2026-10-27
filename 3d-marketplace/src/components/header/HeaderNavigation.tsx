import { ROUTES } from "../../app/router/routeNames";

const links = [
  { label: "محصولات", href: ROUTES.products },
  { label: "پرینترها", href: ROUTES.printers },
  { label: "مواد مصرفی", href: ROUTES.materials },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d },
  { label: "سازندگان", href: ROUTES.makers },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

export function HeaderNavigation() {
  const currentPath = normalizePath(window.location.pathname);

  return (
    <nav className="header-navigation" aria-label="منوی اصلی">
      {links.map((link) => {
        const active = currentPath === link.href || currentPath.startsWith(link.href + "/");
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
