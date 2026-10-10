import { DEVICES, FLOWS, REGRESSION } from '../../data/check'
import { useCheck } from '../../state/useCheck'
import type { Cell, CellKey, Device, Verdict } from '../../types'
import { Card } from '../ui/Card'

const verdictStyles: Record<Verdict, string> = {
  same: 'border-line-2 bg-wash text-faint',
  regression: 'border-transparent bg-bad text-white',
  improved: 'border-good-line bg-good-soft text-good',
  finding: 'border-warn-line bg-warn-soft text-warn',
  fixed: 'animate-flip border-brand-line bg-brand-soft text-brand-strong',
}

const legend = [
  { label: 'Regression', swatch: 'bg-bad' },
  { label: 'Finding', swatch: 'bg-warn-soft ring-1 ring-inset ring-warn-line' },
  { label: 'Improved', swatch: 'bg-good-soft ring-1 ring-inset ring-good-line' },
  { label: 'No change', swatch: 'bg-wash ring-1 ring-inset ring-line' },
]

function PeopleDots({ cell }: { cell: Cell }) {
  const reached = Number(cell.pr[0])
  return (
    <span className="inline-flex gap-[3px]" aria-hidden>
      {[0, 1, 2].map((index) => {
        const amber = cell.verdict === 'finding' && index === 2
        return (
          <i
            key={index}
            className={`size-1.5 rounded-full ${
              amber ? 'bg-warn' : index < reached ? 'bg-current' : 'shadow-[inset_0_0_0_1.5px_currentColor]'
            }`}
          />
        )
      })}
    </span>
  )
}

function cellFor(flowIndex: number, device: Device, fixed: boolean): Cell {
  const cell = FLOWS[flowIndex].cells[device]
  const isRegression = flowIndex === REGRESSION.flow && device === REGRESSION.device
  return fixed && isRegression ? { ...cell, pr: '3/3', verdict: 'fixed' } : cell
}

function caption(cell: Cell) {
  switch (cell.verdict) {
    case 'same':
      return null
    case 'finding':
      return '1 finding'
    case 'fixed':
      return 'fixed'
    default:
      return `prod ${cell.prod}`
  }
}

export function VerdictMatrix() {
  const { state } = useCheck()

  return (
    <Card>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-line text-xs text-muted">
            <th className="px-3.5 py-2.5 text-left font-medium">Flow</th>
            {DEVICES.map((device) => (
              <th key={device} className="w-40 px-3.5 py-2.5 text-center font-medium capitalize max-[780px]:w-28">
                {device}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FLOWS.map((flow, flowIndex) => (
            <tr key={flow.name} className="border-b border-line-2 last:border-0">
              <td className="truncate px-3.5 py-1.5 text-ink-2">{flow.name}</td>
              {DEVICES.map((device) => {
                const cell = cellFor(flowIndex, device, state.fixed)
                const key: CellKey = `${flowIndex}:${device}`
                const lit = state.highlight === key
                const selected = !lit && key === REGRESSION.key
                const note = caption(cell)
                return (
                  <td key={device} className="px-3.5 py-1.5">
                    <div
                      className={`flex h-8 items-center justify-center gap-2 rounded-lg border font-mono text-xs whitespace-nowrap transition-[box-shadow,background-color,color] ${
                        verdictStyles[cell.verdict]
                      } ${lit ? 'shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-bad)]' : ''} ${
                        selected ? 'shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-ink)]' : ''
                      }`}
                      aria-label={`${flow.name} on ${device}: ${cell.pr} reached on the PR, ${cell.prod} on production`}
                    >
                      <PeopleDots cell={cell} />
                      {cell.pr}
                      {note && <small className="text-[10.5px] opacity-75 max-[780px]:hidden">{note}</small>}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-3.5 border-t border-line px-3.5 py-2.5 text-xs text-muted">
        {legend.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <i className={`size-[9px] rounded-[3px] ${item.swatch}`} />
            {item.label}
          </span>
        ))}
      </div>
    </Card>
  )
}
