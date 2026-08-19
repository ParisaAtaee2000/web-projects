import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/shop", "/login", "/register"];
  const productRoutes = products.map((product) => `/product/${product.slug}`);

  return [...staticRoutes, ...productRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path.startsWith("/product/") ? "weekly" : "daily",
    priority: path === "/" ? 1 : path === "/shop" ? 0.9 : 0.7,
  }));
}
