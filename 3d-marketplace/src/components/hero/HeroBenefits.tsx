import { BadgeCheck, Boxes, Headset, Sparkles } from "lucide-react";
import { HeroBenefitItem } from "./HeroBenefitItem";

const features = [
  {
    title: "تنوع بی‌نظیر محصولات",
    description: "از پرینتر تا قطعات جانبی",
    Icon: Boxes,
  },
  {
    title: "تضمین اصالت کالا",
    description: "کیفیت و انتخاب مطمئن",
    Icon: BadgeCheck,
  },
  {
    title: "سفارش اختصاصی",
    description: "ساخت بر اساس ایده شما",
    Icon: Sparkles,
  },
  {
    title: "پشتیبانی و مشاوره",
    description: "همراه شما در تمام مراحل",
    Icon: Headset,
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
