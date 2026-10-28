const items = [
  { label: "صفحه اصلی", href: "/" },
  { label: "تجهیزات و لوازم جانبی", href: "/accessories" },
  { label: "سفارش اختصاصی", href: "/custom-orders" },
  { label: "فروشندگان", href: "/makers" },
];

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

export function HeaderNavigation() {
  const currentPath = normalizePath(window.location.pathname);

  return (
    <nav className="header-nav" aria-label="ناوبری اصلی">
      {items.map((item) => {
        const active =
          currentPath === item.href ||
          (item.href !== "/" && currentPath.startsWith(item.href + "/"));

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
