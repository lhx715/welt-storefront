import { useParams } from 'react-router'
import { DEFAULT_LOCALE, isLocale, type LocaleCode } from './locale'

/**
 * The language lives in the URL, so the URL is the single source of truth.
 * Nothing mirrors it into a store — two copies of the same truth is how you
 * end up with a page rendering one language and its links pointing at another.
 */
export function useLocale(): LocaleCode {
  const params = useParams()
  return isLocale(params.lang) ? params.lang : DEFAULT_LOCALE
}
