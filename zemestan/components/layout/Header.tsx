import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export function Header(){return <><div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>حداقل سفارش هر محصول از ۸ عدد</span><span>ارسال با پست به سراسر کشور</span></div></div><header className="site-header"><div className="container nav"><Link href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></Link><nav className="navlinks"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/#wholesale">عمده‌فروشی</Link><Link href="/#about">درباره ما</Link></nav><div className="nav-actions"><Link className="icon-btn" href="/shop" aria-label="جستجو">⌕</Link><Link className="icon-btn" href="/wishlist" aria-label="علاقه‌مندی‌ها">♡</Link><Link className="icon-btn" href="/cart" aria-label="سبد سفارش">🛒</Link><Link className="btn primary desktop-only" href="/shop">مشاهده محصولات</Link><MobileMenu/></div></div></header></>}

export function MobileNav(){return null}
