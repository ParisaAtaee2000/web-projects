import { useEffect, useRef, type MouseEvent, type KeyboardEvent } from 'react'
import { Icon } from '../ui/Icon'

type Props = { isOpen: boolean; onToggle: () => void; onSubmit: () => void }

export default function SearchBar({ isOpen, onToggle, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  function handleSearchClick(event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia('(max-width: 760px)').matches && !isOpen) {
      event.preventDefault()
      onToggle()
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && isOpen) onToggle()
  }

  return <form className={'search' + (isOpen ? ' is-mobile-open' : '')} action="/shop" onSubmit={onSubmit}>
    <input ref={inputRef} name="q" type="search" aria-label="جستجو" placeholder="جستجو در NEXORA..." onKeyDown={handleKeyDown} />
    <button type="submit" aria-label="جستجو" onClick={handleSearchClick}><Icon name="search" size={19} /></button>
  </form>
}
