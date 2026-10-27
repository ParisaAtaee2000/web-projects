import { ArrowLeft, FileBox, Layers3 } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

const fileCards = [
  { id: "desk-organizer", name: "ارگانایزر رومیزی", type: "STL · ۱۲ قطعه", tag: "خانه و میزکار", tone: "violet" },
  { id: "camera-mount", name: "پایهٔ قابل تنظیم دوربین", type: "STL · ۳ قطعه", tag: "ابزار و تجهیزات", tone: "blue" },
  { id: "gear-set", name: "مجموعه چرخ‌دنده آزمایشی", type: "3MF · ۸ قطعه", tag: "قطعات فنی", tone: "orange" },
];

export function ModelFilesSection() {
  return (
    <section className="home-section model-files" id="model-files" dir="rtl" aria-labelledby="model-files-title">
      <div className="home-section__header">
        <div>
          <span className="home-eyebrow">از فایل شروع کن</span>
          <h2 className="home-section__title" id="model-files-title">مدل آماده داری؟ <span>مستقیم برو سراغ ساخت</span></h2>
          <p className="home-section__lead">فایل‌های سه‌بعدی برای چاپ و نمونه‌سازی؛ نمونه‌هایی از تجربهٔ کشف فایل در بازار.</p>
        </div>
        <a className="home-text-link" href={ROUTES.files3d}>رفتن به فایل‌ها <ArrowLeft size={16} aria-hidden="true" /></a>
      </div>
      <div className="model-file-grid">
        {fileCards.map((file, index) => (
          <article className={`model-file-card model-file-card--${file.tone}`} key={file.id}>
            <a className="model-file-card__art" href={ROUTES.files3d} aria-label={`مشاهده فایل ${file.name}`}>
              <span className="model-file-card__mesh" aria-hidden="true" />
              <span className="model-file-card__shape" aria-hidden="true"><i /><i /><i /></span>
              <span className="model-file-card__number">MODEL / 0{index + 1}</span>
              <span className="model-file-card__filetype">{file.type.split(" · ")[0]}</span>
            </a>
            <div className="model-file-card__body">
              <span className="model-file-card__tag"><Layers3 size={13} aria-hidden="true" /> {file.tag}</span>
              <h3>{file.name}</h3>
              <div className="model-file-card__footer">
                <span><FileBox size={15} aria-hidden="true" /> {file.type}</span>
                <a href={ROUTES.files3d} aria-label={`مشاهده فایل ${file.name}`}><ArrowLeft size={16} aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="home-section__footnote">این کارت‌ها نمونهٔ طراحی هستند؛ فایل دانلودی، مجوز استفاده و اطلاعات سازنده در این نسخه ارائه نمی‌شود.</p>
    </section>
  );
}
