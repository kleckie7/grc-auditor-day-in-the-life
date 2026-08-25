import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpDown, Search } from 'lucide-react'
import StatusPill from '@/components/StatusPill'
import StickyNote from '@/components/StickyNote'
import SourceTag from '@/components/SourceTag'
import { cn } from '@/lib/utils'

type Status = 'received' | 'partial' | 'open'

interface PbcRow {
  id: string
  area: string
  request: string
  owner: string
  due: string
  dueDay: number
  status: Status
}

/** Verbatim 10-row slice of the request list (info.md § over-the-shoulder). */
const ROWS: PbcRow[] = [
  { id: 'PBC-01', area: 'Access mgmt', request: 'Complete user access listing from the IdP plus key in-scope systems — system-generated export with visible query criteria', owner: 'IT Ops', due: 'Oct 3', dueDay: 3, status: 'received' },
  { id: 'PBC-02', area: 'Access mgmt', request: 'Q1–Q3 quarterly access-review records, including reviewer sign-off and remediation proof for removed access', owner: 'IT Manager', due: 'Oct 3', dueDay: 3, status: 'partial' },
  { id: 'PBC-03', area: 'Access mgmt', request: 'Offboarding records for all terminated employees in the period, cross-referenced to HR termination dates', owner: 'HR + IT', due: 'Oct 3', dueDay: 3, status: 'open' },
  { id: 'PBC-04', area: 'Change mgmt', request: 'Complete population of production changes for the audit period (change log export)', owner: 'Eng Ops', due: 'Oct 6', dueDay: 6, status: 'received' },
  { id: 'PBC-05', area: 'Change mgmt', request: 'Approvals, testing/UAT evidence, and deployment logs for the 25 sampled changes (sample list attached)', owner: 'Eng Ops', due: 'Oct 10', dueDay: 10, status: 'open' },
  { id: 'PBC-06', area: 'Logical access', request: 'MFA configuration evidence for production systems and admin consoles', owner: 'Security', due: 'Oct 6', dueDay: 6, status: 'received' },
  { id: 'PBC-07', area: 'Security ops', request: 'Vulnerability scan reports for the period with remediation tracking', owner: 'Security', due: 'Oct 6', dueDay: 6, status: 'open' },
  { id: 'PBC-08', area: 'Security ops', request: 'Latest penetration test report and evidence of remediation for critical findings', owner: 'Security', due: 'Oct 10', dueDay: 10, status: 'open' },
  { id: 'PBC-09', area: 'Governance', request: 'Signed policies with version and approval dates; onboarding artifacts (policy acknowledgment, training completion) for the 5 sampled new hires', owner: 'Compliance', due: 'Oct 10', dueDay: 10, status: 'partial' },
  { id: 'PBC-10', area: 'Resilience', request: 'Backup success logs, a restore-test record, and DR tabletop records with dated participants', owner: 'IT Ops', due: 'Oct 13', dueDay: 13, status: 'open' },
]

/**
 * Per-area sampling-protocol note for the row detail drawer — fragments of
 * the verbatim "How the sampling protocol works" copy (info.md).
 */
const AREA_NOTES: Record<string, string> = {
  'Access mgmt':
    'Population first: the client provides the complete population as a system-generated export with visible query criteria — not a hand-picked spreadsheet — and the auditor tests population completeness first.',
  'Change mgmt':
    'The auditor tests population completeness first, then picks the samples — the client never picks its own. The client then produces the per-item artifacts.',
  'Logical access':
    'Every piece of evidence must be dated inside the audit window — file metadata gets checked.',
  'Security ops':
    'File metadata gets checked, and retroactively created evidence destroys credibility.',
  Governance:
    'The client produces the per-item artifacts, and every piece of evidence must be dated inside the audit window.',
  Resilience:
    'Every piece of evidence must be dated inside the audit window; retroactively created evidence destroys credibility.',
}

const FILTERS = ['all', 'received', 'partial', 'open'] as const
type Filter = (typeof FILTERS)[number]

const SAMPLING_FLOW = [
  'Complete population',
  'Completeness test',
  'Auditor picks samples',
  'Evidence dated in-window',
]

const ROW_GRID =
  'md:grid md:grid-cols-[72px_110px_minmax(0,1fr)_96px_72px_104px] md:items-start md:gap-x-4'

/**
 * Exhibit 1 — The PBC Request List: filterable/sortable document table with
 * status filter chips (animated counts), due-date sort toggle, search, and
 * per-row sampling-protocol drawers (home.md §6). Framer-only component.
 */
