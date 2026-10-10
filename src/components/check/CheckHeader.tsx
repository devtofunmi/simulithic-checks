import type { RefObject } from 'react'
import { CHECK, FIX_PROMPT } from '../../data/check'
import { useClipboard } from '../../hooks/useClipboard'
import { useCheck } from '../../state/useCheck'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { Kbd } from '../ui/Kbd'
import { ArrowUpRightIcon } from '../ui/icons'

export function CheckHeader({ titleRef }: { titleRef: RefObject<HTMLHeadingElement | null> }) {
  const { state } = useCheck()
  const { copied, copy } = useClipboard()

  return (
    <header className="animate-rise">
      <nav aria-label="Breadcrumb" className="mb-3.5 flex flex-wrap items-center gap-2 text-muted">
        <span>Checks</span>
        <span className="text-line">/</span>
        <span className="font-mono">{CHECK.repo}</span>
        <span className="text-line">/</span>
        <span>
          #{CHECK.pr} {CHECK.prTitle}
        </span>
      </nav>

      <div className="flex items-start justify-between gap-6 max-[780px]:flex-col">
        <div>
          <p className="eyebrow">Pull-request check · {state.fixed ? 'fix build' : 'PR build'} vs production</p>
          <h1
            ref={titleRef}
            className="mt-2 mb-3 max-w-[780px] font-serif text-[42px] leading-[1.05] tracking-[-0.01em] max-[780px]:text-[31px]"
          >
            <span key={String(state.fixed)} className="block animate-fade">
              {state.fixed ? 'Fixed on this branch. ' : 'Checkout regressed on mobile. '}
              <span className="text-muted">
                {state.fixed
                  ? 'All three people paid on mobile again, at the same speed as production.'
                  : 'Nobody could pay: a new cookie banner sits on the Pay button and can’t be closed.'}
              </span>
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-muted">
            <Chip tone={state.fixed ? 'good' : 'bad'}>{state.fixed ? 'exit 0 · passing' : 'exit 2 · regression'}</Chip>
            <span>
              <b className="font-medium text-ink">6</b> flows × <b className="font-medium text-ink">2</b> devices ×{' '}
              <b className="font-medium text-ink">3</b> people × 2 builds ={' '}
              <b className="font-medium text-ink">{CHECK.sessions}</b> sessions
            </span>
            <b className="font-medium text-ink">{CHECK.cost}</b>
            <b className="font-medium text-ink">{CHECK.duration}</b>
            <Chip>--fail-on {CHECK.failOn}</Chip>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 pt-6 max-[780px]:pt-0">
          <Button>Re-run check</Button>
          <Button>
            View on GitHub <ArrowUpRightIcon className="size-3.5" />
          </Button>
          <Button variant="primary" onClick={() => copy(FIX_PROMPT)}>
            {copied ? 'Copied' : 'Copy fix prompt'} <Kbd inverted>F</Kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}
