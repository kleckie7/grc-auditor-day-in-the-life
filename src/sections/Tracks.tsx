import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Clock, ShieldCheck, FileSearch } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionEyebrow from '@/components/SectionEyebrow'
import TrackBadge from '@/components/TrackBadge'
import Callout from '@/components/Callout'
import SourceTag from '@/components/SourceTag'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TRACKS } from '@/lib/tracks'
import type { TrackKey } from '@/lib/tracks'
import { cn } from '@/lib/utils'

interface TrackData {
  key: TrackKey
  icon: LucideIcon
  nickname: string
  whoYouAre: ReactNode
  answerTo: string
  duties: string[]
  dutiesSource: string
  year: string
  yearSource: string
  hours: string
  hoursSource: string
  /** 0–100 relative weekly-hours gauge fill */
  gauge: number
  gaugeLabel: string
  pickIf: string
}

const TRACK_DATA: TrackData[] = [
  {
    key: 'a',
    icon: ShieldCheck,
    nickname: 'The connective tissue',
    whoYouAre: (
      <>
        You&rsquo;re the connective tissue between security, engineering, and
        the business. You don&rsquo;t audit your company — you{' '}
        <em>run its compliance program</em> and sit on the auditee side of the
        table when external auditors show up. Job boards call this same role
        GRC Analyst, Security Compliance Analyst, IT Compliance Analyst, or
        Third-Party Compliance Analyst <SourceTag>(cybersn.com)</SourceTag>.
      </>
    ),
    answerTo:
      'A GRC, security, or compliance manager — typically rolling up to the CISO.',
    duties: [
      'Run risk assessments on new cloud apps, new systems, and new business units',
      'Draft and maintain policies — information security, acceptable use, data retention',
      'Monitor compliance against frameworks: SOC 2, ISO 27001, GDPR, HIPAA, NIST, PCI DSS',
      'Feed the audit machine: collect evidence, manage the PBC list, track remediation',
      'Assess vendor risk — security questionnaires plus reading other companies\u2019 SOC 2 reports',
      'Build the board and executive risk reporting: dashboards and top-risk summaries',
    ],
    dutiesSource: '(unihackers.com, Feb 2026; ituonline.com, Feb 2025; xcademia.com, May 2026)',
    year: 'Rolling, not cyclical — a weekly rhythm of policy exceptions, risk register updates, evidence collection, board report prep, and vendor assessments, with spikes around external audit windows.',
    yearSource: '(xcademia, May 2026)',
    hours: 'No billable-hours clock — this is internal pacing, not utilization. The technical bar is Security+-level literacy and no coding is required; the pressure comes from audit deadlines and chasing control owners, not a timesheet.',
    hoursSource: '(mycybersecuritypath.com, Mar 2026)',
    gauge: 50,
    gaugeLabel: '~40 HRS / WK',
    pickIf:
      'you want breadth — frameworks, vendors, policy, and boardrooms — without busy-season hours.',
  },
  {
    key: 'b',
    icon: FileSearch,
    nickname: 'The foundation under everything',
    whoYouAre: (
      <>
        You audit your own company&rsquo;s internal control over financial
        reporting (ICFR). Sarbanes-Oxley §404 requires US public companies to
        assess and report on those controls every year — management&rsquo;s
        assessment lands in the 10-K under 404(a), and for accelerated filers
        the external auditor attests to it under 404(b) and PCAOB AS 2201{' '}
        <SourceTag>(safetyculture.com; trullion.com, Mar 2026)</SourceTag>. If
        the company&rsquo;s IT general controls fail, no automated control or
        system-generated report can be relied upon — your work is the
        foundation under everything{' '}
        <SourceTag>(cybersigmacs.com, May 2026)</SourceTag>.
      </>
    ),
    answerTo:
      'Internal audit leadership — the CAE — with a functional line toward the audit committee.',
    duties: [
      'Scope which accounts, processes, and systems are in for SOX, by materiality and risk',
      'Build and update the Risk-Control Matrix (RCM) on the COSO framework',
      'Walk controls end-to-end with their owners and conclude whether they\u2019re designed correctly',
      'Test operating effectiveness on samples — daily controls can need 25+ samples, quarterly controls 2–3',
      'Test the four ITGC domains: access to programs & data, program changes, program development, computer operations',
      'Evaluate deficiencies up the hierarchy: control deficiency → significant deficiency → material weakness',
    ],
    dutiesSource: '(trullion.com, Mar 2026; cybersigmacs.com, May 2026)',
    year: 'A predictable fiscal-year cycle: Q1 scoping, Q2 walkthroughs, Q3 testing, Q4 remediation and roll-forward — and then it starts again. It never really \u201Cends\u201D.',
    yearSource: '(vero-ai.com, Apr 2026)',
    hours: 'Steadier than public accounting — roughly 40-hour weeks much of the year, with spikes around quarter-end and year-end testing windows.',
    hoursSource: '(vero-ai.com, Apr 2026)',
    gauge: 55,
    gaugeLabel: '~40 HRS / WK · QUARTER-END SPIKES',
    pickIf:
      'you want audit rigor and structural job security (SOX is law for public companies) without client-service chaos.',
  },
  {
    key: 'c',
    icon: Clock,
    nickname: 'The road warrior',
    whoYouAre: (
      <>
        You work at a firm — Big 4, mid-tier, or a specialist boutique like
        A-LIGN, Schellman, or Prescient — and audit{' '}
        <em>other companies&rsquo;</em> controls. For SOC 2 you issue an
        attestation report under AICPA standards (SSAE 18 / AT-C 205, licensed
        CPA firms only — it&rsquo;s an attestation, not a certification). For
        ISO 27001 you audit for an accredited certification body that issues an
        actual certificate{' '}
        <SourceTag>(ispectratechnologies.com; iso.org)</SourceTag>.
      </>
    ),
    answerTo:
      'Your engagement manager and partner — plus, indirectly, every client\u2019s auditor-facing compliance lead.',
    duties: [
      'Review client evidence in GRC portals like Vanta and Drata and interview client IT and security staff',
      'Test access, change management, MFA, backup, and vulnerability management controls',
      'Test population completeness first, then pick the samples yourself — the client never picks its own',
      'Verify evidence is dated inside the audit window — and check the metadata for retroactive creation',
      'Document everything in workpapers that survive manager review',
      'Juggle a portfolio: SOC 2 reports recur annually per client; ISO 27001 runs a 3-year certificate cycle',
    ],
    dutiesSource: '(soc2auditors.org, Feb 2026; secureleap.tech, May 2026; auditbadger.com, Jul 2026)',
    year: 'Rolling client engagements, not one cycle — fieldwork Monday to Wednesday, memos and review meetings Thursday and Friday, with spikes per client rather than a single busy season.',
    yearSource: '(soc2auditors.org, Feb 2026)',
    hours: 'It depends heavily on firm type: Big 4 runs 50–60 hours normally and 60–70 in busy season; mid-tier 45–55; specialist SOC 2 boutiques 40–50 with flatter seasonality and remote-first work. Firms also carry utilization targets — roughly 65–75% billable off-season, 85–95% in busy season.',
    hoursSource: '(soc2auditors.org, Feb 2026; nstarfinance.com, Feb 2026)',
    gauge: 85,
    gaugeLabel: '40–70 HRS / WK · BY FIRM TYPE',
    pickIf:
      'you want the steepest learning curve, the strongest exit options, and can trade some evenings for the brand.',
  },
]

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </p>
      <div className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  )
}

