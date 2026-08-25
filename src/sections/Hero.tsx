import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { TRACK_LIST } from '@/lib/tracks'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const FORK_CARDS = [
  {
    key: 'a' as const,
    name: 'GRC Analyst',
    sub: 'In-house — run the compliance program',
    y: 90,
  },
  {
    key: 'b' as const,
    name: 'IT Internal Auditor',
    sub: 'SOX · ITGC — audit your own company',
    y: 225,
  },
  {
    key: 'c' as const,
    name: 'External Auditor',
    sub: 'SOC 2 & ISO 27001 — audit clients at a firm',
    y: 360,
  },
]

/**
 * Hero — one title forks into three tracks (design.md §1, home.md hero).
 * Paper section: graph grid, arch-masked desk photo with parallax,
 * scroll-drawn fork diagram (SVG stroke-dashoffset scrub), char-level
 * headline animation. GSAP-only component tree (library isolation).
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduced) return

      // Headline — character-level reveal
      const split = new SplitText('.hero-title', { type: 'chars' })
      gsap.from(split.chars, {
        y: 44,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.018,
      })

      // Block reveals
      gsap.from('.hero-reveal', {
        y: 32,
        opacity: 0,
        rotate: 0.6,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.35,
      })

      // Desk photo — subtle parallax
      gsap.to('.hero-photo', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Fork diagram — scroll-scrubbed path draws
      gsap.utils.toArray<SVGPathElement>('.fork-path').forEach((path, i) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.fork-diagram',
              start: 'top 85%',
              end: 'top 25%',
              scrub: 1,
            },
            delay: i * 0.05,
          },
        )
      })
      gsap.from('.fork-card', {
        opacity: 0,
        x: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.fork-diagram', start: 'top 60%' },
      })

      return () => {
        split.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <section
      id="hero"
      ref={rootRef}
      className="bg-graph relative overflow-hidden bg-paper"
    >
      <div className="mx-auto max-w-content px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Left: headline + hook */}
          <div>
            <p className="hero-reveal font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
              An interactive walkthrough · 3 tracks
            </p>
            <h1 className="hero-title mt-6 font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.02em] text-ink md:text-[88px]">
              A Day in the Life of a GRC Auditor
            </h1>
            {/* decorative redaction bars */}
            <div
              aria-hidden="true"
              className="hero-reveal mt-6 flex items-center gap-2"
            >
              <span className="h-3 w-24 rounded-[4px] bg-ink" />
              <span className="h-3 w-10 rounded-[4px] bg-ink" />
              <span className="h-3 w-16 rounded-[4px] bg-ink" />
              <span className="h-3 w-6 rounded-[4px] bg-exception" />
            </div>
            <p className="hero-reveal mt-6 font-display text-xl font-medium italic leading-snug text-ink md:text-2xl">
              From the first interview to the career ladder — three different
              jobs share one title.
            </p>
            <p className="hero-reveal mt-6 max-w-measure text-[17px] leading-[1.65] text-ink-soft">
              &ldquo;GRC auditor&rdquo; is not one job. It&rsquo;s three. You might
              run a company&rsquo;s compliance program from the inside, audit
              your own employer&rsquo;s financial-reporting controls, or fly
              (or Zoom) from client to client at an audit firm testing SOC 2
              and ISO 27001 controls. All three run on the same fuel —
              evidence, skepticism, and controls — but the days, the deadlines,
              and the pay look nothing alike. This page walks you through all
              three, from the interview loop to the corner office, with the
              real artifacts in your hands: the PBC list, the workpaper, the
              walkthrough.
            </p>
            <div className="hero-reveal mt-8 inline-block max-w-md rounded-[10px] border border-line bg-paper-raised p-4 shadow-paper">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                How to use this page
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                Scroll straight through for the full story, or jump to a
                section — each one stands alone, and every number carries its
                source.
              </p>
            </div>
          </div>

          {/* Right: arch-masked desk photo */}
          <div className="hero-reveal relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-t-[999px] border border-line shadow-paper">
              <img
                src="/hero-desk.png"
                alt="An auditor's desk from above: a laptop with a compliance dashboard, a PBC request list with a red pen, a sticky note, and a stamp."
                className="hero-photo aspect-[4/3] w-full scale-110 object-cover"
                loading="eager"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              Fig. 0 — The desk you&rsquo;re looking over
            </p>
          </div>
        </div>

        {/* Fork diagram */}
        <div className="fork-diagram mt-16 md:mt-24">
          <svg
            viewBox="0 0 1200 460"
            className="w-full"
            role="img"
            aria-label="Fork diagram: the single job title 'GRC Auditor' splits into three career tracks — in-house GRC analyst, IT internal auditor for SOX, and external auditor for SOC 2 and ISO 27001."
          >
            {/* origin node */}
            <rect
              x="30"
              y="185"
              width="190"
              height="80"
              rx="10"
              className="fill-ink"
            />
            <text
              x="125"
              y="218"
              textAnchor="middle"
              className="fill-paper font-mono text-[15px] font-semibold uppercase tracking-[0.1em]"
            >
              GRC
            </text>
            <text
              x="125"
              y="242"
              textAnchor="middle"
              className="fill-paper font-mono text-[15px] font-semibold uppercase tracking-[0.1em]"
            >
              Auditor
            </text>

            {/* stem */}
            <path
              d="M220,225 L420,225"
              fill="none"
              className="fork-path stroke-ink"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
            />
            <circle cx="420" cy="225" r="5" className="fill-ink" />

            {/* fork paths + cards */}
            {FORK_CARDS.map((card) => {
              const meta = TRACK_LIST.find((t) => t.key === card.key)!
              const d =
                card.y === 225
                  ? 'M420,225 L700,225'
                  : `M420,225 C540,225 560,${card.y} 700,${card.y}`
              return (
                <g key={card.key} data-track={card.key}>
                  <path
                    d={d}
                    fill="none"
                    className="fork-path"
                    stroke={meta.hex}
                    strokeWidth="2.5"
                    pathLength={1}
                    strokeDasharray={1}
                  />
                  {/* arrowhead */}
                  <path
                    d={`M700,${card.y} l-10,-5 v10 z`}
                    fill={meta.hex}
                  />
                  {/* card */}
                  <g className="fork-card">
                    <rect
                      x="710"
                      y={card.y - 45}
                      width="440"
                      height="90"
                      rx="10"
                      className="fill-paper-raised stroke-line"
                    />
                    <rect
                      x="710"
                      y={card.y - 45}
                      width="6"
                      height="90"
                      fill={meta.hex}
                    />
                    <rect
                      x="732"
                      y={card.y - 14}
                      width="28"
                      height="28"
                      rx="4"
                      fill={meta.hex}
                    />
                    <text
                      x="746"
                      y={card.y + 6}
                      textAnchor="middle"
                      className="fill-white font-display text-[16px] font-semibold"
                    >
                      {meta.letter}
                    </text>
                    <text
                      x="776"
                      y={card.y - 4}
                      className="fill-ink font-sans text-[17px] font-semibold"
                    >
                      {card.name}
                    </text>
                    <text
                      x="776"
                      y={card.y + 20}
                      className="fill-ink-soft font-mono text-[12px]"
                    >
                      {card.sub}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-ink"
          />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Scroll — the story unfolds below
          </p>
        </div>
      </div>
    </section>
  )
}
