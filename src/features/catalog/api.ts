import type { LocaleCode } from '@/shared/lib/locale'
import { CATEGORIES, PRODUCTS } from './fixtures'
import type { Category, Page, Product, ProductQuery, ProductView } from './types'

/**
 * The catalogue "backend".
 *
 * Every function here is async and has artificial latency, and the payload
 * shapes are the ones a real service would return. Swapping this file for
 * `fetch` calls — or for MSW handlers — is the only change the UI should need.
 */

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

const LATENCY = { min: 220, max: 520 }

function wait(): Promise<void> {
  const ms = LATENCY.min + Math.random() * (LATENCY.max - LATENCY.min)
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/** Resolve stored content for one locale, the way a storefront backend would. */
function toView(product: Product, locale: LocaleCode): ProductView {
  const { name, description, details, ...rest } = product
  return {
    ...rest,
    name: name[locale],
    description: description[locale],
    details: details.map((detail) => detail[locale]),
  }
}

function matches(product: ProductView, query: ProductQuery): boolean {
  if (query.category !== undefined && product.categoryId !== query.category) {
    return false
  }

  if (query.colorFamilies !== undefined && query.colorFamilies.length > 0) {
    const families = new Set(product.colorways.map((colorway) => colorway.family))
    if (!query.colorFamilies.some((family) => families.has(family))) {
      return false
    }
  }

  const term = query.q?.trim().toLowerCase()
  if (term !== undefined && term !== '') {
    // Names are localised content, so this searches the language the shopper
    // is actually reading; the slug catches vocabulary the title omits.
    const haystack = [product.name, product.slug, ...product.colorways.map((c) => c.id)]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(term)) {
      return false
    }
  }

  return true
}

function sortProducts(items: ProductView[], sort: ProductQuery['sort']): ProductView[] {
  const sorted = [...items]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price.amount - b.price.amount)
    case 'price-desc':
      return sorted.sort((a, b) => b.price.amount - a.price.amount)
    case 'newest':
      return sorted.sort((a, b) => b.arrivedAt.localeCompare(a.arrivedAt))
    default:
      return sorted.sort((a, b) => a.featuredRank - b.featuredRank)
  }
}

export async function getProducts(
  query: ProductQuery = {},
  locale: LocaleCode = 'en',
): Promise<Page<ProductView>> {
  await wait()
  const items = sortProducts(
    PRODUCTS.map((product) => toView(product, locale)).filter((product) => matches(product, query)),
    query.sort,
  )
  return { items, total: items.length }
}

export async function getProductBySlug(
  slug: string,
  locale: LocaleCode = 'en',
): Promise<ProductView> {
  await wait()
  const found = PRODUCTS.find((product) => product.slug === slug)
  if (found === undefined) {
    throw new NotFoundError(`No product with slug "${slug}"`)
  }
  return toView(found, locale)
}

export async function getCategories(): Promise<Category[]> {
  await wait()
  return CATEGORIES
}
