/**
 * Frontend-facing Django REST contract proposal. Confirm field names, auth and
 * pagination with the backend owner before treating this as an API guarantee.
 */
export type ApiCurrency = 'IRR'
export type ApiBrand = 'microsoft' | 'netflix' | 'chatgpt' | 'youtube' | 'spotify' | 'google'

/** Django REST Framework page-number pagination response. */
export type ApiPaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

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

export type ApiContactMessageRequest = {
  full_name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export type ApiNewsletterRequest = {
  email: string
  consent: true
}

export type ApiErrorResponse = {
  detail?: string
  code?: string
  errors?: Record<string, string[]>
}

export type ApiArticle = {
  id: number
  slug: string
  title: string
  category: string
  excerpt: string
  image_url: string
  body: string
  reading_minutes: number
  published_at: string
}

export type ApiCartLine = {
  product_slug: string
  product?: ApiProduct
  variant_id: number
  quantity: number
}

export type ApiCart = {
  items: ApiCartLine[]
  updated_at?: string
}

export type ApiUser = {
  id: number | string
  full_name: string
  email: string
  phone?: string | null
}

export type ApiLoginRequest = { email: string; password: string }
export type ApiRegisterRequest = { full_name: string; email: string; phone: string; password: string }
export type ApiAuthResponse = { user: ApiUser }

export type ApiPaymentInitialization = {
  order_id: string
  redirect_url: string
  provider: string
}
