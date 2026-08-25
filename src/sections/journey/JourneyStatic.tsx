import { STOPS } from './journey-data'
import StopContent from './StopContent'

/**
 * JourneyStatic — un-pinned vertical stepper for mobile and
 * prefers-reduced-motion (home.md global notes; design.md §5: scrub
 * animations become instant-shown static). No animation libraries here —
 * content renders fully visible.
 */
export default function JourneyStatic() {
  return (
    <ol className="relative mt-12 space-y-10">
      {/* static rail line */}
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-[8px] top-4 w-[2px] bg-carbon-line"
      />
      {STOPS.map((stop) => (
        <li key={stop.n} className="relative pl-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[6px] flex h-[18px] w-[18px] items-center justify-center rounded-full border border-carbon-line bg-carbon"
          >
            <span className="h-[8px] w-[8px] rounded-full bg-paper" />
          </span>
          <StopContent stop={stop} />
        </li>
      ))}
    </ol>
  )
}
