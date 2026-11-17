import FaqList from '../components/content/FaqList'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function HelpPage() {
  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'راهنما و پرسش‌های متداول' }]} />
    <PageHeading kicker="HELP CENTER" title="راهنما و پرسش‌های متداول" intro="پاسخ پرسش‌های پرتکرار دربارهٔ خرید، فعال‌سازی و پشتیبانی." />
    <FaqList />
  </div>
}
