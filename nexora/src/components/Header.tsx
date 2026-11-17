import { useState } from 'react'
import { useCart } from './CartContext'
import { useFavorites } from './FavoritesContext'
import { Icon } from './Icons'

const links = [
  { href: '/shop', label: 'فروشگاه' },
  { href: '/journal', label: 'مجله' },
  { href: '/help', label: 'راهنما' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()
  const { count: favoriteCount } = useFavorites()
  const path = window.location.pathname
  return <header className="site-header wrap">
    <a className="brand" href="/" aria-label="NEXORA"><img className="brand-logo-image" src="/assets/nexora-logo.svg" alt="NEXORA"/></a>
    <nav className={\`main-nav\${menuOpen ? ' is-open' : ''}\`} aria-label="ناوبری اصلی">
      {links.map(link => <a key={link.href} className={path === link.href || (link.href === '/shop' && path.startsWith('/product')) ? 'active' : ''} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}{link.href === '/about' && <Icon name="chevron" size={13}/>}</a>)}
    </nav>
    <div className="header-tools">
      <a className="icon-button cart-button" href="/cart" aria-label={\`سبد خرید، \${count} کالا\`}><Icon name="cart"/>{count > 0 && <span className="cart-count">{new Intl.NumberFormat('fa-IR').format(count)}</span>}</a>
      <a className="icon-button favorite-header-button" href="/favorites" aria-label={\`علاقه‌مندی‌ها، \${favoriteCount} کالا\`}><Icon name="heart"/>{favoriteCount > 0 && <span className="cart-count">{new Intl.NumberFormat('fa-IR').format(favoriteCount)}</span>}</a>
      <a className="icon-button" href="/account" aria-label="حساب کاربری"><Icon name="user"/></a>
      <form className="search" action="/shop"><input name="q" aria-label="جستجو" placeholder="جستجو در NEXORA..."/><button type="submit" aria-label="جستجو"><Icon name="search" size={19}/></button></form>
      <button type="button" className={\`menu-toggle\${menuOpen ? ' is-open' : ''}\`} aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><span/><span/><span/></button>
    </div>
  </header>
}
