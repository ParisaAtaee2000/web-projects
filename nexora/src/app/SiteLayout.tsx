import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AppRouter from './AppRouter'

export default function SiteLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    function handleInternalNavigation(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol)) return
      if (anchor.relList.contains('external') || /\.[a-z0-9]{2,}$/i.test(url.pathname)) return
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return
      event.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }

    document.addEventListener('click', handleInternalNavigation)
    return () => document.removeEventListener('click', handleInternalNavigation)
  }, [navigate])

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], main > .page-shell'))
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname])

  return <><Header /><main><AppRouter /></main><Footer /></>
}
