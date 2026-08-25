import gsap from 'gsap'
import { useDiagramPlayback } from './useDiagramPlayback'
import { arcPath, polar } from './svg'
import type { DiagramSyncProps } from './types'
import AnimateButton from './AnimateButton'
import { cn } from '@/lib/utils'

const CX = 170
const CY = 170
const R = 110
const INDIGO = '#8B8FF0' // track-c on dark
const TEAL = '#4FD1C5' // teal secondary (home.md §5, fig. 3)
const FAINT = '#8A8F98'
const PAPER = '#F6F2EA'

/** Year arcs of the 3-year ring (clockwise degrees, gaps at the ticks). */
const YEAR_ARCS = [
  { a0: 320, a1: 436, labelAt: 18, label: 'YEAR 1' }, // 320° → 76° (+360)
  { a0: 440, a1: 556, labelAt: 138, label: 'YEAR 2' },
  { a0: 560, a1: 676, labelAt: 258, label: 'YEAR 3' },
]

const NODES = [
  { deg: 240, step: 0, lines: ['ISMS BUILT', '& OPERATED ≥ 3 MO'], anchor: 'end' as const },
  { deg: 266, step: 1, lines: ['STAGE 1', 'DOCS REVIEW'], anchor: 'middle' as const },
  { deg: 292, step: 2, lines: ['STAGE 2', 'CERT AUDIT'], anchor: 'start' as const },
  { deg: 216, step: 5, lines: ['RECERT', 'FULL RE-AUDIT'], anchor: 'end' as const },
]

const TICKS = [
  { deg: 78, lines: ['SURVEILLANCE', '· ~12 MO ·'], anchor: 'start' as const },
  { deg: 198, lines: ['SURVEILLANCE', '· ~24 MO ·'], anchor: 'end' as const },
]

const CERT_DEG = 318

const STEP_LABELS = [
  'ISMS Built & Operated ≥ 3 Months',
  'Stage 1 — Documentation Review',
  'Stage 2 — Certification Audit',
  'Certificate Issued — 3 Years',
  'Surveillance Audits (~12 & ~24 months)',
  'Recertification',
]

/**
 * FIG. 3 — ISO 27001 CERTIFICATE CYCLE: a 3-year ring with year arcs,
 * Stage 1 → Stage 2 → rosette (certificate) nodes, two surveillance ticks
 * at ~12/~24 months, and a recertification node closing the ring
 * (home.md §5). GSAP-only component tree.
 */
