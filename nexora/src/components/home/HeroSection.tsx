import { Icon } from '../ui/Icon'

export default function HeroSection() {
  return <section className="hero wrap" id="home">
    <div className="hero-copy" data-reveal>
      <span className="eyebrow-pill"><b>NEXORA</b><i /> Digital Marketplace</span>
      <h1>انتخاب هوشمندانه<br />در <em>دنیای دیجیتال</em></h1>
      <p>از ابزارهای هوش مصنوعی تا سرویس‌های سرگرمی و بهره‌وری،<br className="desktop-break" /> همه‌چیز در یک‌جا برای شما.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="/shop">شروع کاوش <Icon name="arrow" size={19} /></a>
        <a className="play-link" href="/about">معرفی نکسورا <Icon name="play" size={26} /></a>
      </div>
    </div>
    <div className="hero-art" data-reveal>
      <img src="/assets/nexora-hero.jpg" alt="دنیای نکسورا و سرویس‌های دیجیتال" />
      <span className="hero-orbit" /><span className="spark spark-one">✦</span><span className="spark spark-two">✦</span>
    </div>
    <a className="floating-caption" href="#categories"><span className="heading-line" />دسته‌بندی‌ها</a>
  </section>
}
