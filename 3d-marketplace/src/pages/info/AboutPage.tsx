import { ArrowLeft, Box, Layers3, Printer, UsersRound } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./info-pages.css";

const pillars = [
  { icon: Box, title: "محصولات ساخته‌شده", text: "محصولات کاربردی و قطعاتی که با فناوری چاپ سه‌بعدی ساخته می‌شوند." },
  { icon: Printer, title: "ابزار و مواد ساخت", text: "پرینترها، قطعات جانبی و مواد مصرفی موردنیاز برای شروع یا ادامهٔ ساخت." },
  { icon: Layers3, title: "فایل‌های دیجیتال", text: "مدل‌هایی که مسیر ایده تا نمونهٔ قابل چاپ را کوتاه‌تر می‌کنند." },
  { icon: UsersRound, title: "جامعهٔ سازندگان", text: "فضایی برای معرفی تخصص سازندگان و ارتباط با افرادی که به ساخت سفارشی نیاز دارند." },
];

export function AboutPage() {
  return (
    <main className="info-page page about-page">
      <header className="info-page__hero">
        <span className="info-page__eyebrow">دربارهٔ Makerā</span>
        <h1>از یک ایدهٔ دیجیتال، تا <span>چیزی که می‌شود ساخت.</span></h1>
        <p>Makerā با یک هدف طراحی می‌شود: تجربهٔ کشف محصولات، ابزارها، فایل‌ها و سازندگان دنیای چاپ سه‌بعدی را در یک بازار تخصصی کنار هم قرار دهد.</p>
        <a className="info-page__button" href={ROUTES.categories}>کاوش در بازار <ArrowLeft size={16} aria-hidden="true" /></a>
      </header>

      <section className="about-principles" aria-labelledby="about-principles-title">
        <div className="info-page__section-heading">
          <span className="info-page__eyebrow">چه چیزهایی را کنار هم می‌آوریم؟</span>
          <h2 id="about-principles-title">یک خانه برای اکوسیستم چاپ سه‌بعدی</h2>
          <p>به‌جای یک فروشگاه عمومی، تمرکز Makerā روی نیازهای دنیای چاپ سه‌بعدی است.</p>
        </div>
        <div className="about-principles__grid">
          {pillars.map(({ icon: Icon, title, text }, index) => (
            <article className="about-principle" key={title}>
              <span className="about-principle__index">0{index + 1}</span>
              <span className="about-principle__icon"><Icon size={23} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-next">
        <div>
          <span className="info-page__eyebrow">این فقط شروع کار است</span>
          <h2>در مسیر ساخت، <span>جای تو هم هست.</span></h2>
          <p>اگر سازنده‌ای یا به قطعه‌ای اختصاصی نیاز داری، مسیر مناسب را انتخاب کن.</p>
        </div>
        <div className="about-next__actions">
          <a className="info-page__button" href={ROUTES.sellerRegister}>برای فروشندگان <ArrowLeft size={16} aria-hidden="true" /></a>
          <a className="info-page__button info-page__button--ghost" href={ROUTES.customOrders}>سفارش اختصاصی <ArrowLeft size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <p className="info-page__disclaimer">این وب‌سایت در مرحلهٔ ساخت نسخهٔ اولیه است؛ متن بالا معرفی هدف محصول است، نه ادعای فعالیت تجاری یا وجود خدمات فعال.</p>
    </main>
  );
}
