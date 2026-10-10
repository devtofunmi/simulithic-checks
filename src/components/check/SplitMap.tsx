import type { CSSProperties } from 'react'
import { FAIL_STEP, PEOPLE, REGRESSION, STEPS } from '../../data/check'
import { useCheck } from '../../state/useCheck'
import type { Person } from '../../types'
import { Card } from '../ui/Card'

const stepX = (index: number) => 290 + index * 100
const rowY = (row: number) => 92 + row * 64
const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` })

const line = 'fill-none stroke-[2.5] [stroke-linecap:round] [stroke-dasharray:1] animate-draw'
const popIn = 'animate-pop [transform-box:fill-box] origin-center'

function Stat({ value, label, tone }: { value: number; label: string; tone: 'good' | 'bad' | 'brand' }) {
  const color = { good: 'text-good', bad: 'text-bad', brand: 'text-brand-strong' }[tone]
  const bar = { good: 'bg-good', bad: 'bg-bad', brand: 'bg-brand' }[tone]
  return (
    <div>
      <div className={`font-serif text-[50px] leading-none tracking-tight tabular-nums transition-colors ${color}`}>
        {value}
        <small className="text-2xl text-faint">/3</small>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[11.5px] text-muted">
        <i className={`inline-block h-[2.5px] w-3.5 rounded-sm ${bar}`} />
        {label}
      </div>
    </div>
  )
}

function Lane({ person, row }: { person: Person; row: number }) {
  const { state, dispatch } = useCheck()
  const y = rowY(row)
  const start = row * 0.18
  const active = state.person === row
  const dimmed = state.highlight !== null && state.highlight !== REGRESSION.key

  return (
    <g
      className={`group cursor-pointer transition-opacity duration-300 ${dimmed ? 'opacity-30' : ''}`}
      onClick={() => dispatch({ type: 'selectPerson', person: row })}
    >
      <rect
        x="6"
        y={y - 30}
        width="1028"
        height="60"
        rx="10"
        className={`transition-colors ${active ? 'fill-brand/8' : 'fill-transparent group-hover:fill-ink/3'}`}
      />
      <circle cx="26" cy={y} r="10" fill={person.color} />
      <text x="26" y={y + 3.5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
        {row + 1}
      </text>
      <text x="46" y={y - 3} className="fill-ink text-[13px] font-medium">
        {person.name}
      </text>
      <text x="46" y={y + 13} className="fill-faint text-[11px]">
        {person.device}
      </text>

      <path pathLength={1} style={delay(start)} className={`${line} stroke-ink`} d={`M${stepX(0) - 34},${y} L${stepX(4)},${y}`} />
      <path pathLength={1} style={delay(start + 0.75)} className={`${line} stroke-good`} d={`M${stepX(4)},${y} L${stepX(6)},${y}`} />

      {state.fixed ? (
        <>
          <path
            pathLength={1}
            style={delay(start)}
            className={`${line} stroke-brand`}
            d={`M${stepX(4)},${y} C${stepX(4) + 40},${y} ${stepX(4) + 60},${y + 16} ${stepX(5)},${y + 16} L${stepX(6)},${y + 16}`}
          />
          <circle style={delay(start + 0.9)} className={`${popIn} fill-white stroke-brand stroke-2`} cx={stepX(6)} cy={y + 16} r="6" />
          <text style={delay(start + 1)} className={`${popIn} fill-brand-strong font-mono text-[11px]`} x={stepX(6) + 16} y={y + 21}>
            fix · {person.fixTime}
          </text>
        </>
      ) : (
        <>
          <path
            pathLength={1}
            style={delay(start + 0.8)}
            className={`${line} stroke-bad`}
            d={`M${stepX(4)},${y} C${stepX(4) + 55},${y} ${stepX(5) - 50},${y + 22} ${stepX(5)},${y + 22}`}
          />
          <g style={delay(start + 1.4)} className={popIn}>
            <circle cx={stepX(5)} cy={y + 22} r="9" className="fill-bad" />
            <path
              d={`M${stepX(5) - 3.5},${y + 18.5} l7,7 M${stepX(5) + 3.5},${y + 18.5} l-7,7`}
              className="stroke-white stroke-2 [stroke-linecap:round]"
            />
          </g>
          <text style={delay(start + 1.5)} className={`${popIn} fill-bad font-mono text-[11px]`} x={stepX(5) + 15} y={y + 26}>
            stuck · #cookie-banner
          </text>
        </>
      )}

      {[0, 1, 2, 3, 4].map((index) => (
        <circle
          key={index}
          style={delay(start + index * 0.12)}
          className={`${popIn} fill-white stroke-ink stroke-2`}
          cx={stepX(index)}
          cy={y}
          r="4"
        />
      ))}
      <circle style={delay(start + 1)} className={`${popIn} fill-white stroke-good stroke-2`} cx={stepX(5)} cy={y} r="4" />
      <g style={delay(start + 1.25)} className={popIn}>
        <circle cx={stepX(6)} cy={y} r="8" className="fill-good" />
        <path
          d={`M${stepX(6) - 3.5},${y} l2.5,2.5 l4.5,-5`}
          className="fill-none stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        />
      </g>
      <text style={delay(start + 1.3)} className={`${popIn} fill-good font-mono text-[11px]`} x={stepX(6) + 16} y={y + 4}>
        prod · {person.prodTime}
      </text>
    </g>
  )
}

export function SplitMap() {
  const { state } = useCheck()

  return (
    <Card id="split-map" className="overflow-hidden bg-dots">
      <div className="flex flex-wrap items-end justify-between gap-5 px-5 pt-[18px] pb-1.5">
        <div>
          <h2 className="eyebrow">Where they split · Checkout with saved card · mobile</h2>
          <p className="mt-1 max-w-[430px] text-muted">
            {state.fixed
              ? 'The same three people on the fix build. All three get past Pay, and their times match production.'
              : 'Same three people, same order, on both builds. Every one of them got through on production, and every one got stuck on the PR at the same step.'}
          </p>
        </div>
        <div className="flex gap-[30px] max-[780px]:gap-5">
          <Stat value={3} label="paid on production" tone="good" />
          <Stat
            value={state.fixed ? 3 : 0}
            label={state.fixed ? 'paid on the fix build' : 'paid on this PR'}
            tone={state.fixed ? 'brand' : 'bad'}
          />
        </div>
      </div>

      <div className="overflow-x-auto px-2 pt-1 pb-3">
        <svg
          key={String(state.fixed)}
          viewBox="0 0 1040 268"
          className="block h-auto w-full min-w-[780px]"
          role="img"
          aria-label="Each person's path through checkout on production and on this PR"
        >
          {STEPS.map((step, index) => (
            <g key={step.short}>
              <line
                x1={stepX(index)}
                x2={stepX(index)}
                y1="46"
                y2={rowY(2) + 40}
                className={
                  index === FAIL_STEP
                    ? `stroke-[28] opacity-35 ${state.fixed ? 'stroke-brand-line' : 'stroke-bad-line'}`
                    : 'stroke-line [stroke-dasharray:2_4]'
                }
              />
              <text
                x={stepX(index)}
                y="34"
                textAnchor="middle"
                className={`font-mono text-[11px] tracking-wide ${
                  index === FAIL_STEP ? (state.fixed ? 'fill-brand-strong' : 'fill-bad') : 'fill-faint'
                }`}
              >
                {step.short.toUpperCase()}
              </text>
            </g>
          ))}
          {PEOPLE.map((person, row) => (
            <Lane key={person.name} person={person} row={row} />
          ))}
        </svg>
      </div>
    </Card>
  )
}
