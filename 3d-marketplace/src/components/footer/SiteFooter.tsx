import { Box, Instagram, Send, Youtube } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./site-footer.css";

const marketLinks = [
  { label: "صفحه اصلی", href: ROUTES.home },
  { label: "محصولات", href: ROUTES.products },
  { label: "تجهیزات و لوازم جانبی", href: ROUTES.categories },
  { label: "فایل‌های سه‌بعدی", href: ROUTES.files3d },
  { label: "سفارش اختصاصی", href: ROUTES.customOrders },
  { label: "فروشندگان", href: ROUTES.makers },
];

const guideLinks = [
  { label: "قوانین و مقررات", href: ROUTES.support },
  { label: "روش‌های پرداخت", href: ROUTES.support },
  { label: "پرسش‌های متداول", href: ROUTES.support },
  { label: "پشتیبانی", href: ROUTES.contact },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="site-footer__main">
        <a className="site-footer__brand" href={ROUTES.home} aria-label="Maker، صفحه اصلی">
          <span className="site-footer__brand-mark" aria-hidden="true">M</span>
          <span><strong>Maker</strong><small>Create · Share · Make It Real</small></span>
        </a>
        <p className="site-footer__description">
          بازار تخصصی محصولات چاپ سه‌بعدی، تجهیزات ساخت، فایل‌های دیجیتال و سفارش‌های اختصاصی.
        </p>
        <div className="site-footer__social" aria-label="پیوندهای اجتماعی">
          <a href={ROUTES.makers} aria-label="جامعه سازندگان"><Instagram size={15} aria-hidden="true" /></a>
          <a href={ROUTES.files3d} aria-label="فایل‌های سه‌بعدی"><Send size={15} aria-hidden="true" /></a>
          <a href={ROUTES.products} aria-label="محصولات"><Youtube size={15} aria-hidden="true" /></a>
          <a href={ROUTES.makers} aria-label="سازندگان"><Box size={15} aria-hidden="true" /></a>
        </div>
      </div>
      <nav className="site-footer__links" aria-label="لینک‌های سریع">
        <strong>لینک‌های سریع</strong>
        {marketLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
      </nav>
      <nav className="site-footer__links" aria-label="راهنما">
        <strong>راهنما</strong>
        {guideLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
      </nav>
      <div className="site-footer__newsletter">
        <h4>عضویت در خبرنامه</h4>
        <p>جدیدترین محصولات و تخفیف‌ها را از دست ندهید.</p>
        <form className="site-footer__newsletter-form" onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; form.reset(); }}>
          <input type="email" placeholder="ایمیل خود را وارد کنید" aria-label="ایمیل" required />
          <button type="submit" aria-label="عضویت در خبرنامه"><Send size={14} aria-hidden="true" /></button>
        </form>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Maker. All rights reserved.</span>
        <span>ساخته‌شده برای جامعه سازندگان سه‌بعدی</span>
      </div>
    </footer>
  );
}
