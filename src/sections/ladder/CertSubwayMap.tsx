import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SourceTag from '@/components/SourceTag'
import { CERTS } from './data'
import { TRACKS } from '@/lib/tracks'
import { cn } from '@/lib/utils'

/**
 * Certification subway map (home.md §7): three track-colored lines running
 * entry → leadership, cert stations on the lines, CISA as the shared
 * interchange, CISSP cross-platform near the CISO terminus, CPA as a dashed
 * branch spur off Line C.
 */

const W = 1060
const H = 470

const A = TRACKS.a.hex // emerald — Line A: GRC
const B = TRACKS.b.hex // amber   — Line B: SOX / IA
const C = TRACKS.c.hex // indigo — Line C: External

const cert = (id: string) => CERTS.find((c) => c.id === id)!

interface StationDef {
  id: string
  x: number
  y: number
  label: string
  labelPos: 'above' | 'below'
  color: string
  interchange?: boolean
  dashed?: boolean
  /** Tooltip content — verbatim cert-table detail */
  tip: { title: string; cost?: ReactNode; experience?: ReactNode; when: ReactNode }
}

function certTip(id: string, titleOverride?: string) {
  const c = cert(id)
  return {
    title: titleOverride ?? (c.org ? `${c.name} (${c.org})` : c.name),
    cost: c.cost,
    experience: c.experience,
    when: c.when,
  }
}

const STATIONS: StationDef[] = [
  // ── Line A (GRC): Security+/CC → CGRC → CRISC → CISA → CISM ──
  { id: 'secplus', x: 200, y: 110, label: 'Security+ / CC', labelPos: 'above', color: A, tip: certTip('secplus') },
  {
    id: 'cgrc',
    x: 310,
    y: 110,
    label: 'CGRC',
    labelPos: 'below',
    color: A,
    tip: {
      title: 'CGRC',
      cost: '$599',
      when: (
        <>
          A rung on the recommended career-changer ladder: Security+ → CGRC ($599) → CRISC or CISA
          → CISM <SourceTag>(mycybersecuritypath.com, Mar 2026)</SourceTag>
        </>
      ),
    },
  },
  { id: 'crisc', x: 430, y: 110, label: 'CRISC', labelPos: 'above', color: A, tip: certTip('crisc') },
  { id: 'cisa-a', x: 600, y: 110, label: '', labelPos: 'above', color: A, interchange: true, tip: certTip('cisa') },
  { id: 'cism', x: 720, y: 110, label: 'CISM', labelPos: 'below', color: A, tip: certTip('cism') },
  {
    id: 'cissp',
    x: 810,
    y: 110,
    label: 'CISSP',
    labelPos: 'above',
    color: A,
    interchange: true,
    tip: certTip('cissp'),
  },
  // ── Line B (SOX/IA): CISA → CIA → CAE ──
  { id: 'cisa-b', x: 600, y: 230, label: '', labelPos: 'above', color: B, interchange: true, tip: certTip('cisa') },
  { id: 'cia', x: 740, y: 230, label: 'CIA', labelPos: 'below', color: B, tip: certTip('cia') },
  // ── Line C (External): ISO 27001 LA → CISA → Partner; CPA spur ──
  { id: 'iso-la', x: 270, y: 350, label: 'ISO 27001 Lead Auditor', labelPos: 'below', color: C, tip: certTip('iso-la') },
  { id: 'cisa-c', x: 600, y: 350, label: '', labelPos: 'above', color: C, interchange: true, tip: certTip('cisa') },
  {
    id: 'cpa',
    x: 790,
    y: 420,
    label: 'CPA',
    labelPos: 'below',
    color: C,
    dashed: true,
    tip: certTip('cpa'),
  },
]

/** Per-station label anchor offsets. */
function labelAnchor(s: StationDef) {
  return {
    x: s.x,
    y: s.labelPos === 'above' ? s.y - 20 : s.y + 32,
  }
}

