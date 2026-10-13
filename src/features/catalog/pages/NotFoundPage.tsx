import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useLocale } from '@/shared/lib/useLocale'
import { buttonStyles } from '@/shared/ui/buttonStyles'

export function NotFoundPage() {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <h1 className="display-face text-title text-ink">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-[46ch] text-[15px] text-ink-soft">{t('notFound.body')}</p>
      <Link to={`/${locale}`} className={buttonStyles({ className: 'mt-6' })}>
        {t('notFound.action')}
      </Link>
    </div>
  )
}
