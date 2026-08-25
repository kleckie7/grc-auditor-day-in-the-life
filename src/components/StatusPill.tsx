import { cn } from '@/lib/utils'

/**
 * StatusPill — mono 11px uppercase pill: Received (ok dot), Partial
 * (track-b dot), Open (exception outline) (design.md §7).
 */
export default function StatusPill({
  status,
  className,
}: {
  status: 'received' | 'partial' | 'open'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]',
        status === 'received' && 'border-line bg-paper-raised text-ink-soft',
        status === 'partial' && 'border-line bg-paper-raised text-ink-soft',
        status === 'open' && 'border-exception bg-transparent text-exception',
        className,
      )}
    >
      {status !== 'open' && (
        <span
          aria-hidden="true"
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            status === 'received' ? 'bg-ok' : 'bg-track-b',
          )}
        />
      )}
      {status}
    </span>
  )
}
