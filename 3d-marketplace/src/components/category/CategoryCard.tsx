interface CategoryCardProps { title: string; href: string; description?: string; }
export function CategoryCard({ title, href, description }: CategoryCardProps) {
  return <a className="category-card" href={href}><h3>{title}</h3>{description && <p>{description}</p>}</a>;
}
