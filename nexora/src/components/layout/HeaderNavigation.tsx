import { Icon } from '../ui/Icon'

const links = [
  { href: '/shop', label: 'فروشگاه' },
  { href: '/journal', label: 'مجله' },
  { href: '/help', label: 'راهنما' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
]

type Props = { activePath: string; isOpen: boolean; onNavigate: () => void }

export default function HeaderNavigation({ activePath, isOpen, onNavigate }: Props) {
  return <nav className={'main-nav' + (isOpen ? ' is-open' : '')} aria-label="ناوبری اصلی">
    {links.map(link => <a
      key={link.href}
      className={activePath === link.href || (link.href === '/shop' && activePath.startsWith('/product')) ? 'active' : ''}
      href={link.href}
      onClick={onNavigate}
    >{link.label}{link.href === '/about' && <Icon name="chevron" size={13} />}</a>)}
  </nav>
}
