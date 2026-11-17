import type { IconName } from '../components/Icons'

export const categories: { title: string; count: string; icon: IconName }[] = [
  { title: 'سایر موارد', count: '۴۴', icon: 'grid' },
  { title: 'نرم‌افزار', count: '۱۳۰', icon: 'headphones' },
  { title: 'امنیت', count: '۶۲', icon: 'shield' },
  { title: 'فضای ابری', count: '۷۶', icon: 'cloud' },
  { title: 'هوش مصنوعی', count: '۲۱۴', icon: 'ai' },
  { title: 'آموزش', count: '۹۲', icon: 'learn' },
  { title: 'سرگرمی', count: '۱۱۸', icon: 'movie' },
  { title: 'بازی', count: '۱۲۴', icon: 'game' },
]

export type Product = {
  slug: string
  name: string
  description: string
  price: string
  priceValue: number
  brand: 'microsoft' | 'netflix' | 'chatgpt' | 'youtube' | 'spotify' | 'google'
  badge: string
  category: string
  term: string
  features: string[]
}

export const products: Product[] = [
  { slug: 'microsoft-365', name: 'Microsoft 365', description: 'اشتراک یک‌ساله', price: '۲,۹۹۰,۰۰۰', priceValue: 2990000, brand: 'microsoft', badge: '', category: 'نرم‌افزار', term: 'یک‌ساله', features: ['دسترسی به Word، Excel و PowerPoint', 'یک ترابایت فضای ابری OneDrive', 'فعال‌سازی سریع روی حساب شخصی'] },
  { slug: 'netflix-premium', name: 'Netflix Premium', description: 'اشتراک یک‌ماهه', price: '۱,۴۹۰,۰۰۰', priceValue: 1490000, brand: 'netflix', badge: 'پرفروش', category: 'سرگرمی', term: 'یک‌ماهه', features: ['تماشای فیلم و سریال با کیفیت 4K', 'امکان استفاده روی چند دستگاه', 'دسترسی به محتوای اختصاصی نتفلیکس'] },
  { slug: 'chatgpt-plus', name: 'ChatGPT Plus', description: 'اشتراک یک‌ماهه', price: '۱,۹۹۰,۰۰۰', priceValue: 1990000, brand: 'chatgpt', badge: 'محبوب', category: 'هوش مصنوعی', term: 'یک‌ماهه', features: ['دسترسی به مدل‌های پیشرفته', 'سرعت پاسخ‌گویی بالاتر در ساعات شلوغ', 'امکان ساخت تصویر و تحلیل فایل'] },
  { slug: 'youtube-premium', name: 'YouTube Premium', description: 'اشتراک یک‌ماهه', price: '۷۹۰,۰۰۰', priceValue: 790000, brand: 'youtube', badge: '', category: 'سرگرمی', term: 'یک‌ماهه', features: ['تماشای ویدئو بدون تبلیغ', 'پخش در پس‌زمینه', 'دسترسی به YouTube Music'] },
  { slug: 'spotify-premium', name: 'Spotify Premium', description: 'اشتراک یک‌ماهه', price: '۶۹۰,۰۰۰', priceValue: 690000, brand: 'spotify', badge: 'پیشنهاد ویژه', category: 'سرگرمی', term: 'یک‌ماهه', features: ['پخش موسیقی بدون تبلیغ', 'دانلود و گوش‌دادن آفلاین', 'کیفیت صدای بالاتر'] },
  { slug: 'google-one', name: 'Google One', description: 'فضای ابری ۲ ترابایت', price: '۹۹۰,۰۰۰', priceValue: 990000, brand: 'google', badge: '', category: 'فضای ابری', term: 'یک‌ماهه', features: ['دو ترابایت فضای ابری', 'فضای مشترک برای تصاویر و فایل‌ها', 'پشتیبان‌گیری از دستگاه‌های شما'] },
]

export const articles = [
  { title: 'راهنمای انتخاب بهترین سرویس‌های هوش مصنوعی', category: 'راهنمای خرید', image: '/assets/article-guide.jpg', className: 'article-main' },
  { title: 'مقایسه فضای ابری برای کاربران ایرانی', category: 'فناوری', image: '/assets/article-cloud.jpg', className: '' },
  { title: 'قبل از خرید نتفلیکس چه نکاتی را بدانیم؟', category: 'راهنمای خرید', image: '/assets/article-netflix.jpg', className: '' },
]
