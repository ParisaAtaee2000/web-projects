import type { ReactNode, SVGProps } from 'react'

type IconName = 'user' | 'heart' | 'cart' | 'search' | 'chevron' | 'arrow' | 'play' | 'game' | 'movie' | 'learn' | 'ai' | 'cloud' | 'shield' | 'headphones' | 'grid' | 'briefcase' | 'check' | 'support' | 'clock' | 'mail' | 'telegram' | 'instagram' | 'youtube' | 'x'

const paths: Record<IconName, ReactNode> = {
  user: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
  cart: <><path d="M3 4h2l2.4 11.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
  chevron: <path d="m7 10 5 5 5-5"/>,
  arrow: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
  play: <><circle cx="12" cy="12" r="9.5"/><path d="m10 8 6 4-6 4z"/></>,
  game: <><path d="M7 9h10a5 5 0 0 1 4.8 6.3l-.6 2.2a2 2 0 0 1-3.2 1l-3-2.5H9l-3 2.5a2 2 0 0 1-3.2-1l-.6-2.2A5 5 0 0 1 7 9Z"/><path d="M8 12v4m-2-2h4m5-.5h.01m3 2h.01"/></>,
  movie: <><path d="M4 5h16v14H4zM4 10h16M9 5v5m6-5v5m-6 5v4m6-4v4"/><path d="m11 12 3 2-3 2z"/></>,
  learn: <><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v7"/></>,
  ai: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9zM12 1v3m0 16v3m11-11h-3M4 12H1m18.8-7.8-2.1 2.1M6.3 17.7l-2.1 2.1m15.6 0-2.1-2.1M6.3 6.3 4.2 4.2"/></>,
  cloud: <path d="M20 17.5a4.5 4.5 0 0 0-.6-9 7 7 0 0 0-13.5 1.7 4 4 0 0 0 .6 7.9H20Z"/>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
  headphones: <><path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="2" y="13" width="5" height="8" rx="2"/><rect x="17" y="13" width="5" height="8" rx="2"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  telegram: <><path d="m22 3-7 18-4-8-8-4 19-6Z"/><path d="m11 13 5-5"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></>,
  x: <><path d="m4 4 16 16M20 4 4 20"/></>,
}

export function Icon({ name, size = 22, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

export type { IconName }
