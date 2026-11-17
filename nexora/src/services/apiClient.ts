const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
const API_BASE_URL = (configuredBaseUrl ?? '').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly payload: unknown) {
    super(message)
    this.name = 'ApiError'
  }
}

export function isApiConfigured(): boolean {
  return API_BASE_URL.length > 0
}

/** Shared JSON transport for the eventual Django API integration. */
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!isApiConfigured()) {
    throw new Error('VITE_API_BASE_URL تنظیم نشده است؛ رابط در حالت دادهٔ نمایشی اجرا می‌شود.')
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      ...init,
      headers,
      credentials: init.credentials ?? 'include',
    })
  } catch (error) {
    throw new ApiError(error instanceof Error ? error.message : 'ارتباط با سرور برقرار نشد.', 0, null)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const payload: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '')

  if (!response.ok) {
    const detail = payload && typeof payload === 'object' && 'detail' in payload
      ? String((payload as { detail: unknown }).detail)
      : `درخواست با کد ${response.status} ناموفق بود.`
    throw new ApiError(detail, response.status, payload)
  }

  return payload as T
}
