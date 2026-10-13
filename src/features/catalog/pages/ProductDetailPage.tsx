import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useSearchParams } from 'react-router'
import { useAppDispatch } from '@/app/hooks'
import { addLine } from '@/features/cart/cartSlice'
import { setCartOpen } from '@/features/ui/uiSlice'
import { cn } from '@/shared/lib/cn'
import { formatMoney } from '@/shared/lib/money'
import { Button } from '@/shared/ui/Button'
import { buttonStyles } from '@/shared/ui/buttonStyles'
import { Swatch } from '@/shared/ui/Swatch'
import { useLocale } from '@/shared/lib/useLocale'
import { useGetProductQuery } from '../catalogApi'
import { ProductFigure } from '../components/ProductFigure'

/** At or below this many units of a size, the page says how many are left. */
const LOW_STOCK_UNITS = 2

export function ProductDetailPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const slug = params.slug ?? ''
  const { data: product, isLoading, isError } = useGetProductQuery({ slug, locale })

  const requestedColour = searchParams.get('colour')
  const colorway =
    product?.colorways.find((item) => item.id === requestedColour) ?? product?.colorways[0]

  const [sizeChoice, setSizeChoice] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 3000)
    return () => clearTimeout(timer)
  }, [justAdded])

  if (isError) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
        <h1 className="display-face text-title text-ink">{t('notFound.title')}</h1>
        <p className="mt-3 max-w-[46ch] text-[15px] text-ink-soft">{t('notFound.body')}</p>
        <Link to={`/${locale}`} className={buttonStyles({ className: 'mt-6' })}>
          {t('notFound.action')}
        </Link>
      </div>
    )
  }

  if (isLoading || product === undefined || colorway === undefined) {
    return (
      <div
        aria-busy="true"
        aria-label={t('common.loading')}
        className="mx-auto max-w-[1400px] animate-pulse px-4 pb-24 pt-10 sm:px-6"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="rounded-chip bg-cloth-deep" style={{ aspectRatio: '4 / 5' }} />
          <div className="space-y-3">
            <div className="h-8 w-2/3 rounded-chip bg-cloth-deep" />
            <div className="h-4 w-24 rounded-chip bg-cloth-deep" />
            <div className="h-24 w-full rounded-chip bg-cloth-deep" />
          </div>
        </div>
      </div>
    )
  }

  /**
   * The shopper's size choice is stored, but whether it *counts* is derived:
   * a size that is sold out in the currently selected dye is not a selection,
   * and a one-size piece has nothing to choose. Deriving this during render
   * avoids an effect that would otherwise trigger a second render on every
   * colourway switch.
   */
  const availableSizeIds = new Set(
    product.variants
      .filter((item) => item.colorwayId === colorway.id && item.stock > 0)
      .map((item) => item.sizeId),
  )
  const sizeId =
    sizeChoice !== null && availableSizeIds.has(sizeChoice)
      ? sizeChoice
      : product.sizes.length === 1
        ? (product.sizes[0]?.id ?? null)
        : null

  const variant = product.variants.find(
    (item) => item.colorwayId === colorway.id && item.sizeId === sizeId,
  )
  const canAdd = variant !== undefined && variant.stock > 0
  const onSale = product.compareAtPrice !== undefined

  const stockLine = (() => {
    if (sizeId === null) return t('product.selectSize')
    if (variant === undefined || variant.stock === 0) return t('product.soldOut')
    if (variant.stock <= LOW_STOCK_UNITS) return t('product.lowStock', { count: variant.stock })
    return t('product.inStock')
  })()

  const specs: Array<[string, string]> = [
    [t('product.fit'), t(product.fitKey)],
    [t('product.material'), t(product.materialKey)],
    ...(product.weight === undefined
      ? []
      : ([[t('product.weight'), product.weight]] as Array<[string, string]>)),
    [t('product.origin'), t(product.originKey)],
  ]

  function selectColour(id: string) {
    const next = new URLSearchParams(searchParams)
    next.set('colour', id)
    void setSearchParams(next, { replace: true })
  }

  function handleAdd() {
    if (product === undefined || colorway === undefined) return
    if (variant === undefined || variant.stock === 0) return
    dispatch(
      addLine({
        variantId: variant.id,
        productSlug: product.slug,
        colorwayId: colorway.id,
        sizeId: variant.sizeId,
        unitPrice: product.price.amount,
      }),
    )
    setJustAdded(true)
    dispatch(setCartOpen(true))
  }

  return (
    <article className="mx-auto max-w-[1400px] px-4 pb-24 pt-6 sm:px-6 sm:pt-10">
      <Link
        to={`/${locale}?category=${product.categoryId}`}
        className="rounded-chip text-[13px] text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
      >
        {t('nav.backToCatalogue')}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="relative overflow-hidden rounded-chip" style={{ aspectRatio: '4 / 5' }}>
          <ProductFigure figure={product.figure} color={colorway.hex} className="h-full w-full" />
          {onSale && (
            <span className="absolute left-3 top-3 rounded-chip bg-dye px-2 py-0.5 text-[12px] font-semibold text-cloth">
              {t('product.sale')}
            </span>
          )}
        </div>

        <div className="lg:pt-2">
          <h1 className="display-face text-title text-ink">{product.name}</h1>

          <p className="mt-3 flex items-baseline gap-3">
            <span className={cn('text-[19px] tabular-nums', onSale ? 'text-dye' : 'text-ink')}>
              {formatMoney(product.price, locale)}
            </span>
            {product.compareAtPrice !== undefined && (
              <span className="text-[14px] tabular-nums text-ink-soft line-through">
                {formatMoney(product.compareAtPrice, locale)}
              </span>
            )}
          </p>

          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="label-face text-[13px] text-ink-soft">{t('product.colour')}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-0.5">
              {product.colorways.map((item) => (
                <Swatch
                  key={item.id}
                  color={item.hex}
                  label={t(item.nameKey)}
                  pressed={item.id === colorway.id}
                  size="md"
                  onSelect={() => selectColour(item.id)}
                />
              ))}
            </div>
            <p className="mt-1 text-[13px] text-ink">{t(colorway.nameKey)}</p>
          </div>

          <div className="mt-6">
            <h2 className="label-face text-[13px] text-ink-soft">{t('product.size')}</h2>
            {product.sizes.length > 1 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.sizes.map((size) => {
                  const sizeVariant = product.variants.find(
                    (item) => item.colorwayId === colorway.id && item.sizeId === size.id,
                  )
                  const soldOut = sizeVariant === undefined || sizeVariant.stock === 0
                  const selected = size.id === sizeId
                  return (
                    <button
                      key={size.id}
                      type="button"
                      disabled={soldOut}
                      aria-pressed={selected}
                      onClick={() => setSizeChoice(size.id)}
                      className={cn(
                        'label-face h-10 min-w-14 rounded-chip border px-3 text-[13px] transition-colors',
                        soldOut && 'cursor-not-allowed border-rule text-ink-soft line-through',
                        !soldOut && selected && 'border-ink bg-ink text-cloth',
                        !soldOut && !selected && 'border-rule text-ink hover:border-ink',
                      )}
                    >
                      {size.label}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="mt-2 text-[13px] text-ink">{t('product.oneSize')}</p>
            )}
          </div>

          <p
            className={cn(
              'mt-4 text-[13px]',
              variant !== undefined && variant.stock > 0 && variant.stock <= LOW_STOCK_UNITS
                ? 'text-dye'
                : 'text-ink-soft',
            )}
          >
            {stockLine}
          </p>

          <Button block size="lg" className="mt-4" disabled={!canAdd} onClick={handleAdd}>
            {t('product.addToBag')}
          </Button>
          <p role="status" className="sr-only">
            {justAdded ? t('product.addedToBag') : ''}
          </p>

          <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2.5 border-t border-rule pt-6 text-[13px]">
            {specs.map(([term, value]) => (
              <Fragment key={term}>
                <dt className="text-ink-soft">{term}</dt>
                <dd className="text-ink">{value}</dd>
              </Fragment>
            ))}
          </dl>

          <h2 className="label-face mt-8 text-[13px] text-ink-soft">{t('product.details')}</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[14px] leading-relaxed text-ink marker:text-rule">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
