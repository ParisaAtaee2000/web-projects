import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
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
  { id: "geometric-planter", title: "گلدان هندسی لایه‌ای", maker: "استودیو فرمینو", category: "محصول چاپ سه‌بعدی", price: "۴۲۰٬۰۰۰", rating: "۴٫۹", reviews: "۲۸", image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "گلدان دکوراتیو هندسی", description: "یک قطعه دکوراتیو با فرم هندسی و ظاهر مینیمال؛ مناسب میز کار، قفسه یا هدیه‌ای متفاوت. جزئیات نهایی محصول و ابعاد دقیق باید از طرف سازنده تأیید شود.", specs: [["سازنده", "استودیو فرمینو"], ["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "core-printer", title: "پرینتر سه‌بعدی Core", maker: "کارگاه نوا", category: "پرینتر سه‌بعدی", price: "۱۸٬۹۰۰٬۰۰۰", rating: "۴٫۸", reviews: "۱۶", image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "پرینتر سه‌بعدی روی میز کار", description: "نمونه‌ای برای نمایش دستگاه‌های عرضه‌شده توسط فروشندگان بازار. پیش از خرید واقعی، مشخصات فنی، ابعاد چاپ، وضعیت گارانتی و اقلام همراه باید ثبت و بررسی شوند.", specs: [["سازنده / فروشنده", "کارگاه نوا"], ["دسته‌بندی", "تجهیزات چاپ سه‌بعدی"], ["گارانتی", "نیازمند تأیید فروشنده"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "nozzle-toolkit", title: "کیت نگهداری چاپگر", maker: "تک‌میکر", category: "لوازم جانبی", price: "۶۸۰٬۰۰۰", rating: "۴٫۷", reviews: "۱۲", image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "ابزار و قطعات فنی", description: "یک مجموعه نمونه برای نگهداری روزمره تجهیزات چاپ سه‌بعدی. سازگاری ابزارها با مدل دستگاه و محتویات دقیق بسته باید توسط فروشنده مشخص شود.", specs: [["فروشنده", "تک‌میکر"], ["دسته‌بندی", "لوازم جانبی"], ["سازگاری", "نیازمند بررسی مدل دستگاه"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "matte-purple-pla", title: "فیلامنت PLA بنفش مات", maker: "متریال‌لب", category: "مواد مصرفی", price: "۵۲۰٬۰۰۰", rating: "۴٫۹", reviews: "۳۴", image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200", alt: "فیلامنت رنگی برای چاپ سه‌بعدی", description: "نمونه‌ای از مواد مصرفی موردنیاز برای چاپ سه‌بعدی. قطر فیلامنت، وزن قرقره، دمای پیشنهادی و سازگاری دستگاه باید پیش از عرضه واقعی به‌طور دقیق درج شوند.", specs: [["فروشنده", "متریال‌لب"], ["نوع", "PLA"], ["رنگ", "بنفش مات"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "desk-organizer", title: "ارگانایزر رومیزی ماژولار", maker: "استودیو فرمینو", category: "محصول چاپ سه‌بعدی", price: "۳۵۰٬۰۰۰", rating: "۴٫۶", reviews: "۹", image: "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "وسیله کاربردی برای میز کار", description: "وسیله‌ای کاربردی برای مرتب‌سازی لوازم کوچک روی میز. امکان انتخاب رنگ و اندازه در نسخه واقعی به تنظیمات و توانایی سازنده بستگی دارد.", specs: [["سازنده", "استودیو فرمینو"], ["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "نظم‌دهی میز"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "precision-nozzle", title: "نازل دقیق ۰٫۴ میلی‌متری", maker: "تک‌میکر", category: "لوازم جانبی", price: "۱۹۰٬۰۰۰", rating: "۴٫۸", reviews: "۲۱", image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "قطعات فنی و ابزار دقیق", description: "قطعه‌ای مصرفی برای برخی چاپگرهای سه‌بعدی. نوع رزوه و سازگاری با مدل دستگاه باید پیش از خرید توسط فروشنده تأیید شود.", specs: [["فروشنده", "تک‌میکر"], ["قطر اسمی", "۰٫۴ میلی‌متر"], ["سازگاری", "نیازمند تأیید مدل دستگاه"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "pla-starter-pack", title: "بسته شروع فیلامنت PLA", maker: "متریال‌لب", category: "مواد مصرفی", price: "۷۹۰٬۰۰۰", rating: "۴٫۷", reviews: "۱۸", image: "https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "مواد اولیه چاپ سه‌بعدی", description: "بسته نمونه برای افرادی که می‌خواهند چاپ سه‌بعدی را با چند ماده اولیه آغاز کنند. رنگ‌ها، وزن و تعداد قرقره‌ها باید در نسخه واقعی مشخص شوند.", specs: [["فروشنده", "متریال‌لب"], ["نوع ماده", "PLA"], ["محتویات", "نیازمند تأیید فروشنده"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
  { id: "mini-planter", title: "گلدان مینیمال مینی", maker: "میکر روم", category: "محصول چاپ سه‌بعدی", price: "۲۴۰٬۰۰۰", rating: "۴٫۵", reviews: "۷", image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "گلدان کوچک دکوراتیو", description: "گلدانی کوچک با فرم ساده برای فضاهای جمع‌وجور. ابعاد، رنگ‌های قابل سفارش و مقاومت در برابر رطوبت باید از سوی سازنده اعلام شود.", specs: [["سازنده", "میکر روم"], ["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["وضعیت اطلاعات", "نمونه نمایشی"]] },
];

export function ProductDetailsPage() {
  const productId = decodeURIComponent(window.location.pathname.split("/").filter(Boolean).at(-1) ?? "");
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

  return (
    <main className="page product-detail" dir="rtl">
      <a className="product-detail__back" href={ROUTES.products}><ArrowRight size={16} aria-hidden="true" /> بازگشت به همه محصولات</a>
      <div className="product-detail__layout">
        <section className="product-detail__visual" aria-label="تصویر محصول">
          <img className="product-detail__image" src={product.image} alt={product.alt} />
          <div className="product-detail__visual-note"><span className="product-detail__category">{product.category}</span><span>Makerā / بازار سازندگان</span></div>
        </section>
        <section className="product-detail__information">
          <span className="product-detail__maker">{product.maker}</span>
          <h1 className="product-detail__title">{product.title}</h1>
          <div className="product-detail__rating"><Star size={15} fill="currentColor" aria-hidden="true" /> {product.rating} <span>({product.reviews} نظر نمونه)</span></div>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__price-box">
            <span className="product-detail__price-label">قیمت نمونه</span>
            <strong className="product-detail__price">{product.price}<small>تومان</small></strong>
            <span className="product-detail__status"><CheckCircle2 size={15} aria-hidden="true" /> نمایش اطلاعات محصول</span>
            <p className="product-detail__notice">این صفحه در حال حاضر برای بررسی تجربه کاربری است و سفارش یا پرداخت واقعی انجام نمی‌دهد.</p>
          </div>
          <div className="product-detail__specs">
            <h2>مشخصات محصول</h2>
            {product.specs.map(([label, value]) => <div className="product-detail__spec" key={label}><span>{label}</span><span>{value}</span></div>)}
          </div>
          <div className="product-detail__sample-warning">اطلاعات، قیمت و امتیازهای این نسخه نمونه هستند. پس از تعیین قرارداد API، داده‌های واقعی از سرویس فروشگاه دریافت خواهند شد.</div>
        </section>
      </div>
    </main>
  );
}
