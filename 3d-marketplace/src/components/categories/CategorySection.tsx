import { ArrowLeft } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { categories } from "../../data/categories";
import "./category-section.css";

export function CategorySection() {
  return (
    <section className="category-section" aria-labelledby="category-section-title" dir="rtl">
      <div className="category-section__heading">
        <div>
          <span className="category-section__eyebrow">از ایده تا ساخت</span>
          <h2 id="category-section-title">دسته‌بندی‌های اصلی</h2>
          <p>از تجهیزات و محصولات آماده تا فایل دیجیتال و سفارش اختصاصی، مسیرت رو انتخاب کن.</p>
        </div>
        <a className="category-section__all" href={ROUTES.categories}>
          مشاهده همه <ArrowLeft size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="category-section__grid" id="categories">
        {categories.map(({ id, title, description, href, icon: Icon, tone, image, imageAlt }) => (
          <a className="category-tile" href={href} key={id}>
            <img className="category-tile__image" src={image} alt={imageAlt} loading="lazy" />
            <span className="category-tile__overlay" aria-hidden="true" />
            <span className={"category-tile__icon category-tile__icon--" + tone}>
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
