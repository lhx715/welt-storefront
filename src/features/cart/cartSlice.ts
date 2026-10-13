import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/** Nobody needs eleven of the same shirt in a demo, and it keeps totals sane. */
export const MAX_PER_LINE = 10

export interface CartLine {
  /** SKU id — `${productSlug}--${colorwayId}--${sizeId}`. */
  variantId: string
  productSlug: string
  colorwayId: string
  sizeId: string
  quantity: number
  /**
   * Price in cents at the moment of adding. Live price is read from the
   * catalogue; this snapshot exists only so the bag can flag a price move
   * instead of quietly showing a stale total.
   */
  addedPrice: number
}

export interface CartState {
  lines: CartLine[]
}

const initialState: CartState = { lines: [] }

export interface AddLinePayload {
  variantId: string
  productSlug: string
  colorwayId: string
  sizeId: string
  unitPrice: number
  quantity?: number
}

function clampQuantity(quantity: number): number {
  return Math.min(Math.max(Math.trunc(quantity), 1), MAX_PER_LINE)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds, or tops up a line that already exists. Written this way on purpose:
     * the caller does not have to know whether the SKU is already in the bag, so
     * a burst of clicks can never lose an increment to a stale render closure.
     */
    addLine(state, action: PayloadAction<AddLinePayload>) {
      const { variantId, productSlug, colorwayId, sizeId, unitPrice } = action.payload
      const requested = clampQuantity(action.payload.quantity ?? 1)

      const existing = state.lines.find((line) => line.variantId === variantId)
      if (existing !== undefined) {
        existing.quantity = clampQuantity(existing.quantity + requested)
        return
      }

      state.lines.push({
        variantId,
        productSlug,
        colorwayId,
        sizeId,
        quantity: requested,
        addedPrice: unitPrice,
      })
    },

    /**
     * Increment and decrement read the current quantity from the store rather
     * than from an argument. Three fast clicks on "−" must remove three units,
     * and an argument computed during render would arrive stale.
     */
    incrementLine(state, action: PayloadAction<string>) {
      const line = state.lines.find((item) => item.variantId === action.payload)
      if (line === undefined) return
      line.quantity = clampQuantity(line.quantity + 1)
    },

    /** Drops the line entirely when the last unit goes, rather than sitting at 0. */
    decrementLine(state, action: PayloadAction<string>) {
      const index = state.lines.findIndex((item) => item.variantId === action.payload)
      if (index === -1) return

      const line = state.lines[index]
      if (line === undefined) return

      if (line.quantity <= 1) {
        state.lines.splice(index, 1)
        return
      }
      line.quantity -= 1
    },

    removeLine(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((line) => line.variantId !== action.payload)
    },

    clearCart(state) {
      state.lines = []
    },
  },
})

export const { addLine, incrementLine, decrementLine, removeLine, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
