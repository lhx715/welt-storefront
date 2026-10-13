import type { LocaleCode } from '@/shared/lib/locale'

/**
 * Catalogue domain types.
 *
 * Three conventions worth stating up front:
 *
 * 1. Money is an integer count of the minor unit (cents) plus a currency code.
 *    Never store 34.99 as a float — summing a cart of them drifts.
 *
 * 2. Free-form product copy (name, description, detail bullets) is *content*
 *    and ships with the catalogue as `LocalizedText`, the way a real
 *    storefront backend returns the language the shopper asked for.
 *    Enumerable attribute vocabulary (fit, material, origin, colour names) is
 *    *interface copy* and is resolved from the i18n files via a key. Buttons
 *    and labels live there too.
 *
 * 3. The cart holds SKU (variant) ids, never product ids.
 */

export type CurrencyCode = 'USD'

export interface Money {
  /** Minor unit. 3499 === $34.99 */
  amount: number
  currency: CurrencyCode
}

export type LocalizedText = Record<LocaleCode, string>

export type CategoryId = 'footwear' | 'apparel' | 'bags'

export interface Category {
  id: CategoryId
  nameKey: string
  noteKey: string
}

/** The filterable colour axis. */
export type ColorFamily =
  | 'ecru'
  | 'indigo'
  | 'madder'
  | 'olive'
  | 'charcoal'
  | 'tan'
  | 'navy'

export interface Colorway {
  id: string
  nameKey: string
  /** The dye itself: rendered as a swatch and used to tint the figure. */
  hex: string
  family: ColorFamily
}

export interface SizeOption {
  id: string
  /** XS/S/M/L/XL and EU 40–45 read the same in every market we ship to. */
  label: string
}

export type Archetype = 'tee' | 'shirt' | 'trouser' | 'boot' | 'sneaker' | 'tote' | 'duffel'

/** Per-product figure tweaks, so two products sharing a silhouette don't read as one. */
export interface FigureSpec {
  archetype: Archetype
  sleeve?: 'short' | 'long'
  collar?: boolean
  pocket?: boolean
  /** Wider legs or a boxier body. */
  wide?: boolean
  /** Taller boot shaft. */
  tall?: boolean
  /** Chelsea boots are side-gored, so they carry no laces. */
  lace?: boolean
}

/** A SKU. This — not the product — is what a cart line points at. */
export interface Variant {
  id: string
  colorwayId: string
  sizeId: string
  stock: number
}

/** What the catalogue stores. */
export interface Product {
  id: string
  slug: string
  name: LocalizedText
  categoryId: CategoryId
  figure: FigureSpec
  fitKey: string
  materialKey: string
  originKey: string
  description: LocalizedText
  details: LocalizedText[]
  /** e.g. "280 gsm" — an industry figure, identical in both languages. */
  weight?: string
  price: Money
  compareAtPrice?: Money
  colorways: Colorway[]
  sizes: SizeOption[]
  variants: Variant[]
  /** Stable ordering for the default "featured" sort. */
  featuredRank: number
  arrivedAt: string
}

/** What the catalogue returns for one locale: content already resolved. */
export interface ProductView extends Omit<Product, 'name' | 'description' | 'details'> {
  name: string
  description: string
  details: string[]
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductQuery {
  category?: CategoryId
  colorFamilies?: ColorFamily[]
  q?: string
  sort?: SortKey
}

export interface Page<T> {
  items: T[]
  total: number
}
