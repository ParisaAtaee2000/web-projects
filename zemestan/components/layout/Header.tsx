"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import styles from "./MobileNavigation.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const { ids } = useWishlist();
  const { itemCount } = useCart();

  return (
    <>
      <div className={`topbar ${styles.animatedTopbar}`}>
        <div className="container topbar-inner">
          <div className={styles.topbarTrack}>
            <span>فروش مستقیم از تولیدکننده</span>
            <span>حداقل سفارش هر محصول: ۸ عدد</span>
            <span>ارسال با پست به سراسر کشور</span>
            <span>قیمت عمده برای خرید حرفه‌ای</span>
            <span aria-hidden>فروش مستقیم از تولیدکننده</span>
            <span aria-hidden>حداقل سفارش هر محصول: ۸ عدد</span>
            <span aria-hidden>ارسال با پست به سراسر کشور</span>
            <span aria-hidden>قیمت عمده برای خرید حرفه‌ای</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav">
          <button
            className="mobile-menu-button"
            aria-expanded={open}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span /><span />
          </button>

          <Link href="/" className="brand">
            زمستان
            <span className="brand-sub">ZEMESTAN / WHOLESALE</span>
          </Link>

          <nav className="navlinks">
            <Link href="/">خانه</Link>
            <Link href="/shop">فروشگاه</Link>
            <Link href="/#collections">کالکشن</Link>
            <Link href="/#wholesale">عمده‌فروشی</Link>
            <Link href="/#about">درباره ما</Link>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn nav-search" type="button" aria-label="جستجو" onClick={() => setSearchOpen(true)}>⌕</button>
            <Link className="icon-btn nav-account" href={user ? "/account" : "/login"} aria-label="حساب کاربری">◯</Link>
            <Link className="icon-btn nav-wishlist" href="/wishlist" aria-label="علاقه‌مندی‌ها">♡{ids.length > 0 && <span className="badge">{ids.length}</span>}</Link>
            <Link className="icon-btn nav-cart" href="/cart" aria-label="سبد سفارش">🛒{itemCount > 0 && <span className="badge">{itemCount}</span>}</Link>
            <Link className="btn primary nav-cta" href="/shop">مشاهده محصولات</Link>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu-overlay" onClick={() => setOpen(false)}>
          <aside className="mobile-menu-panel" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-menu-head">
              <div>
                <div className="section-kicker">ZEMESTAN / MENU</div>
                <strong>منوی سایت</strong>
              </div>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="بستن">×</button>
            </div>

            <div className="mobile-account-card">
              <span className="menu-icon">◯</span>
              <div>
                <strong>{user ? user.name : "خریدار عمده"}</strong>
                <span>{user ? user.storeName : "برای ثبت سفارش از نوار پایین استفاده کنید"}</span>
              </div>
            </div>

            <button
              className="mobile-menu-search"
              type="button"
              onClick={() => { setOpen(false); setSearchOpen(true); }}
            >
              ⌕ جستجوی نام یا کد محصول
            </button>

            <nav className="mobile-menu-links">
              <Link href="/" onClick={() => setOpen(false)}>خانه</Link>
              <Link href="/shop" onClick={() => setOpen(false)}>همه محصولات</Link>
              <Link href="/#collections" onClick={() => setOpen(false)}>کالکشن‌ها</Link>
              <Link href="/#wholesale" onClick={() => setOpen(false)}>خرید عمده</Link>
            </nav>

            <div className="mobile-menu-categories">
              <div className="section-kicker">CATEGORIES</div>
              <div className="mobile-category-grid">
                <Link href="/shop?category=parka" onClick={() => setOpen(false)}>پارکا و کاپشن</Link>
                <Link href="/shop?category=coat" onClick={() => setOpen(false)}>پالتو</Link>
                <Link href="/shop?category=leather" onClick={() => setOpen(false)}>چرم</Link>
                <Link href="/shop?category=bomber" onClick={() => setOpen(false)}>بمبر</Link>
              </div>
            </div>

            <div className="mobile-menu-note">تولید مستقیم · حداقل سفارش ۸ عدد · ارسال سراسر کشور</div>
          </aside>
        </div>
      )}

      <nav className={styles.bottomNav} aria-label="ناوبری موبایل">
        <Link href="/" className={styles.bottomNavItem}><span>⌂</span><small>خانه</small></Link>
        <Link href="/shop" className={styles.bottomNavItem}><span>⌕</span><small>فروشگاه</small></Link>
        <Link href="/wishlist" className={styles.bottomNavItem}>
          <span className={styles.bottomNavIconWrap}>♡{ids.length > 0 && <b>{ids.length}</b>}</span>
          <small>علاقه‌مندی</small>
        </Link>
        <Link href="/cart" className={styles.bottomNavItem}>
          <span className={styles.bottomNavIconWrap}>🛒{itemCount > 0 && <b>{itemCount}</b>}</span>
          <small>سبد خرید</small>
        </Link>
        <Link href={user ? "/account" : "/login"} className={styles.bottomNavItem}><span>◯</span><small>حساب</small></Link>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function MobileNav() { return null; }
