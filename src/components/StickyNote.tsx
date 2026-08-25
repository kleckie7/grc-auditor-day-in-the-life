import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * StickyNote — `sticky`-yellow margin annotation: 10px radius, slight
 * rotation, torn-tape top strip, Fraunces italic handwriting-style text
 * (design.md §4/§7).
 */
export default function StickyNote({
  children,
  rotate = -1.5,
  className,
}: {
  children: ReactNode
  /** Degrees of rotation; ±1.5 recommended. */
  rotate?: number
  className?: string
}) {
  return (
    <aside
      className={cn(
        'relative max-w-xs rounded-[10px] bg-sticky p-4 pt-5 shadow-paper',
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* torn-tape strip */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[10px] w-16 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-white/50"
      />
      <p className="font-display text-[15px] font-medium italic leading-snug text-ink">
        {children}
      </p>
    </aside>
  )
}
