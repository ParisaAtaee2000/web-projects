import { Icon } from '../ui/Icon'

const questions = [
  { question: 'چطور سفارش ثبت کنم؟', answer: 'محصول دلخواهت را به سبد اضافه کن، اطلاعات سفارش را در مرحلهٔ بعد تکمیل کن و سفارش را ثبت کن.' },
  { question: 'اشتراک چه زمانی تحویل داده می‌شود؟', answer: 'زمان تحویل هر محصول در صفحهٔ همان محصول مشخص شده است؛ جزئیات سفارش هم بعد از ثبت برایت نمایش داده می‌شود.' },
  { question: 'اگر برای فعال‌سازی به مشکل بخورم چه کار کنم؟', answer: 'از صفحهٔ تماس با ما پیام بفرست تا تیم پشتیبانی راهنمایی‌ات کند.' },
]

export default function FaqList() {
  return <div className="help-list">
    {questions.map(item => <details key={item.question}><summary>{item.question}<Icon name="chevron" size={18} /></summary><p>{item.answer}</p></details>)}
    <a className="support-link" href="/contact">پرسش دیگری داری؟ با پشتیبانی تماس بگیر <Icon name="arrow" size={16} /></a>
  </div>
}
