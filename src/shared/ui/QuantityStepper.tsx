import { Minus, Plus } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface QuantityStepperProps {
  quantity: number
  max: number
  /** Names the thing being counted, e.g. "Boxy Overshirt, Olive, M". */
  label: string
  quantityLabel: string
  increaseLabel: string
  decreaseLabel: string
  onIncrease: () => void
  onDecrease: () => void
  className?: string
}

/**
 * Used both on a catalogue card (where the count is the number of that SKU in
 * the bag) and inside the bag itself. 32px targets, comfortably over the WCAG
 * 2.2 minimum for pointer input.
 */
export function QuantityStepper({
  quantity,
  max,
  label,
  quantityLabel,
  increaseLabel,
  decreaseLabel,
  onIncrease,
  onDecrease,
  className,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex items-center rounded-chip border border-rule', className)}
    >
      <button
        type="button"
        aria-label={decreaseLabel}
        disabled={quantity <= 0}
        onClick={onDecrease}
        className="inline-flex size-8 items-center justify-center rounded-chip text-ink transition-colors hover:text-ink-deep disabled:opacity-30"
      >
        <Minus aria-hidden="true" className="size-3.5" />
      </button>

      <span className="w-7 text-center text-[13px] tabular-nums text-ink">
        <span className="sr-only">{quantityLabel}</span>
        {quantity}
      </span>

      <button
        type="button"
        aria-label={increaseLabel}
        disabled={quantity >= max}
        onClick={onIncrease}
        className="inline-flex size-8 items-center justify-center rounded-chip text-ink transition-colors hover:text-ink-deep disabled:opacity-30"
      >
        <Plus aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  )
}
