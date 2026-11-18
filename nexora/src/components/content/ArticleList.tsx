import { useEffect, useState } from 'react'
import { articles as demoArticles } from '../../data/store'
import { isApiConfigured } from '../../services/apiClient'
import { storefrontApi } from '../../services/storefrontApi'
import type { ApiArticle } from '../../types/api'
import { Icon } from '../ui/Icon'
import DemoNotice from '../ui/DemoNotice'

type ArticleView={id:number;title:string;category:string;image:string;excerpt:string}
const fallback:ArticleView[]=demoArticles.map((a,i)=>({id:i+1,title:a.title,category:a.category,image:a.image,excerpt:'نکته‌های کاربردی برای انتخاب سرویس مناسب و استفادهٔ بهتر از دنیای دیجیتال.'}))
const mapArticle=(a:ApiArticle):ArticleView=>({id:a.id,title:a.title,category:a.category,image:a.image_url,excerpt:a.excerpt})
export default function ArticleList(){
 const [items,setItems]=useState(fallback);const [loading,setLoading]=useState(isApiConfigured());const [error,setError]=useState('')
 useEffect(()=>{if(!isApiConfigured()){setItems(fallback);setLoading(false);return}
  const controller=new AbortController();setLoading(true)
  storefrontApi.getArticles(controller.signal).then(values=>setItems(values.map(mapArticle))).catch(reason=>{if(controller.signal.aborted)return;setItems(fallback);setError(reason instanceof Error?reason.message:'دریافت مقاله‌ها ناموفق بود.')}).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
  return ()=>controller.abort()
 },[])
 if(loading)return <div className="empty-state" role="status"><Icon name="clock" size={24}/><h2>در حال دریافت مقاله‌ها…</h2></div>
 return <>{(!isApiConfigured()||error)&&<DemoNotice>{error?'مقاله‌های نمونه نمایش داده می‌شوند. '+error:'مقاله‌ها هنوز از سرور دریافت نمی‌شوند.'}</DemoNotice>}
 <div className="article-list">{items.map(a=><a className="article-list-card" href={'/journal/'+a.id} key={a.id}><img src={a.image} alt=""/><span><small>{a.category}</small><h2>{a.title}</h2><p>{a.excerpt}</p><b>مطالعه مقاله <Icon name="arrow" size={16}/></b></span></a>)}</div></>
}
