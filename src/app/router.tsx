import { createBrowserRouter, redirect } from 'react-router'
import { NotFoundPage } from '@/features/catalog/pages/NotFoundPage'
import { ProductDetailPage } from '@/features/catalog/pages/ProductDetailPage'
import { ProductListPage } from '@/features/catalog/pages/ProductListPage'
import i18n from '@/i18n'
import { DEFAULT_LOCALE, isLocale, type LocaleCode } from '@/shared/lib/locale'
import { AppLayout } from './AppLayout'
import { ErrorPage } from './ErrorPage'

/**
 * The browser's own language preference is consulted exactly once, at the root.
 * After that the URL is the single source of truth, so a link shared from a
 * Chinese session opens in Chinese for whoever receives it.
 */
function detectLocale(): LocaleCode {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  const prefersChinese = preferred.some((tag) => tag.toLowerCase().startsWith('zh'))
  return prefersChinese ? 'zh' : DEFAULT_LOCALE
}

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(`/${detectLocale()}`),
  },
  {
    path: '/:lang',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    loader: async ({ params, request }) => {
      const url = new URL(request.url)

      if (!isLocale(params.lang)) {
        // Send the visitor to the default language but keep the rest of the
        // path, so a genuinely wrong URL still lands on the 404 page rather
        // than being quietly rewritten into the catalogue.
        const rest = url.pathname.replace(/^\/[^/]*/, '')
        return redirect(`/${DEFAULT_LOCALE}${rest}${url.search}`)
      }

      // Resolve the language *before* the route renders, so a Chinese page is
      // never painted once in English first.
      await i18n.changeLanguage(params.lang)
      return null
    },
    children: [
      { index: true, element: <ProductListPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