export default function CertSubwayMap() {
  const [active, setActive] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const activeStation = STATIONS.find((s) => s.id === active)

  const lineProps = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1.2, delay, ease: 'easeInOut' as const },
        }

  const stationProps = (order: number) =>
    reduced
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { type: 'spring' as const, stiffness: 260, damping: 20, delay: 0.3 + order * 0.09 },
        }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Certification subway map. Three lines run from entry level to leadership. Line A (GRC, emerald): Security Plus or CC, CGRC, CRISC, CISA interchange, CISM, CISSP interchange, ending at CISO, CRO, or VP Compliance. Line B (internal audit, amber): CISA interchange, CIA, ending at CAE. Line C (external, indigo): ISO 27001 Lead Auditor, CISA interchange, ending at Partner, with a dashed CPA spur required only to sign SOC reports. CISA is the shared interchange station expected by senior level on all tracks."
        className="h-auto w-full"
      >
        {/* ── Track lines ── */}
        <motion.path d="M 60 110 H 940" stroke={A} strokeWidth={5} fill="none" strokeLinecap="round" {...lineProps(0)} />
        <motion.path d="M 60 230 H 940" stroke={B} strokeWidth={5} fill="none" strokeLinecap="round" {...lineProps(0.3)} />
        <motion.path d="M 60 350 H 940" stroke={C} strokeWidth={5} fill="none" strokeLinecap="round" {...lineProps(0.6)} />
        {/* CISA vertical interchange connector */}
        <motion.path d="M 600 110 V 350" stroke="#191B1E" strokeWidth={4} fill="none" {...lineProps(0.9)} />
        {/* CISSP cross-platform connector (Line A ⇄ Line B) */}
        <motion.path d="M 810 110 V 230" stroke="#8A8F98" strokeWidth={2.5} strokeDasharray="5 5" fill="none" {...lineProps(1.0)} />
        {/* CPA dashed branch spur off Line C */}
        <motion.path d="M 720 350 C 750 370 770 390 790 420" stroke={C} strokeWidth={3} strokeDasharray="6 6" fill="none" {...lineProps(1.1)} />

        {/* ── Entry roundels ── */}
        {[
          { y: 110, color: A },
          { y: 230, color: B },
          { y: 350, color: C },
        ].map(({ y, color }) => (
          <g key={y}>
            <circle cx={60} cy={y} r={10} fill="none" stroke={color} strokeWidth={4} />
            <text x={60} y={y - 20} textAnchor="middle" className="fill-ink-faint font-mono" fontSize={10} letterSpacing={1.5}>
              ENTRY
            </text>
          </g>
        ))}

        {/* ── Terminus roundels ── */}
        {[
          { y: 110, color: A, label: 'CISO · CRO · VP COMPLIANCE', labelY: 82 },
          { y: 230, color: B, label: 'CAE', labelY: 268 },
          { y: 350, color: C, label: 'PARTNER', labelY: 388 },
        ].map(({ y, color, label, labelY }) => (
          <g key={y}>
            <circle cx={940} cy={y} r={11} fill={color} stroke="#F6F2EA" strokeWidth={3} />
            <text x={940} y={labelY} textAnchor="middle" className="fill-ink font-mono font-semibold" fontSize={11} letterSpacing={1}>
              {label}
            </text>
          </g>
        ))}

        {/* ── CISA interchange label ── */}
        <text x={560} y={160} textAnchor="end" className="fill-ink font-display font-semibold" fontSize={22}>
          CISA
        </text>
        <text x={560} y={178} textAnchor="end" className="fill-ink-faint font-mono" fontSize={9.5} letterSpacing={1}>
          EXPECTED BY SENIOR — ALL TRACKS
        </text>
        {/* CPA spur caption */}
        <text x={806} y={414} textAnchor="start" className="fill-ink-faint font-mono" fontSize={9} letterSpacing={0.8}>
          REQUIRED ONLY TO
        </text>
        <text x={806} y={427} textAnchor="start" className="fill-ink-faint font-mono" fontSize={9} letterSpacing={0.8}>
          SIGN SOC REPORTS
        </text>

        {/* ── Stations (interactive) ── */}
        {STATIONS.map((s, i) => {
          const lp = labelAnchor(s)
          return (
            <motion.g
              key={s.id}
              {...stationProps(i)}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <g
                tabIndex={0}
                role="button"
                aria-label={`${s.tip.title} station — view certification details`}
                data-cursor="READ"
                className="cursor-pointer outline-none"
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((v) => (v === s.id ? null : s.id))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive((v) => (v === s.id ? null : s.id))
                  }
                }}
              >
                {/* generous hit area */}
                <circle cx={s.x} cy={s.y} r={20} fill="transparent" />
                {s.interchange ? (
                  <motion.g
                    initial={reduced ? false : { rotate: 90 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  >
                    <circle cx={s.x} cy={s.y} r={12} fill="#FCFAF5" stroke="#191B1E" strokeWidth={3} />
                    <circle cx={s.x} cy={s.y} r={5} fill={s.color} />
                  </motion.g>
                ) : (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={s.dashed ? 6 : 7}
                    fill="#FCFAF5"
                    stroke={s.color}
                    strokeWidth={3.5}
                    strokeDasharray={s.dashed ? '3 3' : undefined}
                  />
                )}
                {s.label && (
                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    className={cn('font-mono', s.interchange ? 'fill-ink font-semibold' : 'fill-ink-soft')}
                    fontSize={11}
                    letterSpacing={0.5}
                  >
                    {s.label}
                  </text>
                )}
              </g>
            </motion.g>
          )
        })}
      </svg>

      {/* ── Station tooltip (HTML overlay) ── */}
      <AnimatePresence>
        {activeStation && (
          <motion.div
            key={activeStation.id}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={cn(
              'pointer-events-none absolute z-40 w-72 rounded-[10px] border border-line bg-paper-raised p-4 shadow-paper',
              activeStation.x > W * 0.62 ? '-translate-x-full' : '',
              activeStation.y > H * 0.6 ? '-translate-y-full' : '',
            )}
            style={{
              left: `${(activeStation.x / W) * 100}%`,
              top: `${(activeStation.y / H) * 100}%`,
            }}
          >
            <p className="font-display text-[16px] font-semibold text-ink">
              {activeStation.tip.title}
            </p>
            {activeStation.tip.cost && (
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Cost ·{' '}
                </span>
                {activeStation.tip.cost}
              </p>
            )}
            {activeStation.tip.experience && (
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Experience ·{' '}
                </span>
                {activeStation.tip.experience}
              </p>
            )}
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                When it matters ·{' '}
              </span>
              {activeStation.tip.when}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
