import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { SCENARIOS, FRAMEWORK_STEPS } from './data'
import type { Scenario } from './data'
import SourceTag from '@/components/SourceTag'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function ScenarioCard({ scenario, index }: { scenario: Scenario; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // Front tilts ~4° toward the cursor before the flip (motion values — no re-render).
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const tiltX = useTransform(my, [0, 1], [4, -4])
  const tiltY = useTransform(mx, [0, 1], [-4, 4])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={reduced || flipped ? undefined : onMove}
        onMouseLeave={onLeave}
        className="h-full"
        style={
          reduced || flipped
            ? { transformStyle: 'preserve-3d' }
            : { transformStyle: 'preserve-3d', rotateX: tiltX, rotateY: tiltY }
        }
      >
        <motion.button
          type="button"
          data-cursor="FLIP"
          aria-pressed={flipped}
          aria-label={`Scenario ${scenario.n}. ${flipped ? 'Showing the strong-answer shape.' : 'Flip to reveal what a strong answer sounds like.'}`}
          onClick={() => setFlipped((v) => !v)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduced ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 22 }
          }
          className="relative block h-full min-h-[300px] w-full text-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front — dark card, verbatim scenario question */}
          <div
            aria-hidden={flipped}
            className="relative flex h-full min-h-[300px] flex-col rounded-[10px] border border-carbon-line bg-carbon-raised p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-exception">
              Scenario {scenario.n}
            </p>
            <p className="mt-4 font-display text-[19px] font-medium italic leading-snug text-paper md:text-[21px]">
              &ldquo;{scenario.question}&rdquo;
            </p>
            <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
              Hover / tap to flip
            </p>
          </div>

          {/* Back — paper card, verbatim strong-answer shape */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col overflow-y-auto rounded-[10px] border border-line bg-paper-raised p-6 shadow-paper"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ok">
              A strong answer sounds like:
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{scenario.answer}</p>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

/**
 * The signature scenarios — 5 flip cards (3+2 grid) with the 5-step
 * scenario framework strip below (home.md §8).
 */
export default function ScenarioCards() {
  return (
    <div>
      <p className="max-w-measure text-[15px] leading-relaxed text-ink-faint">
        Every strong answer follows the same skeleton —{' '}
        <strong className="text-paper">
          the 5-step scenario framework: clarify the situation → identify the risks → map the
          stakeholders → propose corrective actions → set up monitoring.
        </strong>{' '}
        Interviewers are grading the structure as much as the conclusion{' '}
        <SourceTag dark>(amdari.io; mycybersecuritypath.com)</SourceTag>.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {SCENARIOS.map((scenario, i) => (
          <div key={scenario.n} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <ScenarioCard scenario={scenario} index={i} />
          </div>
        ))}
      </div>

      {/* 5-step framework — connected chip strip */}
      <div className="mt-10 rounded-2xl border border-carbon-line bg-carbon-raised p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
          The 5-step scenario framework — structure is graded
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-y-3">
          {FRAMEWORK_STEPS.map((step, i) => (
            <span key={step} className="flex items-center">
              <span className="rounded-[4px] border border-exception/60 bg-carbon px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-paper md:text-[11px]">
                <span className="mr-1.5 text-exception">{i + 1}</span>
                {step}
              </span>
              {i < FRAMEWORK_STEPS.length - 1 && (
                <span aria-hidden="true" className="mx-1.5 font-mono text-[12px] text-ink-faint">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
