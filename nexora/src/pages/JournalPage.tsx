import ArticleList from '../components/content/ArticleList'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function JournalPage() {
  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'مجله' }]} />
    <PageHeading kicker="NEXORA JOURNAL" title="مجله و راهنماها" intro="راهنماها و نکته‌هایی برای انتخاب بهتر سرویس‌های دیجیتال." />
    <ArticleList />
  </div>
}
