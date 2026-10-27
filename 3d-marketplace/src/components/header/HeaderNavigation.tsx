const items = [
  { label: "خانه", href: "/", active: true },
  { label: "تجهیزات و لوازم جانبی", href: "/accessories" },
  { label: "سفارش اختصاصی", href: "/custom-orders" },
  { label: "فروشندگان", href: "/makers" },
];
export function HeaderNavigation() {
  return <nav className="header-nav" aria-label="ناوبری اصلی">{items.map(item =>
    <a className={item.active ? "header-nav__item is-active" : "header-nav__item"} href={item.href} key={item.href}>{item.label}</a>
  )}</nav>;
}
