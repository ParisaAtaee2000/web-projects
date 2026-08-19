"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/catalog";

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category") ?? "";

  const setCategory = (category: string) => {
    const next = new URLSearchParams(params.toString());
    if (category) next.set("category", category);
    else next.delete("category");

    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="filters" role="group" aria-label="فیلتر دسته‌بندی">
      <button
        type="button"
        className={`filter-pill ${!active ? "active" : ""}`}
        onClick={() => setCategory("")}
        aria-pressed={!active}
      >
        همه
      </button>

      {categories.map((category) => (
        <button
          type="button"
          key={category.value}
          className={`filter-pill ${active === category.value ? "active" : ""}`}
          onClick={() => setCategory(category.value)}
          aria-pressed={active === category.value}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
