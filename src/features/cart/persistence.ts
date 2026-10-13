import type { CartLine, CartState } from './cartSlice'

/**
 * Hand-rolled cart persistence.
 *
 * Deliberately not redux-persist: its latest release is still 6.0.0 from
 * September 2019, which predates both Redux Toolkit 2 and React 19. A cart is
 * a list of scalars — thirty lines of validated read/write beats auditing a
 * seven-year-old dependency.
 */

const STORAGE_KEY = 'welt:cart'
const VERSION = 1

interface Envelope {
  version: number
  lines: CartLine[]
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false
  const line = value as Record<string, unknown>
  return (
    typeof line.variantId === 'string' &&
    typeof line.productSlug === 'string' &&
    typeof line.colorwayId === 'string' &&
    typeof line.sizeId === 'string' &&
    typeof line.quantity === 'number' &&
    Number.isFinite(line.quantity) &&
    line.quantity > 0 &&
    typeof line.addedPrice === 'number' &&
    Number.isFinite(line.addedPrice)
  )
}

export function loadCart(): CartState | undefined {
  if (typeof localStorage === 'undefined') return undefined
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return undefined
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return undefined

    const { version, lines } = parsed as Partial<Envelope>
    // A version bump means the stored shape is no longer trustworthy. Dropping
    // an old cart is better than rendering a page that cannot be used.
    if (version !== VERSION || !Array.isArray(lines)) return undefined

    return { lines: lines.filter(isCartLine) }
  } catch {
    return undefined
  }
}

export function saveCart(state: CartState): void {
  try {
    const envelope: Envelope = { version: VERSION, lines: state.lines }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope))
  } catch {
    // Private browsing or a full quota. A bag that cannot persist is not worth
    // taking the page down for.
  }
}
