import { useState } from 'react'
import HeaderNavigation from './HeaderNavigation'
import HeaderActions from './HeaderActions'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activePath = window.location.pathname

  return <header className="site-header wrap">
    <a className="brand" href="/" aria-label="NEXORA - صفحهٔ اصلی">
      <img className="brand-logo-image" src="/assets/nexora-logo-horizontal.png" alt="NEXORA" />
    </a>
    <HeaderNavigation activePath={activePath} isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
    <HeaderActions menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(open => !open)} />
  </header>
}
