import type { CSSProperties, ReactNode } from 'react'

interface SectionProps {
  title?: string
  hint?: ReactNode
  delay?: number
  className?: string
  children: ReactNode
}

export function Section({ title, hint, delay = 0, className = '', children }: SectionProps) {
  const style: CSSProperties = { animationDelay: `${delay}s` }
  return (
    <section className={`mt-[30px] animate-rise ${className}`} style={style}>
      {title && (
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="eyebrow">{title}</h2>
          {hint && <span className="text-xs text-faint">{hint}</span>}
        </div>
      )}
      {children}
    </section>
  )
}
