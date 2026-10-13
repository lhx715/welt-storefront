import { useTranslation } from 'react-i18next'

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="rule-t">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-6">
        <p className="max-w-[46ch] text-[15px] text-ink">{t('app.tagline')}</p>
        <p className="max-w-[44ch] text-[13px] text-ink-soft">{t('footer.demo')}</p>
      </div>
    </footer>
  )
}
