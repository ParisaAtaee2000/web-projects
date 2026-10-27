import {
  ArrowLeft,
  BadgeCheck,
  Box,
  CircleDollarSign,
  Clock3,
  Eye,
  FilePlus2,
  Package,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./seller-dashboard.css";

const stats = [
  {
    label: "محصولات فروشگاه",
    value: "۲۴",
    change: "۴ محصول در این ماه",
    icon: Box,
    tone: "violet",
  },
  {
    label: "سفارش‌های دریافتی",
    value: "۸",
    change: "۳ سفارش نیازمند پیگیری",
    icon: ShoppingBag,
    tone: "blue",
  },
  {
    label: "درخواست‌های ساخت",
    value: "۵",
    change: "۲ درخواست تازه",
    icon: FilePlus2,
    tone: "orange",
  },
  {
    label: "فروش این ماه",
    value: "۱۸٫۴۵۰٫۰۰۰",
    suffix: "تومان",
    change: "آمار نمایشی",
    icon: CircleDollarSign,
    tone: "green",
  },
];

const orders = [
  {
    id: "MK-1247",
    product: "پایهٔ نگهدارندهٔ دوربین",
    date: "۱۴۰۵/۰۸/۰۴",
    amount: "۸۹۰٬۰۰۰ تومان",
    status: "در حال آماده‌سازی",
    statusType: "pending",
  },
  {
    id: "MK-1244",
    product: "گیرهٔ کابل رومیزی",
    date: "۱۴۰۵/۰۸/۰۳",
    amount: "۳۲۰٬۰۰۰ تومان",
    status: "ارسال شده",
    statusType: "complete",
  },
  {
    id: "MK-1239",
    product: "قطعهٔ سفارشی",
    date: "۱۴۰۵/۰۸/۰۲",
    amount: "۱٬۷۵۰٬۰۰۰ تومان",
    status: "نیازمند تأیید",
    statusType: "attention",
  },
];

const customRequests = [
  {
    title: "قاب اختصاصی برای حسگر",
    details: "PLA مشکی · تعداد ۴ عدد",
    budget: "بودجهٔ پیشنهادی: ۷۰۰ هزار تومان",
    state: "در انتظار پاسخ",
    type: "pending",
  },
  {
    title: "نمونهٔ اولیهٔ قطعهٔ صنعتی",
    details: "PETG · نیازمند بررسی فایل",
    budget: "بودجه هنوز مشخص نشده",
    state: "بررسی جزئیات",
    type: "attention",
  },
];

const bestProducts = [
  { name: "پایهٔ نگهدارندهٔ ماژول", views: "۱٬۲۴۸", sold: "۱۸", width: "84%" },
  { name: "گیرهٔ کابل رومیزی", views: "۹۶۲", sold: "۱۲", width: "66%" },
  { name: "جعبهٔ قطعات الکترونیک", views: "۷۱۴", sold: "۹", width: "48%" },
];

export function SellerDashboardPage() {
  return (
    <main className="seller-dashboard page" dir="rtl">
      <div className="seller-dashboard__topline">
        <div className="seller-dashboard__breadcrumb">
          <span>Makerā</span>
          <ArrowLeft size={14} aria-hidden="true" />
          <span>پنل فروشندگان</span>
        </div>
        <span className="seller-dashboard__demo-badge">
          <span aria-hidden="true" />
          نسخهٔ نمایشی
        </span>
      </div>

      <header className="seller-dashboard__heading">
        <div>
          <span className="seller-dashboard__eyebrow">پنل مدیریت فروشگاه</span>
          <h1>داشبورد فروشنده</h1>
          <p>محصولات، سفارش‌ها و درخواست‌های ساخت را از یک نقطه مدیریت کن.</p>
        </div>
        <div className="seller-dashboard__heading-actions">
          <a className="seller-dashboard__button seller-dashboard__button--primary" href="#seller-products">
            <Box size={17} aria-hidden="true" />
            مدیریت محصولات
          </a>
          <a className="seller-dashboard__button seller-dashboard__button--ghost" href="#seller-orders">
            مشاهدهٔ سفارش‌ها
            <ArrowLeft size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="seller-dashboard__store-banner" id="store-overview">
        <span className="seller-dashboard__store-icon"><Store size={24} aria-hidden="true" /></span>
        <div className="seller-dashboard__store-copy">
          <strong>فروشگاه نمونهٔ شما</strong>
          <span>اطلاعات فروشگاه و آمارها در این صفحه آزمایشی هستند.</span>
        </div>
        <span className="seller-dashboard__store-status"><BadgeCheck size={15} aria-hidden="true" /> آمادهٔ تکمیل پروفایل</span>
        <a href={ROUTES.sellerRegister} className="seller-dashboard__text-link">تکمیل اطلاعات <ArrowLeft size={14} aria-hidden="true" /></a>
      </section>

      <section className="seller-dashboard__stats" aria-label="خلاصهٔ عملکرد فروشگاه">
        {stats.map(({ label, value, suffix, change, icon: Icon, tone }) => (
          <article className="seller-stat-card" key={label}>
            <div className={"seller-stat-card__icon seller-stat-card__icon--" + tone}>
              <Icon size={20} aria-hidden="true" />
            </div>
            <span className="seller-stat-card__label">{label}</span>
            <strong className="seller-stat-card__value">
              {value}
              {suffix && <small>{suffix}</small>}
            </strong>
            <span className="seller-stat-card__change">{change}</span>
          </article>
        ))}
      </section>

      <div className="seller-dashboard__main-grid">
        <section className="seller-panel seller-panel--orders" id="seller-orders">
          <div className="seller-panel__heading">
            <div>
              <h2>آخرین سفارش‌ها</h2>
              <p>وضعیت سفارش‌های اخیر فروشگاه</p>
            </div>
            <span className="seller-panel__heading-icon"><Package size={18} aria-hidden="true" /></span>
          </div>
          <div className="seller-orders">
            {orders.map((order) => (
              <article className="seller-order" key={order.id}>
                <div className="seller-order__top">
                  <strong>{order.product}</strong>
                  <span className={"seller-status seller-status--" + order.statusType}>{order.status}</span>
                </div>
                <div className="seller-order__meta">
                  <span>#{order.id}</span>
                  <span>{order.date}</span>
                  <strong>{order.amount}</strong>
                </div>
              </article>
            ))}
          </div>
          <p className="seller-panel__note">نمونهٔ رابط کاربری است؛ سفارش واقعی هنوز به سامانه متصل نیست.</p>
        </section>

        <section className="seller-panel seller-panel--requests" id="custom-requests">
          <div className="seller-panel__heading">
            <div>
              <h2>درخواست‌های ساخت اختصاصی</h2>
              <p>درخواست‌هایی که نیاز به بررسی سازنده دارند</p>
            </div>
            <span className="seller-panel__heading-icon seller-panel__heading-icon--orange"><FilePlus2 size={18} aria-hidden="true" /></span>
          </div>
          <div className="seller-request-list">
            {customRequests.map((request) => (
              <article className="seller-request" key={request.title}>
                <div className="seller-request__title">
                  <strong>{request.title}</strong>
                  <span className={"seller-status seller-status--" + request.type}>{request.state}</span>
                </div>
                <p>{request.details}</p>
                <div className="seller-request__bottom">
                  <small>{request.budget}</small>
                  <a href={ROUTES.customOrders} aria-label={"مشاهدهٔ اطلاعات سفارش " + request.title}>
                    جزئیات <ArrowLeft size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="seller-panel seller-panel--products" id="seller-products">
        <div className="seller-panel__heading">
          <div>
            <h2>عملکرد محصولات</h2>
            <p>مشاهده و بازدید محصولات برتر در این بازه</p>
          </div>
          <a className="seller-panel__view-all" href={ROUTES.products}>رفتن به فهرست محصولات <ArrowLeft size={14} aria-hidden="true" /></a>
        </div>
        <div className="seller-products-table-wrap">
          <table className="seller-products-table">
            <thead>
              <tr>
                <th>نام محصول</th>
                <th><Eye size={14} aria-hidden="true" /> بازدید</th>
                <th>موجودی نمونه</th>
                <th>عملکرد</th>
              </tr>
            </thead>
            <tbody>
              {bestProducts.map((product) => (
                <tr key={product.name}>
                  <td><span className="seller-product-dot"><Box size={16} aria-hidden="true" /></span>{product.name}</td>
                  <td>{product.views}</td>
                  <td>{product.sold} عدد</td>
                  <td><span className="seller-product-meter"><span style={{ width: product.width }} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="seller-panel__note">قیمت‌ها، سفارش‌ها، بازدیدها و موجودی‌ها دادهٔ ساختگی برای نمایش ظاهر داشبورد هستند.</p>
      </section>

      <section className="seller-dashboard__quick-actions" aria-label="دسترسی‌های سریع فروشنده">
        <a href="#seller-products">
          <span><Box size={19} aria-hidden="true" /></span>
          <div><strong>مدیریت محصولات</strong><small>فهرست و وضعیت محصولات فروشگاه</small></div>
          <ArrowLeft size={16} aria-hidden="true" />
        </a>
        <a href="#seller-orders">
          <span><ShoppingBag size={19} aria-hidden="true" /></span>
          <div><strong>پیگیری سفارش‌ها</strong><small>بررسی وضعیت و آماده‌سازی سفارش</small></div>
          <ArrowLeft size={16} aria-hidden="true" />
        </a>
        <a href="#custom-requests">
          <span><Clock3 size={19} aria-hidden="true" /></span>
          <div><strong>درخواست‌های اختصاصی</strong><small>بررسی نیازهای ساخت مشتریان</small></div>
          <ArrowLeft size={16} aria-hidden="true" />
        </a>
        <a href={ROUTES.sellerRegister}>
          <span><WalletCards size={19} aria-hidden="true" /></span>
          <div><strong>اطلاعات فروشندگی</strong><small>تکمیل اطلاعات اولیهٔ فروشگاه</small></div>
          <ArrowLeft size={16} aria-hidden="true" />
        </a>
      </section>

      <p className="seller-dashboard__disclaimer">
        این داشبورد فعلاً نمونهٔ فرانت‌اند است. ورود و احراز هویت فروشنده، ذخیره‌سازی محصولات، مدیریت واقعی سفارش‌ها، تسویه‌حساب و اعلان‌ها پس از تعریف API و اتصال بک‌اند فعال می‌شوند.
      </p>
    </main>
  );
}
