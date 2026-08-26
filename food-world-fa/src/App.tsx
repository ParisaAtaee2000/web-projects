import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Clock3, Heart, Menu, Search, ShoppingBag, Sparkles, Star, Utensils, X } from 'lucide-react';

const foods = [
  { name: 'کباب عربی زعفرانی', tag: 'پرفروش', image: '/assets/kebab.svg' },
  { name: 'سالاد مدیترانه‌ای', tag: 'سالم', image: '/assets/salad.svg' },
  { name: 'مرغ تنوری ادویه‌دار', tag: 'ویژه', image: '/assets/chicken.svg' },
  { name: 'دسر خرمایی شرقی', tag: 'دسر', image: '/assets/dessert.svg' },
];

const categories = [
  ['🍢', 'غذاهای کبابی', 'طعم دودی و اصیل'],
  ['🥗', 'سالاد و سبزیجات', 'تازه و سالم'],
  ['🍲', 'غذاهای سنتی', 'دستورهای خانوادگی'],
  ['🍮', 'دسرهای شرقی', 'شیرین و متفاوت'],
  ['🥤', 'نوشیدنی‌ها', 'خنک و طبیعی'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState('');
  const activeFood = useMemo(() => foods[active], [active]);

  const action = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(''), 2200); };

  return (
    <main>
      <header className="nav shell">
        <button className="brand" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><span>Eastern</span><b>Table</b></button>
        <nav className={menuOpen ? 'navlinks open' : 'navlinks'}>
          {['منوی ما','رزرو میز','درباره ما','تماس با ما'].map((item) => <a key={item} href={`#${item}`}>{item}</a>)}
          <button className="pill dark" onClick={() => action('درخواست عضویت شما ثبت شد')}>عضویت <ArrowLeft size={15}/></button>
        </nav>
        <div className="navactions"><button className="signin" onClick={() => action('صفحه ورود آماده است')}>ورود</button><button aria-label="سبد خرید" onClick={() => action('سبد خرید شما خالی است')}><ShoppingBag size={18}/></button><button aria-label="علاقه‌مندی" onClick={() => action('به علاقه‌مندی‌ها اضافه شد')}><Heart size={18}/></button><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
      </header>

      <section className="hero shell" id="خانه">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14}/> تجربه‌ای از طعم اصیل</div>
          <h1>جشنی برای<br/><strong>غنای شب‌های عربی</strong></h1>
          <p>از طعم‌های اصیل خاورمیانه تا ترکیب‌های تازه و خلاقانه؛ هر بشقاب داستانی از فرهنگ، مهمان‌نوازی و عشق به غذاست.</p>
          <div className="hero-actions"><button className="pill cream" onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}>مشاهده منو <ArrowLeft size={16}/></button><button className="pill outline" onClick={() => action('رزرو میز: فرم رزرو آماده است')}>رزرو میز <Utensils size={15}/></button></div>
          <div className="micro-tags"><span><Search size={13}/> غذای اصیل</span><span><Check size={13}/> مواد تازه</span><span><Clock3 size={13}/> تحویل سریع</span></div>
        </div>
        <div className="hero-foods">
          <div className="orbit-card tall"><img src={activeFood.image} alt={activeFood.name}/><div><small>{activeFood.tag}</small><h3>{activeFood.name}</h3><span>مشاهده جزئیات</span></div><button onClick={() => setActive((active+1)%foods.length)}><ArrowLeft size={15}/></button></div>
          <div className="orbit-card"><img src={foods[(active+1)%foods.length].image} alt="غذای ویژه"/><div><small>ویژه امروز</small><h3>{foods[(active+1)%foods.length].name}</h3><span>تازه و روزانه</span></div></div>
          <div className="orbit-card cream-card"><img src={foods[(active+2)%foods.length].image} alt="غذای سالم"/><div><small>انتخاب سالم</small><h3>{foods[(active+2)%foods.length].name}</h3><span>مواد اولیه طبیعی</span></div></div>
          <div className="dots">{foods.map((_,i)=><button key={i} className={i===active?'dot active':'dot'} onClick={()=>setActive(i)} aria-label={`اسلاید ${i+1}`}/>)}</div>
        </div>
      </section>

      <div className="ticker"><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span></div>

      <section className="section shell" id="منوی ما">
        <div className="section-head center"><div className="eyebrow"><Star size={13}/> چرا ما؟</div><h2>چرا مهمان‌های ما را انتخاب می‌کنند؟</h2><p>طعم اصیل، مهمان‌نوازی گرم و کیفیتی که در هر بار سفارش حس می‌کنید.</p></div>
        <div className="benefits"><Benefit icon="⚡" title="تحویل سریع" text="سفارش شما با دقت و در کوتاه‌ترین زمان ممکن به دستتان می‌رسد."/><Benefit icon="✦" title="تنوع غذایی" text="از غذاهای کبابی تا گیاهی؛ هر سلیقه‌ای انتخاب خودش را پیدا می‌کند." active/><Benefit icon="♡" title="سلامت بیشتر" text="مواد تازه و انتخاب‌های متعادل برای یک تجربه خوش‌طعم و سالم."/><Benefit icon="✧" title="بهترین کیفیت" text="بهترین مواد اولیه را انتخاب می‌کنیم تا کیفیت ثابت بماند."/></div>
      </section>

      <section className="section category-section shell" id="دسته‌بندی">
        <div className="section-head split"><div><div className="eyebrow"><Utensils size={13}/> دسته‌بندی</div><h2>طعم مورد علاقه‌ات را پیدا کن</h2></div><button className="text-button" onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}>مشاهده همه <ArrowLeft size={15}/></button></div>
        <div className="category-row">{categories.map(([icon,title,desc]) => <button className="category" key={title} onClick={()=>action(`${title} انتخاب شد`)}><span>{icon}</span><strong>{title}</strong><small>{desc}</small></button>)}</div>
      </section>

      <section className="section menu-section shell" id="menu">
        <div className="section-head split"><div><div className="eyebrow"><Sparkles size={13}/> منوی امروز</div><h2>محبوب‌ترین‌های ما</h2></div><div className="filter"><button className="selected">همه</button><button>کبابی</button><button>سالم</button><button>دسر</button></div></div>
        <div className="food-grid">{foods.map((food,i)=><article className="food-card" key={food.name}><div className="food-img"><img src={food.image} alt={food.name}/><button className="heart" onClick={()=>action('به علاقه‌مندی‌ها اضافه شد')}><Heart size={16}/></button><span>{food.tag}</span></div><div className="food-meta"><div><h3>{food.name}</h3><p>ترکیبی از ادویه‌های شرقی و مواد تازه</p></div><strong>۴۹۰٬۰۰۰ <small>تومان</small></strong></div><button className="add" onClick={()=>action(`${food.name} به سبد اضافه شد`)}>افزودن به سفارش <ArrowLeft size={15}/></button></article>)}</div>
      </section>

      <section className="story shell" id="درباره ما">
        <div className="story-visual"><img src="/assets/chef.svg" alt="سرآشپز Eastern Table"/><div className="round-stamp">طعم اصیل<br/>از دل شرق</div></div>
        <div className="story-copy"><div className="eyebrow"><Sparkles size={13}/> سفارش آنلاین</div><h2>غذاهای مورد علاقه‌ات،<br/><strong>سریع و گرم در خانه</strong></h2><p>فقط چند کلیک تا تجربه‌ای تازه فاصله دارید. از انتخاب غذا تا ارسال، همه چیز را ساده و سریع طراحی کرده‌ایم تا شما فقط از طعم لذت ببرید.</p><div className="hero-actions"><button className="pill dark" onClick={()=>action('سفارش آنلاین شروع شد')}>شروع سفارش <ArrowLeft size={15}/></button><button className="pill outline dark-outline" onClick={()=>action('رزرو میز: فرم آماده است')}>رزرو میز</button></div></div>
      </section>

      <section className="journey shell"><div className="journey-copy"><div className="eyebrow"><Sparkles size={13}/> داستان ما</div><h2>ریشه‌های آشپزی اصیل عربی را کشف کنید</h2><p>از دستورهای خانوادگی تا میزهای امروز؛ مسیر ما با احترام به سنت و نگاه به آینده شکل گرفته است. هر روز تلاش می‌کنیم یک تجربه به‌یادماندنی‌تر بسازیم.</p><div className="journey-facts"><span>+۱۰ سال <small>تجربه</small></span><span>+۱۲۰ <small>غذای سرو شده</small></span><span>+۵۰ <small>مشتری راضی</small></span></div></div><div className="journey-card"><img src="/assets/platter.svg" alt="سینی غذای شرقی"/><div><b>Hunter Michael</b><small>مدیر و بنیان‌گذار</small><p>«غذا فقط یک وعده نیست؛ راهی برای نزدیک‌تر شدن آدم‌هاست.»</p></div></div></section>

      <section className="celebs shell"><div className="section-head split"><div><div className="eyebrow"><Star size={13}/> انتخاب محبوب</div><h2>مهمان‌های ویژه ما</h2></div><div className="slider-controls"><button onClick={()=>action('قبلی')}><ArrowRight size={16}/></button><button onClick={()=>action('بعدی')}><ArrowLeft size={16}/></button></div></div><div className="people"><div className="feature-person"><img src="/assets/chef.svg" alt="مهمان ویژه"/><div><h3>مهمان ویژه</h3><p>طعم‌های تازه و تجربه‌ای متفاوت</p><span>★★★★★</span></div></div>{['علاقه‌مند غذا','سرآشپز مهمان','منتقد غذا','مهمان ویژه'].map((x,i)=><div className="person" key={x}><img src={i%2 ? '/assets/portrait2.svg':'/assets/portrait1.svg'} alt={x}/><strong>{x}</strong><small>★★★★★</small></div>)}</div></section>

      <footer id="تماس با ما"><div className="footer-main shell"><div><button className="brand footer-brand"><span>Eastern</span><b>Table</b></button><p>جایی برای کشف طعم‌های اصیل، مهمان‌نوازی گرم و خاطره‌های خوش.</p></div><div><h4>لینک‌های مفید</h4><a href="#خانه">خانه</a><a href="#منوی ما">منو</a><a href="#درباره ما">درباره ما</a><a href="#تماس با ما">تماس</a></div><div><h4>خدمات</h4><a>سفارش آنلاین</a><a>رزرو میز</a><a>مهمانی خصوصی</a><a>پشتیبانی</a></div><div><h4>تماس با ما</h4><a>تهران، خیابان ولیعصر</a><a>۰۲۱-۱۲۳۴۵۶۷۸</a><a>hello@easterntable.ir</a><button className="pill cream" onClick={()=>action('عضویت در خبرنامه انجام شد')}>عضویت در خبرنامه</button></div></div><div className="copyright shell"><span>© ۱۴۰۵ Eastern Table</span><span>طراحی شده با عشق برای دوستداران غذا</span></div></footer>
      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}

function Benefit({icon,title,text,active=false}:{icon:string,title:string,text:string,active?:boolean}) { return <div className={active?'benefit active':'benefit'}><span>{icon}</span><h3>{title}</h3><p>{text}</p></div>; }
export default App;
