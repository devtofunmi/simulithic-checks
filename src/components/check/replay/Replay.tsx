import { useRef } from 'react'
import { PEOPLE } from '../../../data/check'
import { useElementHeight } from '../../../hooks/useElementHeight'
import { useCheck } from '../../../state/useCheck'
import { Card } from '../../ui/Card'
import { Kbd } from '../../ui/Kbd'
import { Phone } from './Phone'
import { StepList } from './StepList'
import { Timeline } from './Timeline'

function PersonTabs() {
  const { state, dispatch } = useCheck()
  return (
    <div role="tablist" aria-label="Simulated people" className="flex flex-wrap gap-1">
      {PEOPLE.map((person, index) => {
        const active = index === state.person
        return (
          <button
            key={person.name}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => dispatch({ type: 'selectPerson', person: index })}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${
              active ? 'border-line bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.05)]' : 'border-transparent text-muted hover:bg-wash'
            }`}
          >
            <span
              className="grid size-5 place-items-center rounded-full text-[10px] font-semibold text-white"
              style={{ background: person.color }}
            >
              {index + 1}
            </span>
            {person.name}
            <span className="max-[780px]:hidden">
              <Kbd>{index + 1}</Kbd>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function PhoneLabel({ tone, name, host }: { tone: 'good' | 'bad' | 'brand'; name: string; host: string }) {
  const bar = { good: 'bg-good', bad: 'bg-bad', brand: 'bg-brand' }[tone]
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium">
      <i className={`inline-block h-[2.5px] w-3.5 rounded-sm ${bar}`} />
      {name}
      <span className="font-mono text-[11px] font-normal text-faint max-[780px]:hidden">{host}</span>
    </div>
  )
}

export function Replay() {
  const { state } = useCheck()
  const stageRef = useRef<HTMLDivElement>(null)
  const stageHeight = useElementHeight(stageRef)

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-3.5 py-3">
        <PersonTabs />
        <span className="font-mono text-[11px] text-faint">recordings kept 24h</span>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] max-[1180px]:grid-cols-[minmax(0,1fr)]">
        <div
          ref={stageRef}
          className="min-w-0 self-start rounded-bl-[14px] border-r border-line-2 bg-dots max-[1180px]:rounded-none max-[1180px]:border-r-0 max-[1180px]:border-b"
        >
          <div className="flex flex-col gap-3.5 px-[22px] pt-5 pb-4 max-[780px]:px-3">
            <div className="flex justify-center gap-[22px] max-[780px]:gap-2.5">
              <div className="flex flex-col items-center gap-2.5">
                <PhoneLabel tone="good" name="Production" host="app.acme.dev" />
                <Phone build="prod" />
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <PhoneLabel
                  tone={state.fixed ? 'brand' : 'bad'}
                  name={state.fixed ? 'Fix build' : 'This PR'}
                  host={state.fixed ? 'pr-248-fix.acme.dev' : 'pr-248.acme.dev'}
                />
                <Phone build="pr" />
              </div>
            </div>
            <Timeline />
          </div>
        </div>
        <StepList height={stageHeight} />
      </div>
    </Card>
  )
}
