import { useContext } from 'react'
import { CheckContext } from './check-context'

export function useCheck() {
  const context = useContext(CheckContext)
  if (!context) throw new Error('useCheck must be used inside CheckProvider')
  return context
}
