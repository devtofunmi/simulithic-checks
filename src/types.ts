export type Device = 'desktop' | 'mobile'

export type Build = 'prod' | 'pr'

export type Verdict = 'same' | 'regression' | 'improved' | 'finding' | 'fixed'

export interface Cell {
  pr: string
  prod: string
  verdict: Verdict
}

export interface Flow {
  name: string
  cells: Record<Device, Cell>
}

export interface Person {
  name: string
  device: string
  color: string
  prodTime: string
  fixTime: string
  reason: string
}

export interface Step {
  label: string
  short: string
  duration: string
  thought: string
  time: number
}

export type CellKey = `${number}:${Device}`
