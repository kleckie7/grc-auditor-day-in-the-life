import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Stamp — circular "REVIEWED" / "CONCLUSION: EFFECTIVE" stamp: 2px ring,
 * mono uppercase, rotated −6°, 60% opacity overlay (design.md §4/§7).
 * Use sparingly.
 */
export default function Stamp({
  children,
  color = 'ok',
  rotate = -6,
  className,
}: {
  children: ReactNode
  color?: 'ok' | 'exception'
  rotate?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none inline-flex items-center justify-center rounded-full border-2 px-4 py-3 text-center font-mono text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] opacity-60',
        color === 'ok' ? 'border-ok text-ok' : 'border-exception text-exception',
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  )
}
