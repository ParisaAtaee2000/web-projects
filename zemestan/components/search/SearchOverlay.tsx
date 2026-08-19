"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./SearchOverlay.module.css";

type Props = { open: boolean; onClose: () => void };

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => { const q = query.trim().toLocaleLowerCase("fa-IR"); if (!q) return products.slice(0, 5); return products.filter((product) => `${product.name} ${product.code} ${product.category}`.toLocaleLowerCase("fa-IR").includes(q)).slice(0, 8); }, [query]);
  if (!open) return null;
  return <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="جستجوی محصولات" onClick={onClose}><div className={styles.panel} onClick={(event) => event.stopPropagation()}>
    <div className={styles.head}><div><span className="section-kicker">SEARCH / PRODUCTS</span><h2 className="serif">جستجوی محصول</h2></div><button className="icon-btn" type="button" onClick={onClose} aria-label="بستن">×</button></div>
    <div className={styles.inputWrap}><span aria-hidden="true">⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام یا کد محصول را جستجو کنید..." aria-label="جستجوی محصول" />{query && <button type="button" className={styles.clear} onClick={() => setQuery("")}>پاک کردن</button>}</div>
    <div className={styles.results}><div className={styles.resultsHead}><span>{query ? "نتایج جستجو" : "محصولات پیشنهادی"}</span><small>{results.length.toLocaleString("fa-IR")} نتیجه</small></div>{results.length ? results.map((product) => <Link key={product.id} href={`/product/${product.slug}`} onClick={onClose} className={styles.result}><span className={styles.art} aria-hidden="true"/><span className={styles.copy}><strong>{product.name}</strong><small className="mono">{product.code}</small></span><span className={styles.price}>{product.wholesalePrice.toLocaleString("fa-IR")} تومان</span></Link>) : <div className={styles.empty}>محصولی با این عبارت پیدا نشد.</div>}</div>
    <Link className={`btn primary ${styles.all}`} href={`/shop${query ? `?q=${encodeURIComponent(query)}` : ""}`} onClick={onClose}>مشاهده همه نتایج</Link>
  </div></div>;
}
