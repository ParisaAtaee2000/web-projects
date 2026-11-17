import { Icon } from './Icon'

type Props = { title: string; eyebrow?: string; href?: string }

export default function SectionHeading({ title, eyebrow, href = '/shop' }: Props) {
  return <div className="section-heading">
    <div><span className="heading-line" /><div>{eyebrow && <span className="section-eyebrow">{eyebrow}</span>}<h2>{title}</h2></div></div>
    <a href={href}>مشاهده همه <Icon name="arrow" size={17} /></a>
  </div>
}
