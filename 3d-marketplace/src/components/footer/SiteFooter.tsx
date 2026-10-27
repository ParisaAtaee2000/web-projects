import { Box, FileBox, Layers3 } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./site-footer.css";

const links = [
  { label: "محصولات چاپی", href: ROUTES.products },
  { label: "پرینترهای سه‌بعدی", href: ROUTES.printers },
  { label: "مواد مصرفی", href: ROUTES.materials },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="site-footer__main">
        <a className="site-footer__brand" href={ROUTES.home} aria-label="Makerā، صفحهٔ اصلی">
          <span className="site-footer__brand-mark"><Layers3 size={22} aria-hidden="true" /></span>
          <span><strong>Maker<span>ā</span></strong><small>بازار ساخت سه‌بعدی</small></span>
        </a>
        <p className="site-footer__description">جایی برای کشف محصولات چاپ سه‌بعدی، ابزار ساخت، فایل‌های دیجیتال و سازندگانی که ایده‌ها را به قطعه تبدیل می‌کنند.</p>
        <div className="site-footer__social" aria-label="پیوندهای اجتماعی">
          <a href={ROUTES.makers} aria-label="سازندگان Makerā"><Box size={16} aria-hidden="true" /></a>
          <a href={ROUTES.files3d} aria-label="فایل‌های سه‌بعدی"><FileBox size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <nav className="site-footer__links" aria-label="دسترسی سریع">
        <strong>کاوش در بازار</strong>
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>
      <nav className="site-footer__links" aria-label="راهنمای بازار">
        <strong>برای جامعهٔ Makerā</strong>
        <a href={ROUTES.makers}>سازندگان</a>
        <a href={ROUTES.customOrders}>سفارش اختصاصی</a>
        <a href={ROUTES.sellerRegister}>فروشندگی در Makerā</a>
        <a href={ROUTES.categories}>همهٔ دسته‌بندی‌ها</a>
        <a href={ROUTES.support}>راهنما و پشتیبانی</a>
        <a href={ROUTES.about}>درباره ما</a>
        <a href={ROUTES.contact}>تماس با ما</a>
      </nav>
      <div className="site-footer__bottom">
        <span>© Makerā — نسخهٔ نمایشی اولیه</span>
        <span>محصولات، فروشندگان و قیمت‌ها در این نسخه نمونه هستند.</span>
      </div>
    </footer>
  );
}
