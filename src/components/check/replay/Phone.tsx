import { useLayoutEffect, useRef, useState } from 'react'
import { FAIL_STEP, LAST_STEP } from '../../../data/check'
import { useWindowWidth } from '../../../hooks/useWindowWidth'
import { useCheck } from '../../../state/useCheck'
import type { Build } from '../../../types'
import { PhoneScreen } from './PhoneScreen'

const TAP_DELAY = 560

interface Point {
  x: number
  y: number
}

export function Phone({ build }: { build: Build }) {
  const { state } = useCheck()
  const windowWidth = useWindowWidth()
  const deviceRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [finger, setFinger] = useState<Point | null>(null)
  const [tapped, setTapped] = useState(false)

  const blocked = build === 'pr' && !state.fixed
  const shownStep = Math.min(state.step, blocked ? FAIL_STEP : LAST_STEP)
  const failing = blocked && state.step >= FAIL_STEP
  const showBanner = blocked && shownStep >= 4

  useLayoutEffect(() => {
    const device = deviceRef.current
    const screen = screenRef.current
    if (!device || !screen) return

    const target = screen.querySelector('[data-target]')
    if (!target || shownStep === LAST_STEP) {
      setFinger(null)
      return
    }

    const scale = device.getBoundingClientRect().width / device.offsetWidth || 1
    const targetRect = target.getBoundingClientRect()
    const screenRect = screen.getBoundingClientRect()
    setFinger({
      x: (targetRect.left - screenRect.left + targetRect.width / 2) / scale,
      y: (targetRect.top - screenRect.top + targetRect.height / 2) / scale,
    })

    if (!state.animate) {
      setTapped(true)
      return
    }
    setTapped(false)
    const id = window.setTimeout(() => setTapped(true), TAP_DELAY)
    return () => window.clearTimeout(id)
  }, [shownStep, state.step, state.person, state.fixed, state.animate, windowWidth])

  const shake = tapped && failing && state.animate && state.step === FAIL_STEP

  return (
    <div className="h-[calc(430px*var(--s))] w-[calc(212px*var(--s))] [--s:1] max-[780px]:[--s:0.72]">
      <div
        ref={deviceRef}
        className={`relative h-[430px] w-[212px] origin-top-left scale-(--s) rounded-[32px] bg-[#111] p-2 shadow-[0_22px_40px_-20px_rgba(0,0,0,.4)] transition-shadow before:absolute before:top-[13px] before:left-1/2 before:z-[6] before:h-[17px] before:w-[58px] before:-translate-x-1/2 before:rounded-[10px] before:bg-[#111] ${
          failing ? 'ring-[3px] ring-bad/35' : ''
        } ${shake ? 'animate-shake' : ''}`}
      >
        <div ref={screenRef} className="relative h-full w-full overflow-hidden rounded-[25px] bg-white text-[10px]">
          <div
            key={`${shownStep}-${blocked}`}
            className="absolute inset-0 flex animate-slide flex-col gap-2 px-3 pt-[34px] pb-3"
          >
            <PhoneScreen step={shownStep} showBanner={showBanner} />
          </div>

          <span
            className={`pointer-events-none absolute top-0 left-0 z-[5] -mt-3 -ml-3 size-6 rounded-full border-2 border-white/95 bg-brand/25 shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-[transform,opacity] duration-500 ease-(--ease-soft) ${
              finger ? 'opacity-100' : 'opacity-0'
            }`}
            style={finger ? { transform: `translate(${finger.x}px, ${finger.y}px)` } : undefined}
          />

          {tapped && finger && (
            <span
              key={`ripple-${state.step}-${state.person}`}
              className={`pointer-events-none absolute z-[5] -mt-[13px] -ml-[13px] size-[26px] animate-ripple rounded-full border-2 ${
                failing ? 'border-bad bg-bad/15' : 'border-brand'
              }`}
              style={{ left: finger.x, top: finger.y }}
            />
          )}

          {tapped && failing && finger && (
            <div
              className="absolute inset-x-3 z-[6] animate-fade rounded bg-bad px-1.5 py-[3px] text-center font-mono text-[8.5px] text-white"
              style={{ top: finger.y - 38 }}
            >
              tap → #cookie-banner
            </div>
          )}

          {failing && state.step > FAIL_STEP && (
            <div className="absolute inset-0 z-[4] grid animate-fade place-items-center bg-white/70 backdrop-blur-[1.5px]">
              <div className="rounded-lg border border-bad-line bg-white px-2.5 py-1.5 text-center font-mono text-[10px] text-bad shadow-[0_6px_16px_-8px_rgba(0,0,0,.2)]">
                stuck · 1m 34s
                <br />
                never reached “Done”
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
