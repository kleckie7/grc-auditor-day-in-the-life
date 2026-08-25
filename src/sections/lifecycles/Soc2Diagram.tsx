import gsap from 'gsap'
import { useDiagramPlayback } from './useDiagramPlayback'
import type { DiagramSyncProps } from './types'
import AnimateButton from './AnimateButton'
import { cn } from '@/lib/utils'

const INDIGO = '#8B8FF0' // track-c on dark (design.md §2)
const FAINT = '#8A8F98'
const PAPER = '#F6F2EA'
const Y = 86

const NODES = [
  { x: 70, lines: ['READINESS / GAP', '(CLIENT-SIDE)'] },
  { x: 200, lines: ['TYPE I', 'THE SNAPSHOT'] },
  { x: 330, lines: ['OBSERVATION', 'WINDOW · TYPE II'] },
  { x: 460, lines: ['FIELDWORK', '& SAMPLING'] },
] as const

const STEP_LABELS = [
  'Readiness / Gap (client-side)',
  'Type I — The Snapshot',
  'Observation Window (Type II)',
  'Fieldwork & Sampling',
  'Report Issued',
  'Annual Renewal',
]

const RENEW_PATH =
  'M 646 86 C 712 92 726 118 726 152 C 726 190 700 202 648 202 L 158 202 C 96 202 70 184 70 128'

/**
 * FIG. 2 — SOC 2 ENGAGEMENT CYCLE: horizontal line of 5 nodes (readiness →
 * Type I → observation window bracket → fieldwork → report document glyph),
 * with a dashed ANNUAL RENEWAL arrow looping back to the start
 * (home.md §5). GSAP-only component tree.
 */
