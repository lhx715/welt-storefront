import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './index.css'
import './i18n'
import { router } from './app/router'
import { store } from './app/store'

const container = document.getElementById('root')
if (container === null) {
  throw new Error('Missing #root container in index.html')
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
