import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import { buttonStyles, type ButtonVariantProps } from './buttonStyles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps

export function Button({ className, variant, size, block, ...props }: ButtonProps) {
  return <button className={cn(buttonStyles({ variant, size, block }), className)} {...props} />
}
