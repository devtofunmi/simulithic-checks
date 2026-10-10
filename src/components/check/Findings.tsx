import type { ReactNode } from 'react'
import { CHECK, FIX_PROMPT, REGRESSION } from '../../data/check'
import { useClipboard } from '../../hooks/useClipboard'
import { useCheck } from '../../state/useCheck'
import type { CellKey } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type Severity = 'high' | 'medium' | 'improved' | 'verified'

const severityStyles: Record<Severity, string> = {
  high: 'bg-bad text-white',
  medium: 'border border-warn-line bg-warn-soft text-warn',
  improved: 'border border-good-line bg-good-soft text-good',
  verified: 'border border-brand-line bg-brand-soft text-brand-strong',
}

interface FindingProps {
  severity: Severity
  title: string
  meta: ReactNode[]
  cell: CellKey
  action?: ReactNode
  children?: ReactNode
}

function Finding({ severity, title, meta, cell, action, children }: FindingProps) {
  const { dispatch } = useCheck()
  return (
    <article
      onMouseEnter={() => dispatch({ type: 'highlight', key: cell })}
      onMouseLeave={() => dispatch({ type: 'highlight', key: null })}
      className="grid grid-cols-[auto_1fr_auto] items-start gap-3.5 border-b border-line-2 p-4 transition-colors last:border-0 hover:bg-[#fcfcfc] max-[780px]:grid-cols-1"
    >
      <span
        className={`mt-0.5 justify-self-start rounded-[5px] px-[7px] py-0.5 font-mono text-[10.5px] tracking-wider uppercase transition-colors ${severityStyles[severity]}`}
      >
        {severity}
      </span>
      <div className="min-w-0">
        <h3 className="mb-0.5 text-sm font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-muted">
          {meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        {children}
      </div>
      <div>{action}</div>
    </article>
  )
}

function Evidence() {
  const rows = [
    ['Tap target', 'div#cookie-banner, not button[data-test="pay"]'],
    ['Why', 'banner is h-[94px] overflow-hidden; copy wraps to 4 lines under 400px wide, pushing Accept / Settings out of view'],
    ['Introduced', `${CHECK.commit} “${CHECK.commitMessage}”`],
  ]
  return (
    <dl className="mt-2.5 grid grid-cols-[96px_1fr] gap-x-3 gap-y-1 text-xs max-[780px]:grid-cols-1">
      {rows.map(([term, detail]) => (
        <div key={term} className="contents">
          <dt className="text-faint">{term}</dt>
          <dd className="font-mono text-[11.5px] text-ink-2">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function FixPrompt() {
  const { copied, copy } = useClipboard()
  return (
    <div className="mt-3 overflow-hidden rounded-[10px] border border-line">
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line bg-wash px-2.5 py-[7px]">
        <span className="eyebrow">Fix prompt · for an engineer or coding agent</span>
        <div className="flex gap-1.5">
          <Button size="sm" onClick={() => copy(FIX_PROMPT)}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button size="sm">Send to Claude Code</Button>
        </div>
      </div>
      <pre className="px-3 py-2.5 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap text-ink-2">{FIX_PROMPT}</pre>
    </div>
  )
}

function VerifyFix() {
  const { state, toggleVerify } = useCheck()
  const running = state.verifyProgress !== null

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 rounded-[10px] border border-dashed border-brand-line bg-linear-to-r from-brand-soft to-white p-3">
      <p className="min-w-[200px] flex-1 text-ink-2">
        {state.fixed ? (
          <>
            <b className="font-semibold">Verified.</b> 3 of 3 people paid on the fix build. The check will pass on the next push.
          </>
        ) : (
          <>
            <b className="font-semibold">Pushed a fix?</b> Send the same three people through checkout on the new build before
            you merge.
          </>
        )}
      </p>
      <Button variant="primary" size="sm" onClick={toggleVerify} disabled={running}>
        {running ? (
          <>
            Running people
            <span className="ml-1 inline-flex gap-1">
              {[0, 1, 2].map((index) => (
                <i
                  key={index}
                  className={`size-1.5 rounded-full transition-colors ${
                    index < (state.verifyProgress ?? 0) ? 'bg-white' : 'bg-white/45'
                  }`}
                />
              ))}
            </span>
            {state.verifyProgress}/3
          </>
        ) : state.fixed ? (
          'Show the failure again'
        ) : (
          'Verify fix · re-run 3 people'
        )}
      </Button>
    </div>
  )
}

export function Findings() {
  const { state, dispatch } = useCheck()
  const markExpected = <Button size="sm">Mark as expected</Button>

  return (
    <Card>
      <Finding
        severity={state.fixed ? 'verified' : 'high'}
        title="No one can pay on mobile. The cookie banner covers Pay, and its own buttons are cut off."
        cell={REGRESSION.key}
        action={markExpected}
        meta={[
          'Blocked step',
          '3 of 3 mobile people',
          'New in this PR',
          <button
            key="jump"
            type="button"
            className="text-brand-strong hover:underline"
            onClick={() => {
              dispatch({ type: 'goTo', step: 5 })
              document.getElementById('replay')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Jump to 0:44 in the recording →
          </button>,
        ]}
      >
        <Evidence />
        <FixPrompt />
        <VerifyFix />
      </Finding>
      <Finding
        severity="medium"
        title="Reset-password email step is slower than production on mobile"
        cell="5:mobile"
        action={markExpected}
        meta={['Slow step', '1 of 3 mobile people', '6.8s vs 4.4s', 'Doesn’t fail the check (--fail-on high)']}
      />
      <Finding
        severity="improved"
        title="Search products now works for everyone on mobile"
        cell="2:mobile"
        meta={['3 of 3 reached, production was 2 of 3', 'The filter sheet no longer opens off-screen on budget Android']}
      />
    </Card>
  )
}
