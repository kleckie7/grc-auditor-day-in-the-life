import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Flag } from 'lucide-react'
import { LEVELS } from './data'
import type { LadderLevel } from './data'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

/** Step block heights (px) — the ascending staircase profile. */
const STEP_HEIGHTS = [168, 208, 248, 288, 328]
const STAIRCASE_HEIGHT = 348

function StepTooltip({
  level,
  alignEnd,
}: {
  level: LadderLevel
  alignEnd: boolean
}) {
  return (
    <motion.div
      id={`ladder-tip-${level.id}`}
      role="tooltip"
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={cn(
        'pointer-events-none absolute bottom-full z-40 mb-3 w-72 rounded-[10px] border border-line bg-paper-raised p-4 text-left shadow-paper',
        alignEnd ? 'right-0' : 'left-0',
      )}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        What you&rsquo;re expected to do
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{level.expect}</p>
      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        US pay range
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{level.pay}</p>
    </motion.div>
  )
}

function Step({ level, index }: { level: LadderLevel; index: number }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const alignEnd = index >= 3

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: EASE }}
      className="relative flex-1"
      style={{ minWidth: 128 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {level.flag && (
        <Flag
          aria-hidden="true"
          className="absolute -top-7 right-2 h-5 w-5 text-exception"
          fill="currentColor"
          strokeWidth={1.5}
        />
      )}
      <button
        type="button"
        data-cursor="PAY"
        aria-expanded={open}
        aria-describedby={open ? `ladder-tip-${level.id}` : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full flex-col rounded-t-[10px] border border-b-2 border-line border-b-ink/20 bg-paper-raised p-3 text-left shadow-paper transition-colors duration-150 hover:bg-highlight',
          open && 'bg-highlight',
        )}
        style={{ height: STEP_HEIGHTS[index] }}
      >
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          {level.years}
        </span>
        <span className="mt-1 font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-ink md:text-[19px]">
          {level.name}
        </span>
        {level.cisaGate && (
          <span className="mt-2 inline-flex w-fit items-center rounded-[4px] border border-track-b bg-track-b/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-track-b">
            CISA gate
          </span>
        )}
        <span className="mt-auto font-display text-[22px] font-semibold leading-none text-ink md:text-[26px]">
          {level.band}
        </span>
      </button>
      <AnimatePresence>{open && <StepTooltip level={level} alignEnd={alignEnd} />}</AnimatePresence>
    </motion.div>
  )
}

/** The small figure climbing as the steps complete. */
function Climber() {
  const reduced = useReducedMotion()
  const lastTop = STEP_HEIGHTS[STEP_HEIGHTS.length - 1]

  if (reduced) {
    return (
      <span
        aria-hidden="true"
        className="absolute flex -translate-x-1/2 flex-col items-center"
        style={{ left: '90%', bottom: lastTop + 4 }}
      >
        <span className="rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-paper">
          You
        </span>
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-exception" />
      </span>
    )
  }

  return (
    <motion.span
      aria-hidden="true"
      className="absolute flex -translate-x-1/2 flex-col items-center"
      initial={{
        left: '10%',
        bottom: STEP_HEIGHTS[0] + 4,
        opacity: 0,
      }}
      whileInView={{
        left: ['10%', '30%', '50%', '70%', '90%'],
        bottom: [
          STEP_HEIGHTS[0] + 4,
          STEP_HEIGHTS[1] + 4,
          STEP_HEIGHTS[2] + 4,
          STEP_HEIGHTS[3] + 4,
          STEP_HEIGHTS[4] + 4,
        ],
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.4,
        delay: 0.5,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeInOut',
      }}
    >
      <span className="rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-paper">
        You
      </span>
      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-exception" />
    </motion.span>
  )
}

/**
 * The ascending staircase diagram — hero of the Ladder section. Hover, tap,
 * or keyboard-focus a step for the verbatim expectations + pay-band detail.
 */
export default function Staircase() {
  return (
    <div
      role="img"
      aria-label="Ascending five-step career staircase: Associate/Staff (0–2 years, $55–90k), Senior (2–4, $75–125k, CISA gate), Manager (5–8, $110–180k+), Senior Manager/Director (8–12, $140–220k+), Leadership (12+, $230k–$5M)."
      className="relative"
    >
      <div className="overflow-x-auto pb-2 pt-10">
        <div
          className="relative flex min-w-[720px] items-end gap-2"
          style={{ height: STAIRCASE_HEIGHT }}
        >
          {LEVELS.map((level, i) => (
            <Step key={level.id} level={level} index={i} />
          ))}
          <Climber />
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
        Hover / tap a step for expectations + the full sourced pay range
      </p>
    </div>
  )
}
