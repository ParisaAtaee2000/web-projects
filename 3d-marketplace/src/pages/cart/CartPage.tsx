import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import { formatToman } from "../../data/marketplace";
import { readCart, removeFromCart, setCartQuantity, subscribeToCart, type CartItem } from "../../lib/demoCart";
import "../../components/catalog/marketplace-pages.css";

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());
  useEffect(() => subscribeToCart(() => setItems(readCart())), []);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  return (
    <div className="page" dir="rtl">
      <header className="form-page__header"><span className="marketplace-catalog__eyebrow"><ShoppingBag size={15} aria-hidden="true" /> سبد خرید</span><h1>چیزهایی که انتخاب کردی</h1><p>تعداد اقلام را تغییر بده یا قبل از ادامه، فهرست را بررسی کن.</p></header>
      {items.length === 0 ? (
        <div className="cart-empty"><h2>سبد خرید هنوز خالی است</h2><p>از میان محصولات نمونه شروع کن و کالاهای موردنظرت را به سبد اضافه کن.</p><a href={ROUTES.products}>مشاهده محصولات <ArrowLeft size={15} aria-hidden="true" /></a></div>
      ) : (
        <div className="cart-page__layout">
          <section className="form-panel" aria-label="اقلام سبد خرید">
            {items.map((item) => <article className="cart-line" key={item.id}>
              <img className="cart-line__image" src={item.image} alt={item.alt} />
              <div className="cart-line__copy"><h3><a href={`${ROUTES.products}/${item.id}`}>{item.title}</a></h3><p>{item.maker} · {item.categoryLabel}</p><div className="cart-line__price">{formatToman(item.price)} تومان</div>
                <div className="cart-line__controls"><button type="button" disabled={item.quantity <= 1} onClick={() => setCartQuantity(item.id, item.quantity - 1)} aria-label={`کاهش تعداد ${item.title}`}><Minus size={14} aria-hidden="true" /></button><span>{item.quantity.toLocaleString("fa-IR")}</span><button type="button" disabled={item.quantity >= 99} onClick={() => setCartQuantity(item.id, item.quantity + 1)} aria-label={`افزایش تعداد ${item.title}`}><Plus size={14} aria-hidden="true" /></button></div>
              </div>
              <button type="button" className="cart-line__remove" onClick={() => removeFromCart(item.id)}><Trash2 size={13} aria-hidden="true" /> حذف</button>
            </article>)}
          </section>
          <aside className="form-panel cart-summary">
            <h2>خلاصهٔ سبد</h2><div className="cart-summary__row"><span>تعداد اقلام</span><strong>{items.reduce((sum,item)=>sum+item.quantity,0).toLocaleString("fa-IR")}</strong></div>
            <div className="cart-summary__row"><span>جمع کالاها</span><strong>{formatToman(total)} تومان</strong></div>
            <div className="cart-summary__row"><span>هزینه ارسال</span><strong>محاسبه نشده</strong></div>
            <div className="cart-summary__row cart-summary__total"><span>جمع نمونه</span><strong>{formatToman(total)} تومان</strong></div>
            <p className="form-note">این سبد در همین مرورگر ذخیره می‌شود. قیمت‌ها نمونه‌اند و پرداخت واقعی فعال نیست.</p>
            <a className="form-primary-button" href={ROUTES.checkout}>ادامه به پیش‌نمایش سفارش <ArrowLeft size={15} aria-hidden="true" /></a>
          </aside>
        </div>
      )}
    </div>
  );
}
