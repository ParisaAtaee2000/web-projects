type Item = { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return <div className="breadcrumbs">
    {items.map((item, index) => <span className="breadcrumb-item" key={item.label + '-' + index}>
      {index > 0 && <span>/</span>}
      {item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
    </span>)}
  </div>
}
