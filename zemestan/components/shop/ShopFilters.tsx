"use client";
import { usePathname,useRouter,useSearchParams } from "next/navigation";
import { categories } from "@/data/products";

export function ShopFilters(){const router=useRouter(),pathname=usePathname(),params=useSearchParams();const active=params.get("category")||"";const set=(category:string)=>{const next=new URLSearchParams(params.toString());if(category) next.set("category",category); else next.delete("category");router.push(`${pathname}?${next.toString()}`)};return <div className="filters"> <button className={`filter-pill ${!active?"active":""}`} onClick={()=>set("")}>همه</button>{categories.map(c=><button key={c.value} className={`filter-pill ${active===c.value?"active":""}`} onClick={()=>set(c.value)}>{c.label}</button>)}</div>}
