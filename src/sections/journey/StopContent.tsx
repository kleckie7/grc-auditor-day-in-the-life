import Stamp from '@/components/Stamp'
import TrackBadge from '@/components/TrackBadge'
import { TRACKS } from '@/lib/tracks'
import { cn } from '@/lib/utils'
import type { JourneyStop } from './journey-data'

/**
 * StopContent — presentational body of one journey stop, shared by the
 * pinned stepper and the static (mobile / reduced-motion) fallback.
 * No animation libraries inside — parents own all motion.
 */
export default function StopContent({
  stop,
  compact = false,
}: {
  stop: JourneyStop
  /** Tighter type scale inside the pinned stage */
  compact?: boolean
}) {
  return (
    <div className="relative">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          Stop {stop.n} / {7}
        </span>
        <span
          aria-hidden="true"
          className="h-px w-8 self-center bg-carbon-line"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          {stop.short}
        </span>
      </div>

      <h3
        className={cn(
          'mt-3 font-display font-semibold leading-[1.15] tracking-[-0.02em] text-paper',
          compact ? 'text-[24px] md:text-[30px]' : 'text-[26px] md:text-[30px]',
        )}
      >
        {stop.title}
      </h3>

      {stop.stamp && (
        <Stamp color="ok" className="absolute -top-3 right-0 hidden md:inline-flex">
          Reviewed
        </Stamp>
      )}

      <div
        className={cn(
          'mt-5 gap-8',
          compact ? 'grid lg:grid-cols-2' : 'grid md:grid-cols-2',
        )}
      >
        <p
          className={cn(
            'max-w-measure leading-[1.65] text-paper/80',
            compact ? 'text-[14.5px]' : 'text-[15px] md:text-[16px]',
          )}
        >
          {stop.body}
        </p>

        {stop.bullets && (
          <ul className="mt-5 list-none space-y-2.5 lg:mt-0">
            {stop.bullets.map((b, i) => (
              <li
                key={i}
                className={cn(
                  'flex gap-2.5 leading-relaxed text-paper/70',
                  compact ? 'text-[13.5px]' : 'text-[14px]',
                )}
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-paper/60"
                />
                <span>
                  {b.lead && (
                    <strong className="font-semibold text-paper">
                      {b.lead}{' '}
                    </strong>
                  )}
                  {b.rest}
                </span>
              </li>
            ))}
          </ul>
        )}

        {stop.subrows && (
          <div className="mt-5 space-y-3 lg:mt-0">
            {stop.subrows.map((row) => {
              const meta = TRACKS[row.track]
              return (
                <div
                  key={row.track}
                  data-track={row.track}
                  className={cn(
                    'rounded-[8px] border border-carbon-line border-l-4 bg-carbon-raised p-3.5',
                    meta.borderLeft,
                  )}
                >
                  <p className="flex items-center gap-2">
                    <TrackBadge track={row.track} variant="outline" />
                    <strong
                      className={cn(
                        'font-mono text-[11px] font-semibold uppercase tracking-[0.08em]',
                        meta.textOnDark,
                      )}
                    >
                      {row.lead.replace(/:$/, '')}
                    </strong>
                  </p>
                  <p
                    className={cn(
                      'mt-2 leading-relaxed text-paper/70',
                      compact ? 'text-[13px]' : 'text-[13.5px]',
                    )}
                  >
                    {row.rest}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
