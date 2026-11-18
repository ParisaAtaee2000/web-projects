import { useEffect, useState } from 'react'
import { articles as demoArticles } from '../data/store'
import { isApiConfigured } from '../services/apiClient'
import { storefrontApi } from '../services/storefrontApi'
import type { ApiArticle } from '../types/api'
import { Icon } from '../components/ui/Icon'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import DemoNotice from '../components/ui/DemoNotice'

type ArticleView={id:number;title:string;category:string;image:string;body:string;readingMinutes:number}
const fallbackBody='انتخاب سرویس دیجیتال مناسب، به نیاز روزمره، بودجه و امکاناتی که واقعاً استفاده می‌کنی بستگی دارد. قبل از خرید، تفاوت پلن‌ها و محدودیت‌های هر سرویس را بررسی کن.\n\nمدت اشتراک، تعداد دستگاه‌ها، کیفیت سرویس و روش تحویل را با دقت مقایسه کن.\n\nبهترین گزینه همیشه گران‌ترین پلن نیست؛ سرویسی را انتخاب کن که با نیاز تو هماهنگ باشد.'
const mapArticle=(a:ApiArticle):ArticleView=>({id:a.id,title:a.title,category:a.category,image:a.image_url,body:a.body,readingMinutes:a.reading_minutes})
export default function ArticlePage({id}:{id:string}){
 const number=Number(id);const demo=Number.isInteger(number)?demoArticles[number-1]:undefined
 const demoView=():ArticleView|undefined=>demo?{id:number,title:demo.title,category:demo.category,image:demo.image,body:fallbackBody,readingMinutes:5}:undefined
 const [article,setArticle]=useState<ArticleView|undefined>(demoView);const [loading,setLoading]=useState(isApiConfigured());const [error,setError]=useState('')
 useEffect(()=>{if(!isApiConfigured()||!Number.isInteger(number)||number<1){setArticle(demoView());setLoading(false);return}
  const controller=new AbortController();setLoading(true);setError('')
  storefrontApi.getArticle(number,controller.signal).then(value=>setArticle(mapArticle(value))).catch(reason=>{if(controller.signal.aborted)return;setArticle(demoView());setError(reason instanceof Error?reason.message:'دریافت مقاله ناموفق بود.')}).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
  return ()=>controller.abort()
 },[id])
 if(loading)return <div className="page-shell wrap empty-state" role="status"><Icon name="clock" size={24}/><h1>در حال دریافت مقاله…</h1></div>
 if(!article)return <div className="page-shell wrap empty-state"><h1>مقاله پیدا نشد</h1><a className="button button-primary" href="/journal">بازگشت به مجله</a></div>
 return <article className="page-shell wrap article-detail"><Breadcrumbs items={[{label:'خانه',href:'/'},{label:'مجله',href:'/journal'},{label:article.category}]}/>
 {(!isApiConfigured()||error)&&<DemoNotice>{error?'نسخهٔ نمونه مقاله نمایش داده می‌شود. '+error:'متن مقاله در حالت نمایشی است.'}</DemoNotice>}
 <div className="article-detail-layout"><div><span className="page-kicker">{article.category}</span><h1>{article.title}</h1><p className="article-meta">مجلهٔ نکسورا · {article.readingMinutes} دقیقه مطالعه</p><img className="article-detail-image" src={article.image} alt=""/><div className="article-body">{article.body.split(/\n{2,}/).map((p,i)=><p key={i}>{p}</p>)}</div><a className="support-link" href="/shop">دیدن اشتراک‌های نکسورا <Icon name="arrow" size={16}/></a></div>
 <aside className="article-aside"><h2>راهنماهای بیشتر</h2>{demoArticles.map((a,i)=>({id:i+1,...a})).filter(a=>a.id!==article.id).map(a=><a href={'/journal/'+a.id} key={a.id}><img src={a.image} alt=""/><span>{a.title}<small>۵ دقیقه مطالعه</small></span></a>)}</aside></div></article>
}
