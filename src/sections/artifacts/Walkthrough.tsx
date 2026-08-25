import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  BadgeCheck,
  BellRing,
  ChevronLeft,
  ChevronRight,
  GitPullRequest,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  Ticket,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import DiagramFrame from '@/components/DiagramFrame'
import StickyNote from '@/components/StickyNote'
import SourceTag from '@/components/SourceTag'
import { cn } from '@/lib/utils'

interface TraceNode {
  label: string
  icon: LucideIcon
  desc: string
  /** Verbatim beat from the walkthrough paragraph for this step. */
  beat: string
}

const NODES: TraceNode[] = [
  {
    label: 'Jira ticket',
    icon: Ticket,
    desc: 'One real change request, documented.',
    beat: 'It\u2019s part interview, part inspection — you\u2019re not taking their word for the process\u2026',
  },
  {
    label: 'Approval',
    icon: BadgeCheck,
    desc: 'Sign-off before anything ships.',
    beat: '\u2026you\u2019re watching the actual screens and documents\u2026',
  },
  {
    label: 'Code review',
    icon: GitPullRequest,
    desc: 'A second pair of eyes on the diff.',
    beat: '\u2026as one real item moves through them.',
  },
  {
    label: 'Deploy log',
    icon: Rocket,
    desc: 'The system record of the release.',
    beat: 'You\u2019re confirming two things: that the process as documented is real\u2026',
  },
  {
    label: 'Monitoring alert',
    icon: BellRing,
    desc: 'What fired after it went live.',
    beat: '\u2026and that the controls inside it are designed well enough to rely on.',
  },
]

/** Verbatim trace list — items up to the current step read in full ink. */
const TRACE_ITEMS = [
  'the Jira ticket',
  'the approval',
  'the code review',
  'the deployment log',
  'the monitoring alert that followed',
]

const OUTPUT_BEAT =
  'The output is a process narrative or flowchart with the key controls marked, plus a design-effectiveness conclusion — and that conclusion drives the controls-reliance decision for everything tested afterward.'

const OUTPUT_CHIPS = [
  'Process narrative + flowchart',
  'Design-effectiveness conclusion → drives controls reliance',
]

/**
 * Exhibit 3 — The Walkthrough: step-through trace player. Advancing moves
 * the auditor's-eye marker along the trace, dims other nodes, draws the
 * arrows, and shows the verbatim narration beat (home.md §6).
 * Framer-only component.
 */
