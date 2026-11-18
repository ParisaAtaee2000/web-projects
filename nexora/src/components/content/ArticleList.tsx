import { articles } from '../../data/store'
import { Icon } from '../ui/Icon'

export default function ArticleList() {
  return <div className="article-list">
    {articles.map((article, index) => <a className="article-list-card" href={'/journal/' + (index + 1)} key={article.title}>
      <img src={article.image} alt="" />
      <span><small>{article.category}</small><h2>{article.title}</h2>
        <p>نکته‌های کاربردی برای انتخاب سرویس مناسب و استفادهٔ بهتر از دنیای دیجیتال.</p>
        <b>مطالعه مقاله <Icon name="arrow" size={16} /></b>
      </span>
    </a>)}
  </div>
}
