import type { ApiProduct } from '../types/api'
import type { Product } from '../data/store'

/** Convert the proposed Django wire format into the storefront view model. */
export function fromApiProduct(value: ApiProduct): Product {
  return {
    id: value.id,
    slug: value.slug,
    name: value.name,
    description: value.description,
    brand: value.brand,
    badge: value.badge ?? '',
    categorySlug: value.category.slug,
    category: value.category.title,
    features: value.features,
    variants: value.variants.map(variant => ({
      id: variant.id,
      sku: variant.sku,
      title: variant.title,
      durationMonths: variant.duration_months,
      durationLabel: variant.duration_label,
      priceAmount: variant.price_amount,
      currency: variant.currency,
      isAvailable: variant.is_available,
    })),
  }
}

export function fromApiProducts(values: ApiProduct[]): Product[] {
  return values.map(fromApiProduct)
}
