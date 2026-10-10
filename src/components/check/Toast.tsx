import { useCheck } from '../../state/useCheck'
import { CheckIcon } from '../ui/icons'

export function Toast() {
  const { state, dispatch } = useCheck()

  return (
    <div
      role="status"
      aria-hidden={!state.toast}
      className={`fixed bottom-[22px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-ink px-3.5 py-2.5 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,.45)] transition-all duration-400 ease-(--ease-soft) ${
        state.toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span className="grid size-[22px] place-items-center rounded-full bg-good">
        <CheckIcon className="size-3" strokeWidth={3} />
      </span>
      All 3 people paid on mobile · exit 0
      <button
        type="button"
        className="font-medium text-[#9dd0ff]"
        tabIndex={state.toast ? 0 : -1}
        onClick={() => dispatch({ type: 'setFixed', fixed: false })}
      >
        Show the failure again
      </button>
    </div>
  )
}
