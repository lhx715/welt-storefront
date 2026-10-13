import { ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cn } from '@/shared/lib/cn'
import { setCartOpen } from '@/features/ui/uiSlice'
import { selectCartCount } from '../selectors'

/**
 * The count is the only place madder red appears in the header. Colour here is
 * a signal, not a decoration: an empty bag is quiet grey, a full one is not.
 */
export function BagButton() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCartCount)

  return (
    <button
      type="button"
      onClick={() => dispatch(setCartOpen(true))}
      className="-mr-1 inline-flex items-center gap-1.5 rounded-chip px-1 py-2 transition-colors"
    >
      <ShoppingBag aria-hidden="true" className="size-5 text-ink" />
      <span
        aria-hidden="true"
        className={cn('text-[13px] tabular-nums', count > 0 ? 'font-semibold text-dye' : 'text-ink-soft')}
      >
        {count}
      </span>
      <span className="sr-only">{t('cart.lineCount', { count })}</span>
    </button>
  )
}
