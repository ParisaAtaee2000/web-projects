const links = [{ label: "محصولات", href: "/products" }, { label: "سازندگان", href: "/makers" }, { label: "ثبت سفارش اختصاصی", href: "/custom-orders" }, { label: "فایل سه‌بعدی", href: "/3d-files" }];
export function PrimaryNavigation() {
  return <nav aria-label="ناوبری اصلی">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>;
}
