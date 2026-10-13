import type { CategoryId, ColorFamily, SortKey } from '@/features/catalog/types'
import type { LocaleCode } from './locale'

/**
 * One place that knows the shape of our URLs. Every link, redirect and
 * canonical target goes through here, so a route change is a one-file edit.
 */

export function catalogueHref(locale: LocaleCode, category?: CategoryId): string {
  if (category === undefined) return `/${locale}`
  return `/${locale}?category=${category}`
}

export function productHref(locale: LocaleCode, slug: string, colourwayId?: string): string {
  const base = `/${locale}/products/${slug}`
  return colourwayId === undefined ? base : `${base}?colour=${colourwayId}`
}

export function cartHref(locale: LocaleCode): string {
  return `/${locale}/cart`
}

export interface CatalogueSearchParams {
  category?: CategoryId
  sort?: SortKey
  q?: string
  colour?: ColorFamily[]
}

/** Serialises filter state into the query string, omitting empty values. */
export function catalogueSearch(params: CatalogueSearchParams): string {
  const search = new URLSearchParams()
  if (params.category !== undefined) search.set('category', params.category)
  if (params.sort !== undefined) search.set('sort', params.sort)
  if (params.q !== undefined && params.q !== '') search.set('q', params.q)
  if (params.colour !== undefined && params.colour.length > 0) {
    search.set('colour', params.colour.join(','))
  }
  const serialised = search.toString()
  return serialised === '' ? '' : `?${serialised}`
}
