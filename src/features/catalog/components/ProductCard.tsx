import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { formatMoney } from '@/shared/lib/money'
import { productHref } from '@/shared/lib/routes'
import { useLocale } from '@/shared/lib/useLocale'
import { SwatchDot } from '@/shared/ui/Swatch'
import type { ProductView } from '../types'
import { ProductFigure } from './ProductFigure'

interface ProductCardProps {
  product: ProductView
}

/** Below this many units left across all sizes, the card says so. */
const LAST_CHANCE_UNITS = 8

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()
  const locale = useLocale()
  const [previewId, setPreviewId] = useState(product.colorways[0]?.id ?? '')

  const activeColorway =
    product.colorways.find((colorway) => colorway.id === previewId) ?? product.colorways[0]

  // A product with no colourway cannot be rendered or bought; the catalogue
  // guarantees at least one, so this is a guard, not a branch.
  if (activeColorway === undefined) return null

  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0)
  const onSale = product.compareAtPrice !== undefined

  return (
    <article>
      <Link
        to={productHref(locale, product.slug, activeColorway.id)}
        aria-label={t('product.view', { name: product.name })}
        className="block"
      >
        <div className="relative overflow-hidden rounded-chip" style={{ aspectRatio: '4 / 5' }}>
          <ProductFigure
            figure={product.figure}
            color={activeColorway.hex}
            className="h-full w-full"
          />
          {(onSale || (totalStock > 0 && totalStock <= LAST_CHANCE_UNITS)) && (
            <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1">
              {onSale && (
                <span className="rounded-chip bg-dye px-1.5 py-0.5 text-[12px] font-semibold text-cloth">
                  {t('product.sale')}
                </span>
              )}
              {totalStock > 0 && totalStock <= LAST_CHANCE_UNITS && (
                <span className="rounded-chip bg-cloth/85 px-1.5 py-0.5 text-[12px] font-medium text-ink">
                  {t('product.lastChance')}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium leading-snug text-ink">{product.name}</h3>
            <p className="mt-1 text-[13px] text-ink-soft">{t(product.fitKey)}</p>
          </div>
          <div className="shrink-0 text-right">
            {product.compareAtPrice !== undefined && (
              <span className="block text-[12px] tabular-nums text-ink-soft line-through">
                {formatMoney(product.compareAtPrice, locale)}
              </span>
            )}
            <span className={cn('text-[15px] tabular-nums', onSale ? 'text-dye' : 'text-ink')}>
              {formatMoney(product.price, locale)}
            </span>
          </div>
        </div>
      </Link>

      {/* Outside the link: a colourway opens the piece in that dye. */}
      <div className="mt-2 flex flex-wrap items-center gap-0.5">
        {product.colorways.map((colorway) => (
          <Link
            key={colorway.id}
            to={productHref(locale, product.slug, colorway.id)}
            title={t(colorway.nameKey)}
            aria-label={t(colorway.nameKey)}
            onMouseEnter={() => setPreviewId(colorway.id)}
            onFocus={() => setPreviewId(colorway.id)}
            className="rounded-chip p-1"
          >
            <SwatchDot color={colorway.hex} pressed={colorway.id === activeColorway.id} />
          </Link>
        ))}
      </div>
    </article>
  )
}
