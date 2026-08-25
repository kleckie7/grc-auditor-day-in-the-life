import gsap from 'gsap'
import { useDiagramPlayback } from './useDiagramPlayback'
import { arcPath, arrowheadPath, polar } from './svg'
import type { DiagramSyncProps } from './types'
import AnimateButton from './AnimateButton'
import { cn } from '@/lib/utils'

const CX = 170
const CY = 170
const R = 112
const AMBER = '#F2B23E' // track-b on dark (design.md §2)
const FAINT = '#8A8F98'

const QUARTERS = [
  { a0: -85, a1: -5, nodeAt: -90, labelAt: -45, lines: ['Q1 · SCOPING', '& RISK ASSESSMENT'] },
  { a0: 5, a1: 85, nodeAt: 0, labelAt: 45, lines: ['Q2 · WALKTHROUGHS', '& DESIGN'] },
  { a0: 95, a1: 175, nodeAt: 90, labelAt: 135, lines: ['Q3 · TESTING', 'OPERATING EFFECTIVENESS'] },
  { a0: 185, a1: 265, nodeAt: 180, labelAt: 235, lines: ['Q4 · REMEDIATION', 'ROLL-FORWARD & REPORTING'] },
]

const STEP_LABELS = [
  'Q1 — Scoping & Risk Assessment',
  'Q2 — Walkthroughs & Design',
  'Q3 — Operating-Effectiveness Testing',
  'Q4 — Remediation, Roll-Forward & Reporting',
]

/**
 * FIG. 1 — SOX ANNUAL CYCLE: a closed circular loop, 4 quarter arcs,
 * arrowhead closing back into Q1, `FY — IT NEVER ENDS` center label,
 * outer 10-K tick at Q4 (home.md §5). GSAP-only component tree.
 */
export default function SoxDiagram({ active, onActive }: DiagramSyncProps) {
  const { rootRef, replay, reduced } = useDiagramPlayback(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      '.sox-arc',
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.4, stagger: 0.32, ease: 'power2.inOut' },
    )
      .from(
        '.sox-node',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 0.3,
          ease: 'back.out(2)',
          stagger: 0.08,
        },
        0.15,
      )
      .fromTo(
        '.sox-arrow',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' },
        '-=0.25',
      )
      .from(
        '.sox-label',
        { opacity: 0, y: 6, duration: 0.3, stagger: 0.06 },
        '-=0.5',
      )
      .from('.sox-tick', { opacity: 0, duration: 0.3 }, '-=0.25')
      .from('.sox-center', { opacity: 0, duration: 0.4 }, '-=0.3')
      .from('.sox-loopdash', { opacity: 0, duration: 0.3 })
    // Traveling dash on the loop tail — "it starts again" (infinite, 3s).
    gsap.to('.sox-loopdash', {
      strokeDashoffset: -24,
      duration: 3,
      repeat: -1,
      ease: 'none',
    })
    return tl
  })

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-3 flex justify-end">
        <AnimateButton onClick={replay} hidden={reduced} />
      </div>
      <svg
        viewBox="0 0 340 340"
        role="group"
        aria-label="SOX annual cycle: a closed loop of Q1 scoping, Q2 walkthroughs, Q3 testing, and Q4 remediation and reporting, with an arrowhead returning to Q1 and a 10-K reporting tick."
        className="mx-auto block w-full max-w-[420px]"
      >
        {/* 4 quarter arcs */}
        {QUARTERS.map((q) => (
          <path
            key={q.a0}
            className="sox-arc"
            d={arcPath(CX, CY, R, q.a0, q.a1)}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={0}
            fill="none"
            stroke={AMBER}
            strokeWidth={9}
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}
        {/* Traveling dash tail leading into the arrowhead */}
        <path
          className="sox-loopdash"
          d={arcPath(CX, CY, R, 234, 262)}
          fill="none"
          stroke="#FCFAF5"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="6 6"
          opacity={0.85}
        />
        {/* Arrowhead closing back into Q1 */}
        <path
          className="sox-arrow"
          d={arrowheadPath(CX, CY, R, 267, 10)}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke="#FCFAF5"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center label */}
        <g className="sox-center" textAnchor="middle">
          <text
            x={CX}
            y={CY - 6}
            fill="#F6F2EA"
            fontSize={30}
            fontFamily="Fraunces, Georgia, serif"
            fontWeight={600}
          >
            FY
          </text>
          <text
            x={CX}
            y={CY + 16}
            fill={FAINT}
            fontSize={9.5}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={2}
          >
            IT NEVER ENDS
          </text>
        </g>
        {/* Outer 10-K tick at Q4 */}
        <g className="sox-tick">
          <line
            x1={polar(CX, CY, R + 8, 200)[0]}
            y1={polar(CX, CY, R + 8, 200)[1]}
            x2={polar(CX, CY, R + 20, 200)[0]}
            y2={polar(CX, CY, R + 20, 200)[1]}
            stroke={FAINT}
            strokeWidth={2}
          />
          <text
            x={polar(CX, CY, R + 28, 200)[0]}
            y={polar(CX, CY, R + 28, 200)[1] + 3}
            textAnchor="end"
            fill={FAINT}
            fontSize={9.5}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={1}
          >
            10-K / 404(A) + 404(B)
          </text>
        </g>
        {/* Quarter labels */}
        {QUARTERS.map((q) => {
          const [lx, ly] = polar(CX, CY, R + 30, q.labelAt)
          return (
            <text
              key={q.labelAt}
              className="sox-label"
              x={lx}
              y={ly}
              textAnchor="middle"
              fontFamily="'IBM Plex Mono', monospace"
              fontWeight={600}
              letterSpacing={0.8}
            >
              <tspan x={lx} dy={0} fill={AMBER} fontSize={9.5}>
                {q.lines[0]}
              </tspan>
              <tspan x={lx} dy={12} fill={FAINT} fontSize={9}>
                {q.lines[1]}
              </tspan>
            </text>
          )
        })}
        {/* Step nodes (keyboard-operable, hover-synced) */}
        {QUARTERS.map((q, i) => {
          const [nx, ny] = polar(CX, CY, R, q.nodeAt)
          const isActive = active === i
          return (
            <g
              key={q.nodeAt}
              className="sox-node"
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
              <circle cx={nx} cy={ny} r={20} fill="transparent" />
              <circle
                cx={nx}
                cy={ny}
                r={14}
                fill="none"
                stroke={AMBER}
                strokeWidth={1.5}
                className={cn(
                  'transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <circle
                cx={nx}
                cy={ny}
                r={8}
                stroke={AMBER}
                strokeWidth={2.5}
                className={cn(
                  'transition-colors duration-150',
                  isActive ? 'fill-track-b-dark' : 'fill-carbon',
                )}
              />
              <text
                x={nx}
                y={ny + 3.5}
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
            </g>
          )
        })}
      </svg>
    </div>
  )
}
