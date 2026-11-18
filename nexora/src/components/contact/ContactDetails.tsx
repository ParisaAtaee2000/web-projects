import { Icon } from '../ui/Icon'

export default function ContactDetails() {
  return <div className="contact-card">
    <span className="contact-icon"><Icon name="support" size={25} /></span>
    <h2>پشتیبانی نکسورا</h2><p>شنبه تا پنجشنبه، ساعت ۹ تا ۱۸</p>
    <a href="mailto:support@nexora.example">support@nexora.example</a>
  </div>
}
