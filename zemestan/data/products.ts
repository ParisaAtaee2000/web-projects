import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "p-1001", slug: "classic-bomber", name: "کاپشن بمبر کلاسیک", code: "NB-WM-1001", category: "bomber", wholesalePrice: 1280000, minWholesaleQuantity: 8, quantityStep: 1,
    colors: ["مشکی", "زغالی", "قهوه‌ای"], sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      {color:"مشکی",size:"L",stock:18},{color:"مشکی",size:"XL",stock:24},{color:"مشکی",size:"2XL",stock:20},{color:"مشکی",size:"3XL",stock:9},
      {color:"زغالی",size:"L",stock:12},{color:"زغالی",size:"XL",stock:16},{color:"زغالی",size:"2XL",stock:14},{color:"زغالی",size:"3XL",stock:6},
      {color:"قهوه‌ای",size:"L",stock:8},{color:"قهوه‌ای",size:"XL",stock:10},{color:"قهوه‌ای",size:"2XL",stock:7},{color:"قهوه‌ای",size:"3XL",stock:3},
    ], material: "پارچه ضدآب با آستر گرم", season: "زمستان", fit: "Regular", isActive: true,
  },
  {
    id: "p-1008", slug: "minimal-winter-coat", name: "کت زمستانه مینیمال", code: "CT-WM-1008", category: "coat", wholesalePrice: 1590000, minWholesaleQuantity: 8, quantityStep: 1,
    colors: ["زغالی", "مشکی"], sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      {color:"زغالی",size:"L",stock:11},{color:"زغالی",size:"XL",stock:18},{color:"زغالی",size:"2XL",stock:14},{color:"زغالی",size:"3XL",stock:5},
      {color:"مشکی",size:"L",stock:9},{color:"مشکی",size:"XL",stock:15},{color:"مشکی",size:"2XL",stock:10},{color:"مشکی",size:"3XL",stock:4},
    ], material: "فوتر ترکیبی", season: "زمستان", fit: "Regular", isActive: true,
  },
  {
    id: "p-1012", slug: "urban-leather-jacket", name: "کاپشن چرم شهری", code: "LJ-WM-1012", category: "leather", wholesalePrice: 2480000, minWholesaleQuantity: 12, quantityStep: 1,
    colors: ["مشکی", "قهوه‌ای"], sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      {color:"مشکی",size:"L",stock:9},{color:"مشکی",size:"XL",stock:14},{color:"مشکی",size:"2XL",stock:10},{color:"مشکی",size:"3XL",stock:2},
      {color:"قهوه‌ای",size:"L",stock:5},{color:"قهوه‌ای",size:"XL",stock:8},{color:"قهوه‌ای",size:"2XL",stock:6},{color:"قهوه‌ای",size:"3XL",stock:1},
    ], material: "چرم صنعتی با آستر گرم", season: "زمستان", fit: "Slim", isActive: true,
  },
  {
    id: "p-1016", slug: "arctic-parka", name: "پارکا آرکتیک", code: "PK-WM-1016", category: "parka", wholesalePrice: 1820000, minWholesaleQuantity: 8, quantityStep: 1,
    colors: ["سبز زیتونی", "مشکی"], sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      {color:"سبز زیتونی",size:"L",stock:16},{color:"سبز زیتونی",size:"XL",stock:22},{color:"سبز زیتونی",size:"2XL",stock:18},{color:"سبز زیتونی",size:"3XL",stock:7},
      {color:"مشکی",size:"L",stock:10},{color:"مشکی",size:"XL",stock:17},{color:"مشکی",size:"2XL",stock:13},{color:"مشکی",size:"3XL",stock:5},
    ], material: "پارچه تکنیکال ضدباد", season: "زمستان", fit: "Relaxed", isActive: true,
  },
  {
    id: "p-1020", slug: "urban-technical-coat", name: "اورکت فنی شهری", code: "OC-WM-1026", category: "raincoat", wholesalePrice: 1980000, minWholesaleQuantity: 12, quantityStep: 1,
    colors: ["زغالی", "مشکی"], sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      {color:"زغالی",size:"L",stock:13},{color:"زغالی",size:"XL",stock:20},{color:"زغالی",size:"2XL",stock:16},{color:"زغالی",size:"3XL",stock:6},
      {color:"مشکی",size:"L",stock:8},{color:"مشکی",size:"XL",stock:15},{color:"مشکی",size:"2XL",stock:11},{color:"مشکی",size:"3XL",stock:4},
    ], material: "پارچه تکنیکال ضدآب", season: "زمستان", fit: "Regular", isActive: true,
  },
];
