import ContactDetails from '../components/contact/ContactDetails'
import ContactForm from '../components/contact/ContactForm'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PageHeading from '../components/ui/PageHeading'

export default function ContactPage() {
  return <div className="page-shell wrap">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'تماس با ما' }]} />
    <PageHeading kicker="CONTACT" title="با ما در ارتباط باش" intro="برای راهنمایی خرید یا پیگیری سفارش، پیام خودت را برای ما بفرست." />
    <div className="contact-layout"><ContactDetails /><ContactForm /></div>
  </div>
}
