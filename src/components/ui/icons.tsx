import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 11 12 4l9 7v9H3z" />
  </Icon>
)

export const OverviewIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Icon>
)

export const RecordingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </Icon>
)

export const DropOffsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Icon>
)

export const SegmentsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 1.5-3.5 4-3.5" />
  </Icon>
)

export const SimulateIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 4v16l13-8z" />
  </Icon>
)

export const ChecksIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <path d="M6 8.5v7M8.5 6H13a5 5 0 0 1 5 3.5" />
  </Icon>
)

export const ExperimentsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
  </Icon>
)

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
)

export const SidebarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M9 4v16" />
  </Icon>
)

export const ArrowUpRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
)

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
)
