"use client";
import { useState } from "react";

export function QuantitySelector({moq}:{moq:number}){const [qty,setQty]=useState(moq);return <div className="qty-box"><div><strong>تعداد سفارش</strong><div className="variant-label">حداقل {moq} عدد</div></div><div className="qty-controls"><button type="button" onClick={()=>setQty(q=>Math.max(moq,q-1))}>-</button><strong>{qty}</strong><button type="button" onClick={()=>setQty(q=>q+1)}>+</button></div></div>}
