import Link from "next/link";

export function Footer(){
  return <footer className="section" style={{background:"#15150f",color:"#eeece4",paddingBottom:40}}>
    <div className="container footer-grid-refactor">
      <div>
        <div className="brand">اِچ عطایی</div>
        <p style={{color:"#aaa697"}}>H ATAYI / پوشاک مردانه زمستانه / فروش عمده</p>
      </div>
      <div>
        <div className="cap">فروشگاه</div>
        <p style={{color:"#aaa697"}}><Link href="/shop">محصولات</Link><br/><Link href="/#collections">کالکشن</Link><br/><Link href="/shop">دسته‌بندی‌ها</Link></p>
      </div>
      <div>
        <div className="cap">عمده‌فروشی</div>
        <p style={{color:"#aaa697"}}>حداقل سفارش هر محصول: ۸ عدد<br/>ارسال با پست به سراسر کشور</p>
      </div>
    </div>
  </footer>
}
