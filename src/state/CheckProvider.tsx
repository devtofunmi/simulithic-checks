import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { CheckContext } from './check-context'
import { checkReducer, createInitialState } from './reducer'

const PLAYBACK_INTERVAL = 1300
const VERIFY_INTERVAL = 650
const TOAST_DURATION = 6000
const PEOPLE_TO_VERIFY = 3

export function CheckProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkReducer, window.location.hash === '#fixed', createInitialState)

  useEffect(() => {
    if (!state.playing) return
    const id = window.setInterval(() => dispatch({ type: 'tick' }), PLAYBACK_INTERVAL)
    return () => window.clearInterval(id)
  }, [state.playing])

  useEffect(() => {
    const progress = state.verifyProgress
    if (progress === null) return
    const done = progress >= PEOPLE_TO_VERIFY
    const id = window.setTimeout(
      () => dispatch(done ? { type: 'setFixed', fixed: true } : { type: 'verifyProgress', value: progress + 1 }),
      done ? 350 : VERIFY_INTERVAL,
    )
    return () => window.clearTimeout(id)
  }, [state.verifyProgress])

  useEffect(() => {
    if (!state.toast) return
    const id = window.setTimeout(() => dispatch({ type: 'hideToast' }), TOAST_DURATION)
    return () => window.clearTimeout(id)
  }, [state.toast])

  const togglePlay = useCallback(() => {
    dispatch({ type: state.playing ? 'pause' : 'play' })
  }, [state.playing])

  const toggleVerify = useCallback(() => {
    if (state.fixed) {
      dispatch({ type: 'setFixed', fixed: false })
      return
    }
    if (state.verifyProgress !== null) return
    dispatch({ type: 'verifyStart' })
    document.getElementById('split-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [state.fixed, state.verifyProgress])

  const value = useMemo(
    () => ({ state, dispatch, togglePlay, toggleVerify }),
    [state, togglePlay, toggleVerify],
  )

  return <CheckContext.Provider value={value}>{children}</CheckContext.Provider>
}
