import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowUpLeft, Search, ShoppingBag, UserRound, Heart,
  Menu, Printer, Boxes, Cable, FileBox, Layers3, Sparkles,
  ChevronLeft, Star, SlidersHorizontal, Upload, CheckCircle2
} from "lucide-react";

type Product = {
  id: number; name: string; maker: string; price: string; category: string;
  kind: string; image: string; tag?: string;
};

const products: Product[] = [
  { id: 1, name: "اژدهای مفصلی کلکسیونی", maker: "استودیو پیکسل", price: "۴۸۵٬۰۰۰", category: "فیگور و کلکسیونی", kind: "printed", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=700&q=85", tag: "پرفروش" },
  { id: 2, name: "استند چندمنظوره موبایل", maker: "میکر لب", price: "۱۸۹٬۰۰۰", category: "لوازم کاربردی", kind: "printed", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=85" },
  { id: 3, name: "فیلامنت PLA سفید مات", maker: "پرینت‌تک", price: "۶۹۰٬۰۰۰", category: "مواد مصرفی", kind: "material", image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=700&q=85", tag: "کیفیت بالا" },
  { id: 4, name: "پرینتر سه‌بعدی رومیزی", maker: "تک‌پرینت", price: "۱۸٬۹۰۰٬۰۰۰", category: "پرینتر سه‌بعدی", kind: "printer", image: "https://images.unsplash.com/photo-1631556097152-c39479bbff4f?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "چراغ رومیزی بافت‌دار", maker: "فرم‌لب", price: "۷۹۰٬۰۰۰", category: "دکور و طراحی", kind: "printed", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85", tag: "طراحی خاص" },
  { id: 6, name: "مدل سه‌بعدی گلدان موجی", maker: "استودیو فرم", price: "۹۵٬۰۰۰", category: "فایل سه‌بعدی", kind: "digital", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85", tag: "STL" },
];

const categories = [
  { title: "محصولات چاپ‌شده", detail: "محصولات خاص و آماده", icon: Boxes, key: "printed", color: "lavender" },
  { title: "پرینترهای سه‌بعدی", detail: "FDM و رزینی", icon: Printer, key: "printer", color: "blue" },
  { title: "قطعات و لوازم جانبی", detail: "قطعات و ارتقای دستگاه", icon: Cable, key: "accessory", color: "orange" },
  { title: "مواد مصرفی", detail: "فیلامنت، رزین و بیشتر", icon: Layers3, key: "material", color: "green" },
  { title: "فایل‌های سه‌بعدی", detail: "مدل‌های STL و 3MF", icon: FileBox, key: "digital", color: "pink" },
];

const makers = [
  { name: "استودیو پیکسل", specialty: "فیگور و مدل‌های کلکسیونی", count: "۳۸ محصول", initial: "پ", color: "maker-purple" },
  { name: "میکر لب", specialty: "محصولات کاربردی روزمره", count: "۲۴ محصول", initial: "م", color: "maker-blue" },
  { name: "فرم‌لب", specialty: "دکور و طراحی محصول", count: "۱۹ محصول", initial: "ف", color: "maker-orange" },
];

export function HomePage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = (product.name + product.maker + product.category).includes(query.trim());
    const matchesFilter = activeFilter === "all" || product.kind === activeFilter;
    return matchesQuery && matchesFilter;
  }), [query, activeFilter]);

  const toggleFavorite = (id: number) => setFavorites((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);

  return (
    <div className="site-shell" dir="rtl">
      <div className="top-strip"><Sparkles size={14} /> دنیای ساختن، فقط یک کلیک با تو فاصله داره <span>مشاهده محصولات جدید <ArrowLeft size={13} /></span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="صفحه اصلی">
          <span className="brand-symbol"><Boxes size={24} strokeWidth={2.2} /></span>
          <span className="brand-word">Maker<span>ā</span><small>بازار تخصصی چاپ سه‌بعدی</small></span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="باز کردن منو"><Menu /></button>
        <nav className={mobileMenu ? "main-nav open" : "main-nav"}>
          <a className="nav-active" href="#home">خانه</a>
          <a href="#products">محصولات</a>
          <a href="#categories">دسته‌بندی‌ها</a>
          <a href="#makers">سازندگان</a>
          <a href="#files">فایل‌های سه‌بعدی</a>
        </nav>
        <div className="header-actions">
          <label className="header-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="دنبال چی می‌گردی؟" /><kbd>⌘ K</kbd></label>
          <button className="icon-button" aria-label="حساب کاربری"><UserRound size={19} /></button>
          <button className="icon-button cart-button" aria-label="سبد خرید"><ShoppingBag size={19} /><span>{cart.length}</span></button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid-glow" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> بازار سازندگان چاپ سه‌بعدی</div>
            <h1>ایده‌ات رو<br /><span>واقعی کن.</span></h1>
            <p>محصولات خاص ساخته‌شده با پرینتر سه‌بعدی رو کشف کن؛ از سازنده‌های مستقل خرید کن یا چیزی که توی ذهنت داری رو برای ساخت سفارش بده.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">کشف محصولات <ArrowLeft size={17} /></a>
              <button className="button button-ghost" onClick={() => { setRequestOpen(true); setRequestSent(false); }}>سفارش چاپ اختصاصی <ArrowUpLeft size={17} /></button>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>م</span><span>پ</span><span>ف</span><b>+</b></div><div><strong>سازنده‌های مستقل</strong><small>ایده‌های خاص، ساخته‌های واقعی</small></div><div className="proof-divider" /><div><strong>۳D Made</strong><small>هر محصول، یک امکان تازه</small></div></div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1631556097152-c39479bbff4f?auto=format&fit=crop&w=1100&q=90" alt="پرینتر سه‌بعدی در محیط ساخت" /></div>
            <div className="floating-note note-top"><span className="note-icon"><Printer size={17} /></span><span><strong>از فایل تا محصول</strong><small>ساخت با جزئیات دقیق</small></span><CheckCircle2 size={17} className="note-check" /></div>
            <div className="floating-note note-bottom"><span className="note-product">3D</span><span><strong>ساخته‌شده با دقت</strong><small>محصولات متفاوت، هر روز</small></span></div>
            <div className="art-index">01 <span /> 05</div>
          </div>
          <div className="hero-bottomline"><span>DESIGNED TO BE MADE</span><span>از ایده تا شیء واقعی <ArrowLeft size={14} /></span></div>
        </section>

        <section className="category-section section-wrap" id="categories">
          <div className="section-heading">
            <div><span className="section-kicker">EXPLORE THE ECOSYSTEM</span><h2>دنیای چاپ سه‌بعدی، <span>یک‌جا</span></h2><p>از محصول نهایی تا ابزار ساخت؛ چیزی که لازم داری رو پیدا کن.</p></div>
            <a href="#products" className="text-link">همه دسته‌بندی‌ها <ArrowLeft size={16} /></a>
          </div>
          <div className="category-grid">
            {categories.map(({ title, detail, icon: Icon, key, color }, index) => (
              <button key={key} className={`category-card category-${color}`} onClick={() => { setActiveFilter(key === "accessory" ? "all" : key); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span className="category-index">0{index + 1}</span><span className="category-icon"><Icon size={25} /></span><strong>{title}</strong><small>{detail}</small><span className="category-arrow"><ArrowLeft size={16} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="products-section section-wrap" id="products">
          <div className="section-heading products-heading">
            <div><span className="section-kicker">CURATED FOR MAKERS</span><h2>چیزهای <span>جالب برای کشف</span></h2><p>محصولات و ابزارهایی که دنیای ساختن رو جذاب‌تر می‌کنن.</p></div>
            <div className="filter-row"><SlidersHorizontal size={16} /><button className={activeFilter === "all" ? "filter-active" : ""} onClick={() => setActiveFilter("all")}>همه</button><button className={activeFilter === "printed" ? "filter-active" : ""} onClick={() => setActiveFilter("printed")}>محصولات چاپی</button><button className={activeFilter === "printer" ? "filter-active" : ""} onClick={() => setActiveFilter("printer")}>پرینتر</button><button className={activeFilter === "material" ? "filter-active" : ""} onClick={() => setActiveFilter("material")}>مواد مصرفی</button></div>
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => <article className="product-card" key={product.id}>
              <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}<button className={favorites.includes(product.id) ? "favorite-button is-favorite" : "favorite-button"} onClick={() => toggleFavorite(product.id)} aria-label="افزودن به علاقه‌مندی‌ها"><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button><span className="product-type">{product.category}</span></div>
              <div className="product-info"><span className="product-maker">{product.maker}</span><h3>{product.name}</h3><div className="product-rating"><Star size={13} fill="currentColor" /> ۴.۸ <span>·</span> آماده ارسال</div><div className="product-buy"><div><strong>{product.price}</strong><small>تومان</small></div><button onClick={() => setCart((old) => [...old, product.id])} aria-label="افزودن به سبد خرید"><ShoppingBag size={17} /></button></div></div>
            </article>)}
            {filteredProducts.length === 0 && <div className="no-results"><Search size={28} /><strong>چیزی پیدا نشد</strong><span>عبارت جست‌وجو یا فیلتر رو تغییر بده.</span><button onClick={() => { setQuery(""); setActiveFilter("all"); }}>پاک کردن فیلترها</button></div>}
          </div>
          <div className="center-action"><button className="button button-outline" onClick={() => { setActiveFilter("all"); setQuery(""); }}>مشاهده همه محصولات <ArrowLeft size={16} /></button></div>
        </section>

        <section className="maker-section" id="makers"><div className="maker-inner section-wrap">
          <div className="maker-intro"><span className="section-kicker">MEET THE MAKERS</span><h2>پشت هر ساخته،<br /><span>یک سازنده‌ست.</span></h2><p>آدم‌هایی رو پیدا کن که با ایده‌هاشون چیزهای متفاوت می‌سازن؛ از محصولات کاربردی تا طراحی‌های کلکسیونی.</p><a className="button button-light" href="#products">کشف سازنده‌ها <ArrowLeft size={16} /></a><div className="maker-count"><strong>01—03</strong><span>سازنده‌های منتخب</span></div></div>
          <div className="maker-cards">{makers.map((maker, index) => <article className="maker-card" key={maker.name}><div className={`maker-avatar ${maker.color}`}>{maker.initial}<span className="maker-verified"><CheckCircle2 size={13} /></span></div><div className="maker-card-content"><div className="maker-title"><h3>{maker.name}</h3><span><Star size={12} fill="currentColor" /> ۴.۹</span></div><p>{maker.specialty}</p><div className="maker-card-bottom"><span>{maker.count}</span><button aria-label="مشاهده فروشگاه"><ArrowLeft size={16} /></button></div></div></article>)}</div>
        </div></section>

        <section className="custom-section section-wrap">
          <div className="custom-visual"><div className="custom-orb"><Sparkles size={34} /></div><span className="custom-label">YOUR IDEA / OUR MAKERS</span><div className="custom-mini-card"><span><Upload size={16} /></span><div><strong>ایده‌ات رو آپلود کن</strong><small>تصویر، فایل یا توضیحات</small></div><ArrowLeft size={15} /></div></div>
          <div className="custom-copy"><span className="section-kicker">MADE FOR YOUR IDEA</span><h2>چیزی که می‌خوای<br /><span>هنوز ساخته نشده؟</span></h2><p>ایده یا فایل سه‌بعدی‌ات رو بفرست. جزئیات رو توضیح بده و برای ساخت محصولت با سازنده‌ها ارتباط بگیر.</p><button className="button button-primary" onClick={() => { setRequestOpen(true); setRequestSent(false); }}>ثبت سفارش اختصاصی <ArrowLeft size={17} /></button><div className="custom-features"><span><CheckCircle2 size={15} /> ساخت بر اساس نیاز تو</span><span><CheckCircle2 size={15} /> ارتباط با سازنده‌ها</span></div></div>
        </section>

        <section className="files-section section-wrap" id="files"><div className="files-heading"><div><span className="section-kicker">DIGITAL TO PHYSICAL</span><h2>از فایل تا <span>چیزی واقعی</span></h2><p>مدل سه‌بعدی رو پیدا کن، دانلود کن و به محصول تبدیلش کن.</p></div><a href="#products" className="text-link">کشف فایل‌ها <ArrowLeft size={16} /></a></div><div className="file-feature"><div className="file-art"><div className="wire-cube"><span /><span /><span /><span /><span /><span /></div><div className="file-format">.STL</div></div><div className="file-copy"><span className="file-pill"><FileBox size={14} /> فایل دیجیتال</span><h3>مدل آماده برای ایده بعدی تو</h3><p>فایل‌های سه‌بعدی رو کشف کن و برای چاپ، مدل مناسب پروژه‌ات رو انتخاب کن.</p><a href="#products" className="button button-dark">مشاهده فایل‌ها <ArrowLeft size={16} /></a></div><div className="file-meta"><span>01 / DISCOVER</span><span>STL · 3MF</span></div></div></section>

        <section className="seller-banner section-wrap"><div className="seller-symbol"><Printer size={32} /><span>+</span></div><div className="seller-copy"><span className="section-kicker">BUILT BY MAKERS</span><h2>با پرینترت محصول می‌سازی؟ <span>اینجا بفروشش.</span></h2><p>محصولاتت رو به نمایش بذار، سفارش اختصاصی بگیر و فروشگاه خودت رو بساز.</p></div><a href="#footer" className="button button-primary">سازنده شو <ArrowLeft size={17} /></a><div className="seller-grid-pattern" /></section>
      </main>

      <footer className="site-footer" id="footer"><div className="footer-main section-wrap"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-symbol"><Boxes size={23} /></span><span className="brand-word">Maker<span>ā</span><small>بازار تخصصی چاپ سه‌بعدی</small></span></a><p>جایی برای کشف ساخته‌های متفاوت و ارتباط با آدم‌هایی که ایده‌ها رو به محصول تبدیل می‌کنن.</p></div><div className="footer-col"><strong>بازار</strong><a href="#products">محصولات</a><a href="#categories">دسته‌بندی‌ها</a><a href="#files">فایل‌های سه‌بعدی</a><a href="#makers">سازندگان</a></div><div className="footer-col"><strong>برای سازندگان</strong><a href="#footer">شروع فروش</a><a href="#footer">راهنمای فروش</a><a href="#footer">مدیریت سفارش‌ها</a></div><div className="footer-col"><strong>راهنما</strong><a href="#footer">تماس با ما</a><a href="#footer">پرسش‌های متداول</a><a href="#footer">قوانین و حریم خصوصی</a></div></div><div className="footer-bottom section-wrap"><span>© ۲۰۲۶ — بازار تخصصی چاپ سه‌بعدی</span><span>ساخته‌شده برای آدم‌های سازنده <Sparkles size={14} /></span></div></footer>

      {requestOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setRequestOpen(false); }}><section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title"><button className="modal-close" onClick={() => setRequestOpen(false)} aria-label="بستن">×</button>{requestSent ? <div className="request-success"><CheckCircle2 size={42} /><h2>درخواستت ثبت نمایشی شد</h2><p>این نسخه فعلاً نمونه فرانت‌اند است؛ برای ارسال واقعی درخواست باید بک‌اند متصل شود.</p><button className="button button-primary" onClick={() => setRequestOpen(false)}>متوجه شدم</button></div> : <><span className="section-kicker">CUSTOM PRINT REQUEST</span><h2 id="request-title">ایده‌ات رو برای ساخت بفرست</h2><p>چند جزئیات اولیه رو بنویس تا درخواستت آماده بررسی بشه.</p><form onSubmit={(e) => { e.preventDefault(); setRequestSent(true); }}><label>چی می‌خوای ساخته بشه؟<input required placeholder="مثلاً پایه اختصاصی برای دوربین" /></label><label>توضیحات بیشتر<textarea required rows={3} placeholder="ابعاد، کاربرد، رنگ یا جزئیات مهم..." /></label><label>نوع متریال<select defaultValue=""><option value="" disabled>انتخاب متریال (اختیاری)</option><option>PLA</option><option>PETG</option><option>ABS / ASA</option><option>رزین</option><option>مطمئن نیستم</option></select></label><button className="button button-primary" type="submit">ثبت درخواست نمایشی <ArrowLeft size={16} /></button></form></>}</section></div>}
    </div>
  );
}