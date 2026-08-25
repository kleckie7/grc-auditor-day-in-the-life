import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import SectionEyebrow from '@/components/SectionEyebrow'
import JourneyPinned from './journey/JourneyPinned'
import JourneyStatic from './journey/JourneyStatic'
import { JOURNEY_INTRO } from './journey/journey-data'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Journey — Section 02 (carbon / dark). Eyebrow `02 / THE JOURNEY`.
 * Desktop: pinned ~250vh scroll-driven 7-stop stepper (GSAP, one scrubbed
 * timeline). Mobile + reduced-motion: static vertical stepper.
 * GSAP-only component tree (library isolation).
 */
export default function Journey() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced] = useState(prefersReducedMotion)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section title — word-level reveal (design.md §5)
      const split = new SplitText('.journey-title', { type: 'words' })
      gsap.from(split.words, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.journey-title', start: 'top 85%' },
      })
      gsap.from('.journey-intro', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.journey-intro', start: 'top 85%' },
      })

      return () => {
        split.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <section
      id="journey"
      ref={rootRef}
      className="bg-dots bg-carbon text-paper"
    >
      <div className="mx-auto max-w-content px-4 pt-[72px] md:px-8 md:pt-[128px]">
        <SectionEyebrow index="02" label="The Journey" dark />
        <h2 className="journey-title mt-6 font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper md:text-[56px]">
          From &ldquo;applied&rdquo; to running the department.
        </h2>
        <p className="journey-intro mt-6 max-w-measure text-[17px] leading-[1.65] text-paper/75">
          {JOURNEY_INTRO}
        </p>
      </div>

      {reduced ? (
        <div className="mx-auto max-w-content px-4 pb-[72px] md:px-8 md:pb-[128px]">
          <JourneyStatic />
        </div>
      ) : (
        <>
          {/* Desktop: pinned stepper */}
          <div className="hidden md:block">
            <JourneyPinned />
          </div>
          {/* Mobile: un-pinned vertical stepper */}
          <div className="mx-auto max-w-content px-4 pb-[72px] md:hidden">
            <JourneyStatic />
          </div>
        </>
      )}
    </section>
  )
}
