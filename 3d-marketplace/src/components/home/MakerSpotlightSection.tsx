import { ArrowLeft, BadgeCheck, Box, Star } from "lucide-react";

const makers = [
  {
    id: "formino",
    initials: "فـ",
    name: "استودیو فرمینو",
    specialty: "دکور و محصولات کاربردی",
    description: "از ایده‌های ساده، فرم‌هایی دقیق و قابل استفاده می‌سازیم.",
    products: "۲۴",
    rating: "۴٫۹",
    tone: "violet",
  },
  {
    id: "nova",
    initials: "نـ",
    name: "کارگاه نوا",
    specialty: "پرینتر و تجهیزات ساخت",
    description: "تجهیزات و قطعاتی برای اینکه میز کارت همیشه آماده باشد.",
    products: "۱۸",
    rating: "۴٫۸",
    tone: "blue",
  },
  {
    id: "techmaker",
    initials: "تـ",
    name: "تک‌میکر",
    specialty: "قطعات فنی و نمونه‌سازی",
    description: "راه‌حل‌های کوچک برای پروژه‌های فنی و نمونه‌سازی سریع.",
    products: "۳۱",
    rating: "۴٫۷",
    tone: "orange",
  },
];

export function MakerSpotlightSection() {
  return (
    <section className="home-section makers-spotlight" id="makers" dir="rtl" aria-labelledby="makers-spotlight-title">
      <div className="home-section__header">
        <div>
          <span className="home-eyebrow">آدم‌های پشتِ ساخت</span>
          <h2 className="home-section__title" id="makers-spotlight-title">
            با <span>سازندگان</span> آشنا شو
          </h2>
          <p className="home-section__lead">هر محصول، یک سازنده دارد؛ اینجا نمونه‌ای از کارت معرفی سازندگان را می‌بینی.</p>
        </div>
        <a className="home-text-link" href="#products">
          دیدن نمونه محصولات <ArrowLeft size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="home-maker-grid">
        {makers.map((maker) => (
          <article className="home-maker-card" key={maker.id}>
            <div className="home-maker-card__top">
              <div className={`home-maker-card__avatar home-maker-card__avatar--${maker.tone}`} aria-hidden="true">
                <span>{maker.initials}</span>
                <i><BadgeCheck size={16} aria-hidden="true" /></i>
              </div>
              <div className="home-maker-card__identity">
                <h3>{maker.name}</h3>
                <span>{maker.specialty}</span>
              </div>
              <div className="home-maker-card__rating">
                <Star size={13} fill="currentColor" aria-hidden="true" />
                {maker.rating}
              </div>
            </div>
            <p className="home-maker-card__description">{maker.description}</p>
            <div className="home-maker-card__bottom">
              <span><Box size={15} aria-hidden="true" /> {maker.products} محصول نمونه</span>
              <a href="#products" aria-label={`دیدن نمونه محصولات ${maker.name}`}>
                <ArrowLeft size={17} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
