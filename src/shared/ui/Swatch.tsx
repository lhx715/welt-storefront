import { cn } from '@/shared/lib/cn'

interface SwatchDotProps {
  color: string
  /** Selected state. */
  pressed?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Presentational only. The border is not decoration: ecru and stone sit close
 * enough to undyed cloth that a swatch with no edge would disappear into the
 * ground.
 */
export function SwatchDot({ color, pressed = false, size = 'sm', className }: SwatchDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block rounded-chip border border-rule',
        size === 'sm' ? 'size-4' : 'size-5',
        pressed && 'outline outline-offset-2 outline-ink',
        className,
      )}
      style={{ backgroundColor: color }}
    />
  )
}

interface SwatchProps {
  color: string
  label: string
  pressed?: boolean
  size?: 'sm' | 'md'
  onSelect?: () => void
  onPreview?: () => void
  className?: string
}

/**
 * An interactive colourway choice, for the filter row and the product page.
 * On a product card the swatches are links instead, so they can carry the
 * chosen colourway into the URL.
 */
export function Swatch({
  color,
  label,
  pressed = false,
  size = 'sm',
  onSelect,
  onPreview,
  className,
}: SwatchProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onSelect}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      /* p-1 gives a 24px target, the WCAG 2.2 minimum for pointer input. */
      className={cn('rounded-chip p-1', className)}
    >
      <SwatchDot color={color} pressed={pressed} size={size} />
    </button>
  )
}
