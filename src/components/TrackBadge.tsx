import { cn } from '@/lib/utils'
import { TRACKS } from '@/lib/tracks'
import type { TrackKey } from '@/lib/tracks'

/**
 * TrackBadge — 28px square, 4px radius, track-color fill with a white
 * Fraunces letter (A/B/C); outline variant for dark sections (design.md §7).
 */
export default function TrackBadge({
  track,
  variant = 'fill',
  className,
}: {
  track: TrackKey
  variant?: 'fill' | 'outline'
  className?: string
}) {
  const meta = TRACKS[track]
  return (
    <span
      aria-label={`Track ${meta.letter}: ${meta.name}`}
      className={cn(
        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] font-display text-sm font-semibold leading-none',
        variant === 'fill'
          ? cn(meta.bg, 'text-white')
          : cn('border bg-transparent', meta.border, meta.textOnDark),
        className,
      )}
    >
      {meta.letter}
    </span>
  )
}
