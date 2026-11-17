import { Icon } from '../ui/Icon'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import SearchBar from './SearchBar'

type Props = { menuOpen: boolean; onToggleMenu: () => void }

export default function HeaderActions({ menuOpen, onToggleMenu }: Props) {
  const { count } = useCart()
  const favorites = useFavorites()

  return <div className="header-tools">
    <a className="icon-button cart-button" href="/cart" aria-label={'سبد خرید، ' + count + ' کالا'}>
      <Icon name="cart" />{count > 0 && <span className="cart-count">{new Intl.NumberFormat('fa-IR').format(count)}</span>}
    </a>
    <a className="icon-button favorite-header-button" href="/favorites" aria-label={'علاقه‌مندی‌ها، ' + favorites.count + ' محصول'}>
      <Icon name="heart" />{favorites.count > 0 && <span className="cart-count">{new Intl.NumberFormat('fa-IR').format(favorites.count)}</span>}
    </a>
    <a className="icon-button" href="/account" aria-label="حساب کاربری"><Icon name="user" /></a>
    <SearchBar />
    <button type="button" className={'menu-toggle' + (menuOpen ? ' is-open' : '')} aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} onClick={onToggleMenu}>
      <span /><span /><span />
    </button>
  </div>
}
