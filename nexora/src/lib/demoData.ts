export type DemoSession = {
  name: string
  email: string
  phone: string
}

export type DemoOrderItem = {
  slug: string
  name: string
  quantity: number
  unitPrice: number
}

export type DemoOrder = {
  id: string
  createdAt: string
  status: 'awaiting_api'
  customer: DemoSession
  items: DemoOrderItem[]
  total: number
}

const SESSION_KEY = 'nexora-demo-session'
const ORDERS_KEY = 'nexora-demo-orders'

export function readDemoSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return null
    const candidate = value as Partial<DemoSession>
    if (typeof candidate.name !== 'string' || typeof candidate.email !== 'string' || typeof candidate.phone !== 'string') return null
    return { name: candidate.name, email: candidate.email, phone: candidate.phone }
  } catch {
    return null
  }
}

export function saveDemoSession(session: DemoSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // The demo session remains in component state for this browser session.
  }
}

export function clearDemoSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // Ignore storage failures; this is demo-only state.
  }
}

export function readDemoOrders(): DemoOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (!raw) return []
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.filter((item): item is DemoOrder => Boolean(
      item && typeof item === 'object'
      && typeof item.id === 'string'
      && typeof item.createdAt === 'string'
      && typeof item.total === 'number'
      && Array.isArray(item.items)
      && item.customer && typeof item.customer === 'object',
    ))
  } catch {
    return []
  }
}

export function saveDemoOrder(order: DemoOrder) {
  try {
    const existing = readDemoOrders().filter(item => item.id !== order.id)
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing].slice(0, 30)))
  } catch {
    // Checkout preview still renders even when browser storage is unavailable.
  }
}
