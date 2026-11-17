import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function AccountPage() {
  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'حساب کاربری' }]} />
    <PageHeading kicker="YOUR ACCOUNT" title="حساب کاربری" intro="برای دیدن سفارش‌ها و مدیریت اشتراک‌ها وارد حساب خودت شو." />
    <div className="empty-state">
      <Icon name="user" size={30} /><h2>به‌زودی در دسترس</h2>
      <p>اتصال حساب کاربری پس از آماده‌شدن سرویس ورود فعال می‌شود.</p>
      <a className="button button-primary" href="/shop">رفتن به فروشگاه</a>
    </div>
  </div>
}
