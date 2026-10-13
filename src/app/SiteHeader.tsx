import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { BagButton } from '@/features/cart/components/BagButton'
import { CategoryNav } from '@/features/catalog/components/CategoryNav'
import { SearchField } from '@/features/catalog/components/SearchField'
import { LanguageSwitch } from '@/features/locale/components/LanguageSwitch'
import { useLocale } from '@/shared/lib/useLocale'

/**
 * Sticky only from lg up, where it is a single 4rem row. Below that it grows to
 * three rows, and a header that eats a third of a phone screen while you scroll
 * a catalogue is worse than no header at all — so there it scrolls away and the
 * filter bar takes over the sticky job.
 */
export function SiteHeader() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <header className="rule-b bg-cloth lg:sticky lg:top-0 lg:z-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to={`/${locale}`} className="wordmark text-[19px] text-ink">
            {t('app.name')}
          </Link>

          <CategoryNav className="hidden lg:flex" />

          <div className="flex items-center gap-4">
            <div className="hidden w-56 xl:block">
              <SearchField />
            </div>
            <LanguageSwitch />
            <BagButton />
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <SearchField />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-3 lg:hidden">
          <CategoryNav className="w-max" />
        </div>
      </div>
    </header>
  )
}
