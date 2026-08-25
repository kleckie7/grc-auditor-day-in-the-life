import { useCallback, useRef, useState } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface DiagramPlayback {
  /** Attach to the diagram wrapper; ScrollTrigger + selector scope target it. */
  rootRef: RefObject<HTMLDivElement | null>
  /** Kills the scroll scrub and replays the draw sequence in real time. */
  replay: () => void
  /** True under prefers-reduced-motion — markup is already fully drawn. */
  reduced: boolean
}

/**
 * Wires a diagram's draw timeline to scroll progress (stroke-dashoffset
 * scrub per design.md §5) and exposes a replay button handler.
 * Markup is authored fully-drawn; GSAP `from`/`fromTo` tweens supply the
 * pre-draw state only when motion is allowed, so reduced-motion users see
 * the finished static diagram.
 */
export function useDiagramPlayback(
  build: () => gsap.core.Timeline,
): DiagramPlayback {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const buildRef = useRef(build)
  buildRef.current = build
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useGSAP(
    () => {
      if (reduced) return
      const tl = buildRef.current()
      tl.pause(0)
      tlRef.current = tl
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 78%',
        end: 'top 28%',
        scrub: 1,
        animation: tl,
      })
      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        tlRef.current = null
      }
    },
    { scope: rootRef },
  )

  const replay = useCallback(() => {
    const tl = tlRef.current
    if (!tl) return
    // Detach from scroll so the replay isn't fought by the scrub binding.
    tl.scrollTrigger?.kill()
    tl.pause(0)
    tl.play(0)
  }, [])

  return { rootRef, replay, reduced }
}
