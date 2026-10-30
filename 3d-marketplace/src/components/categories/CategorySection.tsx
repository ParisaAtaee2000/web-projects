import { ArrowLeft } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./category-section.css";

const homeCategories = [
  {
    id: "custom-orders",
    title: "سفارش اختصاصی",
    description: "طراحی و چاپ بر اساس ایده شما",
    href: ROUTES.customOrders,
    image: "/images/maker-category-custom.webp",
    imageAlt: "مدل سه‌بعدی آمادهٔ ساخت",
  },
  {
    id: "files",
    title: "فایل‌های سه‌بعدی",
    description: "مدل‌ها و فایل‌های قابل چاپ",
    href: ROUTES.files3d,
    image: "/images/maker-category-files.webp",
    imageAlt: "مدل سه‌بعدی برای چاپ",
  },
  {
    id: "printed-products",
    title: "محصولات چاپ سه‌بعدی",
    description: "دکور، ابزار و محصولات آماده",
    href: ROUTES.products,
    image: "/images/maker-category-printed.webp",
    imageAlt: "محصول ساخته‌شده با چاپگر سه‌بعدی",
  },
  {
    id: "equipment",
    title: "تجهیزات و لوازم جانبی",
    description: "پرینتر، فیلامنت، قطعات و ابزار",
    href: ROUTES.categories,
    image: "/images/maker-category-equipment.webp",
    imageAlt: "چاپگر سه‌بعدی و تجهیزات ساخت",
  },
];

export function CategorySection() {
  return (
    <section className="category-section" aria-labelledby="category-section-title" dir="rtl">
      <div className="category-section__heading">
        <div>
          <h2 id="category-section-title">دسته‌بندی‌های اصلی</h2>
          <p>هر آنچه برای دنیای چاپ سه‌بعدی نیاز دارید</p>
        </div>
        <a className="category-section__all" href={ROUTES.categories}>
          مشاهده همه <ArrowLeft size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="category-section__grid" id="categories">
        {homeCategories.map((category) => (
          <a className="category-tile" href={category.href} key={category.id}>
            <img
              className="category-tile__image"
              src={category.image}
              alt={category.imageAlt}
              loading="lazy"
            />
            <span className="category-tile__overlay" aria-hidden="true" />
            <span className="category-tile__copy">
              <strong>{category.title}</strong>
              <small>{category.description}</small>
            </span>
            <span className="category-tile__arrow" aria-hidden="true">
              <ArrowLeft size={15} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
