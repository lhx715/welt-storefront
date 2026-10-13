import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '@/shared/ui/Button'
import { useLocale } from '@/shared/lib/useLocale'
import { useGetCategoriesQuery, useGetProductsQuery } from '../catalogApi'
import { ColorFilter } from '../components/ColorFilter'
import { ProductCard } from '../components/ProductCard'
import { SortTabs } from '../components/SortTabs'
import { toProductQuery } from '../lib'

const SKELETON_KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function ProductListPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const query = toProductQuery(params)
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ query, locale })
  const { data: categories } = useGetCategoriesQuery()

  const category = categories?.find((item) => item.id === query.category)
  const heading = category === undefined ? t('app.season') : t(category.nameKey)
  const note = category === undefined ? t('category.allNote') : t(category.noteKey)

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <header className="pb-6 pt-8 sm:pb-8 sm:pt-14">
          <h1 className="display-face text-display text-ink">{heading}</h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-ink-soft">
            {query.q === undefined ? note : t('list.matching', { term: query.q })}
          </p>
          {data !== undefined && (
            <p className="mt-1 text-[13px] tabular-nums text-ink-soft">
              {t('list.count', { count: data.total })}
            </p>
          )}
        </header>
      </div>

      {/* Sticks under the header on desktop, to the top on mobile where the
          header scrolls away and the bag lives in the sticky bar's row. */}
      <div className="rule-b sticky top-0 z-30 bg-cloth lg:top-16">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 overflow-x-auto px-4 py-3 sm:px-6">
          <ColorFilter />
          <span aria-hidden="true" className="h-4 w-px shrink-0 bg-rule" />
          <SortTabs />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
        {isError && (
          <div className="max-w-[46ch] py-16">
            <h2 className="display-face text-title text-ink">{t('list.error.title')}</h2>
            <p className="mt-3 text-[15px] text-ink-soft">{t('list.error.body')}</p>
            <Button className="mt-6" onClick={() => void refetch()}>
              {t('list.error.action')}
            </Button>
          </div>
        )}

        {!isError && isLoading && (
          <div
            aria-busy="true"
            aria-label={t('common.loading')}
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4"
          >
            {SKELETON_KEYS.map((key) => (
              <div key={key} className="animate-pulse">
                <div className="rounded-chip bg-cloth-deep" style={{ aspectRatio: '4 / 5' }} />
                <div className="mt-3 h-4 w-2/3 rounded-chip bg-cloth-deep" />
                <div className="mt-2 h-3 w-1/3 rounded-chip bg-cloth-deep" />
              </div>
            ))}
          </div>
        )}

        {!isError && !isLoading && data !== undefined && data.total === 0 && (
          <div className="max-w-[46ch] py-16">
            <h2 className="display-face text-title text-ink">{t('list.empty.title')}</h2>
            <p className="mt-3 text-[15px] text-ink-soft">{t('list.empty.body')}</p>
            <Button
              className="mt-6"
              onClick={() => {
                void navigate(`/${locale}`)
              }}
            >
              {t('list.empty.action')}
            </Button>
          </div>
        )}

        {!isError && data !== undefined && data.total > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
            {data.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
