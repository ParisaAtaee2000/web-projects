const products = [
  {name:"کاپشن بمبر کلاسیک",code:"NB-WM-1001",category:"بمبر و اسپرت",price:"۱,۲۸۰,۰۰۰",moq:8},
  {name:"کت زمستانه مینیمال",code:"CT-WM-1008",category:"کت مردانه",price:"۱,۵۹۰,۰۰۰",moq:8},
  {name:"کاپشن چرم شهری",code:"LJ-WM-1012",category:"کت چرم",price:"۲,۴۸۰,۰۰۰",moq:12},
  {name:"پالتو بلند شهری",code:"CT-WM-1016",category:"پالتو کلاسیک",price:"۱,۸۹۰,۰۰۰",moq:8},
  {name:"پارکا آرکتیک",code:"PK-WM-1020",category:"پارکا و کاپشن",price:"۱,۷۹۰,۰۰۰",moq:8},
  {name:"اورکت فنی شهری",code:"OC-WM-1026",category:"بارانی و اورکت",price:"۱,۹۸۰,۰۰۰",moq:12},
  {name:"بمبر یقه ایستاده",code:"BB-WM-1031",category:"بمبر و اسپرت",price:"۱,۳۹۰,۰۰۰",moq:8},
  {name:"کت پافر سبک",code:"PF-WM-1038",category:"کت مردانه",price:"۱,۶۸۰,۰۰۰",moq:8},
];
function ProductArt(){return <div className="product-art" aria-hidden="true"/>}
export default function ShopPage(){return <main dir="rtl">
  <div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>MOQ از ۸ عدد</span><span>ارسال سراسر کشور</span></div></div>
  <header className="site-header"><div className="container nav"><a href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></a><nav className="navlinks"><a href="/">خانه</a><a href="/shop">فروشگاه</a><a href="/#collections">کالکشن</a><a href="/#wholesale">عمده‌فروشی</a></nav><div className="nav-actions"><a className="icon-btn" href="/shop">⌕</a><a className="btn primary" href="/">خانه</a></div></div></header>
  <section className="container section"><div className="section-head"><div><div className="section-kicker">SHOP / WHOLESALE</div><h1 className="section-title" style={{fontSize:52}}>محصولات زمستانه</h1><p className="muted">کالکشن کامل برای خرید عمده؛ قیمت هر عدد، حداقل سفارش و کد محصول شفاف است.</p></div></div>
    <div className="shop-toolbar"><div className="filters"><button className="filter-pill active">همه</button><button className="filter-pill">کاپشن</button><button className="filter-pill">پالتو</button><button className="filter-pill">چرم</button><button className="filter-pill">بمبر</button><button className="filter-pill">بارانی</button></div><select className="sort" defaultValue="new"><option value="new">مرتب‌سازی: جدیدترین</option><option>قیمت صعودی</option><option>قیمت نزولی</option><option>MOQ کمتر</option></select></div>
    <div className="products-grid">{products.map((p,i)=><article className="product-card" key={p.code}><a href={`/product/${p.code}`}><div className="product-image"><span className="product-tag">{i<2?"جدید":"کالکشن"}</span><span className="product-wish">♡</span><ProductArt/></div><div className="product-body"><div className="product-meta mono">{p.code} · {p.category}</div><h3>{p.name}</h3><div className="product-row"><div className="price-main">{p.price} تومان<span className="price-note">قیمت عمده / هر عدد</span></div></div><span className="moq">حداقل سفارش {p.moq} عدد</span></div></a></article>)}</div>
  </section>
  <footer className="section" style={{background:"#15150f",color:"#eeece4",paddingBottom:40}}><div className="container"><div className="brand">زمستان</div><p style={{color:"#aaa697"}}>فروش عمده پوشاک مردانه زمستانه</p></div></footer>
  <nav className="mobile-nav"><a href="/">خانه</a><a href="/shop">فروشگاه</a><a href="/#collections">کالکشن</a><a href="/#wholesale">عمده</a></nav>
</main>}
