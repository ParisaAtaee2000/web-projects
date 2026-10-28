import { Headset, ShieldCheck, Truck } from "lucide-react";
import { HeroBenefitItem } from "./HeroBenefitItem";

const features = [
  {
    title: "کیفیت تضمین‌شده",
    description: "انتخاب دقیق محصولات و سازندگان",
    Icon: ShieldCheck,
  },
  {
    title: "پشتیبانی واقعی",
    description: "همراهی برای انتخاب بهتر",
    Icon: Headset,
  },
  {
    title: "ارسال سریع",
    description: "پیگیری سفارش تا رسیدن به دستت",
    Icon: Truck,
  },
];

export function HeroBenefits() {
  return (
    <div className="hero-benefits">
      {features.map((feature) => (
        <HeroBenefitItem key={feature.title} {...feature} />
      ))}
    </div>
  );
}
