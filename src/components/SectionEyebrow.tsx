import { cn } from '@/lib/utils'

/**
 * SectionEyebrow — Plex Mono 12px uppercase, 0.1em tracking, preceded by a
 * 24px hairline. Format: `01 / THE THREE TRACKS` (design.md §7).
 */
export default function SectionEyebrow({
  index,
  label,
  dark = false,
  className,
}: {
  /** Zero-padded section number, e.g. "01" */
  index: string
  label: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn('h-px w-6', dark ? 'bg-carbon-line' : 'bg-line')}
      />
      <span
        className={cn(
          'font-mono text-xs font-semibold uppercase tracking-[0.1em]',
          dark ? 'text-ink-faint' : 'text-ink-soft',
        )}
      >
        {index} / {label}
      </span>
    </div>
  )
}
