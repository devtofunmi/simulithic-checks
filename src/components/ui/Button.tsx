import type { ButtonHTMLAttributes } from 'react'

type Variant = 'default' | 'primary'
type Size = 'md' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  default: 'border-line bg-white text-ink hover:bg-wash',
  primary:
    'border-[#1b8ff0] bg-linear-to-b from-[#45adff] to-[#1d8ef5] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)] hover:from-[#38a6ff] hover:to-[#1283ea]',
}

const sizes: Record<Size, string> = {
  md: 'h-8 px-3',
  sm: 'h-7 px-2.5 text-xs',
}

export function Button({ variant = 'default', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border font-medium transition active:translate-y-px disabled:cursor-progress disabled:opacity-80 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
