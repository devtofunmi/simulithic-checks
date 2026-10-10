import { useEffect, useState, type RefObject } from 'react'

export function useElementHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setHeight(entry.target.getBoundingClientRect().height))
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return height
}
