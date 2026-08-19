import type { Product } from "@/types/product-model";

export const products: Product[] = [
 {name:"کاپشن بمبر کلاسیک",code:"NB-WM-1001",slug:"nb-wm-1001",category:"bomber",categoryLabel:"بمبر و اسپرت",price:1280000,moq:8,colors:[{name:"مشکی",value:"#20221e"},{name:"زغالی",value:"#4b4940"}],sizes:["M","L","XL","XXL"]},
 {name:"کت زمستانه مینیمال",code:"CT-WM-1008",slug:"ct-wm-1008",category:"coat",categoryLabel:"کت مردانه",price:1590000,moq:8,colors:[{name:"زغالی",value:"#3e4039"}],sizes:["M","L","XL","XXL"]},
 {name:"کاپشن چرم شهری",code:"LJ-WM-1012",slug:"lj-wm-1012",category:"leather",categoryLabel:"کت چرم",price:2480000,moq:12,colors:[{name:"قهوه‌ای",value:"#5a4632"}],sizes:["M","L","XL"]},
 {name:"پالتو بلند شهری",code:"CT-WM-1016",slug:"ct-wm-1016",category:"coat",categoryLabel:"پالتو کلاسیک",price:1890000,moq:8,colors:[{name:"شتری",value:"#8c7458"}],sizes:["M","L","XL","XXL"]},
 {name:"پارکا آرکتیک",code:"PK-WM-1020",slug:"pk-wm-1020",category:"parka",categoryLabel:"پارکا و کاپشن",price:1790000,moq:8,colors:[{name:"سبز",value:"#35412f"}],sizes:["L","XL","XXL"]},
 {name:"اورکت فنی شهری",code:"OC-WM-1026",slug:"oc-wm-1026",category:"raincoat",categoryLabel:"بارانی و اورکت",price:1980000,moq:12,colors:[{name:"زغالی",value:"#42443d"}],sizes:["M","L","XL","XXL"]}
];

export const categories=[
 {label:"پارکا و کاپشن",value:"parka"},
 {label:"پالتو کلاسیک",value:"coat"},
 {label:"کت چرم",value:"leather"},
 {label:"بمبر و اسپرت",value:"bomber"},
 {label:"بارانی و اورکت",value:"raincoat"}
] as const;
