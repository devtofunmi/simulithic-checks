import type { ComponentType, SVGProps } from 'react'
import { Kbd } from '../ui/Kbd'
import { Logo } from '../ui/Logo'
import {
  ChecksIcon,
  DropOffsIcon,
  ExperimentsIcon,
  HomeIcon,
  OverviewIcon,
  RecordingsIcon,
  SearchIcon,
  SegmentsIcon,
  SidebarIcon,
  SimulateIcon,
} from '../ui/icons'

interface NavItem {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
}

const NAV: NavItem[] = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Overview', icon: OverviewIcon },
  { label: 'Recordings', icon: RecordingsIcon },
  { label: 'Drop-offs', icon: DropOffsIcon },
  { label: 'Segments', icon: SegmentsIcon },
  { label: 'Simulate', icon: SimulateIcon },
  { label: 'Checks', icon: ChecksIcon, active: true },
  { label: 'Experiments', icon: ExperimentsIcon },
]

export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-r border-line bg-[#fafafa] px-2.5 py-3.5 max-[780px]:hidden">
      <div className="flex items-center gap-2 px-2 pb-3">
        <Logo />
        <span className="text-[15px] font-semibold tracking-tight">simulithic</span>
        <SidebarIcon className="ml-auto size-4 text-faint" />
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 text-faint">
        <SearchIcon className="size-3.5" />
        <span className="flex-1">Search</span>
        <Kbd>⌘K</Kbd>
      </div>

      <nav aria-label="Studio">
        <ul className="space-y-px">
          {NAV.map(({ label, icon: NavIcon, active }) => (
            <li
              key={label}
              aria-current={active ? 'page' : undefined}
              aria-disabled={active ? undefined : true}
              className={`flex cursor-default items-center gap-2.5 rounded-[7px] px-2 py-1.5 select-none ${
                active ? 'bg-[#ececec] font-medium text-ink' : 'text-ink-2'
              }`}
            >
              <NavIcon className="size-3.5 text-faint" />
              {label}
              {active && (
                <span className="ml-auto rounded bg-brand-soft px-1.5 font-mono text-[9.5px] text-brand-strong">concept</span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 space-y-1 border-t border-line px-2 pt-2.5 text-[11.5px] leading-relaxed text-faint">
        <p>
          <Kbd>Space</Kbd> play · <Kbd>←</Kbd>
          <Kbd>→</Kbd> step
        </p>
        <p>
          <Kbd>1</Kbd>
          <Kbd>2</Kbd>
          <Kbd>3</Kbd> person · <Kbd>F</Kbd> copy fix
        </p>
      </div>
    </aside>
  )
}
