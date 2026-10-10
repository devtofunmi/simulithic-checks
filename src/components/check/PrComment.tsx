import { useCheck } from '../../state/useCheck'
import { Card } from '../ui/Card'
import { Logo } from '../ui/Logo'

function Row({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex justify-between gap-2.5 font-mono text-[11.5px] text-ink-2">
      <span>{label}</span>
      <span className={`whitespace-nowrap ${tone ?? ''}`}>{value}</span>
    </div>
  )
}

export function PrComment() {
  const { state } = useCheck()

  return (
    <Card className="flex h-full flex-col gap-2.5 p-3.5">
      <div className="flex items-center gap-2 text-xs text-muted">
        <Logo />
        <b className="font-semibold text-ink">simulithic</b> commented · edited {state.fixed ? 'just now' : '1m ago'}
      </div>
      <div className="flex flex-col gap-[7px] rounded-[9px] border border-line bg-wash p-3 text-[12.5px]">
        <h3 className="flex items-center gap-[7px] text-[13px] font-semibold">
          <span className={`size-[7px] rounded-full ${state.fixed ? 'bg-good' : 'bg-bad'}`} />
          {state.fixed ? 'No regressions' : 'Regression on mobile'}
        </h3>
        <Row
          label="Checkout with saved card · mobile"
          value={state.fixed ? '3/3 (prod 3/3)' : '0/3 (prod 3/3)'}
          tone={state.fixed ? 'text-brand-strong' : 'text-bad'}
        />
        <Row label="Reset password · mobile" value="1 finding" tone="text-warn" />
        <Row label="Search products · mobile" value="3/3 (prod 2/3)" tone="text-good" />
        <Row label="9 other cells" value="no change" />
        <p className="text-brand-strong">Recordings · Fix prompt · Open in Studio</p>
      </div>
      <p className="mt-auto text-[11.5px] text-faint">One comment per PR. It updates on each push instead of piling up.</p>
    </Card>
  )
}
