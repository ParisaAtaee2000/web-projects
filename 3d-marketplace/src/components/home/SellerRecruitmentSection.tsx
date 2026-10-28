import { ArrowLeft, Boxes, CheckCircle2, Store } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function SellerRecruitmentSection() {
  return (
    <section className="home-section seller-recruitment" aria-labelledby="seller-recruitment-title" dir="rtl">
      <div className="seller-recruitment__mark" aria-hidden="true"><Store size={28} strokeWidth={1.5} /></div>
      <div className="seller-recruitment__copy">
        <span className="home-eyebrow">برای سازنده‌ها و فروشنده‌ها</span>
        <h2 id="seller-recruitment-title">ساخته‌ات را به <span>آدم‌های بیشتری</span> نشان بده</h2>
        <p>محصول چاپی، پرینتر، مواد مصرفی یا فایل سه‌بعدی‌ات را برای حضور در بازار Makerā آماده کن.</p>
        <div className="seller-recruitment__benefits">
          <span><CheckCircle2 size={15} aria-hidden="true" /> معرفی تخصص و محصولات</span>
          <span><CheckCircle2 size={15} aria-hidden="true" /> مناسب برای محصولات چاپ سه‌بعدی</span>
        </div>
      </div>
      <div className="seller-recruitment__action">
        <a href={ROUTES.sellerRegister}>آشنایی با فروشندگی <ArrowLeft size={17} aria-hidden="true" /></a>
        <small><Boxes size={14} aria-hidden="true" /> صفحهٔ ثبت‌نام فعلاً نمایشی است</small>
      </div>
    </section>
  );
}
