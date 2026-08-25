import { Flag } from 'lucide-react'
import Stamp from '@/components/Stamp'
import TrackBadge from '@/components/TrackBadge'
import { TRACKS } from '@/lib/tracks'
import { cn } from '@/lib/utils'
import type { DayTrack } from './day-data'

/** Per-track hover border (enumerated, not interpolated). */
const HOVER_BAR: Record<DayTrack['key'], string> = {
  a: 'hover:shadow-[inset_2px_0_0_0_#0E8A5F] focus-visible:shadow-[inset_2px_0_0_0_#0E8A5F]',
  b: 'hover:shadow-[inset_2px_0_0_0_#C47A12] focus-visible:shadow-[inset_2px_0_0_0_#C47A12]',
  c: 'hover:shadow-[inset_2px_0_0_0_#4A4FD8] focus-visible:shadow-[inset_2px_0_0_0_#4A4FD8]',
}

/**
 * DayRail — one track-coded vertical timeline (home.md §SECTION 4).
 * Presentational only: when `live`, the parent scrubs the rail line
 * (scaleY), the NOW marker (translateY) and toggles `opacity`/`scale`
 * classes on rows/nodes/stamp as scroll passes them. When not `live`
 * (mobile tabs, reduced motion) everything renders fully shown.
 *
 * Class hooks: .js-day-entries, .js-day-line, .js-day-now, .js-day-row,
 * .js-day-node, .js-dev-stamp.
 */
export default function DayRail({
  track,
  live,
}: {
  track: DayTrack
  live: boolean
}) {
  const meta = TRACKS[track.key]

  return (
    <div className="js-day-rail" data-track={track.key} data-live={live}>
      {/* Column header: badge + track title + day nickname */}
      <header className="flex items-center gap-3">
        <TrackBadge track={track.key} />
        <div>
          <h3 className="font-sans text-[15px] font-semibold leading-tight text-ink">
            {meta.name}
          </h3>
          <p className="font-display text-[14px] italic leading-snug text-ink-soft">
            &ldquo;{track.nickname}&rdquo;
          </p>
        </div>
      </header>

      {/* Entries + rail */}
      <ol className="js-day-entries relative mt-7 space-y-5">
        {/* vertical 2px track-colored line (draws top→down when live) */}
        <span
          aria-hidden="true"
          className={cn(
            'js-day-line absolute bottom-2 left-[45px] top-2 w-[2px] origin-top',
            meta.bg,
            live ? 'scale-y-0' : 'scale-y-100',
          )}
        />
        {/* NOW marker — travels down the rail as you scroll */}
        {live && (
          <span
            aria-hidden="true"
            className={cn(
              'js-day-now absolute left-[46px] top-2 z-10 -translate-x-1/2 rounded-[3px] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-white',
              meta.bg,
            )}
          >
            Now
          </span>
        )}

        {track.entries.map((entry) => (
          <li key={entry.time + entry.activity} className="relative">
            {/* time node dot on the rail */}
            <span
              aria-hidden="true"
              className={cn(
                'js-day-node absolute left-[40px] top-[5px] h-3 w-3 rounded-full border-2 bg-paper transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]',
                meta.border,
                live ? 'scale-0' : 'scale-100',
              )}
            />
            <div
              data-cursor="READ"
              tabIndex={0}
              className={cn(
                'js-day-row -ml-2 -mr-1 flex gap-3 rounded-[6px] px-2 py-1 transition-[opacity,background-color,transform,box-shadow] duration-500',
                HOVER_BAR[track.key],
                'hover:scale-[1.01] focus-visible:scale-[1.01]',
                live ? 'opacity-40' : 'opacity-100',
              )}
            >
              <span
                className={cn(
                  'w-10 shrink-0 pt-px text-right font-mono text-[13px] font-medium leading-snug',
                  meta.text,
                )}
              >
                {entry.time}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold leading-snug text-ink">
                  {entry.activity}
                  {entry.special === 'exception' && (
                    <span className="inline-flex items-center gap-1 rounded-[3px] border border-exception px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-exception">
                      <Flag aria-hidden="true" className="h-2.5 w-2.5" />
                      Exception
                    </span>
                  )}
                </p>
                <div
                  className={cn(
                    'mt-1 text-[14px] leading-relaxed text-ink-soft',
                    entry.special === 'deviation' &&
                      'border-l-2 border-exception pl-3',
                  )}
                >
                  <p>{entry.body}</p>

                  {entry.special === 'chat' && (
                    <div className="mt-2 flex max-w-[260px] flex-col gap-1.5">
                      <p className="w-fit rounded-[10px] rounded-bl-[2px] border border-line bg-paper-raised px-3 py-1.5 font-display text-[13px] italic leading-snug text-ink shadow-paper">
                        &ldquo;can I store this in my personal Dropbox?&rdquo;
                      </p>
                      <p className="w-fit self-end rounded-[10px] rounded-br-[2px] bg-ink px-3 py-1 font-mono text-[12px] leading-snug text-paper">
                        — no
                      </p>
                    </div>
                  )}

                  {entry.special === 'deviation' && (
                    <span
                      className={cn(
                        'js-dev-stamp mt-2 inline-block transition-all ease-out [transition-duration:250ms]',
                        live
                          ? 'scale-[1.6] -rotate-[10deg] opacity-0'
                          : '-rotate-[6deg] opacity-100',
                      )}
                    >
                      <Stamp color="exception" rotate={0}>
                        Deviation logged
                      </Stamp>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
