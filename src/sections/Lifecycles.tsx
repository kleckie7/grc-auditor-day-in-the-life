import { useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionEyebrow from '@/components/SectionEyebrow'
import TrackBadge from '@/components/TrackBadge'
import DiagramFrame from '@/components/DiagramFrame'
import SourceTag from '@/components/SourceTag'
import type { TrackKey } from '@/lib/tracks'
import { TRACKS } from '@/lib/tracks'
import SoxDiagram from '@/sections/lifecycles/SoxDiagram'
import Soc2Diagram from '@/sections/lifecycles/Soc2Diagram'
import IsoDiagram from '@/sections/lifecycles/IsoDiagram'
import StepsList from '@/sections/lifecycles/StepsList'
import { ISO_STEPS, SOC2_STEPS, SOX_STEPS } from '@/sections/lifecycles/data'
import type { LifecycleStep } from '@/sections/lifecycles/data'
import type { DiagramSyncProps } from '@/sections/lifecycles/types'

/**
 * Lifecycles — SECTION 5 "Engagement Lifecycles" (#lifecycles, carbon).
 * Three DiagramFrames, one per clock: SOX closed loop, SOC 2 line with
 * renewal arrow, ISO 27001 3-year ring with surveillance ticks
 * (home.md §5). Diagrams draw via scroll-scrubbed stroke-dashoffset with
 * replay buttons; diagram ↔ step-list hover sync throughout.
 */
export default function Lifecycles() {
  const reduced = useReducedMotion()

  return (
    <section id="lifecycles" className="bg-dots bg-carbon text-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow index="04" label="Engagement Lifecycles" dark />
          <h2 className="mt-6 max-w-[16ch] font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper md:text-[56px]">
            Three tracks, three heartbeats.
          </h2>
          <p className="mt-6 max-w-measure text-[16px] leading-[1.65] text-ink-faint md:text-[17px]">
            Here&rsquo;s the difference nobody puts in the job posting: the
            three tracks run on three different clocks. SOX never
            &ldquo;ends&rdquo; — the fiscal-year cycle repeats, the year closes
            with the 10-K, and planning for next year starts immediately; the
            job security is structural because SOX is law for public companies{' '}
            <SourceTag dark>(vero-ai.com, Apr 2026)</SourceTag>. SOC 2
            engagements genuinely end — report issued, engagement closed — but
            clients renew annually, so your portfolio repeats with rolling
            fieldwork windows all year instead of one busy season. ISO 27001
            runs on a 3-year certificate cycle, so you see the same client on
            a multi-year cadence. Same evidence discipline, three different
            heartbeats.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          <LifecycleFigure
            figId="sox"
            track="b"
            title="SOX Annual Cycle"
            subtitle="Internal audit — the fiscal-year clock"
            caption="FIG. 1 — SOX ANNUAL CYCLE"
            diagram={SoxDiagram}
            steps={SOX_STEPS}
            aside={<DeficiencyStrip />}
          />
          <div aria-hidden="true" className="h-px bg-carbon-line" />
          <LifecycleFigure
            figId="soc2"
            track="c"
            title="SOC 2 Engagement Cycle"
            subtitle="External, per client — the engagement clock"
            caption="FIG. 2 — SOC 2 ENGAGEMENT CYCLE"
            diagram={Soc2Diagram}
            steps={SOC2_STEPS}
          />
          <div aria-hidden="true" className="h-px bg-carbon-line" />
          <LifecycleFigure
            figId="iso"
            track="c"
            title="ISO 27001 Certificate Cycle"
            subtitle="External, per client — the 3-year clock"
            caption="FIG. 3 — ISO 27001 CERTIFICATE CYCLE"
            diagram={IsoDiagram}
            steps={ISO_STEPS}
            aside={<FindingsChips />}
          />
        </div>
      </div>
    </section>
  )
}

/** One clock: animated diagram + synced step list inside a DiagramFrame. */
function LifecycleFigure({
  figId,
  track,
  title,
  subtitle,
  caption,
  diagram: Diagram,
  steps,
  aside,
}: {
  figId: string
  track: TrackKey
  title: string
  subtitle: string
  caption: string
  diagram: ComponentType<DiagramSyncProps>
  steps: LifecycleStep[]
  aside?: ReactNode
}) {
  const [active, setActive] = useState<number | null>(null)
  const meta = TRACKS[track]

  return (
    <div data-track={track}>
      <div className="mb-6 flex items-center gap-3">
        <TrackBadge track={track} variant="outline" />
        <div>
          <h3 className="font-display text-[24px] font-semibold leading-[1.15] text-paper md:text-[30px]">
            {title}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {subtitle}
          </p>
        </div>
      </div>
      <DiagramFrame caption={caption} dark>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <Diagram active={active} onActive={setActive} />
          <div>
            <StepsList
              figId={figId}
              steps={steps}
              active={active}
              onActive={setActive}
              accent={meta.hexOnDark}
            />
            {aside}
          </div>
        </div>
      </DiagramFrame>
    </div>
  )
}

/** SOX deficiency hierarchy — mini 3-step escalation strip (home.md §5). */
function DeficiencyStrip() {
  const items = [
    { label: 'Control deficiency', danger: false },
    { label: 'Significant deficiency', danger: false },
    { label: 'Material weakness', danger: true },
  ]
  return (
    <div className="mt-6 border-t border-carbon-line pt-4">
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        Deficiency hierarchy
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <ArrowRight
                className="h-3 w-3 text-ink-faint"
                aria-hidden="true"
              />
            )}
            <span
              className={
                item.danger
                  ? 'rounded-[4px] border border-exception px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-exception'
                  : 'rounded-[4px] border border-carbon-line bg-carbon px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-faint'
              }
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** ISO findings taxonomy — three severity chips with a subtle glow. */
function FindingsChips() {
  const chips = [
    {
      label: 'Major NC — blocks cert',
      className: 'border-exception text-exception',
      glow: '0 0 14px rgba(217,79,48,0.35)',
    },
    {
      label: 'Minor NC — 90 days',
      className: 'border-track-b-dark text-track-b-dark',
      glow: '0 0 14px rgba(242,178,62,0.3)',
    },
    {
      label: 'OFI',
      className: 'border-carbon-line text-ink-faint',
      glow: '0 0 12px rgba(138,143,152,0.25)',
    },
  ]
  return (
    <div className="mt-6 border-t border-carbon-line pt-4">
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        Findings taxonomy
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <span
            key={chip.label}
            className={`rounded-[4px] border px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${chip.className}`}
            style={{ boxShadow: chip.glow }}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  )
}
