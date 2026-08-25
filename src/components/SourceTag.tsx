import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * SourceTag — ink-faint mono 11px parenthetical source attributions,
 * rendered inline exactly as written in copy; darkens on hover (design.md §7).
 */
export default function SourceTag({
  children,
  dark = false,
  className,
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-mono text-[11px] tracking-wide transition-colors duration-150',
        dark ? 'text-ink-faint hover:text-paper' : 'text-ink-faint hover:text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}
