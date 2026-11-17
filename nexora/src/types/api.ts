/**
 * Frontend-facing contract sketches for the Django REST API.
 * Final field names and endpoint paths must be agreed with the backend developer.
 */
export type ApiCategory = {
  id: number
  title: string
  slug: string
  product_count: number
}

export type ApiProduct = {
  id: number
  slug: string
  name: string
  description: string
  category: ApiCategory
  image: string | null
  is_available: boolean
  variants: ApiProductVariant[]
}

export type ApiProductVariant = {
  id: number
  title: string
  duration_label: string
  price: number
  currency: 'IRR'
  is_available: boolean
}

export type ApiOrderRequest = {
  items: Array<{ variant_id: number; quantity: number }>
  customer: { full_name: string; email: string; phone: string }
  notes?: string
  idempotency_key: string
}

export type ApiOrder = {
  id: string
  status: 'pending_payment' | 'paid' | 'processing' | 'delivered' | 'cancelled' | 'refunded'
  total: number
  currency: 'IRR'
  created_at: string
}

export type ApiErrorResponse = {
  detail?: string
  code?: string
  errors?: Record<string, string[]>
}
