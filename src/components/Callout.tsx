import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TRACKS } from '@/lib/tracks'
import type { TrackKey } from '@/lib/tracks'

/**
 * Callout — shared-DNA / caveat box: 1px `line` border, 4px `ink` (or track
 * color) left bar, paper-raised, Fraunces italic pull-quote styling for the
 * key sentence (design.md §7).
 */
export default function Callout({
  children,
  bar = 'ink',
  dark = false,
  className,
}: {
  children: ReactNode
  /** Left-bar color: ink or a track key. */
  bar?: 'ink' | TrackKey
  dark?: boolean
  className?: string
}) {
  const barClass =
    bar === 'ink'
      ? 'border-l-ink'
      : TRACKS[bar].borderLeft
  return (
    <aside
      className={cn(
        'rounded-[10px] border border-l-4 p-6 md:p-8',
        barClass,
        dark
          ? 'border-carbon-line bg-carbon-raised'
          : 'border-line bg-paper-raised shadow-paper',
        '[&_em]:font-display [&_em]:text-[1.1em] [&_em]:font-medium',
        className,
      )}
    >
      {children}
    </aside>
  )
}
