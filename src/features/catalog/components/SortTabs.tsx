import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { catalogueSearch } from '@/shared/lib/routes'
import { useLocale } from '@/shared/lib/useLocale'
import { parseCategory, parseColorFamilies, parseSort } from '../lib'
import type { SortKey } from '../types'

const SORT_KEYS: readonly SortKey[] = ['featured', 'price-asc', 'price-desc', 'newest']

/**
 * Sorts are links, not dropdown items: you can middle-click one, bookmark it,
 * and see where it will take you before you commit. The default sort leaves no
 * parameter behind, so `/en` and `/en?sort=featured` are not two URLs for the
 * same page.
 */
export function SortTabs({ className }: { className?: string }) {
  const { t } = useTranslation()
  const locale = useLocale()
  const [params] = useSearchParams()
  const active = parseSort(params.get('sort')) ?? 'featured'

  const category = parseCategory(params.get('category'))
  const q = params.get('q') ?? undefined
  const colour = parseColorFamilies(params.get('colour'))

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="shrink-0 text-[13px] text-ink-soft">{t('sort.label')}</span>
      {SORT_KEYS.map((key) => {
        const isActive = key === active
        return (
          <Link
            key={key}
            to={`/${locale}${catalogueSearch({
              category,
              sort: key === 'featured' ? undefined : key,
              q,
              colour,
            })}`}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'shrink-0 rounded-chip text-[13px] transition-colors',
              isActive
                ? 'font-semibold text-ink underline decoration-ink underline-offset-4'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            {t(`sort.${key}`)}
          </Link>
        )
      })}
    </div>
  )
}
