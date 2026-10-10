import { FAIL_STEP, LAST_STEP } from '../data/check'
import type { CellKey } from '../types'

export interface CheckState {
  person: number
  step: number
  playing: boolean
  animate: boolean
  fixed: boolean
  verifyProgress: number | null
  highlight: CellKey | null
  toast: boolean
}

export type CheckAction =
  | { type: 'selectPerson'; person: number }
  | { type: 'goTo'; step: number }
  | { type: 'move'; delta: number }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'tick' }
  | { type: 'highlight'; key: CellKey | null }
  | { type: 'verifyStart' }
  | { type: 'verifyProgress'; value: number }
  | { type: 'setFixed'; fixed: boolean }
  | { type: 'hideToast' }

const clampStep = (step: number) => Math.min(LAST_STEP, Math.max(0, step))

export function createInitialState(fixed = false): CheckState {
  return {
    person: 0,
    step: fixed ? LAST_STEP : FAIL_STEP,
    playing: false,
    animate: false,
    fixed,
    verifyProgress: null,
    highlight: null,
    toast: false,
  }
}

export function checkReducer(state: CheckState, action: CheckAction): CheckState {
  switch (action.type) {
    case 'selectPerson':
      return { ...state, person: action.person, playing: false, animate: false }
    case 'goTo':
      return { ...state, step: clampStep(action.step), playing: false, animate: true }
    case 'move':
      return { ...state, step: clampStep(state.step + action.delta), playing: false, animate: true }
    case 'play':
      return { ...state, step: 0, playing: true, animate: true }
    case 'pause':
      return { ...state, playing: false }
    case 'tick':
      return state.step >= LAST_STEP
        ? { ...state, playing: false }
        : { ...state, step: state.step + 1, animate: true }
    case 'highlight':
      return { ...state, highlight: action.key }
    case 'verifyStart':
      return { ...state, verifyProgress: 0, playing: false }
    case 'verifyProgress':
      return { ...state, verifyProgress: action.value }
    case 'setFixed':
      return {
        ...state,
        fixed: action.fixed,
        verifyProgress: null,
        step: action.fixed ? LAST_STEP : FAIL_STEP,
        playing: false,
        animate: false,
        toast: action.fixed,
      }
    case 'hideToast':
      return { ...state, toast: false }
  }
}
