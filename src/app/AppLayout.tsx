import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'
import { CartSheet } from '@/features/cart/components/CartSheet'
import { useLocale } from '@/shared/lib/useLocale'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function AppLayout() {
  const { t } = useTranslation()
  const locale = useLocale()

  // The language itself is set in the route loader, before render. What is
  // left here is the document attribute, which only a screen reader reads.
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-ink focus:px-3 focus:py-2 focus:text-[13px] focus:text-cloth"
      >
        {t('nav.skipToContent')}
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
      <CartSheet />
    </div>
  )
}
