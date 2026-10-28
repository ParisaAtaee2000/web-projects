import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight, Bell, CheckCheck, Heart, Home, Image as ImageIcon,
  LogOut, MoreVertical, Paperclip, Search, Send, Settings,
  ShoppingBag, Store, Boxes, MessageSquare,
} from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";
import "./messages.css";

type ChatMessage = { id: number; text: string; time: string; own: boolean; attachment?: string };
type Conversation = {
  id: string;
  name: string;
  initials: string;
  subtitle: string;
  preview: string;
  time: string;
  unread: number;
  product: string;
  productImage: string;
};

const conversations: Conversation[] = [
  {
    id: "creality",
    name: "Creality Official",
    initials: "C",
    subtitle: "فروشنده تجهیزات چاپ سه‌بعدی",
    preview: "سلام، بله موجود است. همین الان آماده ارسال هست.",
    time: "۱۴:۳۵",
    unread: 1,
    product: "Creality Ender-3 V3 SE",
    productImage: "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "print-studio",
    name: "3DPrint Studio",
    initials: "3D",
    subtitle: "سازنده و خدمات چاپ",
    preview: "ممنون از توضیحات تکمیلی‌تون.",
    time: "۱۱:۲۲",
    unread: 2,
    product: "خدمات چاپ سه‌بعدی",
    productImage: "https://images.pexels.com/photos/31336922/pexels-photo-31336922.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "rayan",
    name: "Rayan",
    initials: "R",
    subtitle: "خریدار",
    preview: "سلام، آیا این مدل برای چاپ ABS مناسبه؟",
    time: "دیروز",
    unread: 0,
    product: "فیلامنت PLA رنگی",
    productImage: "https://proprintforge.com/cdn/shop/articles/2wota.jpg?v=1710019529&width=400",
  },
  {
    id: "miniatures",
    name: "Miniatures World",
    initials: "M",
    subtitle: "سازنده مدل‌های تزئینی",
    preview: "قیمت نهایی برای ۳ عدد چقدر می‌شود؟",
    time: "دیروز",
    unread: 0,
    product: "مدل تزئینی سفارشی",
    productImage: "https://images.pexels.com/photos/30658380/pexels-photo-30658380.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "tools",
    name: "3D Tools",
    initials: "T",
    subtitle: "فروشنده لوازم جانبی",
    preview: "فایل STL برای بررسی سازگاری دریافت شد.",
    time: "۲ روز پیش",
    unread: 0,
    product: "کیت ابزار چاپگر",
    productImage: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const starterMessages: Record<string, ChatMessage[]> = {
  creality: [
    { id: 1, text: "سلام، برای پرینتر Ender-3 V3 SE موجودی دارید؟", time: "۱۴:۲۲", own: true },
    { id: 2, text: "سلام، بله موجود است. همین الان آماده ارسال هست.", time: "۱۴:۳۵", own: false },
    { id: 3, text: "عالیه، لطفاً زمان ارسال رو هم بفرمایید.", time: "۱۴:۳۷", own: true },
    { id: 4, text: "اگر امروز سفارش ثبت بشه، فردا تحویل پست می‌دیم.", time: "۱۴:۴۰", own: false },
  ],
  "print-studio": [
    { id: 1, text: "سلام، فایل مدل رو برای بررسی فرستادم.", time: "۱۱:۱۸", own: true, attachment: "dragon_model.stl" },
    { id: 2, text: "ممنون از توضیحات تکمیلی‌تون. امکان ساختش وجود داره.", time: "۱۱:۲۲", own: false },
  ],
  rayan: [
    { id: 1, text: "سلام، آیا این مدل برای چاپ ABS مناسبه؟", time: "دیروز", own: false },
  ],
  miniatures: [
    { id: 1, text: "قیمت نهایی برای ۳ عدد چقدر می‌شود؟", time: "دیروز", own: false },
  ],
  tools: [
    { id: 1, text: "فایل STL برای بررسی سازگاری دریافت شد.", time: "۲ روز پیش", own: false },
  ],
};

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState("creality");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [threadOpen, setThreadOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(starterMessages);
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const visible = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("fa");
    return conversations.filter((conversation) => {
      const matchesFilter = filter === "all" || conversation.unread > 0;
      const matchesSearch = !term || (conversation.name + " " + conversation.preview + " " + conversation.product).toLocaleLowerCase("fa").includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);
  const currentMessages = messages[selectedId] ?? [];

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((previous) => ({
      ...previous,
      [selectedId]: [
        ...(previous[selectedId] ?? []),
        { id: Date.now(), text, time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }), own: true },
      ],
    }));
    setDraft("");
  }

  return (
    <main className="page messages-page" dir="rtl">
      <div className="messages-layout">
        <aside className="messages-sidebar">
          <a className="messages-brand" href={ROUTES.home}><span>M</span>Maker</a>
          <nav aria-label="منوی حساب کاربری">
            <a href={ROUTES.account}><Home size={16} /> داشبورد</a>
            <a href={ROUTES.products}><Boxes size={16} /> محصولات من</a>
            <a href={ROUTES.cart}><ShoppingBag size={16} /> سفارش‌ها</a>
            <a className="is-active" href={ROUTES.accountMessages}><MessageSquare size={16} /> پیام‌ها <b>۳</b></a>
            <a href={ROUTES.accountFavorites}><Heart size={16} /> علاقه‌مندی‌ها</a>
            <a href={ROUTES.account}><Settings size={16} /> تنظیمات</a>
          </nav>
          <a className="messages-sidebar__logout" href={ROUTES.home}><LogOut size={15} /> خروج</a>
        </aside>

        <section className={"messages-inbox" + (threadOpen ? " is-hidden-mobile" : "")} aria-label="صندوق پیام‌ها">
          <header className="messages-inbox__header">
            <div><h1>پیام‌ها</h1><p>گفتگوهای شما با سازندگان و فروشندگان</p></div>
            <button type="button" aria-label="اعلان‌ها"><Bell size={17} /></button>
          </header>
          <label className="messages-inbox__search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جستجو در پیام‌ها..." /></label>
          <div className="messages-inbox__tabs" role="group" aria-label="فیلتر گفتگوها">
            <button type="button" className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>همه</button>
            <button type="button" className={filter === "unread" ? "is-active" : ""} onClick={() => setFilter("unread")}>خوانده‌نشده</button>
          </div>
          <div className="messages-inbox__list">
            {visible.map((conversation) => (
              <button
                className={"conversation-item" + (selectedId === conversation.id ? " is-active" : "")}
                type="button"
                key={conversation.id}
                onClick={() => { setSelectedId(conversation.id); setThreadOpen(true); }}
              >
                <span className={"conversation-item__avatar conversation-item__avatar--" + conversation.id}>{conversation.initials}</span>
                <span className="conversation-item__copy"><strong>{conversation.name}</strong><small>{conversation.preview}</small></span>
                <span className="conversation-item__meta"><time>{conversation.time}</time>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
              </button>
            ))}
            {visible.length === 0 && <p className="messages-inbox__empty">گفتگویی پیدا نشد.</p>}
          </div>
        </section>

        <section className={"messages-thread" + (threadOpen ? " is-open-mobile" : "")} aria-label={"گفتگو با " + selected.name}>
          <header className="messages-thread__header">
            <button className="messages-thread__back" type="button" aria-label="بازگشت به پیام‌ها" onClick={() => setThreadOpen(false)}><ArrowRight size={18} /></button>
            <span className="conversation-item__avatar">{selected.initials}</span>
            <div className="messages-thread__person"><strong>{selected.name}</strong><small>{selected.subtitle}</small></div>
            <button type="button" aria-label="گزینه‌های گفتگو"><MoreVertical size={17} /></button>
          </header>
          <a className="messages-thread__product" href={ROUTES.products}>
            <img src={selected.productImage} alt="" />
            <span><small>گفتگو درباره محصول</small><strong>{selected.product}</strong><em>مشاهده محصول</em></span>
            <ArrowRight size={15} />
          </a>
          <div className="messages-thread__status"><span /> گفتگو در Maker</div>
          <div className="messages-thread__body">
            {currentMessages.map((message) => (
              <div className={"chat-message" + (message.own ? " is-own" : "")} key={message.id}>
                {message.attachment && <div className="chat-message__attachment"><Paperclip size={15} /><span><strong>{message.attachment}</strong><small>۲٫۴ MB · فایل نمونه</small></span></div>}
                <p>{message.text}</p><time>{message.time}{message.own && <CheckCheck size={11} />}</time>
              </div>
            ))}
          </div>
          <form className="messages-thread__composer" onSubmit={sendMessage}>
            <button type="button" aria-label="افزودن فایل" onClick={() => setDraft((value) => value + (value ? " " : "") + " [فایل نمونه]")}><Paperclip size={17} /></button>
            <button type="button" aria-label="افزودن تصویر" onClick={() => setDraft((value) => value + (value ? " " : "") + " [تصویر نمونه]")}><ImageIcon size={17} /></button>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="پیام خود را بنویسید..." aria-label="متن پیام" />
            <button className="messages-thread__send" type="submit" aria-label="ارسال پیام"><Send size={16} /></button>
          </form>
          <p className="messages-thread__disclaimer">گفتگوها نمایشی‌اند؛ پیام‌ها فقط در همین نشست مرورگر نگهداری می‌شوند.</p>
        </section>
      </div>
    </main>
  );
}
