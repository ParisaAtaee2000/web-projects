export const BRAND_NAME = "اِچ عطایی";
export const BRAND_ENGLISH = "H ATAYI";
export const SITE_DESCRIPTION = "اِچ عطایی؛ تولیدکننده و فروشنده عمده کاپشن، کت، پالتو و پوشاک مردانه زمستانه با حداقل سفارش ۸ عدد.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
