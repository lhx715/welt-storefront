import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { useLocale } from '@/shared/lib/useLocale'

/**
 * Submit-based rather than as-you-type. A live search would fire a request per
 * keystroke against a catalogue that takes 200–500 ms to answer, and would then
 * need debouncing, race handling and a query string that rewrites itself under
 * the reader. Pressing Enter is a smaller promise.
 *
 * The field is uncontrolled, keyed on the URL term: when the query string
 * changes underneath it (Clear filters, a shared link) React remounts it with
 * the new value, so there is no effect syncing state to state.
 *
 * Category and sort survive a search; a colourway filter does not, because it
 * means nothing against a different set of results.
 */
export function SearchField() {
  const { t } = useTranslation()
  const locale = useLocale()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const urlTerm = params.get('q') ?? ''
  const [hasText, setHasText] = useState(urlTerm !== '')

  function hrefFor(term: string): string {
    const next = new URLSearchParams()
    const category = params.get('category')
    const sort = params.get('sort')
    if (category !== null) next.set('category', category)
    if (sort !== null) next.set('sort', sort)
    if (term !== '') next.set('q', term)

    const serialised = next.toString()
    return serialised === '' ? `/${locale}` : `/${locale}?${serialised}`
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const raw = new FormData(event.currentTarget).get('q')
    const term = typeof raw === 'string' ? raw.trim() : ''
    void navigate(hrefFor(term))
  }

  function handleClear() {
    if (inputRef.current !== null) inputRef.current.value = ''
    setHasText(false)
    void navigate(hrefFor(''))
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="catalogue-search" className="sr-only">
        {t('nav.search')}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
      />
      <input
        key={urlTerm}
        ref={inputRef}
        id="catalogue-search"
        name="q"
        type="search"
        defaultValue={urlTerm}
        onChange={(event) => setHasText(event.target.value !== '')}
        placeholder={t('nav.searchPlaceholder')}
        className="h-10 w-full rounded-chip border border-rule bg-surface pl-9 pr-9 text-sm text-ink placeholder:text-ink-soft focus-visible:border-ink [&::-webkit-search-cancel-button]:appearance-none"
      />
      {hasText && (
        <button
          type="button"
          aria-label={t('nav.clearSearch')}
          onClick={handleClear}
          className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-chip text-ink-soft hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </form>
  )
}
