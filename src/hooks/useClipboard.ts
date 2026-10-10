import { useCallback, useEffect, useRef, useState } from 'react'

export function useClipboard(resetAfter = 1400) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard?.writeText(text).catch(() => undefined)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), resetAfter)
    },
    [resetAfter],
  )

  return { copied, copy }
}
