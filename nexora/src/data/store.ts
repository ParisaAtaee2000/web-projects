import type { IconName } from '../components/Icons'

export type CurrencyCode = 'IRR'

/** A purchasable subscription plan. Prices in the API and domain model are integer IRR. */
export type ProductVariant = {
  id: number
  sku: string
  title: string
  durationMonths: number
  durationLabel: string
  priceAmount: number
  currency: CurrencyCode
  isAvailable: boolean
}

export type Product = {
  id: number
  slug: string
  name: string
  description: string
  brand: 'microsoft' | 'netflix' | 'chatgpt' | 'youtube' | 'spotify' | 'google'
  badge: string
  categorySlug: string
  category: string
  features: string[]
  variants: ProductVariant[]
}

type CategoryDefinition = { id: number; slug: string; title: string; icon: IconName }

const categoryDefinitions: CategoryDefinition[] = [
  { id: 1, slug: 'other', title: 'سایر موارد', icon: 'grid' },
  { id: 2, slug: 'security', title: 'امنیت', icon: 'shield' },
  { id: 3, slug: 'learning', title: 'آموزش', icon: 'learn' },
  { id: 4, slug: 'productivity', title: 'بهره‌وری', icon: 'briefcase' },
  { id: 5, slug: 'cloud', title: 'فضای ابری', icon: 'cloud' },
  { id: 6, slug: 'ai', title: 'هوش مصنوعی', icon: 'ai' },
  { id: 7, slug: 'entertainment', title: 'سرگرمی', icon: 'play' },
  { id: 8, slug: 'gaming', title: 'بازی', icon: 'game' },
]

const plan = (id: number, sku: string, title: string, durationMonths: number, durationLabel: string, priceAmount: number): ProductVariant => ({
  id, sku, title, durationMonths, durationLabel, priceAmount, currency: 'IRR', isAvailable: true,
})

/** Sample catalog only. Replace with the agreed Django API response before production. */
export const products: Product[] = [
  { id: 1, slug: 'microsoft-365', name: 'Microsoft 365', description: 'اشتراک یک‌ساله', brand: 'microsoft', badge: '', categorySlug: 'productivity', category: 'بهره‌وری', variants: [plan(101, 'm365-12m', 'یک‌ساله', 12, 'یک‌ساله', 29_900_000), plan(102, 'm365-3m', 'سه‌ماهه', 3, 'سه‌ماهه', 8_900_000)], features: ['دسترسی به Word، Excel و PowerPoint', 'یک ترابایت فضای ابری OneDrive', 'فعال‌سازی سریع روی حساب شخصی'] },
  { id: 2, slug: 'netflix-premium', name: 'Netflix Premium', description: 'اشتراک یک‌ماهه', brand: 'netflix', badge: 'پرفروش', categorySlug: 'entertainment', category: 'سرگرمی', variants: [plan(201, 'netflix-1m', 'یک‌ماهه', 1, 'یک‌ماهه', 14_900_000), plan(202, 'netflix-3m', 'سه‌ماهه', 3, 'سه‌ماهه', 42_000_000)], features: ['تماشای فیلم و سریال با کیفیت 4K', 'امکان استفاده روی چند دستگاه', 'دسترسی به محتوای اختصاصی نتفلیکس'] },
  { id: 3, slug: 'chatgpt-plus', name: 'ChatGPT Plus', description: 'اشتراک یک‌ماهه', brand: 'chatgpt', badge: 'محبوب', categorySlug: 'ai', category: 'هوش مصنوعی', variants: [plan(301, 'chatgpt-plus-1m', 'یک‌ماهه', 1, 'یک‌ماهه', 19_900_000), plan(302, 'chatgpt-plus-3m', 'سه‌ماهه', 3, 'سه‌ماهه', 56_000_000)], features: ['دسترسی به مدل‌های پیشرفته', 'سرعت پاسخ‌گویی بالاتر در ساعات شلوغ', 'امکان ساخت تصویر و تحلیل فایل'] },
  { id: 4, slug: 'youtube-premium', name: 'YouTube Premium', description: 'اشتراک یک‌ماهه', brand: 'youtube', badge: '', categorySlug: 'entertainment', category: 'سرگرمی', variants: [plan(401, 'youtube-1m', 'یک‌ماهه', 1, 'یک‌ماهه', 7_900_000), plan(402, 'youtube-12m', 'یک‌ساله', 12, 'یک‌ساله', 75_000_000)], features: ['تماشای ویدئو بدون تبلیغ', 'پخش در پس‌زمینه', 'دسترسی به YouTube Music'] },
  { id: 5, slug: 'spotify-premium', name: 'Spotify Premium', description: 'اشتراک یک‌ماهه', brand: 'spotify', badge: 'پیشنهاد ویژه', categorySlug: 'entertainment', category: 'سرگرمی', variants: [plan(501, 'spotify-1m', 'یک‌ماهه', 1, 'یک‌ماهه', 6_900_000), plan(502, 'spotify-12m', 'یک‌ساله', 12, 'یک‌ساله', 66_000_000)], features: ['پخش موسیقی بدون تبلیغ', 'دانلود و گوش‌دادن آفلاین', 'کیفیت صدای بالاتر'] },
  { id: 6, slug: 'google-one', name: 'Google One', description: 'فضای ابری ۲ ترابایت', brand: 'google', badge: '', categorySlug: 'cloud', category: 'فضای ابری', variants: [plan(601, 'google-one-1m', 'یک‌ماهه', 1, 'یک‌ماهه', 9_900_000), plan(602, 'google-one-12m', 'یک‌ساله', 12, 'یک‌ساله', 95_000_000)], features: ['دو ترابایت فضای ابری', 'فضای مشترک برای تصاویر و فایل‌ها', 'پشتیبان‌گیری از دستگاه‌های شما'] },
]

export const categories = categoryDefinitions.map(category => ({
  ...category,
  count: products.filter(product => product.categorySlug === category.slug).length,
}))

export function defaultVariant(product: Product): ProductVariant | undefined {
  return product.variants.find(variant => variant.isAvailable) ?? product.variants[0]
}

/** The storefront displays Toman; API/model amounts are integer IRR (10 IRR = 1 Toman). */
export function formatToman(amountIrr: number): string {
  return new Intl.NumberFormat('fa-IR').format(Math.round(amountIrr / 10))
}

export const articles = [
  { title: 'راهنمای انتخاب بهترین سرویس‌های هوش مصنوعی', category: 'راهنمای خرید', image: '/assets/article-guide.jpg', className: 'article-main' },
  { title: 'مقایسه فضای ابری برای کاربران ایرانی', category: 'فناوری', image: '/assets/article-cloud.jpg', className: '' },
  { title: 'قبل از خرید نتفلیکس چه نکاتی را بدانیم؟', category: 'راهنمای خرید', image: '/assets/article-netflix.jpg', className: '' },
]
