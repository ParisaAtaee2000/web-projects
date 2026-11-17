import { products } from '../../data/store'
import ProductCard from '../product/ProductCard'
import { Icon } from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

function PromotionalBanner() {
  return <a href="/shop?offer=special" className="promo-card">
    <img src="/assets/promo-portal.jpg" alt="درگاه درخشان نکسورا" />
    <span className="promo-pill">پیشنهاد ویژه</span>
    <div><small>پیشنهاد ویژه</small><h3>تا ۵۰٪ تخفیف</h3><p>برای محصولات منتخب</p>
      <span className="promo-cta">مشاهده پیشنهادها <Icon name="arrow" size={16} /></span>
    </div>
  </a>
}

export default function FeaturedProductsSection() {
  return <section className="section wrap product-section" id="products" data-reveal>
    <div className="product-heading"><SectionHeading title="محصولات پرفروش" /></div>
    <div className="product-layout">
      <PromotionalBanner />
      <div className="product-grid">{products.slice(0, 3).map(product => <ProductCard key={product.brand} product={product} />)}</div>
    </div>
  </section>
}
