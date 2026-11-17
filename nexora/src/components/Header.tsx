import { Icon } from './Icons'

export default function Header() {
  return <header className="site-header wrap">
    <a className="brand" href="#home" aria-label="Nexora home"><span className="brand-word">NEXORA</span><span className="brand-mark">N</span></a>
    <nav className="main-nav" aria-label="ناوبری اصلی">
      <a className="active" href="#products">فروشگاه</a><a href="#journal">مجله</a><a href="#faq">راهنما</a><a href="#about">درباره ما <Icon name="chevron" size={13}/></a><a href="#contact">تماس با ما</a>
    </nav>
    <div className="header-tools">
      <button className="icon-button cart-button" aria-label="سبد خرید"><Icon name="cart"/><span className="cart-count">۱</span></button>
      <button className="icon-button" aria-label="علاقه‌مندی‌ها"><Icon name="heart"/></button>
      <button className="icon-button" aria-label="حساب کاربری"><Icon name="user"/></button>
      <label className="search"><span>جستجو در NEXORA...</span><Icon name="search" size={19}/><input aria-label="جستجو" /></label>
      <button className="menu-toggle" aria-label="باز کردن منو"><span/><span/><span/></button>
    </div>
  </header>
}
