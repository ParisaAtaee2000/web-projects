import { categories } from '../../data/store'
import { Icon } from '../ui/Icon'

export default function CategorySection() {
  return <section className="section wrap category-section" id="categories" data-reveal>
    <div className="category-heading">
      <div className="category-heading-copy"><h2>دسته‌بندی بر اساس نیاز شما</h2><p>به‌راحتی سرویس موردنظرت رو پیدا کن</p></div>
      <a href="/shop">مشاهده دسته‌بندی‌ها <Icon name="arrow" size={17} /></a>
    </div>
    <div className="category-grid">
      {categories.map((item, index) => item.count > 0 ? (
        <a className="category-card" href={'/shop?category=' + encodeURIComponent(item.slug)} key={item.slug}>
          <span className={'category-icon tone-' + index}><Icon name={item.icon} size={36} /></span>
          <strong>{item.title}</strong><small>{new Intl.NumberFormat('fa-IR').format(item.count)} محصول</small>
        </a>
      ) : (
        <div className="category-card is-empty" key={item.slug} aria-label={item.title + '، به‌زودی'}>
          <span className={'category-icon tone-' + index}><Icon name={item.icon} size={36} /></span>
          <strong>{item.title}</strong><small>به‌زودی</small>
        </div>
      ))}
    </div>
  </section>
}
