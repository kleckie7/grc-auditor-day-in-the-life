import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * DiagramFrame — shared container for all diagrams: paper-raised (or
 * carbon-raised) card, mono caption bar at the bottom (`FIG. 2 — SOX ANNUAL
 * CYCLE`), 16px radius (design.md §7).
 */
export default function DiagramFrame({
  caption,
  dark = false,
  children,
  className,
  bodyClassName,
}: {
  /** Mono caption, e.g. "FIG. 2 — SOX ANNUAL CYCLE" */
  caption: string
  dark?: boolean
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border',
        dark
          ? 'border-carbon-line bg-carbon-raised'
          : 'border-line bg-paper-raised shadow-paper',
        className,
      )}
    >
      <div className={cn('p-6 md:p-10', bodyClassName)}>{children}</div>
      <figcaption
        className={cn(
          'border-t px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] md:px-10',
          dark
            ? 'border-carbon-line text-ink-faint'
            : 'border-line text-ink-faint',
        )}
      >
        {caption}
      </figcaption>
    </figure>
  )
}
