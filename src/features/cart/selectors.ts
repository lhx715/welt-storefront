import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { CartLine } from './cartSlice'

const selectLines = (state: RootState): CartLine[] => state.cart.lines

export const selectCartLines = selectLines

/** Total units, not total lines — "3 items" means three garments. */
export const selectCartCount = createSelector([selectLines], (lines) =>
  lines.reduce((total, line) => total + line.quantity, 0),
)
