import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TRACK_LIST } from '@/lib/tracks'
import { useScrollContext, useActiveTheme } from '@/lib/scroll-context'
import type { SectionId } from '@/lib/scroll-context'

const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'tracks', label: 'Tracks' },
  { id: 'journey', label: 'Journey' },
  { id: 'the-day', label: 'The Day' },
  { id: 'lifecycles', label: 'Lifecycles' },
  { id: 'artifacts', label: 'Artifacts' },
  { id: 'ladder', label: 'Ladder' },
  { id: 'interview', label: 'Interview' },
]

/**
 * Navbar — sticky top nav (64px): wordmark left, anchor links center,
 * three-dot track legend right, scroll-progress hairline underneath
 * (design.md §6). Sticky in normal flow — no overlay/fixed positioning.
 * Inverts on carbon sections via the active section's theme.
 */
export default function Navbar() {
  const { activeSection, visibleTracks, scrollToSection } = useScrollContext()
  const theme = useActiveTheme()
  const dark = theme === 'carbon'
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 26 })

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 border-b backdrop-blur-md transition-colors duration-300',
        dark
          ? 'border-carbon-line bg-carbon/80 text-paper'
          : 'border-line bg-paper/80 text-ink',
      )}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between gap-4 px-4 md:px-8">
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.1em]"
        >
          GRC<span className="text-exception">//</span>A DAY IN THE LIFE
        </button>

        {/* Section anchor links */}
        <nav
          aria-label="Sections"
          className="hidden items-center gap-5 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'relative py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] transition-colors',
                  active
                    ? dark
                      ? 'text-paper'
                      : 'text-ink'
                    : 'text-ink-faint hover:text-ink',
                  dark && !active && 'hover:text-paper',
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-0.5',
                      dark ? 'bg-paper' : 'bg-ink',
                    )}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Track legend: pulses the relevant color when a track element is in view */}
        <div
          className="flex shrink-0 items-center gap-1.5"
          aria-label="Track legend"
          title={TRACK_LIST.map((t) => `${t.letter} — ${t.name}`).join('  ·  ')}
        >
          {TRACK_LIST.map((t) => {
            const lit = visibleTracks.has(t.key)
            return (
              <span
                key={t.key}
                className="relative flex h-4 w-4 items-center justify-center"
              >
                <span
                  className={cn(
                    'font-mono text-[10px] font-semibold',
                    dark ? 'text-ink-faint' : 'text-ink-soft',
                  )}
                >
                  {t.letter}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-1 h-1 w-1 rounded-full transition-opacity',
                    lit && 'animate-pulse-dot',
                  )}
                  style={{
                    backgroundColor: dark ? t.hexOnDark : t.hex,
                    opacity: lit ? 1 : 0.3,
                  }}
                />
              </span>
            )
          })}
        </div>
      </div>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 bottom-0 h-px origin-left',
          dark ? 'bg-paper' : 'bg-ink',
        )}
        style={{ scaleX: progress }}
      />
    </header>
  )
}
