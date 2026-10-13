import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { useLocale } from '@/shared/lib/useLocale'
import { catalogueSearch } from '@/shared/lib/routes'
import { useSearchParams } from 'react-router'
import { CATEGORIES } from '../fixtures'
import { parseSort } from '../lib'

/**
 * Categories live in the header, so the rail doubles as the page's primary
 * navigation rather than a second set of controls under a title.
 */
export function CategoryNav({ className }: { className?: string }) {
  const { t } = useTranslation()
  const locale = useLocale()
  const [params] = useSearchParams()
  const active = params.get('category')
  const sort = parseSort(params.get('sort'))

  const items = [
    { key: 'all', id: undefined, label: t('category.all') },
    ...CATEGORIES.map((category) => ({
      key: category.id,
      id: category.id,
      label: t(category.nameKey),
    })),
  ]

  return (
    <nav aria-label={t('nav.menu')} className={cn('flex items-center gap-5', className)}>
      {items.map((item) => {
        const isActive = item.id === undefined ? active === null : active === item.id
        return (
          <Link
            key={item.key}
            to={`/${locale}${catalogueSearch({ category: item.id, sort })}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'shrink-0 rounded-chip text-[13px] transition-colors',
              isActive
                ? 'font-semibold text-ink underline decoration-ink underline-offset-4'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
