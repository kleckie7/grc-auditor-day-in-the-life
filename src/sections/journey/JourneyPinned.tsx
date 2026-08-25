import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { STOPS } from './journey-data'
import StopContent from './StopContent'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const N = STOPS.length

/**
 * JourneyPinned — the desktop stepper: a ~100dvh viewport pinned for +=250%
 * of scroll. One scrubbed GSAP timeline drives everything (motion budget:
 * pinned sections cap 2 active scrubs — this uses exactly one):
 *   · the horizontal rail fills left→right (scaleX)
 *   · stop nodes pop + labels light up as the fill reaches them
 *   · stop panels crossfade (autoAlpha + y) one per segment
 * Rendered only when motion is allowed; mobile / reduced-motion get the
 * static variant instead (home.md global notes: "un-pinned journey").
 */
export default function JourneyPinned() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Desktop-only pin: below md this component is display:none, and a pin
      // spacer would still inject ~250vh of blank scroll distance.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      })

      // Rail fill draws across the whole journey
      tl.fromTo(
        '.j-rail-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: N, ease: 'none' },
        0,
      )

      STOPS.forEach((_, i) => {
        // node pop + label lights up
        tl.fromTo(
          `.j-node-fill-${i}`,
          { scale: 0 },
          { scale: 1, duration: 0.22, ease: 'back.out(2.2)', immediateRender: false },
          i,
        )
        tl.fromTo(
          `.j-node-label-${i}`,
          { opacity: 0.4 },
          { opacity: 1, duration: 0.2, ease: 'none', immediateRender: false },
          i,
        )
        // panel crossfade
        if (i > 0) {
          tl.fromTo(
            `.j-panel-${i}`,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              ease: 'power3.out',
              immediateRender: false,
            },
            i,
          )
        }
        if (i < N - 1) {
          tl.to(
            `.j-panel-${i}`,
            { autoAlpha: 0, y: -28, duration: 0.28, ease: 'power2.in' },
            i + 0.7,
          )
        }
      })
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="relative">
      {/* clears the 64px sticky nav while pinned */}
      <div className="flex min-h-[100dvh] flex-col px-4 pt-[84px] md:px-8">
        <div className="mx-auto w-full max-w-content">
          {/* ── Horizontal stepper rail ── */}
          <div
            className="relative h-[76px]"
            role="img"
            aria-label="Journey stepper: seven stops from the interview loop to manager and beyond."
          >
            {/* base line */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[18px] h-[2px] bg-carbon-line"
            />
            {/* fill line (scrubbed) */}
            <span
              aria-hidden="true"
              className="j-rail-fill absolute left-0 right-0 top-[18px] h-[2px] origin-left scale-x-0 bg-paper"
            />
            {STOPS.map((stop, i) => (
              <div
                key={stop.n}
                className="absolute top-[10px] flex w-24 -translate-x-1/2 flex-col items-center"
                style={{ left: `${(i / (N - 1)) * 100}%` }}
              >
                <span className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full border border-carbon-line bg-carbon">
                  <span
                    aria-hidden="true"
                    className={cn(
                      `j-node-fill-${i}`,
                      'h-[8px] w-[8px] scale-0 rounded-full bg-paper',
                    )}
                  />
                </span>
                <span
                  className={cn(
                    `j-node-label-${i}`,
                    'mt-1.5 whitespace-nowrap text-center font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-paper opacity-40',
                  )}
                >
                  {stop.short}
                </span>
              </div>
            ))}
          </div>

          {/* ── Stacked stop panels ── */}
          <div className="relative mt-6 h-[56dvh] max-h-[600px] min-h-[430px]">
            {STOPS.map((stop, i) => (
              <div
                key={stop.n}
                className={cn(
                  `j-panel-${i}`,
                  'absolute inset-0 overflow-y-auto rounded-2xl border border-carbon-line bg-carbon-raised p-6 md:p-8',
                  i > 0 && 'invisible opacity-0',
                )}
              >
                <StopContent stop={stop} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
