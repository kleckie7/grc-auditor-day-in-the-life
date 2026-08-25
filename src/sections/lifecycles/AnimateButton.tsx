import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * AnimateButton — mono `▶ ANIMATE` replay control for lifecycle diagrams
 * (home.md §5). Hidden under prefers-reduced-motion (diagrams are static).
 */
export default function AnimateButton({
  onClick,
  hidden = false,
  className,
}: {
  onClick: () => void
  hidden?: boolean
  className?: string
}) {
  if (hidden) return null
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-[4px] border border-carbon-line bg-carbon px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint transition-colors duration-150 hover:border-ink-faint hover:text-paper',
        className,
      )}
    >
      <Play className="h-3 w-3" aria-hidden="true" fill="currentColor" />
      Animate
    </button>
  )
}