export default function Soc2Diagram({ active, onActive }: DiagramSyncProps) {
  const { rootRef, replay, reduced } = useDiagramPlayback(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      '.soc2-line',
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
    )
      .from(
        '.soc2-node',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 0.3,
          ease: 'back.out(2)',
          stagger: 0.12,
        },
        0.1,
      )
      .fromTo(
        '.soc2-bracket',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.3',
      )
      .from(
        '.soc2-label',
        { opacity: 0, y: 6, duration: 0.3, stagger: 0.05 },
        '-=0.6',
      )
      .fromTo(
        '.soc2-renew',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
        '-=0.2',
      )
      .from('.soc2-renew-label', { opacity: 0, duration: 0.3 }, '-=0.2')
      .from('.soc2-renewdash', { opacity: 0, duration: 0.4 })
    // Traveling dash on the renewal loop — "it starts again" (3s loop).
    gsap.to('.soc2-renewdash', {
      strokeDashoffset: -24,
      duration: 3,
      repeat: -1,
      ease: 'none',
    })
    return tl
  })

  const renewActive = active === 5

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-3 flex justify-end">
        <AnimateButton onClick={replay} hidden={reduced} />
      </div>
      <svg
        viewBox="0 0 780 240"
        role="group"
        aria-label="SOC 2 engagement cycle: a line from readiness and gap work through a Type I snapshot, a 3-to-12-month observation window, and fieldwork to an issued report, with a dashed annual renewal arrow looping back to the start."
        className="mx-auto block w-full"
      >
        {/* Main line */}
        <path
          className="soc2-line"
          d={`M 70 ${Y} L 646 ${Y}`}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke={INDIGO}
          strokeWidth={3}
          opacity={0.9}
        />
        {/* Observation-window bracket: wide span over node 3, `3–12 MO` */}
        <path
          className="soc2-bracket"
          d="M 282 64 V 54 H 378 V 64"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke={FAINT}
          strokeWidth={2}
        />
        <text
          className="soc2-label"
          x={330}
          y={44}
          textAnchor="middle"
          fill={FAINT}
          fontSize={9.5}
          fontFamily="'IBM Plex Mono', monospace"
          fontWeight={600}
          letterSpacing={1.5}
        >
          3–12 MO
        </text>

        {/* Nodes 1–4 */}
        {NODES.map((n, i) => {
          const isActive = active === i
          return (
            <g
              key={n.x}
              className="soc2-node"
              role="button"
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${STEP_LABELS[i]}`}
              data-cursor="READ"
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onActive(i)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(i)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(isActive ? null : i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onActive(isActive ? null : i)
                }
              }}
            >
              <circle cx={n.x} cy={Y} r={20} fill="transparent" />
              <circle
                cx={n.x}
                cy={Y}
                r={14}
                fill="none"
                stroke={INDIGO}
                strokeWidth={1.5}
                className={cn(
                  'transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <circle
                cx={n.x}
                cy={Y}
                r={8}
                stroke={INDIGO}
                strokeWidth={2.5}
                className={cn(
                  'transition-colors duration-150',
                  isActive ? 'fill-track-c-dark' : 'fill-carbon-raised',
                )}
              />
              <text
                x={n.x}
                y={Y + 3.5}
                textAnchor="middle"
                fontSize={10}
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight={600}
                className={cn(
                  'pointer-events-none transition-colors duration-150',
                  isActive ? 'fill-carbon' : 'fill-paper',
                )}
              >
                {i + 1}
              </text>
              <text
                className="soc2-label"
                x={n.x}
                y={Y + 28}
                textAnchor="middle"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight={600}
                letterSpacing={0.8}
              >
                <tspan x={n.x} dy={0} fill={INDIGO} fontSize={9.5}>
                  {n.lines[0]}
                </tspan>
                <tspan x={n.x} dy={12} fill={FAINT} fontSize={9}>
                  {n.lines[1]}
                </tspan>
              </text>
            </g>
          )
        })}

        {/* Node 5 — REPORT ISSUED as a document glyph */}
        <g
          className="soc2-node"
          role="button"
          tabIndex={0}
          aria-label={`Step 5: ${STEP_LABELS[4]}`}
          data-cursor="READ"
          style={{ cursor: 'pointer', outline: 'none' }}
          onMouseEnter={() => onActive(4)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(4)}
          onBlur={() => onActive(null)}
          onClick={() => onActive(active === 4 ? null : 4)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onActive(active === 4 ? null : 4)
            }
          }}
        >
          <circle cx={590} cy={Y} r={24} fill="transparent" />
          <rect
            x={577}
            y={Y - 15}
            width={26}
            height={30}
            rx={2}
            stroke={INDIGO}
            strokeWidth={2.5}
            className={cn(
              'transition-colors duration-150',
              active === 4 ? 'fill-track-c-dark' : 'fill-carbon-raised',
            )}
          />
          <path
            d={`M 594 ${Y - 15} L 603 ${Y - 6} L 594 ${Y - 6} Z`}
            fill={INDIGO}
          />
          {[0, 1, 2].map((k) => (
            <line
              key={k}
              x1={582}
              x2={596}
              y1={Y + 1 + k * 5}
              y2={Y + 1 + k * 5}
              stroke={active === 4 ? '#14161A' : PAPER}
              strokeWidth={1.5}
              className="transition-colors duration-150"
            />
          ))}
          <text
            className="soc2-label"
            x={590}
            y={Y + 28}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={0.8}
          >
            <tspan x={590} dy={0} fill={INDIGO} fontSize={9.5}>
              REPORT ISSUED
            </tspan>
            <tspan x={590} dy={12} fill={FAINT} fontSize={9}>
              SSAE 18 / AT-C 205
            </tspan>
          </text>
        </g>

        {/* Renewal loop (step 6) */}
        <g
          role="button"
          tabIndex={0}
          aria-label={`Step 6: ${STEP_LABELS[5]}`}
          data-cursor="READ"
          style={{ cursor: 'pointer', outline: 'none' }}
          onMouseEnter={() => onActive(5)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(5)}
          onBlur={() => onActive(null)}
          onClick={() => onActive(renewActive ? null : 5)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onActive(renewActive ? null : 5)
            }
          }}
        >
          {/* fat invisible hit path */}
          <path d={RENEW_PATH} fill="none" stroke="transparent" strokeWidth={22} />
          <path
            className="soc2-renew"
            d={RENEW_PATH}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={0}
            fill="none"
            stroke={INDIGO}
            strokeWidth={2}
            opacity={renewActive ? 0.9 : 0.45}
            style={{ transition: 'opacity 150ms' }}
          />
          <path
            className="soc2-renewdash"
            d={RENEW_PATH}
            fill="none"
            stroke={PAPER}
            strokeWidth={2}
            strokeDasharray="4 8"
            strokeLinecap="round"
            opacity={renewActive ? 1 : 0.7}
            style={{ transition: 'opacity 150ms' }}
          />
          {/* arrowhead pointing back up into node 1 */}
          <path
            className="soc2-renew"
            d="M 64 136 L 70 124 L 76 136"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={0}
            fill="none"
            stroke={INDIGO}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={renewActive ? 0.9 : 0.45}
          />
          <text
            className="soc2-renew-label"
            x={390}
            y={222}
            textAnchor="middle"
            fill={renewActive ? PAPER : FAINT}
            fontSize={9.5}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={2}
            style={{ transition: 'fill 150ms' }}
          >
            ↻ ANNUAL RENEWAL
          </text>
        </g>
      </svg>
    </div>
  )
}
