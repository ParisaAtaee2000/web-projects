import { products } from '../data/store'
import { useCart } from '../components/CartContext'
import { BrandLogo } from '../components/ProductCard'
import { Icon } from '../components/Icons'

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()
  const lines = items.map(item => ({ ...item, product: products.find(product => product.slug === item.slug) })).filter(item => item.product)
  const total = lines.reduce((sum, item) => sum + (item.product?.priceValue ?? 0) * item.quantity, 0)
  const formattedTotal = new Intl.NumberFormat('fa-IR').format(total)

  return <div className="page-shell wrap">
    <div className="breadcrumbs"><a href="/">خانه</a><span>/</span><b>سبد خرید</b></div><div className="page-heading-row"><div><span className="page-kicker">YOUR BAG</span><h1>سبد خرید</h1></div><span className="catalog-count">{lines.length} محصول</span></div>
    {lines.length ? <div className="cart-layout"><section className="cart-lines">{lines.map(({ slug, quantity, product }) => product && <article className="cart-line" key={slug}><div className="cart-product-logo"><BrandLogo brand={product.brand}/></div><div className="cart-product-info"><a href={`/product/${product.slug}`}><h2>{product.name}</h2></a><span>{product.description}</span><b>{product.price} تومان</b></div><div className="quantity-control"><button onClick={() => setQuantity(slug, quantity - 1)} aria-label="کم‌کردن تعداد">−</button><span>{quantity}</span><button onClick={() => setQuantity(slug, quantity + 1)} aria-label="زیادکردن تعداد">+</button></div><button className="remove-item" onClick={() => remove(slug)}>حذف</button></article>)}</section>
      <aside className="cart-summary"><h2>خلاصه سفارش</h2><div><span>جمع محصولات</span><b>{formattedTotal} تومان</b></div><div><span>هزینه ارسال</span><b>رایگان</b></div><hr/><div className="summary-total"><span>مبلغ نهایی</span><b>{formattedTotal} تومان</b></div><a className="button button-primary" href="/checkout">ادامه و پرداخت <Icon name="arrow" size={18}/></a><a className="continue-shopping" href="/shop">ادامه خرید</a><small><Icon name="shield" size={15}/> پرداخت شما در محیط امن انجام می‌شود.</small></aside></div>
      : <div className="empty-state cart-empty"><span className="empty-cart-icon"><Icon name="cart" size={35}/></span><h2>سبد خریدت خالی است</h2><p>با گشت‌وگذار در فروشگاه، اشتراک مناسب خودت را پیدا کن.</p><a className="button button-primary" href="/shop">رفتن به فروشگاه</a></div>}
  </div>
}
