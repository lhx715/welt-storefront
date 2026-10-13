import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router'
import { Button } from '@/shared/ui/Button'

export function ErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()

  useEffect(() => {
    // The screen says something went wrong; the console says what.
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28">
      <h1 className="display-face text-title text-ink">{t('error.title')}</h1>
      <p className="mt-3 max-w-[46ch] text-[15px] text-ink-soft">{t('error.body')}</p>
      <Button className="mt-6" onClick={() => window.location.reload()}>
        {t('error.action')}
      </Button>
    </div>
  )
}
