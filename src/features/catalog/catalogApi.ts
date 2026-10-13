import { fakeBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { LocaleCode } from '@/shared/lib/locale'
import { getCategories, getProductBySlug, getProducts } from './api'
import type { Category, Page, ProductQuery, ProductView } from './types'

export interface ProductsArg {
  query: ProductQuery
  locale: LocaleCode
}

export interface ProductArg {
  slug: string
  locale: LocaleCode
}

function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown catalogue error'
}

/**
 * Server state lives in the store too, but through RTK Query rather than a
 * hand-written slice: caching, deduplication of concurrent requests and
 * request lifecycle states are the library's job, not ours.
 *
 * `fakeBaseQuery` because there is no HTTP endpoint to hit yet. The day there
 * is, this file swaps to `fetchBaseQuery` and no component changes.
 */
export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fakeBaseQuery<string>(),
  endpoints: (build) => ({
    getProducts: build.query<Page<ProductView>, ProductsArg>({
      queryFn: async ({ query, locale }) => {
        try {
          return { data: await getProducts(query, locale) }
        } catch (error) {
          return { error: toMessage(error) }
        }
      },
    }),

    getProduct: build.query<ProductView, ProductArg>({
      queryFn: async ({ slug, locale }) => {
        try {
          return { data: await getProductBySlug(slug, locale) }
        } catch (error) {
          return { error: toMessage(error) }
        }
      },
    }),

    getCategories: build.query<Category[], void>({
      queryFn: async () => {
        try {
          return { data: await getCategories() }
        } catch (error) {
          return { error: toMessage(error) }
        }
      },
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery } = catalogApi
