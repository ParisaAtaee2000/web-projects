import { useState } from "react";
import { ArrowLeft, BadgeCheck, CheckCircle2, Headset, MessageCircle, PackageCheck, ShieldCheck, ShoppingCart, Star, Store } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { addToCart, parseLocalizedPrice } from "../../lib/demoCart";
import "./product-detail.css";

type ProductDetail = {
  id: string;
  title: string;
  maker: string;
  category: string;
  price: string;
  rating: string;
  reviews: string;
  image: string;
  alt: string;
  description: string;
  specs: [string, string][];
};

const productDetails: ProductDetail[] = [
  { id: "geometric-planter", title: "گلدان هندسی لایه‌ای", maker: "استودیو فرمینو", category: "محصول چاپ سه‌بعدی", price: "۴۲۰٬۰۰۰", rating: "۴٫۹", reviews: "۲۸", image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "گلدان دکوراتیو هندسی", description: "یک قطعه دکوراتیو با فرم هندسی و ظاهر مینیمال؛ مناسب میز کار، قفسه یا هدیه‌ای متفاوت. جزئیات نهایی محصول و ابعاد دقیق باید از طرف سازنده تأیید شود.", specs: [["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["متریال", "PLA"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "core-printer", title: "پرینتر سه‌بعدی Core", maker: "کارگاه نوا", category: "پرینتر سه‌بعدی", price: "۱۸٬۹۰۰٬۰۰۰", rating: "۴٫۸", reviews: "۱۶", image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "پرینتر سه‌بعدی روی میز کار", description: "نمونه‌ای برای نمایش دستگاه‌های عرضه‌شده توسط فروشندگان بازار. پیش از خرید واقعی، مشخصات فنی، ابعاد چاپ، وضعیت گارانتی و اقلام همراه باید ثبت و بررسی شوند.", specs: [["فروشنده", "کارگاه نوا"], ["دسته‌بندی", "تجهیزات چاپ سه‌بعدی"], ["گارانتی", "نیازمند تأیید فروشنده"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "nozzle-toolkit", title: "کیت نگهداری چاپگر", maker: "تک‌میکر", category: "لوازم جانبی", price: "۶۸۰٬۰۰۰", rating: "۴٫۷", reviews: "۱۲", image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "ابزار و قطعات فنی", description: "یک مجموعه نمونه برای نگهداری روزمره تجهیزات چاپ سه‌بعدی. سازگاری ابزارها با مدل دستگاه و محتویات دقیق بسته باید توسط فروشنده مشخص شود.", specs: [["فروشنده", "تک‌میکر"], ["دسته‌بندی", "لوازم جانبی"], ["سازگاری", "نیازمند بررسی مدل دستگاه"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "matte-purple-pla", title: "فیلامنت PLA بنفش مات", maker: "متریال‌لب", category: "مواد مصرفی", price: "۵۲۰٬۰۰۰", rating: "۴٫۹", reviews: "۳۴", image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200", alt: "فیلامنت رنگی برای چاپ سه‌بعدی", description: "نمونه‌ای از مواد مصرفی موردنیاز برای چاپ سه‌بعدی. قطر فیلامنت، وزن قرقره، دمای پیشنهادی و سازگاری دستگاه باید پیش از عرضه واقعی به‌طور دقیق درج شوند.", specs: [["فروشنده", "متریال‌لب"], ["نوع", "PLA"], ["رنگ", "بنفش مات"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "desk-organizer", title: "ارگانایزر رومیزی ماژولار", maker: "استودیو فرمینو", category: "محصول چاپ سه‌بعدی", price: "۳۵۰٬۰۰۰", rating: "۴٫۶", reviews: "۹", image: "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "وسیله کاربردی برای میز کار", description: "وسیله‌ای کاربردی برای مرتب‌سازی لوازم کوچک روی میز. امکان انتخاب رنگ و اندازه در نسخه واقعی به تنظیمات و توانایی سازنده بستگی دارد.", specs: [["سازنده", "استودیو فرمینو"], ["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "نظم‌دهی میز"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "precision-nozzle", title: "نازل دقیق ۰٫۴ میلی‌متری", maker: "تک‌میکر", category: "لوازم جانبی", price: "۱۹۰٬۰۰۰", rating: "۴٫۸", reviews: "۲۱", image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "قطعات فنی و ابزار دقیق", description: "قطعه‌ای مصرفی برای برخی چاپگرهای سه‌بعدی. نوع رزوه و سازگاری با مدل دستگاه باید پیش از خرید توسط فروشنده تأیید شود.", specs: [["فروشنده", "تک‌میکر"], ["قطر اسمی", "۰٫۴ میلی‌متر"], ["سازگاری", "نیازمند تأیید مدل دستگاه"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "pla-starter-pack", title: "بسته شروع فیلامنت PLA", maker: "متریال‌لب", category: "مواد مصرفی", price: "۷۹۰٬۰۰۰", rating: "۴٫۷", reviews: "۱۸", image: "https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "مواد اولیه چاپ سه‌بعدی", description: "بسته نمونه برای افرادی که می‌خواهند چاپ سه‌بعدی را با چند ماده اولیه آغاز کنند. رنگ‌ها، وزن و تعداد قرقره‌ها باید در نسخه واقعی مشخص شوند.", specs: [["فروشنده", "متریال‌لب"], ["نوع ماده", "PLA"], ["محتویات", "نیازمند تأیید فروشنده"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "mini-planter", title: "گلدان مینیمال مینی", maker: "میکر روم", category: "محصول چاپ سه‌بعدی", price: "۲۴۰٬۰۰۰", rating: "۴٫۵", reviews: "۷", image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "گلدان کوچک دکوراتیو", description: "گلدانی کوچک با فرم ساده برای فضاهای جمع‌وجور. ابعاد، رنگ‌های قابل سفارش و مقاومت در برابر رطوبت باید از سوی سازنده اعلام شود.", specs: [["سازنده", "میکر روم"], ["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
];

export function ProductDetailsPage() {
  const [added, setAdded] = useState(false);
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const productId = decodeURIComponent(pathParts[pathParts.length - 1] ?? "");
  const product = productDetails.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="page product-detail product-detail__missing" dir="rtl">
        <h1>این محصول پیدا نشد</h1>
        <p>ممکن است محصول از فهرست نمونه حذف شده باشد یا نشانی آن درست نباشد.</p>
        <a href={ROUTES.products}>بازگشت به همه محصولات</a>
      </main>
    );
  }

  const relatedProducts = productDetails.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <main className="page product-detail" dir="rtl">
      <nav className="product-detail__breadcrumbs" aria-label="مسیر صفحه">
        <a href={ROUTES.home}>خانه</a><span>/</span><a href={ROUTES.products}>محصولات</a><span>/</span><span>{product.title}</span>
      </nav>
      <div className="product-detail__layout">
        <section className="product-detail__visual" aria-label="تصاویر محصول">
          <div className="product-detail__image-wrap">
            <img className="product-detail__image" src={product.image} alt={product.alt} />
            <span className="product-detail__image-count">۱ / ۵</span>
          </div>
          <div className="product-detail__thumbnails" aria-label="تصاویر بیشتر محصول">
            {[0, 1, 2, 3, 4].map((item) => (
              <div className={"product-detail__thumbnail" + (item === 0 ? " is-active" : "")} key={item}>
                <img src={product.image} alt="" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="product-detail__visual-note"><span className="product-detail__category">{product.category}</span><span>تصاویر نمونه محصول</span></div>
        </section>

        <section className="product-detail__information">
          <span className="product-detail__maker">{product.maker}</span>
          <h1 className="product-detail__title">{product.title}</h1>
          <div className="product-detail__rating"><Star size={15} fill="currentColor" aria-hidden="true" /> {product.rating} <span>({product.reviews} نظر نمونه)</span></div>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__key-specs">
            <div><span>◇</span><strong>کیفیت ساخت</strong><small>کنترل‌شده</small></div>
            <div><span>♧</span><strong>نوع محصول</strong><small>{product.category}</small></div>
            <div><span>✓</span><strong>سفارش‌سازی</strong><small>بر اساس موجودی</small></div>
          </div>
          <div className="product-detail__options">
            <strong>رنگ / گزینه‌ها</strong>
            <div className="product-detail__swatches"><i className="is-selected" /><i /><i /><i /></div>
          </div>
          <div className="product-detail__price-box">
            <span className="product-detail__price-label">قیمت</span>
            <strong className="product-detail__price">{product.price}<small>تومان</small></strong>
            <span className="product-detail__status"><CheckCircle2 size={15} aria-hidden="true" /> اطلاعات محصول</span>
          </div>
          <button className={"product-detail__cart" + (added ? " is-added" : "")} type="button" onClick={() => { addToCart({ id: product.id, title: product.title, maker: product.maker, price: parseLocalizedPrice(product.price), image: product.image, alt: product.alt, categoryLabel: product.category }); setAdded(true); }}>
            <ShoppingCart size={17} aria-hidden="true" /> {added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
          </button>
          <a className="product-detail__custom-link" href={ROUTES.customOrders}>درخواست محصول مشابه یا سفارش اختصاصی <ArrowLeft size={14} aria-hidden="true" /></a>
          <div className="product-detail__service-row">
            <span><PackageCheck size={16} aria-hidden="true" /> ارسال سریع</span>
            <span><ShieldCheck size={16} aria-hidden="true" /> پرداخت امن</span>
            <span><Headset size={16} aria-hidden="true" /> پشتیبانی تخصصی</span>
          </div>
        </section>

        <aside className="product-detail__seller">
          <div className="product-detail__seller-top">
            <div className="product-detail__seller-avatar">{product.maker.slice(0, 1)}</div>
            <div><small>فروشنده</small><strong>{product.maker}</strong><span><BadgeCheck size={12} aria-hidden="true" /> فروشنده نمونه</span></div>
          </div>
          <div className="product-detail__seller-rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {product.rating} <small>امتیاز فروشنده</small></div>
          <div className="product-detail__seller-metrics"><span>محصولات فروشگاه</span><strong>۲۴</strong></div>
          <a className="product-detail__seller-store" href={ROUTES.makers}><Store size={15} aria-hidden="true" /> مشاهده فروشگاه</a>
          <a className="product-detail__seller-message" href={ROUTES.contact}><MessageCircle size={15} aria-hidden="true" /> تماس با فروشنده</a>
          <div className="product-detail__seller-note"><ShieldCheck size={16} aria-hidden="true" /><span>قبل از سفارش، مشخصات و شرایط ارسال را با فروشنده بررسی کنید.</span></div>
        </aside>
      </div>

      <section className="product-detail__lower">
        <div className="product-detail__specs">
          <h2>مشخصات فنی و کلی</h2>
          <div className="product-detail__spec-grid">
            {product.specs.map(([label, value]) => <div className="product-detail__spec" key={label}><span>{label}</span><span>{value}</span></div>)}
          </div>
          <div className="product-detail__sample-warning">اطلاعات، قیمت و امتیازهای این نسخه نمونه هستند. پس از تعیین قرارداد API، داده‌های واقعی از سرویس فروشگاه دریافت خواهند شد.</div>
        </div>
        <section className="product-detail__reviews" aria-labelledby="product-reviews-title">
          <div className="product-detail__reviews-summary">
            <h2 id="product-reviews-title">نظرات خریداران</h2>
            <strong>{product.rating} <Star size={17} fill="currentColor" aria-hidden="true" /></strong>
            <p>بر اساس {product.reviews} نظر نمونه</p>
          </div>
          <div className="product-detail__review-bars">
            {[["۵ ستاره", "78%"], ["۴ ستاره", "15%"], ["۳ ستاره", "5%"], ["۲ ستاره", "2%"]].map(([label, width]) => (
              <div className="product-detail__review-bar" key={label}><span>{label}</span><i><b style={{ width }} /></i></div>
            ))}
          </div>
          <article className="product-detail__review-card"><strong>خریدار نمونه</strong><span>★★★★★</span><p>کیفیت ساخت و جزئیات محصول برای این نمونه نمایشی مناسب است.</p><small>نظر نمایشی برای پیش‌نمایش رابط کاربری</small></article>
        </section>
      </section>

      <section className="product-detail__related" aria-labelledby="related-products-title">
        <div className="product-detail__related-heading"><h2 id="related-products-title">محصولات مرتبط</h2><a href={ROUTES.products}>مشاهده همه <ArrowLeft size={13} aria-hidden="true" /></a></div>
        <div className="product-detail__related-grid">
          {relatedProducts.map((item) => (
            <a className="product-detail__related-card" href={\`\${ROUTES.products}/\${item.id}\`} key={item.id}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <strong>{item.title}</strong>
              <small><Star size={11} fill="currentColor" aria-hidden="true" /> {item.rating}</small>
              <span>{item.price} تومان</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
