import { cn } from '@/lib/utils'
import { SECTIONS, useScrollContext, useActiveTheme } from '@/lib/scroll-context'

/**
 * SideProgressRail — slim desktop-only rail on the right edge: 9 dots, one
 * per section, mono labels on hover (design.md §6).
 */
export default function SideProgressRail() {
  const { activeSection, scrollToSection } = useScrollContext()
  const dark = useActiveTheme() === 'carbon'

  return (
    <nav
      aria-label="Page progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {SECTIONS.map((s) => {
        const active = activeSection === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            aria-label={s.label}
            aria-current={active ? 'true' : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={cn(
                'font-mono text-[10px] font-medium uppercase tracking-[0.08em] opacity-0 transition-opacity duration-150 group-hover:opacity-100',
                active && 'opacity-100',
                dark ? 'text-ink-faint' : 'text-ink-faint',
              )}
            >
              {s.label}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all duration-200',
                active
                  ? 'scale-150 bg-exception'
                  : dark
                    ? 'bg-carbon-line group-hover:bg-ink-faint'
                    : 'bg-line group-hover:bg-ink-faint',
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}
