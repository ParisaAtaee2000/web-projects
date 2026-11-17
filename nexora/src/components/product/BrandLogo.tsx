import type { Product } from '../../data/store'

export default function BrandLogo({ brand }: { brand: Product['brand'] }) {
  if (brand === 'microsoft') return <span className="ms-logo"><i /><i /><i /><i /></span>
  if (brand === 'netflix') return <span className="netflix-logo">N</span>
  if (brand === 'youtube') return <span className="youtube-logo">▶</span>
  if (brand === 'spotify') return <span className="spotify-logo">●</span>
  if (brand === 'google') return <span className="google-logo">G</span>
  return <span className="chat-logo"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c-8.8 0-15.5 5.9-15.5 13.4 0 4 1.9 7.4 5.2 9.8l-1 6 6-3.1c1.7.5 3.5.8 5.3.8 8.8 0 15.5-5.9 15.5-13.4S28.8 4 20 4Zm-6.8 9.5 6 6 7.4-6.2-5.8 7.2 6 6-7.2-4.4-7.6 4.2 6.1-6.7-4.9-6.1Z" /></svg></span>
}
