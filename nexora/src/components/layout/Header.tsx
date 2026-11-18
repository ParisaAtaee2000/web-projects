import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderNavigation from './HeaderNavigation'
import HeaderActions from './HeaderActions'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname: activePath } = useLocation()

  return <header className="site-header wrap">
    <a className="brand" href="/" aria-label="NEXORA - صفحهٔ اصلی">
      <img className="brand-logo-image" src="/assets/nexora-logo-horizontal.png" alt="NEXORA" />
    </a>
    <HeaderNavigation activePath={activePath} isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
    <HeaderActions
      menuOpen={menuOpen}
      searchOpen={searchOpen}
      onToggleMenu={() => { setSearchOpen(false); setMenuOpen(open => !open) }}
      onToggleSearch={() => { setMenuOpen(false); setSearchOpen(open => !open) }}
      onSearchSubmit={() => setSearchOpen(false)}
    />
  </header>
}
