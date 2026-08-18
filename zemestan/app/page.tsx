const products = [
  { name: "کاپشن بمبر کلاسیک", code: "NB-WM-1001", price: "۱,۲۸۰,۰۰۰", moq: 8 },
  { name: "کت زمستانه مینیمال", code: "CT-WM-1008", price: "۱,۵۹۰,۰۰۰", moq: 8 },
  { name: "کاپشن چرم شهری", code: "LJ-WM-1012", price: "۲,۴۸۰,۰۰۰", moq: 12 },
];

export default function HomePage() {
  return (
    <main>
      <header className="container nav">
        <div className="brand">زمستان</div>
        <nav className="navlinks">
          <a href="#collections">کالکشن</a><a href="/shop">محصولات</a><a href="#wholesale">عمده‌فروشی</a><a href="#about">درباره ما</a>
        </nav>
        <a className="btn" href="/shop">مشاهده محصولات</a>
      </header>

      <section className="container hero">
        <div>
          <span className="eyebrow">WINTER 2026 / WHOLESALE</span>
          <h1>پوشاک<br />مردانه<br />زمستانه.</h1>
          <p>مجموعه‌ای منتخب از کاپشن، کت و پالتو مردانه؛ تولید مستقیم برای فروشگاه‌ها و خریداران عمده.</p>
          <div className="actions"><a className="btn primary" href="/shop">مشاهده کالکشن</a><a className="btn" href="#wholesale">شروع سفارش عمده</a></div>
        </div>
        <div className="heroVisual"><div><span className="eyebrow">EDITORIAL 01</span><strong>MEN'S<br />OUTERWEAR</strong></div></div>
      </section>

      <div className="trust"><div className="container trustgrid"><div><strong>تولید مستقیم</strong><span className="muted">از تولیدکننده تا فروشگاه</span></div><div><strong>حداقل سفارش ۸ عدد</strong><span className="muted">MOQ شفاف برای هر محصول</span></div><div><strong>ارسال سراسر کشور</strong><span className="muted">ارسال با پست</span></div></div></div>

      <section id="collections" className="container section">
        <div className="sectionHead"><div><span className="eyebrow">THE COLLECTION</span><h2>منتخب زمستان</h2></div><a href="/shop">مشاهده همه →</a></div>
        <div className="grid">{products.map((p)=><article className="card" key={p.code}><div className="image"><span className="eyebrow">{p.code}</span></div><div className="meta"><small>پوشاک مردانه / زمستانه</small><h3>{p.name}</h3><div className="price">{p.price} تومان <small>قیمت عمده</small></div><span className="moq">حداقل سفارش {p.moq} عدد</span></div></article>)}</div>
      </section>

      <section id="wholesale" className="container section"><div className="sectionHead"><div><span className="eyebrow">B2B / WHOLESALE</span><h2>برای فروشگاه‌ها ساخته شده</h2></div></div><p className="muted">محصول را انتخاب کنید، رنگ و سایز را مشخص کنید و سفارش عمده خود را با حداقل تعداد شفاف ثبت کنید.</p></section>

      <section id="about" className="container section"><span className="eyebrow">ABOUT ZEMESTAN</span><h2>یک برند زمستانی،<br/>با نگاه حرفه‌ای.</h2><p className="muted">هویت بصری Editorial در کنار تجربه خرید عمده سریع و شفاف؛ طراحی شده برای خریدارانی که به محصول و ارائه برند اهمیت می‌دهند.</p></section>

      <footer className="footer"><div className="container footergrid"><div><div className="brand">زمستان</div><p className="muted">پوشاک مردانه زمستانه / فروش عمده</p></div><div><strong>دسترسی</strong><p className="muted">محصولات<br/>کالکشن<br/>همکاری عمده</p></div><div><strong>تماس</strong><p className="muted">اطلاعات تماس در نسخه تجاری اضافه می‌شود.</p></div></div></footer>
    </main>
  );
}
