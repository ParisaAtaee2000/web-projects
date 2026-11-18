import { useEffect, useRef, type FormEvent, type MouseEvent, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'

type Props = { isOpen: boolean; onToggle: () => void; onSubmit: () => void }

export default function SearchBar({ isOpen, onToggle, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = inputRef.current?.value.trim() ?? ''
    navigate(query ? '/shop?q=' + encodeURIComponent(query) : '/shop')
    onSubmit()
  }

  function handleSearchClick(event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia('(max-width: 760px)').matches && !isOpen) {
      event.preventDefault()
      onToggle()
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && isOpen) onToggle()
  }

  return <form className={'search' + (isOpen ? ' is-mobile-open' : '')} onSubmit={handleSubmit}>
    <input ref={inputRef} name="q" type="search" aria-label="جستجو" placeholder="جستجو در NEXORA..." onKeyDown={handleKeyDown} />
    <button type="submit" aria-label="جستجو" onClick={handleSearchClick}><Icon name="search" size={19} /></button>
  </form>
}
