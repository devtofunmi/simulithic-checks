import { useRef } from 'react'
import { CheckHeader } from './components/check/CheckHeader'
import { Findings } from './components/check/Findings'
import { PrComment } from './components/check/PrComment'
import { Replay } from './components/check/replay/Replay'
import { SplitMap } from './components/check/SplitMap'
import { Toast } from './components/check/Toast'
import { VerdictMatrix } from './components/check/VerdictMatrix'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { Section } from './components/ui/Section'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useScrolledPast } from './hooks/useScrolledPast'
import { CheckProvider } from './state/CheckProvider'

function CheckPage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const showTopBar = useScrolledPast(titleRef)
  useKeyboardShortcuts()

  return (
    <>
      <TopBar visible={showTopBar} />
      <div className="grid min-h-screen grid-cols-[220px_minmax(0,1fr)] max-[780px]:grid-cols-[minmax(0,1fr)]">
        <Sidebar />
        <main className="min-w-0 max-w-[1260px] px-9 pt-7 pb-24 max-[780px]:px-4 max-[780px]:pt-5">
          <CheckHeader titleRef={titleRef} />

          <Section delay={0.12}>
            <SplitMap />
          </Section>

          <Section title="Replay · both builds in sync" hint="Same person, same moment. Only the code is different." delay={0.2}>
            <div id="replay">
              <Replay />
            </div>
          </Section>

          <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-5 max-[1180px]:grid-cols-1">
            <Section title="Every flow, every device" hint="dots are people on the PR build" delay={0.28}>
              <VerdictMatrix />
            </Section>
            <Section
              title="Comment on the PR"
              hint="updated in place"
              delay={0.28}
              className="flex flex-col [&>*:last-child]:flex-1"
            >
              <PrComment />
            </Section>
          </div>

          <Section title="What went wrong" hint="hover to see who it hit" delay={0.34}>
            <Findings />
          </Section>
        </main>
      </div>
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <CheckProvider>
      <CheckPage />
    </CheckProvider>
  )
}
