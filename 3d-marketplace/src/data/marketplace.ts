export type ProductCategory = "printed" | "printer" | "accessory" | "material";

export interface MarketplaceProduct {
  id: string;
  title: string;
  maker: string;
  makerId: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  description: string;
  specs: [string, string][];
}

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "geometric-planter",
    title: "گلدان هندسی لایه‌ای",
    maker: "استودیو فرمینو",
    makerId: "formino",
    category: "printed",
    categoryLabel: "محصول چاپی",
    price: 420000,
    image: "https://images.pexels.com/photos/19588204/pexels-photo-19588204.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "گلدان دکوراتیو هندسی",
    rating: 4.9,
    description: "قطعه‌ای دکوراتیو با فرم هندسی؛ مناسب میز کار، قفسه یا هدیه‌ای متفاوت.",
    specs: [["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "core-printer",
    title: "پرینتر سه‌بعدی Core",
    maker: "کارگاه نوا",
    makerId: "nova",
    category: "printer",
    categoryLabel: "پرینتر سه‌بعدی",
    price: 18900000,
    image: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "پرینتر سه‌بعدی روی میز کار",
    rating: 4.8,
    description: "نمونه‌ای برای نمایش دستگاه‌های عرضه‌شده در بازار سازندگان. مشخصات دستگاه باید توسط فروشنده تأیید شود.",
    specs: [["دسته‌بندی", "تجهیزات چاپ"], ["گارانتی", "نیازمند تأیید فروشنده"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "nozzle-toolkit",
    title: "کیت نگهداری چاپگر",
    maker: "تک‌میکر",
    makerId: "techmaker",
    category: "accessory",
    categoryLabel: "لوازم جانبی",
    price: 680000,
    image: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "ابزار و قطعات فنی چاپگر سه‌بعدی",
    rating: 4.7,
    description: "مجموعه‌ای نمونه برای نگهداری روزمره تجهیزات چاپ سه‌بعدی.",
    specs: [["دسته‌بندی", "لوازم جانبی"], ["سازگاری", "نیازمند بررسی مدل دستگاه"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "matte-purple-pla",
    title: "فیلامنت PLA بنفش مات",
    maker: "متریال‌لب",
    makerId: "materialab",
    category: "material",
    categoryLabel: "مواد مصرفی",
    price: 520000,
    image: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=1200",
    alt: "قرقره‌های فیلامنت رنگی",
    rating: 4.9,
    description: "نمونه‌ای از مواد مصرفی چاپ سه‌بعدی. قطر، وزن و دمای پیشنهادی باید در عرضه واقعی ثبت شوند.",
    specs: [["نوع ماده", "PLA"], ["رنگ", "بنفش مات"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "desk-organizer",
    title: "ارگانایزر رومیزی ماژولار",
    maker: "استودیو فرمینو",
    makerId: "formino",
    category: "printed",
    categoryLabel: "محصول چاپی",
    price: 350000,
    image: "https://images.pexels.com/photos/4792525/pexels-photo-4792525.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "وسیله کاربردی برای میز کار",
    rating: 4.6,
    description: "وسیله‌ای کاربردی برای مرتب‌سازی لوازم کوچک روی میز.",
    specs: [["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "نظم‌دهی میز"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "precision-nozzle",
    title: "نازل دقیق ۰٫۴ میلی‌متری",
    maker: "تک‌میکر",
    makerId: "techmaker",
    category: "accessory",
    categoryLabel: "لوازم جانبی",
    price: 190000,
    image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "قطعات و ابزار دقیق",
    rating: 4.8,
    description: "قطعه‌ای مصرفی برای برخی چاپگرهای سه‌بعدی؛ سازگاری آن باید تأیید شود.",
    specs: [["قطر اسمی", "۰٫۴ میلی‌متر"], ["سازگاری", "نیازمند تأیید مدل دستگاه"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "pla-starter-pack",
    title: "بسته شروع فیلامنت PLA",
    maker: "متریال‌لب",
    makerId: "materialab",
    category: "material",
    categoryLabel: "مواد مصرفی",
    price: 790000,
    image: "https://images.pexels.com/photos/4792488/pexels-photo-4792488.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "مواد اولیه برای چاپ سه‌بعدی",
    rating: 4.7,
    description: "بسته نمونه برای شروع کار با مواد اولیه چاپ سه‌بعدی.",
    specs: [["نوع ماده", "PLA"], ["محتویات", "نیازمند تأیید فروشنده"], ["وضعیت", "نمونه نمایشی"]],
  },
  {
    id: "mini-planter",
    title: "گلدان مینیمال مینی",
    maker: "میکر روم",
    makerId: "makerroom",
    category: "printed",
    categoryLabel: "محصول چاپی",
    price: 240000,
    image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "گلدان کوچک دکوراتیو",
    rating: 4.5,
    description: "گلدانی کوچک با فرم ساده برای فضاهای جمع‌وجور.",
    specs: [["روش ساخت", "چاپ سه‌بعدی"], ["کاربری", "دکوراتیو"], ["وضعیت", "نمونه نمایشی"]],
  },
];

export interface MarketplaceMaker {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  description: string;
  location: string;
  rating: number;
  productsCount: number;
  tone: "violet" | "blue" | "orange" | "green";
}

export const marketplaceMakers: MarketplaceMaker[] = [
  { id: "formino", name: "استودیو فرمینو", initials: "فـ", specialty: "دکور و محصولات کاربردی", description: "از ایده‌های ساده، فرم‌هایی دقیق و کاربردی می‌سازیم.", location: "پروفایل نمایشی", rating: 4.9, productsCount: 24, tone: "violet" },
  { id: "nova", name: "کارگاه نوا", initials: "نـ", specialty: "پرینتر و تجهیزات ساخت", description: "تجهیزات و قطعاتی برای آماده نگه‌داشتن میز کار.", location: "پروفایل نمایشی", rating: 4.8, productsCount: 18, tone: "blue" },
  { id: "techmaker", name: "تک‌میکر", initials: "تـ", specialty: "قطعات فنی و نمونه‌سازی", description: "راه‌حل‌هایی برای پروژه‌های فنی و نمونه‌سازی سریع.", location: "پروفایل نمایشی", rating: 4.7, productsCount: 31, tone: "orange" },
  { id: "materialab", name: "متریال‌لب", initials: "مـ", specialty: "فیلامنت و مواد مصرفی", description: "مواد اولیه موردنیاز برای تجربه‌های متنوع چاپ سه‌بعدی.", location: "پروفایل نمایشی", rating: 4.8, productsCount: 16, tone: "green" },
  { id: "makerroom", name: "میکر روم", initials: "مـ", specialty: "محصولات دکوراتیو", description: "قطعات کوچک با طراحی مینیمال و کاربرد روزمره.", location: "پروفایل نمایشی", rating: 4.5, productsCount: 12, tone: "violet" },
];

export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
