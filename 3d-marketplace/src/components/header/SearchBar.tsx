import { useState } from "react";
import { Search } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

export function SearchBar() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("q") ?? "");

  return (
    <form className="header-search" role="search" action={ROUTES.products} method="get">
      <Search size={16} aria-hidden="true" />
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="جست‌وجو در محصولات"
        placeholder="جستجوی محصول، سازنده یا فایل..."
        autoComplete="off"
      />
      {query.trim() && (
        <button
          type="button"
          className="header-search__clear"
          aria-label="پاک کردن جست‌وجو"
          onClick={() => setQuery("")}
        >
          ×
        </button>
      )}
    </form>
  );
}
