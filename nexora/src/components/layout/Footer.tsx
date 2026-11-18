import FooterAbout from './FooterAbout'
import FooterBrand from './FooterBrand'
import FooterLinkGroup from './FooterLinkGroup'
import FooterSocialLinks from './FooterSocialLinks'

const quickLinks = [
  { href: '/shop', label: 'فروشگاه' },
  { href: '/journal', label: 'مجله' },
  { href: '/help', label: 'راهنمای خرید' },
  { href: '/contact', label: 'پشتیبانی' },
]
const serviceLinks = [
  { href: '/shop', label: 'اشتراک‌های دیجیتال' },
  { href: '/about', label: 'مشاوره و راهنمایی' },
  { href: '/contact', label: 'پشتیبانی و پاسخگویی' },
]

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-content wrap">
      <FooterBrand /><FooterSocialLinks />
      <FooterLinkGroup title="دسترسی سریع" links={quickLinks} />
      <FooterLinkGroup title="خدمات ما" links={serviceLinks} />
      <FooterAbout />
    </div>
    <a className="back-top" href="/" aria-label="بازگشت به بالا">↑</a>
  </footer>
}
