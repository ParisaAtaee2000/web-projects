type Props = { kicker: string; title: string; intro?: string }

export default function PageHeading({ kicker, title, intro }: Props) {
  return <div className="page-heading-row"><div>
    <span className="page-kicker">{kicker}</span><h1>{title}</h1>{intro && <p>{intro}</p>}
  </div></div>
}
