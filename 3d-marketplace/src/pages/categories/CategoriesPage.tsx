import { ArrowLeft } from "lucide-react";
import { categories } from "../../data/categories";

export function CategoriesPage() {
  return (
    <main className="page categories-page">
      <header className="categories-page__heading">
        <span className="categories-page__eyebrow">از ایده تا ساخت</span>
        <h1>دسته‌بندی‌های چاپ سه‌بعدی</h1>
        <p>مسیر مناسب خودت را انتخاب کن؛ از دستگاه و مواد مصرفی تا فایل آماده و ساخت سفارشی.</p>
      </header>

      <div className="categories-page__grid">
        {categories.map(({ id, title, description, href, icon: Icon, tone }) => (
          <a className="categories-page__card" href={href} key={id}>
            <span className={"categories-page__icon categories-page__icon--" + tone}>
              <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="categories-page__copy">
              <h2>{title}</h2>
              <p>{description}</p>
            </span>
            <ArrowLeft className="categories-page__arrow" size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </main>
  );
}
