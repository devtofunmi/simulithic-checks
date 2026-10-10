import type { ReactNode } from 'react'

export function Kbd({ children, inverted = false }: { children: ReactNode; inverted?: boolean }) {
  const tone = inverted ? 'border-white/30 bg-white/15 text-white' : 'border-line bg-white text-faint'
  return <kbd className={`rounded border border-b-2 px-1 font-mono text-[10.5px] ${tone}`}>{children}</kbd>
}
