import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-[14px] border border-line bg-white ${className}`} {...props} />
}
