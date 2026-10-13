import { CATEGORIES, COLOR_FAMILIES } from './fixtures'
import type { CategoryId, ColorFamily, ProductQuery, SortKey } from './types'

/**
 * URL parameters are untrusted input. Everything that enters the query is
 * validated against the known vocabulary first, so a hand-edited
 * `?category=shoes&sort=cheapest` degrades to the default view instead of
 * producing an empty catalogue and a confusing bug report.
 */

const SORT_KEYS: readonly SortKey[] = ['featured', 'price-asc', 'price-desc', 'newest']

export function parseCategory(value: string | null): CategoryId | undefined {
  return CATEGORIES.find((category) => category.id === value)?.id
}

export function parseSort(value: string | null): SortKey | undefined {
  return SORT_KEYS.find((key) => key === value)
}

export function parseColorFamilies(value: string | null): ColorFamily[] {
  if (value === null) return []
  const requested = value.split(',').map((part) => part.trim())
  return COLOR_FAMILIES.filter((family) => requested.includes(family))
}

export function toProductQuery(params: URLSearchParams): ProductQuery {
  const query: ProductQuery = {}

  const category = parseCategory(params.get('category'))
  if (category !== undefined) query.category = category

  const sort = parseSort(params.get('sort'))
  if (sort !== undefined) query.sort = sort

  const term = params.get('q')?.trim()
  if (term !== undefined && term !== '') query.q = term

  const colorFamilies = parseColorFamilies(params.get('colour'))
  if (colorFamilies.length > 0) query.colorFamilies = colorFamilies

  return query
}
