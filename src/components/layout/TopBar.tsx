import { FIX_PROMPT } from '../../data/check'
import { useClipboard } from '../../hooks/useClipboard'
import { useCheck } from '../../state/useCheck'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'

export function TopBar({ visible }: { visible: boolean }) {
  const { state, toggleVerify } = useCheck()
  const { copied, copy } = useClipboard()

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-40 flex h-[54px] items-center gap-3 border-b border-line bg-white/85 px-9 backdrop-blur-md backdrop-saturate-150 transition-transform duration-300 ease-(--ease-soft) min-[781px]:left-[220px] max-[780px]:px-4 ${
        visible ? 'translate-y-0' : '-translate-y-[102%]'
      }`}
    >
      <span className={`size-[7px] shrink-0 rounded-full transition-colors ${state.fixed ? 'bg-good' : 'bg-bad'}`} />
      <b className="min-w-0 truncate font-serif text-[21px] font-normal tracking-tight max-[780px]:text-[17px]">
        {state.fixed ? 'Fixed on this branch' : 'Checkout regressed on mobile'}
      </b>
      <span className="max-[780px]:hidden">
        <Chip tone={state.fixed ? 'good' : 'bad'}>{state.fixed ? 'exit 0 · passing' : 'exit 2 · regression'}</Chip>
      </span>
      <span className="flex-1" />
      <Button size="sm" className="max-[780px]:hidden" onClick={toggleVerify} tabIndex={visible ? 0 : -1}>
        {state.fixed ? 'Show the failure again' : 'Verify fix'}
      </Button>
      <Button variant="primary" size="sm" onClick={() => copy(FIX_PROMPT)} tabIndex={visible ? 0 : -1}>
        {copied ? 'Copied' : 'Copy fix prompt'}
      </Button>
    </div>
  )
}
