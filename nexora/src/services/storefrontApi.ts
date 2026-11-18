import { apiRequest } from './apiClient'
import type {
  ApiCategory,
  ApiContactMessageRequest,
  ApiNewsletterRequest,
  ApiOrder,
  ApiOrderRequest,
  ApiArticle,
  ApiCart,
  ApiCartLine,
  ApiLoginRequest,
  ApiRegisterRequest,
  ApiAuthResponse,
  ApiUser,
  ApiPaymentInitialization,
  ApiPaginatedResponse,
  ApiProduct,
} from '../types/api'

export type ProductQuery = {
  category?: string
  search?: string
  ordering?: 'popular' | 'price' | '-price'
  page?: number
  page_size?: number
}

/**
 * Typed boundary between the React storefront and the proposed Django REST API.
 * Pages intentionally remain in demo mode until the API contract is confirmed
 * and the application is explicitly switched to live data.
 */
export const storefrontApi = {
  async getCategories(signal?: AbortSignal): Promise<ApiCategory[]> {
    const response = await apiRequest<ApiCategory[] | ApiPaginatedResponse<ApiCategory>>(
      '/api/v1/categories/',
      { signal },
    )
    return Array.isArray(response) ? response : response.results
  },

  async getProducts(query: ProductQuery = {}, signal?: AbortSignal): Promise<ApiProduct[]> {
    const params = new URLSearchParams()
    if (query.category) params.set('category', query.category)
    if (query.search) params.set('search', query.search)
    if (query.ordering) params.set('ordering', query.ordering)
    if (query.page) params.set('page', String(query.page))
    if (query.page_size) params.set('page_size', String(query.page_size))
    const suffix = params.size ? `?${params.toString()}` : ''
    const response = await apiRequest<ApiProduct[] | ApiPaginatedResponse<ApiProduct>>(
      `/api/v1/products/${suffix}`,
      { signal },
    )
    return Array.isArray(response) ? response : response.results
  },

  async getArticles(signal?: AbortSignal): Promise<ApiArticle[]> {
    const response = await apiRequest<ApiArticle[] | ApiPaginatedResponse<ApiArticle>>('/api/v1/articles/', { signal })
    return Array.isArray(response) ? response : response.results
  },

  getArticle(id: number, signal?: AbortSignal): Promise<ApiArticle> {
    return apiRequest<ApiArticle>(`/api/v1/articles/${id}/`, { signal })
  },

  getCart(signal?: AbortSignal): Promise<ApiCart> {
    return apiRequest<ApiCart>('/api/v1/cart/', { signal })
  },

  syncCart(items: ApiCartLine[], signal?: AbortSignal): Promise<ApiCart> {
    return apiRequest<ApiCart>('/api/v1/cart/', {
      method: 'PUT',
      body: JSON.stringify({ items }),
      signal,
    })
  },

  getFavorites(signal?: AbortSignal): Promise<string[]> {
    return apiRequest<string[]>('/api/v1/favorites/', { signal })
  },

  addFavorite(productId: number, signal?: AbortSignal): Promise<void> {
    return apiRequest<void>('/api/v1/favorites/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
      signal,
    })
  },

  removeFavorite(productId: number, signal?: AbortSignal): Promise<void> {
    return apiRequest<void>(`/api/v1/favorites/${productId}/`, { method: 'DELETE', signal })
  },

  login(payload: ApiLoginRequest, signal?: AbortSignal): Promise<ApiAuthResponse> {
    return apiRequest<ApiAuthResponse>('/api/v1/auth/login/', { method: 'POST', body: JSON.stringify(payload), signal })
  },

  register(payload: ApiRegisterRequest, signal?: AbortSignal): Promise<ApiAuthResponse> {
    return apiRequest<ApiAuthResponse>('/api/v1/auth/register/', { method: 'POST', body: JSON.stringify(payload), signal })
  },

  logout(signal?: AbortSignal): Promise<void> {
    return apiRequest<void>('/api/v1/auth/logout/', { method: 'POST', signal })
  },

  getCurrentUser(signal?: AbortSignal): Promise<ApiUser> {
    return apiRequest<ApiUser>('/api/v1/auth/me/', { signal })
  },

  getOrders(signal?: AbortSignal): Promise<ApiOrder[]> {
    return apiRequest<ApiOrder[] | ApiPaginatedResponse<ApiOrder>>('/api/v1/orders/', { signal })
      .then(response => Array.isArray(response) ? response : response.results)
  },

  initializePayment(orderId: string, provider: string, signal?: AbortSignal): Promise<ApiPaymentInitialization> {
    return apiRequest<ApiPaymentInitialization>('/api/v1/payments/initialize/', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId, provider }),
      signal,
    })
  },

  getProduct(slug: string, signal?: AbortSignal): Promise<ApiProduct> {
    return apiRequest<ApiProduct>(`/api/v1/products/${encodeURIComponent(slug)}/`, { signal })
  },

  createOrder(payload: ApiOrderRequest, signal?: AbortSignal): Promise<ApiOrder> {
    return apiRequest<ApiOrder>('/api/v1/orders/', {
      method: 'POST',
      body: JSON.stringify(payload),
      signal,
    })
  },

  submitContactMessage(payload: ApiContactMessageRequest, signal?: AbortSignal): Promise<{ id: string }> {
    return apiRequest<{ id: string }>('/api/v1/contact-messages/', {
      method: 'POST',
      body: JSON.stringify(payload),
      signal,
    })
  },

  subscribeNewsletter(payload: ApiNewsletterRequest, signal?: AbortSignal): Promise<{ id: string }> {
    return apiRequest<{ id: string }>('/api/v1/newsletter/subscriptions/', {
      method: 'POST',
      body: JSON.stringify(payload),
      signal,
    })
  },
}
