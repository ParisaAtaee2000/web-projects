import Link from "next/link";

type Product = {
  name: string;
  code: string;
  category: string;
  price: number;
  moq: number;
  stock: "موجود" | "محدود";
};

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const products: Product[] = [
  { name: "کاپشن بمبر کلاسیک", code: "NB-WM-1001", category: "بمبر و اسپرت", price: 1280000, moq: 8, stock: "موجود" },
  { name: "کت زمستانه مینیمال", code: "CT-WM-1008", category: "کت مردانه", price: 1590000, moq: 8, stock: "موجود" },
  { name: "کاپشن چرم شهری", code: "LJ-WM-1012", category: "کت چرم", price: 2480000, moq: 12, stock: "محدود" },
  { name: "پالتو بلند شهری", code: "CT-WM-1016", category: "پالتو کلاسیک", price: 1890000, moq: 8, stock: "موجود" },
  { name: "پارکا آرکتیک", code: "PK-WM-1020", category: "پارکا و کاپشن", price: 1790000, moq: 8, stock: "موجود" },
  { name: "اورکت فنی شهری", code: "OC-WM-1026", category: "بارانی و اورکت", price: 1980000, moq: 12, stock: "محدود" },
  { name: "بمبر یقه ایستاده", code: "BB-WM-1031", category: "بمبر و اسپرت", price: 1390000, moq: 8, stock: "موجود" },
  { name: "کت پافر سبک", code: "PF-WM-1038", category: "کت مردانه", price: 1680000, moq: 8, stock: "موجود" },
];

const categories = ["همه", "کاپشن", "پالتو", "چرم", "بمبر", "بارانی"];

const categoryMatches: Record<string, string[]> = {
  کاپشن: ["بمبر و اسپرت", "پارکا و کاپشن"],
  پالتو: ["پالتو کلاسیک"],
  چرم: ["کت چرم"],
  بمبر: ["بمبر و اسپرت"],
  بارانی: ["بارانی و اورکت"],
};

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function ProductArt() {
  return <div className="product-art" aria-hidden="true" />;
}

function buildShopUrl(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  return `/shop${search.toString() ? `?${search.toString()}` : ""}`;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = (await searchParams) ?? {};
  const q = valueOf(params.q).trim();
  const category = valueOf(params.category) || "همه";
  const stock = valueOf(params.stock) || "همه";
  const sort = valueOf(params.sort) || "new";

  let filtered = products.filter((product) => {
    const haystack = `${product.name} ${product.code} ${product.category}`.toLocaleLowerCase("fa-IR");
    const queryMatch = !q || haystack.includes(q.toLocaleLowerCase("fa-IR"));
    const categoryMatch = category === "همه" || categoryMatches[category]?.includes(product.category);
    const stockMatch = stock === "همه" || product.stock === stock;
    return queryMatch && categoryMatch && stockMatch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "moq") filtered = [...filtered].sort((a, b) => a.moq - b.moq);

  return (
    <main dir="rtl">
      <div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>MOQ از ۸ عدد</span><span>ارسال سراسر کشور</span></div></div>
      <header className="site-header"><div className="container nav"><Link href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></Link><nav className="navlinks"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/#wholesale">عمده‌فروشی</Link></nav><div className="nav-actions"><Link className="icon-btn" href="/shop" aria-label="جستجو">⌕</Link><Link className="btn primary" href="/">خانه</Link></div></div></header>

      <section className="container section">
        <div className="section-head"><div><div className="section-kicker">SHOP / WHOLESALE</div><h1 className="section-title" style={{fontSize:52}}>محصولات زمستانه</h1><p className="muted">جستجو بر اساس نام یا کد محصول و فیلتر بر اساس دسته، موجودی و ترتیب قیمت.</p></div></div>

        <form className="shop-toolbar" method="get">
          <div className="filters">
            <input name="q" defaultValue={q} placeholder="جستجو نام یا کد محصول" className="filter-pill" aria-label="جستجو در محصولات" />
            {categories.map((item) => <Link key={item} className={`filter-pill ${category === item ? "active" : ""}`} href={buildShopUrl({q, category: item === "همه" ? undefined : item, stock: stock === "همه" ? undefined : stock, sort: sort === "new" ? undefined : sort})}>{item}</Link>)}
            <select name="stock" defaultValue={stock} className="sort" aria-label="فیلتر موجودی"><option value="همه">همه موجودی</option><option value="موجود">موجود</option><option value="محدود">موجودی محدود</option></select>
            <select name="sort" defaultValue={sort} className="sort" aria-label="مرتب سازی"><option value="new">جدیدترین</option><option value="price-asc">قیمت صعودی</option><option value="price-desc">قیمت نزولی</option><option value="moq">حداقل سفارش کمتر</option></select>
            <button className="btn primary" type="submit">اعمال</button>
            <Link className="btn" href="/shop">پاک کردن</Link>
          </div>
          <span className="muted">{filtered.length.toLocaleString("fa-IR")} محصول</span>
        </form>

        {filtered.length ? (
          <div className="products-grid">{filtered.map((p, i) => <article className="product-card" key={p.code}><Link href={`/product/${p.code}`}><div className="product-image"><span className="product-tag">{p.stock === "محدود" ? "محدود" : i < 2 ? "جدید" : "کالکشن"}</span><span className="product-wish">♡</span><ProductArt /></div><div className="product-body"><div className="product-meta mono">{p.code} · {p.category}</div><h3>{p.name}</h3><div className="product-row"><div className="price-main">{p.price.toLocaleString("fa-IR")} تومان<span className="price-note">قیمت عمده / هر عدد</span></div></div><span className="moq">حداقل سفارش {p.moq.toLocaleString("fa-IR")} عدد</span></div></Link></article>)}</div>
        ) : (
          <div className="section alt" style={{padding:40,textAlign:"center"}}><h2 className="section-title">محصولی پیدا نشد</h2><p className="muted">عبارت جستجو یا فیلترها را تغییر دهید.</p><Link className="btn primary" href="/shop">مشاهده همه محصولات</Link></div>
        )}
      </section>

      <footer className="section" style={{background:"#15150f",color:"#eeece4",paddingBottom:40}}><div className="container"><div className="brand">زمستان</div><p style={{color:"#aaa697"}}>فروش عمده پوشاک مردانه زمستانه</p></div></footer>
      <nav className="mobile-nav"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/#wholesale">عمده</Link></nav>
    </main>
  );
}
