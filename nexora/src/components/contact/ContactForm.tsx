export default function ContactForm() {
  return <form className="contact-form" onSubmit={event => event.preventDefault()}>
    <label>نام<input name="name" required placeholder="نام شما" /></label>
    <label>ایمیل<input name="email" required type="email" placeholder="name@example.com" /></label>
    <label>پیام<textarea name="message" required rows={4} placeholder="چطور می‌توانیم کمکت کنیم؟" /></label>
    <button type="submit" className="button button-primary">ارسال پیام</button>
  </form>
}
