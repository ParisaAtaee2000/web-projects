import { Boxes, FileBox, Printer, Sparkles } from "lucide-react";
import { HeroBenefitItem } from "./HeroBenefitItem";

const features = [
  {
    title: "پرینتر و تجهیزات",
    description: "ابزارهای ساخت و قطعات جانبی",
    Icon: Printer,
  },
  {
    title: "مواد مصرفی",
    description: "فیلامنت و ملزومات چاپ",
    Icon: Boxes,
  },
  {
    title: "فایل‌های سه‌بعدی",
    description: "مدل‌های آماده برای چاپ",
    Icon: FileBox,
  },
  {
    title: "ساخت سفارشی",
    description: "تبدیل ایده به قطعه",
    Icon: Sparkles,
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
