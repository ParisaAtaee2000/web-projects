import { ArrowLeft, Box, Cpu, Layers3, Printer, Wrench } from "lucide-react";
import "./category-section.css";

const categories = [
  { title: "محصولات چاپ سه‌بعدی", description: "قطعات و محصولات آماده", icon: Box, tone: "violet" },
  { title: "پرینترهای سه‌بعدی", description: "دستگاه‌ها و تجهیزات چاپ", icon: Printer, tone: "blue" },
  { title: "قطعات و لوازم جانبی", description: "ارتقا، تعمیر و نگهداری", icon: Wrench, tone: "orange" },
  { title: "فیلامنت و مواد مصرفی", description: "مواد اولیه برای ساخت", icon: Layers3, tone: "green" },
  { title: "قطعات الکترونیکی", description: "بردها، سنسورها و ماژول‌ها", icon: Cpu, tone: "pink" },
];

export function CategorySection() {
  return (
    <section className="category-section" aria-labelledby="category-section-title" dir="rtl">
      <div className="category-section__heading">
        <div>
          <span className="category-section__eyebrow">از ایده تا ساخت</span>
          <h2 id="category-section-title">دسته‌بندی‌ها</h2>
          <p>برای ساختن، ارتقا دادن یا پیدا کردن محصولی متفاوت شروع کن.</p>
        </div>
        <a className="category-section__all" href="#categories">مشاهده همه <ArrowLeft size={16} aria-hidden="true" /></a>
      </div>
      <div className="category-section__grid" id="categories">
        {categories.map(({ title, description, icon: Icon, tone }) => (
          <a className="category-tile" href="#categories" key={title}>
            <span className={`category-tile__icon category-tile__icon--${tone}`}><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
            <span className="category-tile__copy">
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ArrowLeft className="category-tile__arrow" size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
