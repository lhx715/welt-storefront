import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useGetProductsQuery } from '@/features/catalog/catalogApi'
import { ProductFigure } from '@/features/catalog/components/ProductFigure'
import { setCartOpen } from '@/features/ui/uiSlice'
import { formatMoney } from '@/shared/lib/money'
import { productHref } from '@/shared/lib/routes'
import { useLocale } from '@/shared/lib/useLocale'
import { Button } from '@/shared/ui/Button'
import { buttonStyles } from '@/shared/ui/buttonStyles'
import { QuantityStepper } from '@/shared/ui/QuantityStepper'
import { Sheet } from '@/shared/ui/Sheet'
import { MAX_PER_LINE, decrementLine, incrementLine, removeLine } from '../cartSlice'
import { selectCartLines } from '../selectors'

export function CartSheet() {
  const { t } = useTranslation()
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.ui.cartOpen)
  const lines = useAppSelector(selectCartLines)

  /**
   * The slice stores SKU ids and quantities — never copies of titles or prices,
   * which rot the moment the catalogue changes. Live values are joined back
   * here, and the add-time snapshot is kept only to *flag* drift rather than to
   * silently display a stale total.
   */
  const { data } = useGetProductsQuery({ query: {}, locale })

  const products = useMemo(
    () => new Map((data?.items ?? []).map((product) => [product.slug, product])),
    [data],
  )

  const rows = lines.flatMap((line) => {
    const product = products.get(line.productSlug)
    if (product === undefined) return []
    const colorway = product.colorways.find((item) => item.id === line.colorwayId)
    if (colorway === undefined) return []
    const size = product.sizes.find((item) => item.id === line.sizeId)
    return [{ line, product, colorway, size }]
  })

  const subtotal = rows.reduce(
    (total, row) => total + row.product.price.amount * row.line.quantity,
    0,
  )
  const currency = rows[0]?.product.price.currency ?? 'USD'
  const close = () => dispatch(setCartOpen(false))

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => dispatch(setCartOpen(next))}
      title={t('cart.title')}
      closeLabel={t('nav.close')}
    >
      {lines.length === 0 ? (
        <div className="px-5 py-8 sm:px-6">
          <h3 className="display-face text-[17px] text-ink">{t('cart.empty.title')}</h3>
          <p className="mt-2 max-w-[36ch] text-[15px] text-ink-soft">{t('cart.empty.body')}</p>
          <Link to={`/${locale}`} onClick={close} className={buttonStyles({ className: 'mt-6' })}>
            {t('cart.empty.action')}
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="min-h-0 flex-1 divide-y divide-rule">
            {rows.map(({ line, product, colorway, size }) => (
              <li key={line.variantId} className="flex gap-4 px-5 py-4 sm:px-6">
                <Link
                  to={productHref(locale, product.slug, colorway.id)}
                  onClick={close}
                  className="w-20 shrink-0 rounded-chip"
                >
                  <span
                    className="block overflow-hidden rounded-chip"
                    style={{ aspectRatio: '4 / 5' }}
                  >
                    <ProductFigure
                      figure={product.figure}
                      color={colorway.hex}
                      className="h-full w-full"
                    />
                  </span>
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium leading-snug text-ink">
                        {product.name}
                      </p>
                      <p className="mt-0.5 flex gap-1.5 text-[13px] text-ink-soft">
                        <span>{t(colorway.nameKey)}</span>
                        {size !== undefined && <span>{size.label}</span>}
                      </p>
                    </div>
                    <p className="shrink-0 text-[14px] tabular-nums text-ink">
                      {formatMoney(
                        { amount: product.price.amount * line.quantity, currency },
                        locale,
                      )}
                    </p>
                  </div>

                  {line.addedPrice !== product.price.amount && (
                    <p className="mt-1.5 text-[12px] text-dye">{t('cart.priceChanged')}</p>
                  )}

                  <div className="mt-3 flex items-center gap-4">
                    <QuantityStepper
                      quantity={line.quantity}
                      max={MAX_PER_LINE}
                      label={[product.name, t(colorway.nameKey), size?.label]
                        .filter((part): part is string => typeof part === 'string' && part !== '')
                        .join(', ')}
                      quantityLabel={t('cart.quantity')}
                      increaseLabel={t('cart.increase')}
                      decreaseLabel={t('cart.decrease')}
                      onIncrease={() => dispatch(incrementLine(line.variantId))}
                      onDecrease={() => dispatch(decrementLine(line.variantId))}
                    />

                    <button
                      type="button"
                      onClick={() => dispatch(removeLine(line.variantId))}
                      className="rounded-chip text-[13px] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="rule-t shrink-0 px-5 py-4 sm:px-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-ink">{t('cart.subtotal')}</span>
              <span className="text-[17px] tabular-nums text-ink">
                {formatMoney({ amount: subtotal, currency }, locale)}
              </span>
            </div>
            <Button block size="lg" className="mt-4" disabled>
              {t('cart.checkout')}
            </Button>
            <p className="mt-2 text-[12px] text-ink-soft">{t('cart.checkoutNote')}</p>
          </div>
        </div>
      )}
    </Sheet>
  )
}
