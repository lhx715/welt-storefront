import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  closeLabel: string
  children: ReactNode
  className?: string
}

/**
 * Radix supplies the behaviour we should not hand-roll: focus trapping, focus
 * restore, Escape to close, inert background, scroll lock. The styling is ours,
 * which is the point of owning the component instead of importing a themed one.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  closeLabel,
  children,
  className,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink-deep/35 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed z-50 flex flex-col bg-cloth',
            // Below sm: rises from the bottom edge.
            'inset-x-0 bottom-0 max-h-[86dvh] rounded-t-chip border-t border-rule',
            'data-[state=open]:animate-sheet-in-bottom data-[state=closed]:animate-sheet-out-bottom',
            // From sm up: slides in from the right, full height.
            'sm:inset-y-0 sm:left-auto sm:w-[min(28rem,100vw)] sm:max-h-none sm:rounded-none sm:border-t-0 sm:border-l',
            'sm:data-[state=open]:animate-sheet-in-right sm:data-[state=closed]:animate-sheet-out-right',
            className,
          )}
        >
          <header className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
            <Dialog.Title className="display-face text-lg">{title}</Dialog.Title>
            <Dialog.Close
              aria-label={closeLabel}
              className="-mr-2 inline-flex size-9 items-center justify-center rounded-chip text-ink-soft transition-colors hover:text-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
