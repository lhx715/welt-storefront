import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { Swatch } from '@/shared/ui/Swatch'
import { COLOR_FAMILIES, COLOR_FAMILY_SWATCH } from '../fixtures'
import { parseColorFamilies } from '../lib'
import type { ColorFamily } from '../types'

/**
 * Multi-select, because shoppers rarely want one colour: they want "not black".
 * Each family is a real toggle rather than a navigation, so the selection is
 * reflected in the URL and survives a refresh or a shared link.
 */
export function ColorFilter({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const active = parseColorFamilies(params.get('colour'))

  function toggle(family: ColorFamily) {
    const next = new URLSearchParams(params)
    const selected = new Set(active)

    if (selected.has(family)) {
      selected.delete(family)
    } else {
      selected.add(family)
    }

    if (selected.size === 0) {
      next.delete('colour')
    } else {
      // Serialise in the house order, not click order, so the same selection
      // always produces the same URL.
      const ordered = COLOR_FAMILIES.filter((item) => selected.has(item))
      next.set('colour', ordered.join(','))
    }

    void setParams(next, { replace: true })
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="shrink-0 text-[13px] text-ink-soft">{t('filter.colour')}</span>
      <div className="flex items-center gap-0.5">
        {COLOR_FAMILIES.map((family) => (
          <Swatch
            key={family}
            color={COLOR_FAMILY_SWATCH[family]}
            label={t(`vocab.colour.${family}`)}
            pressed={active.includes(family)}
            onSelect={() => toggle(family)}
          />
        ))}
      </div>
      {active.length > 0 && (
        <button
          type="button"
          onClick={() => {
            const next = new URLSearchParams(params)
            next.delete('colour')
            void setParams(next, { replace: true })
          }}
          className="shrink-0 rounded-chip text-[13px] text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
        >
          {t('filter.clear')}
        </button>
      )}
    </div>
  )
}