function TrackCard({ data }: { data: TrackData }) {
  const meta = TRACKS[data.key]
  const Icon = data.icon
  return (
    <motion.article
      data-track={data.key}
      data-cursor="READ"
      initial={{ opacity: 0, y: 32, rotate: 0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex h-full flex-col rounded-[10px] border border-line border-l-4 bg-paper-raised p-6 shadow-paper md:p-8',
        meta.borderLeft,
      )}
    >
      <div className="flex items-center gap-3">
        <TrackBadge track={data.key} />
        <div>
          <h3 className="font-sans text-lg font-semibold leading-tight text-ink">
            {meta.name}
          </h3>
          <p className="font-display text-[13.5px] italic text-ink-soft">
            {data.nickname}
          </p>
        </div>
        <Icon
          aria-hidden="true"
          className={cn('ml-auto h-5 w-5', meta.text)}
        />
      </div>

      <Field label="Who you are">{data.whoYouAre}</Field>
      <Field label="Who you answer to">{data.answerTo}</Field>
      <Field label="What you actually do">
        <ul className="list-none space-y-2">
          {data.duties.map((duty) => (
            <li key={duty} className="flex gap-2">
              <span
                aria-hidden="true"
                className={cn('mt-[9px] h-1 w-1 shrink-0 rounded-full', meta.bg)}
              />
              <span>{duty}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          <SourceTag>{data.dutiesSource}</SourceTag>
        </p>
      </Field>
      <Field label="Your year looks like">
        {data.year} <SourceTag>{data.yearSource}</SourceTag>
      </Field>
      <Field label="Hours & pressure">
        {data.hours} <SourceTag>{data.hoursSource}</SourceTag>
        {/* hours gauge */}
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className={cn('h-full rounded-full', meta.bg)}
              style={{ width: `${data.gauge}%` }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
            {data.gaugeLabel}
          </p>
        </div>
      </Field>

      <p className="mt-auto pt-6 text-[14px] leading-relaxed text-ink">
        <span className={cn('font-mono text-[11px] font-semibold uppercase tracking-[0.08em]', meta.text)}>
          Pick this track if…{' '}
        </span>
        {data.pickIf}
      </p>
    </motion.article>
  )
}

/**
 * Tracks — Section 01: the three tracks side-by-side (design.md §1,
 * home.md). Paper section. Desktop: 3-column cards; mobile: A/B/C tabs.
 */
export default function Tracks() {
  return (
    <section id="tracks" className="bg-graph bg-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <SectionEyebrow index="01" label="The three tracks" />
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink md:text-[56px]"
        >
          One title. Three jobs.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-measure text-[17px] leading-[1.65] text-ink-soft"
        >
          Before you pick a job posting, pick a track. The title &ldquo;GRC
          auditor&rdquo; covers three genuinely different careers, and they are
          frequently confused with each other — even by recruiters. One runs
          the compliance program from inside a company. One audits their own
          company&rsquo;s controls over financial reporting. One audits clients
          from an outside firm. Same DNA — evidence, skepticism, controls —
          different boss, different calendar, different life.
        </motion.p>

        {/* Shared-DNA callout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <Callout bar="ink">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Whatever the business card says, the work underneath is identical
              in shape: someone claims a control exists, and you ask{' '}
              <em className="text-ink">
                where is the evidence, when did it happen, who approved it?
              </em>{' '}
              <SourceTag>(ituonline, Feb 2025)</SourceTag>. Organization and
              persistence matter more than speed in all three tracks.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['EVIDENCE', 'SKEPTICISM', 'CONTROLS'].map((gene) => (
                <span
                  key={gene}
                  className="rounded-[4px] border border-line bg-paper px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft"
                >
                  {gene}
                </span>
              ))}
            </div>
          </Callout>
        </motion.div>

        {/* Desktop: three cards side-by-side */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {TRACK_DATA.map((data) => (
            <TrackCard key={data.key} data={data} />
          ))}
        </div>

        {/* Mobile: A/B/C tab switcher */}
        <div className="mt-12 md:hidden">
          <Tabs defaultValue="a">
            <TabsList className="grid w-full grid-cols-3 bg-highlight">
              {TRACK_DATA.map((data) => {
                const meta = TRACKS[data.key]
                return (
                  <TabsTrigger
                    key={data.key}
                    value={data.key}
                    className="gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] data-[state=active]:bg-paper-raised"
                  >
                    <span
                      aria-hidden="true"
                      className={cn('h-2 w-2 rounded-full', meta.bg)}
                    />
                    {meta.letter}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            {TRACK_DATA.map((data) => (
              <TabsContent key={data.key} value={data.key} className="mt-6">
                <TrackCard data={data} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