export default function Walkthrough() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0) // 0–4 nodes, 5 = outputs
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(
      () => setStep((s) => Math.min(s + 1, NODES.length)),
      2600,
    )
    return () => window.clearInterval(id)
  }, [playing])

  useEffect(() => {
    if (step >= NODES.length) setPlaying(false)
  }, [step])

  const atOutputs = step >= NODES.length

  return (
    <div>
      <DiagramFrame caption="Fig. 4 — Walkthrough trace — ticket to production">
        {/* Trace: 5 node cards connected by drawn arrows */}
        <div
          className="flex flex-col items-stretch gap-2 md:flex-row md:items-center"
          role="group"
          aria-label="Walkthrough trace: Jira ticket to approval to code review to deploy log to monitoring alert"
        >
          {NODES.map((node, i) => {
            const isActive = !atOutputs && step === i
            const dim = !atOutputs && !isActive
            const Icon = node.icon
            return (
              <div
                key={node.label}
                className="flex flex-col items-center gap-2 md:flex-1 md:flex-row"
              >
                {i > 0 && (
                  <svg
                    viewBox="0 0 40 12"
                    aria-hidden="true"
                    className="h-3 w-8 rotate-90 md:w-10 md:flex-none md:rotate-0"
                  >
                    <path
                      d="M 0 6 H 34 M 29 1 L 34 6 L 29 11"
                      pathLength={1}
                      strokeDasharray={1}
                      fill="none"
                      stroke="#4A4FD8"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDashoffset: step > i - 1 || atOutputs ? 0 : 1,
                        transition: reduced
                          ? 'none'
                          : 'stroke-dashoffset 300ms ease',
                      }}
                    />
                  </svg>
                )}
                <div
                  className={cn(
                    'relative w-full flex-1 rounded-[10px] border bg-paper-raised p-3.5 transition-all duration-300',
                    isActive
                      ? 'border-track-c shadow-paper md:-translate-y-1'
                      : 'border-line',
                    dim && 'opacity-40',
                  )}
                >
                  {/* Auditor's eye marker */}
                  {isActive && (
                    <motion.span
                      layoutId="walk-eye"
                      aria-hidden="true"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 260, damping: 26 }
                      }
                      className="absolute -top-4 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-exception"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isActive ? 'text-track-c' : 'text-ink-soft',
                      )}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                      {node.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-soft">
                    {node.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <button
            type="button"
            aria-label="Previous step"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-line bg-paper-raised text-ink-soft transition-colors hover:border-ink-faint disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next step"
            onClick={() => setStep((s) => Math.min(NODES.length, s + 1))}
            disabled={atOutputs}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-line bg-paper-raised text-ink-soft transition-colors hover:border-ink-faint disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-pressed={playing}
            onClick={() => {
              if (atOutputs) setStep(0)
              setPlaying((p) => !p)
            }}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-[4px] border px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors',
              playing
                ? 'border-ink bg-ink text-paper'
                : 'border-line bg-paper-raised text-ink-soft hover:border-ink-faint',
            )}
          >
            {playing ? (
              <Pause className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Play className="h-3 w-3" aria-hidden="true" fill="currentColor" />
            )}
            {playing ? 'Pause' : 'Auto-play'}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false)
              setStep(0)
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-line bg-paper-raised px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft transition-colors hover:border-ink-faint"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset
          </button>
          <span
            aria-live="polite"
            className="ml-auto font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint"
          >
            {atOutputs
              ? 'Outputs'
              : `Step ${step + 1} / ${NODES.length} — ${NODES[step].label}`}
          </span>
        </div>

        {/* Narration beat */}
        <div className="mt-4 min-h-[96px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {!atOutputs ? (
                <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
                  You sit down with the control owner — screen shared — and
                  trace a single change from ticket to production:{' '}
                  {TRACE_ITEMS.map((item, i) => (
                    <span
                      key={item}
                      className={cn(
                        'transition-colors duration-300',
                        i <= step
                          ? 'font-semibold text-ink'
                          : 'text-ink-faint',
                      )}
                    >
                      {item}
                      {i < TRACE_ITEMS.length - 1 ? ', ' : '. '}
                    </span>
                  ))}
                  <em className="font-display text-ink">{NODES[step].beat}</em>
                </p>
              ) : (
                <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
                  <em className="font-display text-ink">{OUTPUT_BEAT}</em>{' '}
                  <SourceTag>
                    (artofservice workpaper playbook; trullion.com)
                  </SourceTag>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {atOutputs && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-3 flex flex-wrap gap-2"
              >
                {OUTPUT_CHIPS.map((chip, i) => (
                  <span
                    key={chip}
                    className={cn(
                      'rounded-[4px] border px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]',
                      i === 0
                        ? 'border-ok text-ok'
                        : 'border-track-c text-track-c',
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DiagramFrame>

      {/* Verbatim walkthrough paragraph + sticky note */}
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <p className="max-w-measure text-[15px] leading-relaxed text-ink-soft">
          You sit down with the control owner — screen shared — and trace a
          single change from ticket to production: the Jira ticket, the
          approval, the code review, the deployment log, the monitoring alert
          that followed. It&rsquo;s part interview, part inspection —
          you&rsquo;re not taking their word for the process, you&rsquo;re
          watching the actual screens and documents as one real item moves
          through them. You&rsquo;re confirming two things: that the process
          as documented is real, and that the controls inside it are designed
          well enough to rely on. The output is a process narrative or
          flowchart with the key controls marked, plus a design-effectiveness
          conclusion — and that conclusion drives the controls-reliance
          decision for everything tested afterward{' '}
          <SourceTag>(artofservice workpaper playbook; trullion.com)</SourceTag>.
        </p>
        <StickyNote rotate={-1.5}>
          You&rsquo;re watching screens, not taking their word for it.
        </StickyNote>
      </div>
    </div>
  )
}
