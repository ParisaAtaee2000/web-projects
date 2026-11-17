const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
const API_BASE_URL = (configuredBaseUrl ?? '').replace(/\/+$/, '')

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export function isApiConfigured() {
  return API_BASE_URL.length > 0
}

/**
 * Shared fetch wrapper for the Django REST API.
 * The current storefront intentionally uses local demo data until the backend
 * team provides and confirms the endpoint contract.
 */
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('آدرس API تنظیم نشده است. رابط فعلی در حالت داده نمایشی اجرا می‌شود.')
  }

  const normalizedPath = path.startsWith('/') ? path : '/' + path
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(API_BASE_URL + normalizedPath, {
    ...init,
    headers,
    credentials: init.credentials ?? 'include',
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '')

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'detail' in payload
      ? String((payload as { detail: unknown }).detail)
      : 'در ارتباط با سرور مشکلی پیش آمده است.'
    throw new ApiError(message, response.status, payload)
  }

  return payload as T
}
