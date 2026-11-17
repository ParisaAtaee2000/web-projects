import { articles } from '../../data/store'
import { Icon } from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

function JournalCard({ article, index }: { article: typeof articles[number]; index: number }) {
  return <a href={'/journal/' + (index + 1)} className={'article-card ' + article.className}>
    <img src={article.image} alt="" />
    <span className="article-copy"><small>{article.category}</small><strong>{article.title}</strong>
      {article.className && <em>مطالعه بیشتر <Icon name="arrow" size={15} /></em>}
    </span>
  </a>
}

function TrustSection() {
  return <aside className="trust-card" id="about">
    <img src="/assets/shield.jpg" alt="" /><h2>چرا NEXORA؟</h2>
    <div className="trust-list">
      <div><Icon name="shield" /><p><b>خرید امن و مطمئن</b><span>با خیال راحت خرید کنید</span></p></div>
      <div><Icon name="support" /><p><b>پشتیبانی حرفه‌ای</b><span>همیشه در کنار شما هستیم</span></p></div>
      <div><Icon name="clock" /><p><b>تحویل فوری</b><span>در کوتاه‌ترین زمان ممکن</span></p></div>
    </div>
  </aside>
}

export default function JournalAndTrustSection() {
  return <section className="section wrap journal-section" id="journal" data-reveal>
    <div className="journal-column">
      <SectionHeading title="مجله و راهنماها" href="/journal" />
      <div className="journal-grid">{articles.map((article, index) => <JournalCard article={article} index={index} key={article.title} />)}</div>
    </div>
    <TrustSection />
  </section>
}
