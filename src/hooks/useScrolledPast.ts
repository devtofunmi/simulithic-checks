import { useEffect, useState, type RefObject } from 'react'

export function useScrolledPast(ref: RefObject<HTMLElement | null>) {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      setScrolledPast(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return scrolledPast
}
