import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Lives in its own module so `Button.tsx` exports only components and keeps
 * Fast Refresh working — and so a `<Link>` can wear the same clothes as a
 * `<button>` without duplicating the recipe.
 */
export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-chip label-face transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      variant: {
        solid: 'bg-ink text-cloth hover:bg-ink-deep',
        outline: 'border border-ink text-ink hover:bg-ink hover:text-cloth',
        quiet: 'text-ink underline decoration-rule underline-offset-4 hover:decoration-ink',
      },
      size: {
        sm: 'h-9 px-3 text-[13px]',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-[15px]',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: { variant: 'solid', size: 'md', block: false },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
