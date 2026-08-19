"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { ids } = useWishlist();
  return <main dir="rtl"><section className="container section account-page"><div className="section-head"><div><div className="section-kicker">ACCOUNT / DASHBOARD</div><h1 className="section-title">حساب من</h1><p className="muted">مدیریت اطلاعات فروشگاه، سفارش‌ها و علاقه‌مندی‌ها</p></div><div className="account-actions">{user ? <button className="btn" onClick={logout}>خروج</button> : <Link className="btn primary" href="/login">ورود</Link>}</div></div>{user ? <div className="account-grid"><section className="account-card"><div className="section-kicker">PROFILE</div><h2>{user.name}</h2><p>{user.storeName}</p><p className="muted">{user.email}</p><Link className="btn" href="/account/profile">ویرایش اطلاعات</Link></section><section className="account-card"><div className="section-kicker">ORDERS</div><h2>سفارش‌های من</h2><p className="muted">در این بخش وضعیت سفارش‌های عمده شما نمایش داده می‌شود.</p><Link className="btn" href="/account/orders">مشاهده سفارش‌ها</Link></section><section className="account-card"><div className="section-kicker">WISHLIST</div><h2>{ids.length.toLocaleString("fa-IR")} محصول</h2><p className="muted">محصولات ذخیره‌شده برای بررسی و سفارش بعدی.</p><Link className="btn" href="/wishlist">مشاهده علاقه‌مندی‌ها</Link></section></div> : <div className="empty-state"><h2>وارد حساب خود شوید</h2><p className="muted">برای دسترسی به سفارش‌ها و علاقه‌مندی‌ها ابتدا وارد شوید.</p><Link className="btn primary" href="/login">ورود به حساب</Link></div>}</section></main>;
}
