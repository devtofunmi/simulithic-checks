import { FAIL_STEP, LAST_STEP, PEOPLE, STEPS } from '../../../data/check'
import { useCheck } from '../../../state/useCheck'

export function Timeline() {
  const { state, dispatch, togglePlay } = useCheck()
  const progress = (state.step / LAST_STEP) * 100

  return (
    <div className="px-1">
      <div className="relative h-[22px]">
        <div className="absolute inset-x-0 top-[9px] h-1 rounded-sm bg-line" />
        <div
          className="absolute top-[9px] left-0 h-1 rounded-sm bg-ink transition-[width] duration-500 ease-(--ease-soft)"
          style={{ width: `${progress}%` }}
        />
        {STEPS.map((step, index) => {
          const reached = index <= state.step
          const failed = index === FAIL_STEP && !state.fixed && reached
          return (
            <button
              key={step.short}
              type="button"
              aria-label={`Go to step ${index + 1}: ${step.label}`}
              onClick={() => dispatch({ type: 'goTo', step: index })}
              className={`absolute top-[5px] -ml-1.5 size-3 rounded-full border-2 transition ${
                failed
                  ? 'border-bad bg-bad shadow-[0_0_0_4px_var(--color-bad-soft)]'
                  : reached
                    ? 'border-ink bg-ink'
                    : 'border-line bg-white'
              } ${index === state.step ? 'scale-125' : ''}`}
              style={{ left: `${(index / LAST_STEP) * 100}%` }}
            />
          )
        })}
      </div>
      <div className="mt-1.5 flex items-center gap-2.5 font-mono text-[11px] text-muted">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={state.playing ? 'Pause' : 'Play'}
          className="grid size-[30px] shrink-0 place-items-center rounded-full bg-ink text-[10px] text-white"
        >
          {state.playing ? '❚❚' : '▶'}
        </button>
        <span>0:{String(STEPS[state.step].time).padStart(2, '0')}</span>
        <span className="flex-1" />
        <span className="truncate">{PEOPLE[state.person].device}</span>
      </div>
    </div>
  )
}
