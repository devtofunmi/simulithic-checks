import { useEffect, useRef } from 'react'
import { FAIL_STEP, LAST_STEP, PEOPLE, STEPS } from '../../../data/check'
import { useCheck } from '../../../state/useCheck'

interface ForkProps {
  left: string
  right: string
  rightLabel: string
  rightTone: 'bad' | 'brand'
}

function Fork({ left, right, rightLabel, rightTone }: ForkProps) {
  const rightClass = rightTone === 'bad' ? 'bg-bad-soft text-bad-ink' : 'bg-brand-soft text-brand-strong'
  return (
    <div className="col-span-2 col-start-2 mt-1.5 grid grid-cols-2 gap-2 max-[780px]:grid-cols-1">
      <div className="rounded-lg bg-good-soft px-2.5 py-2 font-serif text-[16px] leading-snug text-good-ink italic">
        <b className="mb-0.5 block font-mono text-[9.5px] font-medium tracking-widest uppercase not-italic opacity-75">
          Production
        </b>
        {left}
      </div>
      <div className={`rounded-lg px-2.5 py-2 font-serif text-[16px] leading-snug italic ${rightClass}`}>
        <b className="mb-0.5 block font-mono text-[9.5px] font-medium tracking-widest uppercase not-italic opacity-75">
          {rightLabel}
        </b>
        {right}
      </div>
    </div>
  )
}

export function StepList({ height }: { height?: number }) {
  const { state, dispatch } = useCheck()
  const listRef = useRef<HTMLOListElement>(null)
  const person = PEOPLE[state.person]
  const blocked = !state.fixed

  useEffect(() => {
    const list = listRef.current
    const current = list?.querySelector<HTMLElement>('[aria-current="step"]')
    if (!list || !current || list.scrollHeight <= list.clientHeight) return
    list.scrollTo({ top: current.offsetTop - list.clientHeight / 2 + current.offsetHeight / 2, behavior: 'smooth' })
  }, [state.step, state.person])

  return (
    <ol
      ref={listRef}
      className="fade-y overflow-y-auto overscroll-contain px-2.5 py-3.5 max-[1180px]:h-auto! max-[1180px]:[mask-image:none]"
      style={{ height }}
    >
      {STEPS.map((step, index) => {
        const reached = index <= state.step
        const failed = reached && blocked && index === FAIL_STEP
        const isFork = reached && (index === FAIL_STEP || (index === LAST_STEP && blocked))

        return (
          <li
            key={step.short}
            aria-current={index === state.step ? 'step' : undefined}
            onClick={() => dispatch({ type: 'goTo', step: index })}
            className={`relative grid cursor-pointer grid-cols-[20px_1fr_auto] gap-x-2.5 gap-y-0.5 rounded-[10px] px-2.5 py-[9px] transition-colors not-last:before:absolute not-last:before:top-[30px] not-last:before:-bottom-2 not-last:before:left-[19px] not-last:before:w-px not-last:before:bg-line ${
              index === state.step ? 'bg-brand-soft' : 'hover:bg-wash'
            }`}
          >
            <span
              className={`z-[1] mt-px grid size-[18px] place-items-center rounded-full text-[9.5px] font-bold transition ${
                failed ? 'bg-bad text-white' : reached ? 'bg-good-soft text-good' : 'bg-line-2 text-faint'
              }`}
            >
              {failed ? '!' : reached ? '✓' : index + 1}
            </span>
            <span className={`font-medium ${reached ? '' : 'text-faint'}`}>{step.label}</span>
            <span className="font-mono text-[11px] text-faint">{failed ? 'split here' : step.duration}</span>

            {isFork && index === FAIL_STEP && (
              <Fork
                left="“Paying.”"
                right={blocked ? `“${person.reason}”` : '“Paying. The banner sits above the button now.”'}
                rightLabel={blocked ? 'This PR' : 'Fix build'}
                rightTone={blocked ? 'bad' : 'brand'}
              />
            )}
            {isFork && index === LAST_STEP && (
              <Fork left="“Order placed. Done.”" right="Never got here." rightLabel="This PR" rightTone="bad" />
            )}
            {!isFork && (
              <span
                className={`col-span-2 col-start-2 font-serif text-[16px] leading-snug italic ${
                  reached ? 'text-ink-2' : 'text-faint'
                }`}
              >
                “{step.thought}”
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
