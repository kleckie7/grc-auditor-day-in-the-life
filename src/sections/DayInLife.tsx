import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import SectionEyebrow from '@/components/SectionEyebrow'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TRACKS } from '@/lib/tracks'
import { cn } from '@/lib/utils'
import DayRail from './day/DayRail'
import { DAY_INTRO, DAY_TRACKS } from './day/day-data'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Toggle the "NOW has passed this row" presentation (all Tailwind classes
 *  enumerated here so the scanner emits them). */
function setPassed(row: HTMLElement, passed: boolean) {
  if ((row.dataset.passed === '1') === passed) return
  row.dataset.passed = passed ? '1' : '0'
  row.classList.toggle('opacity-40', !passed)
  row.classList.toggle('opacity-100', passed)
  row.classList.toggle('bg-highlight/60', passed)

  const node = row.parentElement?.querySelector<HTMLElement>('.js-day-node')
  if (node) {
    node.classList.toggle('scale-0', !passed)
    node.classList.toggle('scale-100', passed)
  }
  const stamp = row.querySelector<HTMLElement>('.js-dev-stamp')
  if (stamp) {
    stamp.classList.toggle('opacity-0', !passed)
    stamp.classList.toggle('scale-[1.6]', !passed)
    stamp.classList.toggle('-rotate-[10deg]', !passed)
    stamp.classList.toggle('opacity-100', passed)
    stamp.classList.toggle('scale-100', passed)
    stamp.classList.toggle('-rotate-[6deg]', passed)
  }
}

/** Drive one rail from scroll progress: line draw + NOW marker + row pass. */
function updateRail(rail: HTMLElement, p: number) {
  const entries = rail.querySelector<HTMLElement>('.js-day-entries')
  const line = rail.querySelector<HTMLElement>('.js-day-line')
  const now = rail.querySelector<HTMLElement>('.js-day-now')
  if (!entries || !line || !now) return
  const H = Math.max(entries.clientHeight - 16, 1) // line has top-2 / bottom-2
  line.style.transform = `scaleY(${p})`
  now.style.transform = `translateX(-50%) translateY(${p * H}px)`
  const markerY = 8 + p * H
  entries
    .querySelectorAll<HTMLElement>('.js-day-row')
    .forEach((row) => {
      // the row div's offsetParent is its <li>; measure the li against the
      // entries <ol> (its positioned ancestor) for a rail-relative offset
      const li = row.parentElement
      const top = li ? li.offsetTop : row.offsetTop
      setPassed(row, markerY >= top + 4)
    })
}

/**
 * DayInLife — Section 03 (paper). Eyebrow `03 / THE DAY`.
 * Three track-coded vertical timeline rails side-by-side with a
 * scroll-scrubbed NOW marker traveling down each rail; rows light up as the
 * marker passes them (the day being lived as you read). Mobile: A/B/C tabs.
 * GSAP-only component tree (library isolation).
 */
export default function DayInLife() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced] = useState(prefersReducedMotion)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section title — word-level reveal
      const split = new SplitText('.day-title', { type: 'words' })
      gsap.from(split.words, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.day-title', start: 'top 85%' },
      })
      gsap.from('.day-intro', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.day-intro', start: 'top 85%' },
      })

      // Rails reveal with stagger 0.15s (A→B→C)
      gsap.from('.js-day-rails-desktop .js-day-rail', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.js-day-rails-desktop', start: 'top 75%' },
      })

      // One scrubbed ScrollTrigger per rail (not a pinned section):
      // rail line draw + NOW marker travel + row activation.
      gsap.utils
        .toArray<HTMLElement>('.js-day-rail[data-live="true"]')
        .forEach((rail) => {
          const entries = rail.querySelector<HTMLElement>('.js-day-entries')
          if (!entries) return
          ScrollTrigger.create({
            trigger: entries,
            start: 'top 72%',
            end: 'bottom 45%',
            onUpdate: (self) => updateRail(rail, self.progress),
            onRefresh: (self) => updateRail(rail, self.progress),
          })
        })

      return () => {
        split.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <section id="the-day" ref={rootRef} className="bg-graph bg-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <SectionEyebrow index="03" label="The Day" />
        <h2 className="day-title mt-6 font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink md:text-[56px]">
          Tuesday, 9:04 AM.
        </h2>
        <p className="day-intro mt-6 max-w-measure text-[17px] leading-[1.65] text-ink-soft">
          {DAY_INTRO}
        </p>

        {/* Desktop: three rails side-by-side */}
        <div className="js-day-rails-desktop mt-14 hidden gap-8 md:grid md:grid-cols-3 lg:gap-10">
          {DAY_TRACKS.map((track) => (
            <DayRail key={track.key} track={track} live={!reduced} />
          ))}
        </div>

        {/* Mobile: A/B/C tab switcher (static rails) */}
        <div className="mt-14 md:hidden">
          <Tabs defaultValue="a">
            <TabsList className="grid w-full grid-cols-3 bg-highlight">
              {DAY_TRACKS.map((track) => {
                const meta = TRACKS[track.key]
                return (
                  <TabsTrigger
                    key={track.key}
                    value={track.key}
                    className="gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] data-[state=active]:bg-paper-raised"
                  >
                    <span
                      aria-hidden="true"
                      className={cn('h-2 w-2 rounded-full', meta.bg)}
                    />
                    {meta.letter}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            {DAY_TRACKS.map((track) => (
              <TabsContent key={track.key} value={track.key} className="mt-8">
                <DayRail track={track} live={false} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
