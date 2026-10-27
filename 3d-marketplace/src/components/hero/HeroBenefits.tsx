import { BadgeCheck, Boxes, Cog, PackageCheck } from "lucide-react"; import { HeroBenefitItem } from "./HeroBenefitItem";
const benefits=[{title:"تنوع بی‌نظیر محصولات",description:"از پرینتر تا قطعات جانبی",Icon:Boxes},{title:"تضمین اصالت کالا",description:"کیفیت و اطمینان",Icon:BadgeCheck},{title:"سفارش اختصاصی",description:"با مشخصات دلخواه شما",Icon:Cog},{title:"پشتیبانی و مشاوره",description:"در تمام مراحل خرید",Icon:PackageCheck}];
export function HeroBenefits(){return <div className="hero-benefits">{benefits.map(item=><HeroBenefitItem key={item.title} {...item}/>)}</div>;}
