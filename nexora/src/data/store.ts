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

export const products = [
  { name: 'Microsoft 365', description: 'اشتراک یک‌ساله', price: '۲,۹۹۰,۰۰۰', brand: 'microsoft', badge: '' },
  { name: 'Netflix Premium', description: 'اشتراک یک‌ماهه', price: '۱,۴۹۰,۰۰۰', brand: 'netflix', badge: 'پرفروش' },
  { name: 'ChatGPT Plus', description: 'اشتراک یک‌ماهه', price: '۱,۹۹۰,۰۰۰', brand: 'chatgpt', badge: 'محبوب' },
]

export const articles = [
  { title: 'راهنمای انتخاب بهترین سرویس‌های هوش مصنوعی', category: 'راهنمای خرید', image: '/assets/article-guide.jpg', className: 'article-main' },
  { title: 'مقایسه فضای ابری برای کاربران ایرانی', category: 'فناوری', image: '/assets/article-cloud.jpg', className: '' },
  { title: 'قبل از خرید نتفلیکس چه نکاتی را بدانیم؟', category: 'راهنمای خرید', image: '/assets/article-netflix.jpg', className: '' },
]
