'use client';

import Image from 'next/image';
import { ArrowLeft, Check, Clock3, Heart, Menu, Search, ShoppingBag, Sparkles, Star, Utensils, X } from 'lucide-react';
import { useState } from 'react';

const foods = [
  { name: 'کباب عربی زعفرانی', tag: 'پرفروش', image: '/assets/kebab.svg', price: '۴۹۰٬۰۰۰' },
  { name: 'سالاد مدیترانه‌ای', tag: 'سالم', image: '/assets/salad.svg', price: '۳۲۰٬۰۰۰' },
  { name: 'مرغ تنوری ادویه‌دار', tag: 'ویژه', image: '/assets/chicken.svg', price: '۴۲۰٬۰۰۰' },
  { name: 'دسر خرمایی شرقی', tag: 'دسر', image: '/assets/dessert.svg', price: '۲۴۰٬۰۰۰' },
];

const categories = [
  ['🍢', 'غذاهای کبابی', 'طعم دودی و اصیل'], ['🥗', 'سالاد و سبزیجات', 'تازه و سالم'],
  ['🍲', 'غذاهای سنتی', 'دستورهای خانوادگی'], ['🍮', 'دسرهای شرقی', 'شیرین و متفاوت'], ['🥤', 'نوشیدنی‌ها', 'خنک و طبیعی'],
] as const;

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const notify = (text: string) => { setToast(text); window.setTimeout(() => setToast(''), 1800); };

  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#home"><span>Eastern</span><b>Table</b></a>
        <nav className={menuOpen ? 'navlinks open' : 'navlinks'}>
          <a href="#menu">منوی ما</a><a href="#story">درباره ما</a><a href="#categories">دسته‌بندی</a><a href="#contact">تماس</a>
          <button className="pill cream" onClick={() => notify('رزرو میز آماده است')}>رزرو میز <ArrowLeft size={15}/></button>
        </nav>
        <div className="navactions">
          <button aria-label="ورود" onClick={() => notify('صفحه ورود آماده است')}>ورود</button>
          <button aria-label="سبد خرید" onClick={() => notify('سبد خرید شما خالی است')}><ShoppingBag size={18}/></button>
          <button aria-label="علاقه‌مندی" onClick={() => notify('به علاقه‌مندی‌ها اضافه شد')}><Heart size={18}/></button>
          <button className="mobile-menu" aria-label="منو" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14}/> تجربه‌ای از طعم اصیل</div>
          <h1>جشنی برای<br/><strong>غنای شب‌های عربی</strong></h1>
          <p>از طعم‌های اصیل خاورمیانه تا ترکیب‌های تازه و خلاقانه؛ هر بشقاب داستانی از فرهنگ، مهمان‌نوازی و عشق به غذاست.</p>
          <div className="hero-actions"><a className="pill cream" href="#menu">مشاهده منو <ArrowLeft size={16}/></a><button className="pill outline" onClick={() => notify('فرم رزرو میز آماده است')}>رزرو میز <Utensils size={15}/></button></div>
          <div className="micro-tags"><span><Search size={13}/> غذای اصیل</span><span><Check size={13}/> مواد تازه</span><span><Clock3 size={13}/> تحویل سریع</span></div>
        </div>
        <div className="hero-foods">
          {[0,1,2].map((offset, i) => { const food = foods[(active + offset) % foods.length]; return <button key={food.name} className={`orbit-card ${i===0?'tall':''} ${i===2?'cream-card':''}`} onClick={() => setActive((active + 1) % foods.length)}><Image src={food.image} width={500} height={500} alt={food.name}/><small>{food.tag}</small><h3>{food.name}</h3><span>مشاهده جزئیات</span></button>; })}
          <div className="dots">{foods.map((food, i)=><button aria-label={`غذای ${i+1}`} key={food.name} className={i===active ? 'dot active' : 'dot'} onClick={() => setActive(i)} />)}</div>
        </div>
      </section>

      <div className="ticker"><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span><span>•</span><span>FOOD WORLD</span></div>

      <section className="section shell"><div className="section-head center"><div className="eyebrow"><Star size={13}/> چرا ما؟</div><h2>چرا مهمان‌های ما را انتخاب می‌کنند؟</h2><p>طعم اصیل، مهمان‌نوازی گرم و کیفیتی که در هر بار سفارش حس می‌کنید.</p></div><div className="benefits">{[['⚡','تحویل سریع'],['✦','تنوع غذایی'],['♡','سلامت بیشتر'],['✧','بهترین کیفیت']].map(([icon,title],i)=><article className={i===1?'benefit active':'benefit'} key={title}><span>{icon}</span><h3>{title}</h3><p>مواد تازه، سرو دقیق و تجربه‌ای که برای شما طراحی شده است.</p></article>)}</div></section>

      <section className="section shell" id="categories"><div className="section-head split"><div><div className="eyebrow"><Utensils size={13}/> دسته‌بندی</div><h2>طعم مورد علاقه‌ات را پیدا کن</h2></div><a className="text-button" href="#menu">مشاهده همه <ArrowLeft size={15}/></a></div><div className="category-row">{categories.map(([icon,title,desc])=><button className="category" key={title} onClick={()=>notify(`${title} انتخاب شد`)}><span>{icon}</span><strong>{title}</strong><small>{desc}</small></button>)}</div></section>

      <section className="section shell" id="menu"><div className="section-head split"><div><div className="eyebrow"><Sparkles size={13}/> منوی امروز</div><h2>محبوب‌ترین‌های ما</h2></div><div className="filter"><button className="selected">همه</button><button>کبابی</button><button>سالم</button><button>دسر</button></div></div><div className="food-grid">{foods.map(food=><article className="food-card" key={food.name}><div className="food-img"><Image src={food.image} width={600} height={600} alt={food.name}/><button className="heart" onClick={()=>notify('به علاقه‌مندی‌ها اضافه شد')}><Heart size={16}/></button><span>{food.tag}</span></div><div className="food-meta"><div><h3>{food.name}</h3><p>ترکیبی از ادویه‌های شرقی و مواد تازه</p></div><strong>{food.price} <small>تومان</small></strong></div><button className="add" onClick={()=>notify(`${food.name} به سبد اضافه شد`)}>افزودن به سفارش <ArrowLeft size={15}/></button></article>)}</div></section>

      <section className="story shell" id="story"><div className="story-visual"><Image src="/assets/chef.svg" width={500} height={650} alt="سرآشپز"/><div className="round-stamp">طعم اصیل<br/>از دل شرق</div></div><div className="story-copy"><div className="eyebrow dark-eyebrow"><Sparkles size={13}/> سفارش آنلاین</div><h2>غذاهای مورد علاقه‌ات،<br/><strong>سریع و گرم در خانه</strong></h2><p>فقط چند کلیک تا تجربه‌ای تازه فاصله دارید. از انتخاب غذا تا ارسال، همه چیز را ساده و سریع طراحی کرده‌ایم.</p><div className="hero-actions"><a className="pill dark" href="#menu">شروع سفارش <ArrowLeft size={15}/></a><button className="pill dark-outline" onClick={()=>notify('رزرو میز آماده است')}>رزرو میز</button></div></div></section>

      <section className="journey shell"><div><div className="eyebrow"><Sparkles size={13}/> داستان ما</div><h2>ریشه‌های آشپزی اصیل عربی را کشف کنید</h2><p>از دستورهای خانوادگی تا میزهای امروز؛ مسیر ما با احترام به سنت و نگاه به آینده شکل گرفته است.</p><div className="journey-facts"><span>+۱۰ سال<small>تجربه</small></span><span>+۱۲۰<small>غذای سرو شده</small></span><span>+۵۰<small>مشتری راضی</small></span></div></div><div className="journey-card"><Image src="/assets/platter.svg" width={600} height={600} alt="سینی غذای شرقی"/><div><b>Hunter Michael</b><small>مدیر و بنیان‌گذار</small><p>«غذا فقط یک وعده نیست؛ راهی برای نزدیک‌تر شدن آدم‌هاست.»</p></div></div></section>

      <section className="people-section shell"><div className="section-head split"><div><div className="eyebrow"><Star size={13}/> انتخاب محبوب</div><h2>مهمان‌های ویژه ما</h2></div></div><div className="people"><article className="feature-person"><Image src="/assets/portrait1.svg" width={400} height={500} alt="مهمان ویژه"/><div><h3>مهمان ویژه</h3><p>طعم‌های تازه و تجربه‌ای متفاوت</p><span>★★★★★</span></div></article>{['علاقه‌مند غذا','سرآشپز مهمان','منتقد غذا'].map((x,i)=><article className="person" key={x}><Image src={i===1?'/assets/portrait2.svg':'/assets/portrait1.svg'} width={400} height={500} alt={x}/><strong>{x}</strong><small>★★★★★</small></article>)}</div></section>

      <footer id="contact"><div className="footer-main shell"><div><a className="brand footer-brand" href="#home"><span>Eastern</span><b>Table</b></a><p>جایی برای کشف طعم‌های اصیل، مهمان‌نوازی گرم و خاطره‌های خوش.</p></div><div><h4>لینک‌های مفید</h4><a href="#home">خانه</a><a href="#menu">منو</a><a href="#story">درباره ما</a></div><div><h4>خدمات</h4><a href="#menu">سفارش آنلاین</a><a href="#contact">رزرو میز</a><a href="#contact">پشتیبانی</a></div><div><h4>تماس با ما</h4><a>تهران، خیابان ولیعصر</a><a>۰۲۱-۱۲۳۴۵۶۷۸</a><a>hello@easterntable.ir</a></div></div><div className="copyright shell"><span>© ۱۴۰۵ Eastern Table</span><span>طراحی و توسعه با React · Next.js · TypeScript</span></div></footer>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
