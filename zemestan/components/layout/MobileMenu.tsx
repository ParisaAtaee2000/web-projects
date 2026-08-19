"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.css";

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

  const close = () => setOpen(false);

  return (
    <>
      <button className={styles.mobileMenuTrigger} type="button" aria-label="باز کردن منو" aria-expanded={open} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <button className={`${styles.mobileMenuBackdrop} ${open ? styles.mobileMenuBackdropOpen : ""}`} aria-label="بستن منو" type="button" onClick={close} />
      <aside className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`} aria-hidden={!open}>
        <div className={styles.mobileMenuHead}>
          <Link href="/" className="brand" onClick={close}>زمستان<span className="brand-sub">ZEMESTAN / WHOLESALE</span></Link>
          <button className={styles.close} type="button" aria-label="بستن منو" onClick={close}>×</button>
        </div>
        <div className={styles.menuActions}>
          <Link href="/account" onClick={close}>ورود / ثبت‌نام <span>→</span></Link>
          <Link href="/wishlist" onClick={close}>علاقه‌مندی‌ها <span>♡</span></Link>
          <Link href="/cart" onClick={close}>سفارش من <span>→</span></Link>
        </div>
        <div className={styles.menuSection}>
          <div>ناوبری</div>
          <Link href="/" onClick={close}>خانه</Link>
          <Link href="/shop" onClick={close}>همه محصولات</Link>
          <Link href="/#collections" onClick={close}>کالکشن</Link>
          <Link href="/#wholesale" onClick={close}>فروش عمده</Link>
          <Link href="/#about" onClick={close}>درباره زمستان</Link>
        </div>
        <div className={styles.menuSection}>
          <div>دسته‌بندی‌ها</div>
          {categories.map(([label, href]) => (
            <Link key={href} href={href} onClick={close}>{label}<span>↗</span></Link>
          ))}
        </div>
        <div className={styles.menuFooter}>
          <span>فروش مستقیم از تولیدکننده</span>
          <span>MOQ از ۸ عدد</span>
          <span>ارسال با پست</span>
        </div>
      </aside>
    </>
  );
}
