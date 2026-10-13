import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { catalogApi } from '@/features/catalog/catalogApi'
import { cartReducer } from '@/features/cart/cartSlice'
import { loadCart, saveCart } from '@/features/cart/persistence'
import { uiReducer } from '@/features/ui/uiSlice'

const persistedCart = loadCart()

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catalogApi.middleware),
  preloadedState: persistedCart === undefined ? undefined : { cart: persistedCart },
})

setupListeners(store.dispatch)

// Write the bag back only when it actually changed. Comparing the reference
// rather than deep-equalling keeps this off the hot path.
let lastCart = store.getState().cart
store.subscribe(() => {
  const next = store.getState().cart
  if (next !== lastCart) {
    lastCart = next
    saveCart(next)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
