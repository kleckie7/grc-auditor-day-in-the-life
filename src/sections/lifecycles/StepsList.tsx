import { motion, useReducedMotion } from 'framer-motion'
import type { LifecycleStep } from './data'
import { cn } from '@/lib/utils'

/**
 * StepsList — ordered steps beside a lifecycle diagram. Bidirectional hover
 * sync: hovering/focusing a step highlights its diagram node (and vice
 * versa), with a Framer Motion layout highlight pill (home.md §5).
 * Framer-only component (no GSAP here).
 */
export default function StepsList({
  figId,
  steps,
  active,
  onActive,
  accent,
}: {
  /** Unique prefix for the layoutId highlight pill. */
  figId: string
  steps: LifecycleStep[]
  active: number | null
  onActive: (index: number | null) => void
  /** Track hex color (on-dark variant) used for the active marker. */
  accent: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.ol
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-20% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-1.5"
    >
      {steps.map((step, i) => {
        const isActive = active === i
        return (
          <motion.li
            key={step.title}
            variants={{
              hidden: { opacity: 0, x: 24 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="relative"
          >
            {isActive && (
              <motion.span
                layoutId={`stephl-${figId}`}
                aria-hidden="true"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="absolute inset-0 rounded-[8px] border border-carbon-line bg-white/[0.04]"
              />
            )}
            <div
              tabIndex={0}
              data-cursor="READ"
              aria-current={isActive ? 'true' : undefined}
              onMouseEnter={() => onActive(i)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(i)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(isActive ? null : i)}
              className="relative cursor-pointer rounded-[8px] px-4 py-3 outline-none transition-colors duration-150"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    'font-mono text-[11px] font-semibold tracking-[0.08em] transition-colors duration-150',
                    isActive ? '' : 'text-ink-faint',
                  )}
                  style={isActive ? { color: accent } : undefined}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4
                    className={cn(
                      'text-[15px] font-semibold leading-snug transition-colors duration-150',
                      isActive ? 'text-paper' : 'text-paper/90',
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-faint">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
