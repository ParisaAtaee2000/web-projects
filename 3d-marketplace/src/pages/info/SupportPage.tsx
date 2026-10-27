import { ArrowLeft, Box, CreditCard, PackageCheck, Printer, RefreshCw } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./info-pages.css";

const topics = [
  { icon: PackageCheck, title: "خرید و پیگیری سفارش", text: "وضعیت سفارش، زمان آماده‌سازی و ارسال باید از اطلاعات همان فروشنده یا سفارش بررسی شود." },
  { icon: Printer, title: "انتخاب پرینتر و مواد", text: "برای انتخاب دستگاه یا فیلامنت، مشخصات فنی، سازگاری مواد و کاربرد موردنظر را با هم مقایسه کن." },
  { icon: Box, title: "فایل و سفارش ساخت", text: "پیش از ساخت، فرمت فایل، ابعاد، جنس، تلرانس و امکان‌پذیری تولید باید با سازنده هماهنگ شود." },
  { icon: CreditCard, title: "پرداخت و بازگشت وجه", text: "قوانین پرداخت و مرجوعی هنوز در نسخهٔ نمایشی تعریف نشده‌اند؛ پیش از خرید واقعی باید سیاست نهایی منتشر شود." },
];

const questions = [
  { q: "آیا در حال حاضر می‌توانم سفارش واقعی ثبت کنم؟", a: "خیر. این نسخه برای بررسی رابط کاربری است. اتصال به سرور، ثبت سفارش و پرداخت هنوز پیاده‌سازی نشده‌اند." },
  { q: "آیا قیمت و امتیاز محصولات واقعی است؟", a: "خیر. قیمت‌ها، امتیازها و نام فروشندگان صفحهٔ اصلی داده‌های نمایشی‌اند و پیشنهاد خرید واقعی محسوب نمی‌شوند." },
  { q: "چطور می‌توانم برای ساخت قطعهٔ اختصاصی اقدام کنم؟", a: "مسیر «سفارش اختصاصی» در حال حاضر راهنمایی و طرح اولیهٔ جریان کار را نشان می‌دهد. فرم ارسال درخواست و ذخیرهٔ آن پس از تکمیل فرانت‌اند و اتصال بک‌اند فعال می‌شود." },
  { q: "چطور با پشتیبانی تماس بگیرم؟", a: "از صفحهٔ تماس با ما می‌توانی فرم نمونه را ببینی. ارسال پیام هنوز به سرویس یا صندوق پشتیبانی وصل نیست." },
];

export function SupportPage() {
  return (
    <main className="info-page page support-page">
      <header className="info-page__hero">
        <span className="info-page__eyebrow">راهنما و پشتیبانی</span>
        <h1>برای پیدا کردن مسیر درست، <span>کنارت هستیم.</span></h1>
        <p>پاسخ پرسش‌های متداول دربارهٔ محصولات چاپ سه‌بعدی، فایل‌ها، سفارش ساخت و تجربهٔ کار با Makerā.</p>
        <a className="info-page__button" href={ROUTES.contact}>رفتن به تماس با ما <ArrowLeft size={16} aria-hidden="true" /></a>
      </header>

      <section className="info-page__section" aria-labelledby="support-topics-title">
        <div className="info-page__section-heading">
          <span className="info-page__eyebrow">از اینجا شروع کن</span>
          <h2 id="support-topics-title">موضوع موردنظرت چیست؟</h2>
        </div>
        <div className="support-topic-grid">
          {topics.map(({ icon: Icon, title, text }) => (
            <article className="support-topic" key={title}>
              <span className="support-topic__icon"><Icon size={21} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-page__section support-faq" aria-labelledby="support-faq-title">
        <div className="info-page__section-heading">
          <span className="info-page__eyebrow">پرسش‌های متداول</span>
          <h2 id="support-faq-title">قبل از ادامه، این‌ها را بدان</h2>
        </div>
        <div className="support-faq__list">
          {questions.map((item) => (
            <details className="support-faq__item" key={item.q}>
              <summary>{item.q}<span aria-hidden="true">+</span></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="info-page__notice">
        <RefreshCw size={19} aria-hidden="true" />
        <p><strong>وضعیت نسخه:</strong> Makerā هنوز در مرحلهٔ توسعه است. قابلیت‌هایی مثل پرداخت، ثبت سفارش و ارسال پیام تا اتصال سرویس‌های لازم فعال نیستند.</p>
      </aside>
    </main>
  );
}
