"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { ids } = useWishlist();
  const { itemCount } = useCart();
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>فروش مستقیم از تولیدکننده</span><span>حداقل سفارش هر محصول از ۸ عدد</span><span>ارسال با پست به سراسر کشور</span></div></div>
    <header className="site-header"><div className="container nav">
      <button className="mobile-menu-button" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen((v) => !v)}><span/><span/><span/></button>
      <Link href="/" className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></Link>
      <nav className="navlinks"><Link href="/">خانه</Link><Link href="/shop">فروشگاه</Link><Link href="/#collections">کالکشن</Link><Link href="/#wholesale">عمده‌فروشی</Link><Link href="/#about">درباره ما</Link></nav>
      <div className="nav-actions"><Link className="icon-btn" href="/shop" aria-label="جستجو">⌕</Link><Link className="icon-btn nav-account" href={user ? "/account" : "/login"} aria-label="حساب کاربری">◯</Link><Link className="icon-btn nav-wishlist" href="/wishlist" aria-label="علاقه‌مندی‌ها">♡{ids.length > 0 && <span className="badge">{ids.length}</span>}</Link><Link className="icon-btn nav-cart" href="/cart" aria-label="سبد سفارش">🛒{itemCount > 0 && <span className="badge">{itemCount}</span>}</Link><Link className="btn primary nav-cta" href="/shop">مشاهده محصولات</Link></div>
    </div></header>
    {open && <div className="mobile-menu-overlay" onClick={() => setOpen(false)}><aside className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
      <div className="mobile-menu-head"><div><div className="section-kicker">ZEMESTAN / MENU</div><strong>منوی سایت</strong></div><button className="icon-btn" onClick={() => setOpen(false)} aria-label="بستن">×</button></div>
      <div className="mobile-account-card"><span className="menu-icon">◯</span><div><strong>{user ? user.name : "خریدار عمده"}</strong><span>{user ? user.storeName : "ورود برای مشاهده سفارش‌ها"}</span></div><Link href={user ? "/account" : "/login"} onClick={() => setOpen(false)}>{user ? "حساب من" : "ورود / ثبت‌نام"}</Link></div>
      <nav className="mobile-menu-links"><Link href="/" onClick={() => setOpen(false)}>خانه</Link><Link href="/shop" onClick={() => setOpen(false)}>همه محصولات</Link><Link href="/#collections" onClick={() => setOpen(false)}>کالکشن‌ها</Link><Link href="/#wholesale" onClick={() => setOpen(false)}>خرید عمده</Link><Link href="/wishlist" onClick={() => setOpen(false)}>علاقه‌مندی‌ها <span>{ids.length.toLocaleString("fa-IR")}</span></Link><Link href="/cart" onClick={() => setOpen(false)}>سفارش من <span>{itemCount.toLocaleString("fa-IR")}</span></Link></nav>
      <div className="mobile-menu-categories"><div className="section-kicker">CATEGORIES</div><div className="mobile-category-grid"><Link href="/shop?category=parka" onClick={() => setOpen(false)}>پارکا و کاپشن</Link><Link href="/shop?category=coat" onClick={() => setOpen(false)}>پالتو</Link><Link href="/shop?category=leather" onClick={() => setOpen(false)}>چرم</Link><Link href="/shop?category=bomber" onClick={() => setOpen(false)}>بمبر</Link></div></div>
      <div className="mobile-menu-note">تولید مستقیم · MOQ از ۸ عدد · ارسال سراسر کشور</div>
    </aside></div>}
  </>;
}

export function MobileNav() { return null; }
