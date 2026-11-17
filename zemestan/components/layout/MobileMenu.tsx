"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const categories = [
  ["کاپشن و پارکا", "/shop?category=parka"],
  ["پالتو", "/shop?category=coat"],
  ["چرم", "/shop?category=leather"],
  ["بمبر", "/shop?category=bomber"],
  ["بارانی و اورکت", "/shop?category=raincoat"],
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className="mobile-menu-trigger" type="button" aria-label="باز کردن منو" aria-expanded={open} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <div className={`mobile-menu-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-head">
          <div className="brand">زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></div>
          <button className="mobile-menu-close" type="button" aria-label="بستن منو" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="mobile-menu-actions">
          <Link href="/account" onClick={() => setOpen(false)}>ورود / ثبت‌نام <span>→</span></Link>
          <Link href="/wishlist" onClick={() => setOpen(false)}>علاقه‌مندی‌ها <span>♡</span></Link>
          <Link href="/cart" onClick={() => setOpen(false)}>سفارش من <span>→</span></Link>
        </div>
        <div className="mobile-menu-section">
          <div className="section-kicker">NAVIGATION</div>
          <Link href="/" onClick={() => setOpen(false)}>خانه</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>همه محصولات</Link>
          <Link href="/#collections" onClick={() => setOpen(false)}>کالکشن</Link>
          <Link href="/#wholesale" onClick={() => setOpen(false)}>فروش عمده</Link>
          <Link href="/#about" onClick={() => setOpen(false)}>درباره زمستان</Link>
        </div>
        <div className="mobile-menu-section">
          <div className="section-kicker">CATEGORIES</div>
          {categories.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>
          ))}
        </div>
        <div className="mobile-menu-footer">
          <span>فروش مستقیم از تولیدکننده</span>
          <span>MOQ از ۸ عدد</span>
          <span>ارسال با پست</span>
        </div>
      </aside>
    </>
  );
}
