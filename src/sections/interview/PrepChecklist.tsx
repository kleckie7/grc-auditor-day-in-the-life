import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Stamp from '@/components/Stamp'
import { PREP_ITEMS } from './data'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'grc-interview-prep-v1'

function loadChecked(): boolean[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return PREP_ITEMS.map(() => false)
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return PREP_ITEMS.map(() => false)
    return PREP_ITEMS.map((_, i) => parsed[i] === true)
  } catch {
    return PREP_ITEMS.map(() => false)
  }
}

/**
 * Prep checklist — 8 verbatim items as real checkboxes. Ticking fills the
 * progress bar; at 8/8 the READY stamp slams in. Persists in localStorage.
 */
export default function PrepChecklist() {
  const [checked, setChecked] = useState<boolean[]>(PREP_ITEMS.map(() => false))
  const [hydrated, setHydrated] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    setChecked(loadChecked())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      /* storage unavailable — checklist still works for the session */
    }
  }, [checked, hydrated])

  const done = checked.filter(Boolean).length
  const complete = done === PREP_ITEMS.length

  return (
    <div className="relative rounded-2xl border border-carbon-line bg-carbon-raised p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
          Interview-ready: {done}/{PREP_ITEMS.length}
        </p>
        {complete && (
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ok">
            All eight — go get it
          </p>
        )}
      </div>

      {/* progress bar */}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={PREP_ITEMS.length}
        aria-valuenow={done}
        aria-label={`Interview prep progress: ${done} of ${PREP_ITEMS.length}`}
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-carbon-line"
      >
        <motion.div
          className="h-full rounded-full bg-ok"
          initial={false}
          animate={{ width: `${(done / PREP_ITEMS.length) * 100}%` }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 26 }}
        />
      </div>

      <ul className="mt-6 space-y-1">
        {PREP_ITEMS.map((item, i) => {
          const isChecked = checked[i]
          return (
            <li key={i}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() =>
                  setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))
                }
                className={cn(
                  'group flex w-full items-start gap-3 rounded-[8px] px-3 py-3 text-left transition-colors duration-150 hover:bg-carbon',
                  isChecked && 'opacity-70',
                )}
              >
                {/* custom checkbox with drawn tick */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-150',
                    isChecked ? 'border-ok bg-ok' : 'border-ink-faint group-hover:border-paper',
                  )}
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5">
                    <motion.path
                      d="M 2.5 7.5 L 5.5 10.5 L 11.5 3.5"
                      fill="none"
                      stroke="#F6F2EA"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ pathLength: isChecked ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
                    />
                  </svg>
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink-faint">
                  <strong
                    className={cn(
                      'font-semibold text-paper',
                      isChecked && 'line-through decoration-ok/70',
                    )}
                  >
                    {item.lead}
                  </strong>{' '}
                  {item.rest}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* READY stamp at 8/8 */}
      <AnimatePresence>
        {complete && (
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 2, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-6 top-6 md:right-10 md:top-8"
          >
            <Stamp color="ok" rotate={-6}>
              Ready
            </Stamp>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
