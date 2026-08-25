import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Callout from '@/components/Callout'
import StickyNote from '@/components/StickyNote'
import Stamp from '@/components/Stamp'
import EvidenceChip from '@/components/EvidenceChip'
import SourceTag from '@/components/SourceTag'
import { cn } from '@/lib/utils'

interface Field {
  label: string
  value: ReactNode
}

/** Verbatim workpaper fields (info.md § over-the-shoulder, Exhibit 2). */
const FIELDS: Field[] = [
  {
    label: 'Control ID / description',
    value:
      'ITGC-AC-04 — Quarterly user access review for the production ERP',
  },
  {
    label: 'Control objective',
    value:
      'User access to programs and data is reviewed quarterly; inappropriate or orphaned access is identified and removed on a timely basis',
  },
  {
    label: 'Frequency',
    value: 'Quarterly (4 occurrences in the period)',
  },
  {
    label: 'Population definition',
    value:
      'All four quarterly access reviews performed for the production ERP during fiscal 2026 — confirmed complete by inspection of the compliance calendar and the review-tracking system',
  },
  { label: 'Sampling unit', value: 'One quarterly access review' },
  {
    label: 'Sample-size rationale',
    value: (
      <>
        Quarterly control with zero expected deviations → n = 3 of 4
        (quarterly controls: 2–3 samples;{' '}
        <SourceTag>trullion.com; linfordco.com</SourceTag>). Deviation-expansion
        logic per the AICPA sampling-guide approach — on a daily-control
        analog with a population of 389 and zero expected deviations, n = 25;
        one deviation → expand to 40; two deviations → expand to 60; three
        deviations → the control fails{' '}
        <SourceTag>(linfordco.com, Apr 2025)</SourceTag>
      </>
    ),
  },
  {
    label: 'Selection method',
    value:
      'Random — random-number generator against the four review periods; Q1, Q2, Q3 selected',
  },
  {
    label: 'Per-item attributes tested',
    value:
      '(a) review performed in the quarter, dated inside the period; (b) reviewer sign-off present and reviewer is the appropriate manager; (c) population reviewed is complete (matches the user listing); (d) access flagged for removal was actually revoked — remediation proof inspected; (e) revocation timely (within policy window)',
  },
  {
    label: 'Deviations found',
    value:
      'One — Q2 review signed off 19 days after quarter-end; remediation evidence present. Deviation documented; expanded testing of the Q2 revocation items performed with no further exceptions',
  },
  {
    label: 'Conclusion',
    value:
      'Control suitably designed; operating effectively with one documented deviation, evaluated individually and in aggregate — does not rise above a control deficiency',
  },
  {
    label: 'Sign-offs',
    value:
      'Prepared by A. Osei, Staff, Nov 7 — Reviewed by R. Delacroix, Senior, Nov 12',
  },
]

/**
 * Margin annotations derived from the surrounding verbatim copy — no new
 * claims (home.md §6, Exhibit 2).
 */
const ANNOTATIONS: Record<number, string> = {
  5: 'One deviation on n=25 → expand to 40. Evidence, not optimism.',
  6: 'The auditor picks the samples — the client never picks its own.',
  8: 'Two deviations → expand to 60; three → the control fails.',
  9: 'Evaluated individually AND in aggregate.',
  10: 'A workpaper must be reviewable by someone who wasn\u2019t there.',
}

const CROSS_REFS = [
  { ref: 'WP E-14', def: 'Review exports' },
  { ref: 'WP E-18', def: 'Sign-off PDFs' },
  { ref: 'WP E-22', def: 'Revocation tickets' },
]

/**
 * Exhibit 2 — The Workpaper: annotated control test sheet with five
 * keyboard-operable margin hotspots (sticky-note annotations), a conclusion
 * stamp, and cross-reference chips that pulse the PBC grid above.
 * Framer-only component.
 */
export default function Workpaper({
  onCrossRef,
}: {
  onCrossRef: () => void
}) {
  const [openHotspot, setOpenHotspot] = useState<number | null>(null)
  const [interacted, setInteracted] = useState(false)

  let hotspotNo = 0

  return (
    <div>
      <Callout bar="ink" className="mb-8 max-w-measure">
        <p className="text-[15px] leading-relaxed text-ink-soft">
          The one rule that governs everything below:{' '}
          <em>a workpaper must be reviewable by someone who wasn&rsquo;t there.</em>{' '}
          A stranger should be able to re-perform your test from your
          documentation alone.
        </p>
      </Callout>

      <div className="relative mx-auto max-w-3xl rounded-2xl border border-line bg-paper-raised shadow-paper">
        {/* Mono header block */}
        <div className="border-b border-line bg-paper px-6 py-3 md:px-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
            WP Ref: C-04 · Prepared by A. Osei · Reviewed by R. Delacroix
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
            Workpaper — Control Test Sheet (filled example) · Exhibit 2
          </p>
        </div>

        {/* Definition rows */}
        <dl className="divide-y divide-line px-6 md:px-10">
          {FIELDS.map((field, i) => {
            const hasNote = i in ANNOTATIONS
            if (hasNote) hotspotNo += 1
            const no = hotspotNo
            const isOpen = openHotspot === i
            return (
              <div
                key={field.label}
                className="relative py-4"
                onMouseLeave={() => {
                  if (isOpen) setOpenHotspot(null)
                }}
              >
                <div className="flex gap-3 md:gap-5">
                  <span className="w-6 shrink-0 pt-0.5">
                    {hasNote && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`Annotation ${no} on ${field.label}`}
                        data-cursor="READ"
                        onClick={() => {
                          setInteracted(true)
                          setOpenHotspot(isOpen ? null : i)
                        }}
                        onMouseEnter={() => {
                          setInteracted(true)
                          setOpenHotspot(i)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setOpenHotspot(null)
                            e.currentTarget.blur()
                          }
                        }}
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full bg-exception font-mono text-[10px] font-semibold text-paper transition-transform duration-150 hover:scale-110',
                          !interacted && 'animate-pulse-dot',
                        )}
                        style={
                          !interacted
                            ? { animationDuration: '1.6s' }
                            : undefined
                        }
                      >
                        {no}
                      </button>
                    )}
                  </span>
                  <dt className="w-32 shrink-0 pt-0.5 font-mono text-[10.5px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-ink-faint md:w-44">
                    {field.label}
                  </dt>
                  <dd className="text-[14px] leading-relaxed text-ink">
                    {field.value}
                  </dd>
                </div>
                {/* Sticky-note annotation in the margin */}
                <AnimatePresence>
                  {hasNote && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 4 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 26,
                      }}
                      className="absolute right-0 top-10 z-30 w-60 md:-right-6"
                    >
                      <StickyNote rotate={no % 2 === 0 ? 1.5 : -1.5}>
                        {ANNOTATIONS[i]}
                      </StickyNote>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </dl>

        {/* Cross-references + stamp footer */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line px-6 py-5 md:px-10">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              Cross-references
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-soft">
              Evidence at WP E-14 to E-22:
              {CROSS_REFS.map((c) => (
                <span key={c.ref} onClick={onCrossRef}>
                  <EvidenceChip definition={c.def}>{c.ref}</EvidenceChip>
                </span>
              ))}
              <span className="font-mono text-[11px] text-ink-faint">
                (click to locate on the request list ↑)
              </span>
            </p>
          </div>
          <Stamp color="ok" rotate={-6} className="shrink-0">
            Conclusion: Effective
            <br />
            w/ deviation
          </Stamp>
        </div>
      </div>
    </div>
  )
}
