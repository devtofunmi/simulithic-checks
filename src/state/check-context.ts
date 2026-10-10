import { createContext, type Dispatch } from 'react'
import type { CheckAction, CheckState } from './reducer'

export interface CheckContextValue {
  state: CheckState
  dispatch: Dispatch<CheckAction>
  togglePlay: () => void
  toggleVerify: () => void
}

export const CheckContext = createContext<CheckContextValue | null>(null)
