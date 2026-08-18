const products = [
  { name: "کاپشن بمبر کلاسیک", code: "NB-WM-1001", price: "۱,۲۸۰,۰۰۰", moq: 8 },
  { name: "کت زمستانه مینیمال", code: "CT-WM-1008", price: "۱,۵۹۰,۰۰۰", moq: 8 },
  { name: "کاپشن چرم شهری", code: "LJ-WM-1012", price: "۲,۴۸۰,۰۰۰", moq: 12 },
  { name: "پالتو بلند شهری", code: "CT-WM-1016", price: "۱,۸۹۰,۰۰۰", moq: 8 },
];

const looks = ["پارکا شهری / برای رفت‌وآمد", "پالتو مینیمال / برای موقعیت رسمی", "بمبر روزمره / برای کالکشن اسپرت"];
const categories = ["پارکا و کاپشن", "پالتو کلاسیک", "کت چرم", "بمبر و اسپرت", "بارانی و اورکت"];

function ProductArt() { return <div className="product-art" aria-hidden="true" />; }

export default function HomePage() {
  return (
    <main dir="rtl">
      <div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>حداقل سفارش هر محصول از ۸ عدد</span><span>ارسال با پست به سراسر کشور</span></div></div>
      <header className="site-header"><div className="container nav">
        <a href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></a>
        <nav className="navlinks"><a href="/">خانه</a><a href="/shop">فروشگاه</a><a href="#collections">کالکشن</a><a href="#wholesale">عمده‌فروشی</a><a href="#about">درباره ما</a></nav>
        <div className="nav-actions"><a className="icon-btn" href="/shop" aria-label="جستجو">⌕</a><a className="btn primary" href="/shop">مشاهده محصولات</a></div>
      </div></header>

      <section className="container hero">
        <div className="hero-copy reveal"><span className="hero-eyebrow cap">WINTER 2026 / WHOLESALE</span><h1>پوشاک مردانه برای <em>زمستان واقعی.</em></h1><p>کالکشنی از کت، کاپشن و پالتو که برای فروشگاه‌های مردانه طراحی شده؛ با قیمت عمده شفاف، MOQ مشخص و تجربه سفارش حرفه‌ای.</p><div className="hero-actions"><a className="btn primary" href="/shop">مشاهده کالکشن</a><a className="btn" href="#wholesale">شروع سفارش عمده</a></div><div className="hero-meta"><div><strong>۲۰۲۶</strong><span>فصل جاری</span></div><div><strong>۳۲+</strong><span>مدل قابل سفارش</span></div><div><strong>۸ عدد</strong><span>حداقل سفارش پایه</span></div></div></div>
        <div className="hero-visual"><div className="hero-side">MEN'S OUTERWEAR / WHOLESALE</div><div className="hero-stamp"><strong>پارکا آرکتیک</strong><span>MOQ ۸ · قیمت عمده</span></div><div className="hero-art"><div className="coat-silhouette" /></div><div className="hero-index mono">01 / 05</div></div>
      </section>

      <section className="container section" id="collections"><div className="section-head"><div><div className="section-kicker">LOOKBOOK / 2026</div><h2 className="section-title">سه فرم، سه موقعیت.</h2></div><a className="section-link" href="/shop">مشاهده همه محصولات →</a></div><div className="look-grid">{looks.map((look,i)=><article className="look-card" key={look}><div className="look-top"><span>لوک ۰{i+1}</span><span>{i===0?"شهری":i===1?"رسمی":"اسپرت"}</span></div><div className="look-image"><div className="fashion-outline" /></div><h3>{look.split(" /")[0]}</h3><p>{look.split(" /")[1]}</p><div className="look-price">فروش عمده · حداقل ۸ عدد</div></article>)}</div></section>

      <section className="section alt"><div className="container"><div className="section-head"><div><div className="section-kicker">INDEX / CATEGORIES</div><h2 className="section-title">دسته‌بندی‌ها</h2></div></div><div className="index-list">{categories.map((name,i)=><a className="index-row" href="/shop" key={name}><span className="index-num">۰{i+1}</span><h3>{name}</h3><small>مشاهده محصولات</small><span>←</span></a>)}</div></div></section>

      <section className="container section"><div className="section-head"><div><div className="section-kicker">NEW IN / WHOLESALE</div><h2 className="section-title">محصولات منتخب</h2></div><a className="section-link" href="/shop">فروشگاه کامل →</a></div><div className="products-grid">{products.map((p,i)=><article className="product-card" key={p.code}><a href={`/product/${p.code}`}><div className="product-image"><span className="product-tag">{i===0?"جدید":"کالکشن"}</span><span className="product-wish">♡</span><ProductArt/></div><div className="product-body"><div className="product-meta mono">{p.code}</div><h3>{p.name}</h3><div className="product-row"><div><div className="price-main">{p.price} تومان</div><span className="price-note">قیمت عمده / هر عدد</span></div></div><span className="moq">حداقل سفارش {p.moq} عدد</span></div></a></article>)}</div></section>

      <section id="wholesale" className="section" style={{background:"#15150f",color:"#eeece4"}}><div className="container value-grid"><div className="value-stat"><strong>۱۰۰٪</strong><span>قیمت‌گذاری عمده شفاف</span></div><div className="value">«از تولیدکننده تا قفسه فروشگاه؛ بدون پیچیدگی و بدون واسطه.»<div className="cap" style={{marginTop:18,color:"#aaa697"}}>WHOLESALE EXPERIENCE</div></div><div className="value-stat"><strong>۸+</strong><span>MOQ قابل تنظیم بر اساس محصول</span></div></div></section>

      <section id="about" className="container section"><div className="section-head"><div><div className="section-kicker">ABOUT ZEMESTAN</div><h2 className="section-title">یک برند زمستانی، با نگاه حرفه‌ای.</h2></div></div><p className="muted" style={{maxWidth:700}}>هویت بصری Editorial در کنار تجربه خرید عمده سریع و شفاف؛ برای خریدارانی که می‌خواهند محصول، اطلاعات و سفارش را در یک تجربه منسجم مدیریت کنند.</p></section>
      <footer className="section" style={{background:"#15150f",color:"#eeece4",paddingBottom:40}}><div className="container" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40}}><div><div className="brand">زمستان</div><p style={{color:"#aaa697"}}>پوشاک مردانه زمستانه / فروش عمده</p></div><div><div className="cap">فروشگاه</div><p style={{color:"#aaa697"}}>محصولات<br/>کالکشن<br/>دسته‌بندی‌ها</p></div><div><div className="cap">ارتباط</div><p style={{color:"#aaa697"}}>اطلاعات تماس و خدمات فروش در نسخه تجاری متصل می‌شود.</p></div></div></footer>
      <nav className="mobile-nav"><a href="/">خانه</a><a href="/shop">فروشگاه</a><a href="#collections">کالکشن</a><a href="#wholesale">عمده</a></nav>
    </main>
  );
}
