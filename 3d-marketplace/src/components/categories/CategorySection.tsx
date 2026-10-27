import { ArrowLeft, Box, FileBox, Layers3, Printer, Sparkles, Wrench } from "lucide-react";
import "./category-section.css";

const categories = [
  {
    title: "محصولات چاپ سه‌بعدی",
    description: "قطعات و محصولات آماده",
    icon: Box,
    tone: "violet",
    image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "قطعه‌ای در حال ساخته‌شدن با چاپگر سه‌بعدی",
  },
  {
    title: "پرینترهای سه‌بعدی",
    description: "دستگاه‌ها و تجهیزات چاپ",
    icon: Printer,
    tone: "blue",
    image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "چاپگر سه‌بعدی روی میز کار",
  },
  {
    title: "قطعات و لوازم جانبی",
    description: "ارتقا، تعمیر و نگهداری",
    icon: Wrench,
    tone: "orange",
    image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "نمای نزدیک قطعات هد چاپگر سه‌بعدی",
  },
  {
    title: "فیلامنت و مواد مصرفی",
    description: "مواد اولیه برای ساخت",
    icon: Layers3,
    tone: "green",
    image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200",
    imageAlt: "چاپگر سه‌بعدی و قرقره‌های فیلامنت رنگی",
  },
  {
    title: "فایل‌های سه‌بعدی",
    description: "مدل‌های آماده برای چاپ",
    icon: FileBox,
    tone: "pink",
    image: "https://images.pexels.com/photos/24859620/pexels-photo-24859620.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "چاپگر سه‌بعدی در حال ساخت یک مدل",
  },
  {
    title: "سفارش ساخت اختصاصی",
    description: "ساخت قطعه بر اساس نیاز تو",
    icon: Sparkles,
    tone: "blue",
    image: "https://images.pexels.com/photos/30658380/pexels-photo-30658380.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "جزئیات فرایند چاپ و ساخت قطعه",
  },
];

export function CategorySection() {
  return (
    <section className="category-section" aria-labelledby="category-section-title" dir="rtl">
      <div className="category-section__heading">
        <div>
          <span className="category-section__eyebrow">از ایده تا ساخت</span>
          <h2 id="category-section-title">دسته‌بندی‌های اصلی</h2>
          <p>از تجهیزات و محصولات آماده تا فایل دیجیتال و سفارش اختصاصی، مسیرت رو انتخاب کن.</p>
        </div>
        <a className="category-section__all" href="#categories">
          مشاهده همه <ArrowLeft size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="category-section__grid" id="categories">
        {categories.map(({ title, description, icon: Icon, tone, image, imageAlt }) => (
          <a className="category-tile" href="#categories" key={title}>
            <img className="category-tile__image" src={image} alt={imageAlt} loading="lazy" />
            <span className="category-tile__overlay" aria-hidden="true" />
            <span className={`category-tile__icon category-tile__icon--${tone}`}>
              <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
            </span>
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
