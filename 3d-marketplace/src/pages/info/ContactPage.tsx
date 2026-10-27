import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./info-pages.css";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [previewReady, setPreviewReady] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewReady(true);
  }

  return (
    <main className="info-page page contact-page">
      <header className="info-page__hero">
        <span className="info-page__eyebrow">تماس با ما</span>
        <h1>حرفی داری؟ <span>از همین‌جا شروع کن.</span></h1>
        <p>پیشنهادها، پرسش‌ها و بازخوردهایت به بهتر شدن تجربهٔ Makerā کمک می‌کنند.</p>
      </header>

      <div className="contact-layout">
        <section className="contact-form-card" aria-labelledby="contact-form-title">
          <div className="info-page__section-heading">
            <h2 id="contact-form-title">ارسال پیام</h2>
            <p>فرم زیر در این نسخه فقط پیش‌نمایش اطلاعات را آماده می‌کند و پیام را ارسال نمی‌کند.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              نام
              <input value={name} onChange={(event) => { setName(event.target.value); setPreviewReady(false); }} required placeholder="نام شما" autoComplete="name" />
            </label>
            <label>
              ایمیل
              <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setPreviewReady(false); }} required placeholder="you@example.com" autoComplete="email" />
            </label>
            <label>
              موضوع پیام
              <select value={topic} onChange={(event) => { setTopic(event.target.value); setPreviewReady(false); }}>
                <option value="general">پرسش عمومی</option>
                <option value="products">محصولات و تجهیزات</option>
                <option value="custom-order">سفارش اختصاصی</option>
                <option value="seller">همکاری و فروشندگی</option>
                <option value="feedback">پیشنهاد و بازخورد</option>
              </select>
            </label>
            <label>
              متن پیام
              <textarea value={message} onChange={(event) => { setMessage(event.target.value); setPreviewReady(false); }} required rows={5} placeholder="چطور می‌توانیم راهنمایی‌ات کنیم؟" />
            </label>
            <button className="info-page__button contact-form__submit" type="submit">آماده‌سازی پیش‌نمایش <Send size={16} aria-hidden="true" /></button>
            {previewReady && (
              <div className="contact-form__preview" role="status">
                <strong>پیش‌نمایش پیام آماده شد.</strong>
                <p>موضوع: {topic === "general" ? "پرسش عمومی" : topic === "products" ? "محصولات و تجهیزات" : topic === "custom-order" ? "سفارش اختصاصی" : topic === "seller" ? "همکاری و فروشندگی" : "پیشنهاد و بازخورد"}</p>
                <p>این پیام هنوز ارسال یا ذخیره نشده است؛ برای فعال شدن ارسال، باید سرویس بک‌اند متصل شود.</p>
              </div>
            )}
          </form>
        </section>

        <aside className="contact-aside">
          <article className="contact-aside__card">
            <span className="contact-aside__icon"><Mail size={20} aria-hidden="true" /></span>
            <h3>ایمیل پشتیبانی</h3>
            <p>آدرس ایمیل رسمی هنوز برای نسخهٔ اولیه تنظیم نشده است.</p>
          </article>
          <article className="contact-aside__card">
            <span className="contact-aside__icon"><MessageCircle size={20} aria-hidden="true" /></span>
            <h3>راهنما و پشتیبانی</h3>
            <p>پاسخ‌های متداول را در صفحهٔ راهنما ببین.</p>
            <a href={ROUTES.support}>مشاهدهٔ راهنما <span aria-hidden="true">←</span></a>
          </article>
          <article className="contact-aside__card">
            <span className="contact-aside__icon"><MapPin size={20} aria-hidden="true" /></span>
            <h3>نشانی</h3>
            <p>نشانی حضوری یا دفتر رسمی برای این نسخه تعریف نشده است.</p>
          </article>
        </aside>
      </div>
    </main>
  );
}
