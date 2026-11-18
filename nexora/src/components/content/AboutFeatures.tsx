import { Icon } from '../ui/Icon'

const features = [
  { icon: 'grid' as const, title: 'انتخاب ساده‌تر', description: 'سرویس‌های پرکاربرد را کنار هم می‌آوریم تا مقایسه و انتخاب برایت آسان‌تر شود.' },
  { icon: 'shield' as const, title: 'خرید مطمئن', description: 'راهنمای شفاف و پشتیبانی فارسی در مسیر خرید همراه توست.' },
  { icon: 'clock' as const, title: 'تحویل سریع', description: 'فرایند تهیهٔ اشتراک دیجیتال را ساده و سریع طراحی کرده‌ایم.' },
]

export default function AboutFeatures() {
  return <div className="about-grid">
    {features.map(feature => <article key={feature.title}>
      <Icon name={feature.icon} size={25} /><h2>{feature.title}</h2><p>{feature.description}</p>
    </article>)}
  </div>
}
