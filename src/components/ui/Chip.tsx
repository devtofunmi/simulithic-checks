import type { ReactNode } from 'react'

type Tone = 'neutral' | 'bad' | 'good'

const tones: Record<Tone, string> = {
  neutral: 'border-line bg-white text-ink-2',
  bad: 'border-bad-line bg-bad-soft text-bad',
  good: 'border-good-line bg-good-soft text-good',
}

export function Chip({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`rounded-[5px] border px-1.5 py-px font-mono text-[11px] whitespace-nowrap transition-colors ${tones[tone]}`}>
      {children}
    </span>
  )
}
