import { formatToman, products } from '../data/store'
import { useCart } from '../contexts/CartContext'
import BrandLogo from '../components/product/BrandLogo'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()
  const lines = items.map(item => {
    const product = item.productSnapshot ?? products.find(entry => entry.slug === item.slug)
    const variant = product?.variants.find(entry => entry.id === item.variantId)
    return { ...item, product, variant }
  }).filter(item => item.product && item.variant)
  const totalIrr = lines.reduce((sum, item) => sum + (item.variant?.priceAmount ?? 0) * item.quantity, 0)
  const formattedTotal = formatToman(totalIrr)

  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'سبد خرید' }]} />
    <div className="page-heading-row">
      <div><span className="page-kicker">YOUR BAG</span><h1>سبد خرید</h1></div>
      <span className="catalog-count">{lines.length} محصول</span>
    </div>
    {lines.length ? (
      <div className="cart-layout">
        <section className="cart-lines">
          {lines.map(({ slug, variantId, quantity, product, variant }) => product && variant && (
            <article className="cart-line" key={slug + '-' + variantId}>
              <div className="cart-product-logo"><BrandLogo brand={product.brand} /></div>
              <div className="cart-product-info">
                <a href={'/product/' + product.slug}><h2>{product.name}</h2></a>
                <span>{variant.title} · {variant.durationLabel}</span><b>{formatToman(variant.priceAmount)} تومان</b>
              </div>
              <div className="quantity-control">
                <button type="button" onClick={() => setQuantity(slug, variantId, quantity - 1)} aria-label="کم‌کردن تعداد">−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity(slug, variantId, quantity + 1)} aria-label="زیادکردن تعداد">+</button>
              </div>
              <button type="button" className="remove-item" onClick={() => remove(slug, variantId)}>حذف</button>
            </article>
          ))}
        </section>
        <aside className="cart-summary">
          <h2>خلاصه سفارش</h2>
          <div><span>جمع محصولات</span><b>{formattedTotal} تومان</b></div>
          <div><span>هزینه ارسال</span><b>رایگان</b></div><hr />
          <div className="summary-total"><span>مبلغ نهایی</span><b>{formattedTotal} تومان</b></div>
          <a className="button button-primary" href="/checkout">ادامه و پرداخت <Icon name="arrow" size={18} /></a>
          <a className="continue-shopping" href="/shop">ادامه خرید</a>
          <small><Icon name="shield" size={15} /> پرداخت شما در محیط امن انجام می‌شود.</small>
        </aside>
      </div>
    ) : (
      <div className="empty-state cart-empty">
        <span className="empty-cart-icon"><Icon name="cart" size={35} /></span>
        <h2>سبد خریدت خالی است</h2><p>با گشت‌وگذار در فروشگاه، اشتراک مناسب خودت را پیدا کن.</p>
        <a className="button button-primary" href="/shop">رفتن به فروشگاه</a>
      </div>
    )}
  </div>
}
