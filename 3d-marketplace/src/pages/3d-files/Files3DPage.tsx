import { useMemo, useState } from "react";
import { ArrowLeft, FileBox, Layers3, Search, Sparkles } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "../../components/catalog/marketplace-pages.css";

const files = [
  { id: "organizer", name: "ارگانایزر رومیزی ماژولار", format: "STL", parts: "۱۲ قطعه", tag: "خانه و میزکار", tone: "violet", description: "مدلی برای سامان‌دهی وسایل کوچک روی میز. قبل از چاپ باید ابعاد و جهت قرارگیری بررسی شود.", level: "آسان", license: "مجوز نمونه تعریف نشده" },
  { id: "camera-mount", name: "پایهٔ قابل تنظیم دوربین", format: "3MF", parts: "۳ قطعه", tag: "ابزار و تجهیزات", tone: "blue", description: "طرح مفهومی یک پایهٔ قابل تنظیم برای نمونه‌سازی. بار قابل تحمل یا تناسب با دوربین واقعی تأیید نشده است.", level: "متوسط", license: "مجوز نمونه تعریف نشده" },
  { id: "gear-set", name: "مجموعه چرخ‌دنده آزمایشی", format: "STL", parts: "۸ قطعه", tag: "قطعات فنی", tone: "orange", description: "مجموعه‌ای آموزشی برای بررسی مونتاژ چرخ‌دنده‌ها؛ برای کاربرد باربر یا صنعتی طراحی تأییدشده نیست.", level: "متوسط", license: "مجوز نمونه تعریف نشده" },
  { id: "cable-clip", name: "گیرهٔ کابل رومیزی", format: "STL", parts: "۲ قطعه", tag: "لوازم جانبی", tone: "green", description: "مدل سادهٔ گیره برای هدایت کابل‌ها. ضخامت دیواره و اندازهٔ شیار باید متناسب با کاربرد بررسی شود.", level: "آسان", license: "مجوز نمونه تعریف نشده" },
  { id: "sensor-case", name: "قاب نمونهٔ حسگر", format: "3MF", parts: "۴ قطعه", tag: "قطعات فنی", tone: "violet", description: "قاب مفهومی برای نمونه‌سازی برد و حسگر؛ اندازهٔ دقیق قطعات الکترونیکی در این نسخه تضمین نشده است.", level: "متوسط", license: "مجوز نمونه تعریف نشده" },
  { id: "plant-pot", name: "گلدان هندسی", format: "STL", parts: "۱ قطعه", tag: "دکور و خانه", tone: "orange", description: "مدل نمایشی گلدان هندسی برای بررسی فرم و ظاهر چاپ.", level: "آسان", license: "مجوز نمونه تعریف نشده" },
];

export function Files3DPage() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible = useMemo(() => files.filter((file) => `${file.name} ${file.tag} ${file.format}`.toLocaleLowerCase("fa").includes(query.trim().toLocaleLowerCase("fa"))), [query]);
  return (
    <div className="page" dir="rtl">
      <header className="form-page__header">
        <span className="marketplace-catalog__eyebrow"><FileBox size={15} aria-hidden="true" /> کتابخانهٔ مدل‌ها</span>
        <h1>از فایل شروع کن</h1>
        <p>مدل‌های مفهومی را برای بررسی، نمونه‌سازی و برنامه‌ریزی چاپ کشف کن.</p>
      </header>
      <label className="marketplace-catalog__search" style={{ maxWidth: 560, marginBottom: 22 }}><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی نام فایل، فرمت یا کاربرد..." aria-label="جست‌وجوی فایل‌های سه‌بعدی" /></label>
      {visible.length ? <div className="file-library__grid">{visible.map((file, index) => (
        <article className={`file-library-card file-library-card--${file.tone}`} key={file.id}>
          <div className="file-library-card__art"><span className="file-library-card__mesh" aria-hidden="true" /><span className="file-library-card__number">MODEL / {String(index + 1).padStart(2, "0")}</span><span className="file-library-card__format">{file.format}</span><span className="file-library-card__shape"><i /><i /><i /></span><span className="file-library-card__parts">{file.parts}</span></div>
          <div className="file-library-card__body"><span className="file-library-card__tag"><Layers3 size={13} aria-hidden="true" /> {file.tag}</span><h2>{file.name}</h2><p>{file.description}</p>
            {expanded === file.id && <div className="file-library-card__details"><span>سطح مدل: {file.level}</span><span>تعداد قطعات: {file.parts}</span><span>مجوز: {file.license}</span><strong>فایل واقعی برای دانلود در این نسخه موجود نیست.</strong></div>}
            <div className="file-library-card__actions"><button type="button" onClick={() => setExpanded((current) => current === file.id ? null : file.id)}>{expanded === file.id ? "بستن جزئیات" : "جزئیات مدل"}</button><a href={ROUTES.customOrders}>درخواست چاپ <ArrowLeft size={14} aria-hidden="true" /></a></div>
          </div>
        </article>
      ))}</div> : <div className="cart-empty"><h2>مدلی پیدا نشد</h2><p>نام یا عبارت دیگری را جست‌وجو کن.</p></div>}
      <div className="form-note"><Sparkles size={15} aria-hidden="true" /> این کتابخانه نمونهٔ رابط کاربری است؛ فایل‌های STL/3MF، مجوزها و دانلود واقعی هنوز به سرویس فایل متصل نیستند.</div>
    </div>
  );
}
