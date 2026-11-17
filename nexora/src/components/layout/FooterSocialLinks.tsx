import { Icon } from '../ui/Icon'

const links = [
  { label: 'تلگرام', icon: 'telegram' as const },
  { label: 'اینستاگرام', icon: 'instagram' as const },
  { label: 'ایکس', icon: 'x' as const },
  { label: 'یوتیوب', icon: 'youtube' as const },
]

export default function FooterSocialLinks() {
  return <div className="socials">
    {links.map(link => <a href="/contact" aria-label={link.label} key={link.icon}><Icon name={link.icon} /></a>)}
  </div>
}
