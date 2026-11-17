import { articles } from '../data/store'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function ArticlePage({ id }: { id: string }) {
  const article = articles[Number(id) - 1]
  if (!article) return <div className="page-shell wrap empty-state"><h1>مقاله پیدا نشد</h1><a className="button button-primary" href="/journal">بازگشت به مجله</a></div>

  return <article className="page-shell wrap article-detail">
    <Breadcrumbs items={[{ label: 'خانه', href: '/' }, { label: 'مجله', href: '/journal' }, { label: article.category }]} />
    <div className="article-detail-layout">
      <div>
        <span className="page-kicker">{article.category}</span><h1>{article.title}</h1>
        <p className="article-meta">مجلهٔ نکسورا · ۵ دقیقه مطالعه</p>
        <img className="article-detail-image" src={article.image} alt="" />
        <div className="article-body">
          <p>انتخاب سرویس دیجیتال مناسب، به نیاز روزمره، بودجه و امکاناتی که واقعاً استفاده می‌کنی بستگی دارد. قبل از خرید، تفاوت پلن‌ها و محدودیت‌های هر سرویس را بررسی کن.</p>
          <h2>قبل از انتخاب به چه نکاتی توجه کنیم؟</h2>
          <p>مدت اشتراک، تعداد دستگاه‌ها، کیفیت سرویس و روش تحویل را با دقت مقایسه کن. اگر دربارهٔ سازگاری سرویس مطمئن نیستی، پیش از ثبت سفارش از پشتیبانی راهنمایی بگیر.</p>
          <h2>یک انتخاب آگاهانه</h2>
          <p>بهترین گزینه همیشه گران‌ترین پلن نیست؛ سرویسی را انتخاب کن که با نیاز تو هماهنگ باشد و شرایط استفادهٔ آن روشن باشد.</p>
        </div>
        <a className="support-link" href="/shop">دیدن اشتراک‌های نکسورا <Icon name="arrow" size={16} /></a>
      </div>
      <aside className="article-aside">
        <h2>راهنماهای بیشتر</h2>
        {articles.filter(item => item.title !== article.title).map((item, index) => (
          <a href={'/journal/' + (articles.findIndex(entry => entry.title === item.title) + 1)} key={item.title}>
            <img src={item.image} alt="" /><span>{item.title}<small>{index + 3} دقیقه مطالعه</small></span>
          </a>
        ))}
      </aside>
    </div>
  </article>
}
