export const BRAND_NAME = "اِچ عطایی";
export const BRAND_ENGLISH = "H ATAYI";
export const BRAND_EXPERIENCE = "بیش از ۲۰ سال سابقه تولید و فروش پوشاک مردانه";
export const SITE_DESCRIPTION = "اِچ عطایی؛ تولیدکننده و فروشنده عمده کاپشن، کت، پالتو و پوشاک مردانه زمستانه با بیش از ۲۰ سال سابقه تولید و فروش. حداقل سفارش هر محصول یک جین ۸تایی با رنگ و سایز کامل است.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