export default function PbcGrid({ pulseKey }: { pulseKey: number }) {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  /** null = verbatim table order; otherwise due-date sort direction. */
  const [sortDesc, setSortDesc] = useState<boolean | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [pulsing, setPulsing] = useState(false)

  // Cross-reference pulse from the workpaper exhibit (scroll-sync highlight).
  useEffect(() => {
    if (pulseKey === 0) return
    setPulsing(true)
    const t = window.setTimeout(() => setPulsing(false), 1600)
    return () => window.clearTimeout(t)
  }, [pulseKey])

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: ROWS.length, received: 0, partial: 0, open: 0 }
    for (const r of ROWS) c[r.status] += 1
    return c
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = ROWS.filter(
      (r) =>
        (filter === 'all' || r.status === filter) &&
        (q === '' ||
          `${r.id} ${r.area} ${r.request} ${r.owner} ${r.due}`
            .toLowerCase()
            .includes(q)),
    )
    if (sortDesc === null) return rows
    return [...rows].sort((a, b) =>
      sortDesc ? b.dueDay - a.dueDay : a.dueDay - b.dueDay,
    )
  }, [filter, query, sortDesc])

  return (
    <div>
      {/* Document surface */}
      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-paper-raised transition-shadow duration-300',
          pulsing
            ? 'border-track-c shadow-[0_0_0_3px_rgba(74,79,216,0.35),0_1px_0_rgba(25,27,30,.04),0_12px_32px_-16px_rgba(25,27,30,.18)]'
            : 'border-line shadow-paper',
        )}
      >
        {/* Mono document header bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper px-5 py-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
            Engagement: SOC 2 Type II — FY2026 · Request List (10 of 187 shown)
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
            Exhibit 1
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
          <div
            role="group"
            aria-label="Filter by status"
            className="flex flex-wrap items-center gap-1.5"
            data-cursor="FILTER"
          >
            {FILTERS.map((f) => {
              const isOn = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150',
                    isOn
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line bg-paper-raised text-ink-soft hover:border-ink-faint',
                  )}
                >
                  {f}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={counts[f]}
                      initial={reduced ? false : { y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'inline-block min-w-[1.2em] text-center',
                        isOn ? 'text-paper/70' : 'text-ink-faint',
                      )}
                    >
                      {counts[f]}
                    </motion.span>
                  </AnimatePresence>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              setSortDesc((v) => (v === null ? false : !v))
            }
            data-cursor="FILTER"
            aria-pressed={sortDesc !== null}
            className="inline-flex items-center gap-1.5 rounded-[4px] border border-line bg-paper-raised px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft transition-colors duration-150 hover:border-ink-faint"
          >
            <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
            Due {sortDesc === null ? '⇅' : sortDesc ? '↓' : '↑'}
          </button>
          <label className="relative ml-auto block min-w-[180px] flex-1 sm:flex-none">
            <span className="sr-only">Filter requests</span>
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="filter requests…"
              className="w-full rounded-[4px] border border-line bg-paper py-1.5 pl-8 pr-2 font-mono text-[12px] text-ink placeholder:text-ink-faint focus:border-track-c focus:outline-none sm:w-56"
            />
          </label>
        </div>

        {/* Header row (desktop) */}
        <div
          className={cn(
            ROW_GRID,
            'hidden border-b border-line bg-paper px-5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint',
          )}
          aria-hidden="true"
        >
          <span>#</span>
          <span>Control area</span>
          <span>Request</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        <motion.ul layout className="divide-y divide-line">
          <AnimatePresence initial={false}>
            {visible.map((row, i) => {
              const isOpen = openId === row.id
              return (
                <motion.li
                  layout
                  key={row.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{
                    duration: 0.3,
                    delay: reduced ? 0 : Math.min(i * 0.04, 0.4),
                    layout: { duration: 0.3 },
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : row.id)}
                    data-cursor="READ"
                    className={cn(
                      ROW_GRID,
                      'block w-full px-5 py-3.5 text-left transition-colors duration-150 hover:bg-highlight',
                      isOpen && 'bg-highlight',
                    )}
                  >
                    <span className="font-mono text-[12px] font-semibold text-track-c">
                      {row.id}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft md:mt-0">
                      <span className="mr-1 text-ink-faint md:hidden">Area · </span>
                      {row.area}
                    </span>
                    <span className="mt-1 block text-[14px] leading-snug text-ink md:mt-0">
                      {row.request}
                    </span>
                    <span className="mt-1 block text-[13px] text-ink-soft md:mt-0">
                      <span className="text-ink-faint md:hidden">Owner · </span>
                      {row.owner}
                    </span>
                    <span className="mt-1 block font-mono text-[12px] text-ink-soft md:mt-0">
                      <span className="text-ink-faint md:hidden">Due · </span>
                      {row.due}
                    </span>
                    <span className="mt-2 block md:mt-0">
                      <StatusPill status={row.status} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line bg-highlight/60 px-5 py-4">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                            Sampling protocol — {row.area}
                          </p>
                          <p className="mt-1.5 max-w-measure text-[13.5px] leading-relaxed text-ink-soft">
                            {AREA_NOTES[row.area]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
        {visible.length === 0 && (
          <p className="px-5 py-8 text-center font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
            No requests match this filter
          </p>
        )}
      </div>

      {/* Sampling protocol strip */}
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            How the sampling protocol works
          </p>
          <ol className="mt-3 flex flex-wrap items-center gap-2">
            {SAMPLING_FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="font-mono text-ink-faint">
                    →
                  </span>
                )}
                <span className="rounded-[4px] border border-line bg-paper-raised px-2.5 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-measure font-display text-[17px] italic leading-snug text-ink">
            &ldquo;The auditor picks the samples — the client never picks its
            own.&rdquo;
          </p>
          <p className="mt-2 max-w-measure text-[13.5px] leading-relaxed text-ink-soft">
            Manage this list badly and the whole engagement slips: unmanaged
            PBC lists are the single most common reason fieldwork runs late{' '}
            <SourceTag>(safeguard.sh)</SourceTag>.
          </p>
        </div>
        <StickyNote rotate={1.5} className="md:mt-6">
          Unmanaged PBC lists = #1 reason fieldwork slips
        </StickyNote>
      </div>
    </div>
  )
}
