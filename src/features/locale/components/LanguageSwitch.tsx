import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { LOCALE_LABELS, LOCALES } from '@/shared/lib/locale'
import { useLocale } from '@/shared/lib/useLocale'
import { useLocation } from 'react-router'

/**
 * Swaps the language segment and keeps everything else — path and query alike.
 * Endonyms are never translated: a French shopper looking for Chinese looks for
 * "中文", not "Chinois".
 */
export function LanguageSwitch() {
  const { t } = useTranslation()
  const locale = useLocale()
  const location = useLocation()
  const rest = location.pathname.replace(/^\/[^/]+/, '')

  return (
    <div className="flex items-center gap-2.5" role="group" aria-label={t('nav.language')}>
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <Link
            key={code}
            to={`/${code}${rest}${location.search}`}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-chip text-[13px] transition-colors',
              active
                ? 'font-semibold text-ink underline decoration-ink decoration-1 underline-offset-4'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            {LOCALE_LABELS[code]}
          </Link>
        )
      })}
    </div>
  )
}
