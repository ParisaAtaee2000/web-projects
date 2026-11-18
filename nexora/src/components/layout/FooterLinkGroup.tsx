type LinkItem = { label: string; href: string }

export default function FooterLinkGroup({ title, links }: { title: string; links: LinkItem[] }) {
  return <div className="footer-links"><h3>{title}</h3>{links.map(link => <a href={link.href} key={link.label}>{link.label}</a>)}</div>
}
