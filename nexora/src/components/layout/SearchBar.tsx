import { Icon } from '../ui/Icon'

export default function SearchBar() {
  return <form className="search" action="/shop">
    <input name="q" aria-label="جستجو" placeholder="جستجو در NEXORA..." />
    <button type="submit" aria-label="جستجو"><Icon name="search" size={19} /></button>
  </form>
}
