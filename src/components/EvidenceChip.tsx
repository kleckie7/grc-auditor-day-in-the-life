import type { ReactNode } from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * EvidenceChip — inline mono chip (`PBC-04`, `WP E-14`, `RCM`, `Vanta`):
 * 4px radius, `line` border, paper-raised fill; hover lifts 2px and shows a
 * one-line definition tooltip (design.md §7). Keyboard-operable.
 */
export default function EvidenceChip({
  children,
  definition,
  dark = false,
  className,
}: {
  children: ReactNode
  /** One-line definition shown in the hover/focus tooltip. */
  definition?: string
  dark?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className={cn('relative inline-block align-baseline', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        data-cursor="READ"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-block translate-y-0 rounded-[4px] border px-1.5 py-px font-mono text-[0.72em] font-medium leading-snug tracking-wide transition-all duration-150 hover:-translate-y-0.5',
          dark
            ? 'border-carbon-line bg-carbon-raised text-ink-faint hover:text-paper'
            : 'border-line bg-paper-raised text-ink-soft hover:text-ink',
        )}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && definition && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="absolute bottom-full left-0 z-40 mb-2 w-56 rounded-[4px] border border-line bg-paper-raised p-2.5 text-left font-sans text-[12.5px] font-normal leading-snug text-ink-soft shadow-paper"
          >
            {definition}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
