import { Search } from "lucide-react";
export function SearchBar() {
  return <form className="header-search" role="search" onSubmit={event => event.preventDefault()}>
    <Search size={16} aria-hidden="true" />
    <input aria-label="جست‌وجو در محصولات" placeholder="جستجوی محصول، سازنده یا فایل..." />
  </form>;
}
