/**
 * Frontend-facing Django REST contract proposal. Confirm field names, auth and
 * pagination with the backend owner before treating this as an API guarantee.
 */
export type ApiCurrency = 'IRR'
export type ApiBrand = 'microsoft' | 'netflix' | 'chatgpt' | 'youtube' | 'spotify' | 'google'

export type ApiCategory = {
  id: number
  slug: string
  title: string
  product_count: number
}

export type ApiProductVariant = {
  id: number
  sku: string
  title: string
  duration_months: number
  duration_label: string
  price_amount: number
  currency: ApiCurrency
  is_available: boolean
}

export type ApiProduct = {
  id: number
  slug: string
  name: string
  description: string
  category: ApiCategory
  brand: ApiBrand
  badge: string | null
  features: string[]
  variants: ApiProductVariant[]
}

export type ApiOrderItemRequest = {
  variant_id: number
  quantity: number
}

export type ApiOrderRequest = {
  items: ApiOrderItemRequest[]
  customer: { full_name: string; email: string; phone: string }
  notes?: string
  idempotency_key: string
}

export type ApiOrder = {
  id: string
  status: 'pending_payment' | 'paid' | 'processing' | 'delivered' | 'cancelled' | 'refunded'
  total_amount: number
  currency: ApiCurrency
  created_at: string
}

export type ApiErrorResponse = {
  detail?: string
  code?: string
  errors?: Record<string, string[]>
}
