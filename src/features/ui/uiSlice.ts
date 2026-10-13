import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/**
 * Transient interface state. It lives in the store because the trigger and the
 * panel it opens are siblings — the header button and the sheet — and threading
 * a callback between them would be worse than one boolean here.
 */
export interface UiState {
  cartOpen: boolean
  navOpen: boolean
}

const initialState: UiState = {
  cartOpen: false,
  navOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.cartOpen = action.payload
    },
    setNavOpen(state, action: PayloadAction<boolean>) {
      state.navOpen = action.payload
    },
  },
})

export const { setCartOpen, setNavOpen } = uiSlice.actions
export const uiReducer = uiSlice.reducer
