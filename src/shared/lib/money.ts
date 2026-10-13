import type { Money } from '@/features/catalog/types'
import { LOCALE_TAGS, type LocaleCode } from './locale'

/**
 * Money is stored in cents; formatting is delegated to Intl so the currency
 * symbol, its position and the grouping separators follow the shopper's
 * locale rather than our assumptions.
 */
export function formatMoney(money: Money, locale: LocaleCode): string {
  const wholeDollars = money.amount % 100 === 0
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: wholeDollars ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(money.amount / 100)
}