export default function IsoDiagram({ active, onActive }: DiagramSyncProps) {
  const { rootRef, replay, reduced } = useDiagramPlayback(() => {
    const tl = gsap.timeline()
    // 360° sweep: year arcs draw in sequence
    tl.fromTo(
      '.iso-arc',
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.5, stagger: 0.4, ease: 'power2.inOut' },
    )
      .fromTo(
        '.iso-precert',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' },
        0,
      )
      .from(
        '.iso-node',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 0.3,
          ease: 'back.out(2)',
          stagger: 0.1,
        },
        0.2,
      )
      // Surveillance ticks pop at the ~12 / ~24 month positions
      .from('.iso-tick', { opacity: 0, y: 4, duration: 0.3, stagger: 0.15 }, '-=0.5')
      .from('.iso-label', { opacity: 0, y: 6, duration: 0.3, stagger: 0.05 }, '-=0.6')
      .from('.iso-center', { opacity: 0, duration: 0.4 }, '-=0.3')
      .from('.iso-recertdash', { opacity: 0, duration: 0.4 })
    // Traveling dash over the run-up segment — the cycle restarts (3s loop).
    gsap.to('.iso-recertdash', {
      strokeDashoffset: -24,
      duration: 3,
      repeat: -1,
      ease: 'none',
    })
    return tl
  })

  const [certX, certY] = polar(CX, CY, R, CERT_DEG)
  const certActive = active === 3

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-3 flex justify-end">
        <AnimateButton onClick={replay} hidden={reduced} />
      </div>
      <svg
        viewBox="-70 -60 480 460"
        role="group"
        aria-label="ISO 27001 certificate cycle: a three-year ring. Stage 1 documentation review and Stage 2 certification audit lead to a certificate valid three years, with surveillance audits at about 12 and 24 months and recertification restarting the cycle."
        className="mx-auto block w-full max-w-[480px]"
      >
        {/* Year arcs */}
        {YEAR_ARCS.map((a) => (
          <g key={a.label}>
            <path
              className="iso-arc"
              d={arcPath(CX, CY, R, a.a0, a.a1)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
              fill="none"
              stroke={INDIGO}
              strokeWidth={9}
              opacity={0.4}
            />
            <text
              className="iso-label"
              x={polar(CX, CY, R - 42, a.labelAt)[0]}
              y={polar(CX, CY, R - 42, a.labelAt)[1] + 3}
              textAnchor="middle"
              fill={FAINT}
              fontSize={9.5}
              fontFamily="'IBM Plex Mono', monospace"
              fontWeight={600}
              letterSpacing={2}
            >
              {a.label}
            </text>
          </g>
        ))}
        {/* Pre-cert run-up segment (ISMS → Stage 1 → Stage 2 → cert) */}
        <path
          className="iso-precert"
          d={arcPath(CX, CY, R, 218, 316)}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke={INDIGO}
          strokeWidth={9}
          opacity={0.85}
        />
        {/* Traveling dash on the run-up — recertification restarts the cycle */}
        <path
          className="iso-recertdash"
          d={arcPath(CX, CY, R, 218, 316)}
          fill="none"
          stroke={TEAL}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="4 8"
          opacity={0.8}
        />

        {/* Center label */}
        <g className="iso-center" textAnchor="middle">
          <text
            x={CX}
            y={CY - 6}
            fill={PAPER}
            fontSize={24}
            fontFamily="Fraunces, Georgia, serif"
            fontWeight={600}
          >
            3-YEAR
          </text>
          <text
            x={CX}
            y={CY + 14}
            fill={FAINT}
            fontSize={9}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={2}
          >
            CERTIFICATE CYCLE
          </text>
        </g>

        {/* Surveillance ticks at ~12 / ~24 months (step 5) */}
        {TICKS.map((t) => {
          const [x1, y1] = polar(CX, CY, R + 8, t.deg)
          const [x2, y2] = polar(CX, CY, R + 20, t.deg)
          const [lx, ly] = polar(CX, CY, R + 30, t.deg)
          const isActive = active === 4
          return (
            <g
              key={t.deg}
              className="iso-tick"
              role="button"
              tabIndex={0}
              aria-label={`Step 5: ${STEP_LABELS[4]}`}
              data-cursor="READ"
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onActive(4)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(4)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(isActive ? null : 4)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onActive(isActive ? null : 4)
                }
              }}
            >
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={TEAL}
                strokeWidth={isActive ? 4 : 2.5}
                strokeLinecap="round"
                style={{ transition: 'stroke-width 150ms' }}
              />
              <text
                className="iso-label"
                x={lx}
                y={ly}
                textAnchor={t.anchor}
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight={600}
                letterSpacing={0.8}
              >
                <tspan x={lx} dy={0} fill={TEAL} fontSize={9.5}>
                  {t.lines[0]}
                </tspan>
                <tspan x={lx} dy={12} fill={FAINT} fontSize={9}>
                  {t.lines[1]}
                </tspan>
              </text>
            </g>
          )
        })}

        {/* Certificate rosette (step 4) */}
        <g
          className="iso-node"
          role="button"
          tabIndex={0}
          aria-label={`Step 4: ${STEP_LABELS[3]}`}
          data-cursor="READ"
          style={{ cursor: 'pointer', outline: 'none' }}
          onMouseEnter={() => onActive(3)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(3)}
          onBlur={() => onActive(null)}
          onClick={() => onActive(certActive ? null : 3)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onActive(certActive ? null : 3)
            }
          }}
        >
          <circle cx={certX} cy={certY} r={24} fill="transparent" />
          <line
            x1={certX - 6}
            y1={certY + 6}
            x2={certX - 12}
            y2={certY + 20}
            stroke={INDIGO}
            strokeWidth={2}
          />
          <line
            x1={certX + 6}
            y1={certY + 6}
            x2={certX + 12}
            y2={certY + 20}
            stroke={INDIGO}
            strokeWidth={2}
          />
          <circle
            cx={certX}
            cy={certY}
            r={11}
            stroke={INDIGO}
            strokeWidth={2.5}
            className={cn(
              'transition-colors duration-150',
              certActive ? 'fill-track-c-dark' : 'fill-carbon-raised',
            )}
          />
          <text
            x={certX}
            y={certY + 3.5}
            textAnchor="middle"
            fontSize={10}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            className={cn(
              'pointer-events-none transition-colors duration-150',
              certActive ? 'fill-carbon' : 'fill-paper',
            )}
          >
            4
          </text>
          <text
            className="iso-label"
            x={polar(CX, CY, R + 30, CERT_DEG)[0]}
            y={polar(CX, CY, R + 30, CERT_DEG)[1]}
            textAnchor="start"
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight={600}
            letterSpacing={0.8}
          >
            <tspan
              x={polar(CX, CY, R + 30, CERT_DEG)[0]}
              dy={0}
              fill={INDIGO}
              fontSize={9.5}
            >
              CERTIFICATE ISSUED
            </tspan>
            <tspan
              x={polar(CX, CY, R + 30, CERT_DEG)[0]}
              dy={12}
              fill={FAINT}
              fontSize={9}
            >
              ISO/IEC 27001:2022
            </tspan>
          </text>
        </g>

        {/* Numbered step nodes */}
        {NODES.map((n) => {
          const [nx, ny] = polar(CX, CY, R, n.deg)
          const [lx, ly] = polar(CX, CY, R + 26, n.deg)
          const isActive = active === n.step
          return (
            <g
              key={n.deg}
              className="iso-node"
              role="button"
              tabIndex={0}
              aria-label={`Step ${n.step + 1}: ${STEP_LABELS[n.step]}`}
              data-cursor="READ"
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onActive(n.step)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(n.step)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(isActive ? null : n.step)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onActive(isActive ? null : n.step)
                }
              }}
            >
              <circle cx={nx} cy={ny} r={20} fill="transparent" />
              <circle
                cx={nx}
                cy={ny}
                r={13}
                fill="none"
                stroke={n.step === 5 ? TEAL : INDIGO}
                strokeWidth={1.5}
                className={cn(
                  'transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <circle
                cx={nx}
                cy={ny}
                r={7.5}
                stroke={n.step === 5 ? TEAL : INDIGO}
                strokeWidth={2.5}
                className={cn(
                  'transition-colors duration-150',
                  isActive
                    ? n.step === 5
                      ? 'fill-[#4FD1C5]'
                      : 'fill-track-c-dark'
                    : 'fill-carbon',
                )}
              />
              <text
                x={nx}
                y={ny + 3.5}
                textAnchor="middle"
                fontSize={9.5}
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight={600}
                className={cn(
                  'pointer-events-none transition-colors duration-150',
                  isActive ? 'fill-carbon' : 'fill-paper',
                )}
              >
                {n.step + 1}
              </text>
              <text
                className="iso-label"
                x={lx}
                y={ly}
                textAnchor={n.anchor}
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight={600}
                letterSpacing={0.8}
              >
                <tspan
                  x={lx}
                  dy={0}
                  fill={n.step === 5 ? TEAL : INDIGO}
                  fontSize={9.5}
                >
                  {n.lines[0]}
                </tspan>
                <tspan x={lx} dy={12} fill={FAINT} fontSize={9}>
                  {n.lines[1]}
                </tspan>
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
