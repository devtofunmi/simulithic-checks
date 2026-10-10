import { useEffect } from 'react'
import { FIX_PROMPT, PEOPLE } from '../data/check'
import { useCheck } from '../state/useCheck'

export function useKeyboardShortcuts() {
  const { dispatch, togglePlay } = useCheck()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, button')) return

      const person = Number(event.key) - 1
      if (person >= 0 && person < PEOPLE.length) {
        dispatch({ type: 'selectPerson', person })
        return
      }

      switch (event.key) {
        case ' ':
          event.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          dispatch({ type: 'move', delta: 1 })
          break
        case 'ArrowLeft':
          dispatch({ type: 'move', delta: -1 })
          break
        case 'f':
        case 'F':
          navigator.clipboard?.writeText(FIX_PROMPT).catch(() => undefined)
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dispatch, togglePlay])
}
