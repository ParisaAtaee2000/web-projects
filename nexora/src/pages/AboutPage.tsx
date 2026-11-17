import AboutFeatures from '../components/content/AboutFeatures'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function AboutPage() {
  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'درباره ما' }]} />
    <PageHeading kicker="ABOUT NEXORA" title="دربارهٔ نکسورا" intro="نکسورا کمک می‌کند سرویس‌های دیجیتال موردنیازت را ساده‌تر و مطمئن‌تر پیدا کنی." />
    <AboutFeatures />
  </div>
}
