import type { ReactNode } from 'react'
import SourceTag from '@/components/SourceTag'
import type { TrackKey } from '@/lib/tracks'

/** Copy verbatim from info.md SECTION: the-journey. */

export interface JourneyBullet {
  /** Bold lead-in (optional), e.g. "Big 4 entry:" */
  lead?: string
  rest: ReactNode
}

export interface JourneySubRow {
  track: TrackKey
  lead: string
  rest: string
}

export interface JourneyStop {
  n: number
  /** Short mono label for the stepper rail */
  short: string
  title: string
  body: ReactNode
  bullets?: JourneyBullet[]
  /** Track-specific 30/60/90 sub-rows (Stop 4) */
  subrows?: JourneySubRow[]
  /** Show the REVIEWED stamp (design.md §4 — journey Stop 5) */
  stamp?: boolean
}

export const JOURNEY_INTRO: ReactNode = (
  <>
    Here&rsquo;s the road from &ldquo;applied&rdquo; to &ldquo;running the
    department.&rdquo; The early stops — the interview loop, the offer, the
    first ninety days — are where most candidates have the least visibility, so
    we&rsquo;ve made them the most detailed. Timelines below are the published
    patterns; your mileage will vary by employer and metro.
  </>
)

const em = 'font-display italic text-paper'

export const STOPS: JourneyStop[] = [
  {
    n: 1,
    short: 'Interview loop',
    title: 'The Interview Loop',
    body: (
      <>
        You&rsquo;ll face a recruiter screen, some form of assessment, one or
        two rounds of interviews, and almost always a scenario question —
        &ldquo;a control owner has no evidence, what do you do?&rdquo; is a
        classic <SourceTag dark>(hyring.com, May 2026)</SourceTag>. Big 4
        published application-to-offer timelines run 3–6 weeks (Deloitte),
        under 6 weeks (PwC), and an average of 41 days (EY){' '}
        <SourceTag dark>(big4events.com, Jun 2026)</SourceTag>.
      </>
    ),
    bullets: [
      {
        lead: 'Big 4 entry:',
        rest: (
          <>
            gamified or aptitude assessments, recorded video interviews, then an
            assessment day — full detail in <em className={em}>The Interview</em>{' '}
            section below
          </>
        ),
      },
      {
        lead: 'Corporate internal audit:',
        rest: 'typically recruiter → hiring manager → panel → final executive round, with heavier emphasis on walking through your experience',
      },
      {
        lead: 'Boutique SOC 2 firms:',
        rest: 'typically leaner — a technical deep-dive on frameworks, evidence, and sampling, plus a practical evidence-review exercise',
      },
      {
        lead: 'All tracks:',
        rest: (
          <>
            recruitment is often rolling and roles fill before posted deadlines
            — apply early{' '}
            <SourceTag dark>(big4events.com, Jun 2026)</SourceTag>
          </>
        ),
      },
    ],
  },
  {
    n: 2,
    short: 'The offer',
    title: 'The Offer',
    body: (
      <>
        Entry pay depends more on{' '}
        <em className={em}>which track and which employer type</em> than on the
        job title. Typical US entry ranges: GRC analyst roles start around
        $60–80k <SourceTag dark>(infosecjobboard.com, Jul 2026)</SourceTag>; IT
        auditor entry runs roughly $55–75k+{' '}
        <SourceTag dark>(stationx.net, Jul 2026)</SourceTag>; Big 4 audit entry
        starts around $55–65k, versus $85–90k for consulting-aligned roles{' '}
        <SourceTag dark>(casebasix.com, May 2026)</SourceTag>. One calibration
        note: government data maps GRC work to the broad &ldquo;Compliance
        Officers&rdquo; occupation at a $80,730 median{' '}
        <SourceTag dark>(BLS OEWS 2025, via hyring.com)</SourceTag>, while
        cyber-market recruiters put the average GRC analyst base at $133k{' '}
        <SourceTag dark>(CyberSN, Jul 2025)</SourceTag> — the truth for a given
        offer sits between those framings, segmented by employer type and
        metro.
      </>
    ),
    bullets: [
      { rest: 'Negotiate against the employer-type segment, not the generic average' },
      { rest: 'Boutique and mid-tier firms can move faster on offers — some in 2–4 weeks' },
      { rest: 'Ask about certification support: exam fees and CPE budgets vary widely' },
    ],
  },
  {
    n: 3,
    short: 'Week 1',
    title: 'Week 1 — Orientation',
    body: (
      <>
        Your first week is orientation, tools, and methodology — at an audit
        firm that means learning the engagement stack (platforms like
        AuditBoard, CaseWare, or A-SCEND) and how your firm writes a workpaper;
        in-house it means the compliance calendar, the evidence repository, and
        the framework scope{' '}
        <SourceTag dark>(trainual.com, Jan 2026)</SourceTag>. Nobody expects
        output yet. Expect logins, shadowing, and a lot of reading — and start
        a stakeholder map, because this job runs on relationships with control
        owners.
      </>
    ),
    bullets: [
      { rest: 'Get access to every system you\u2019ll need — access delays are the classic Week 1 blocker' },
      { rest: 'Meet your buddy or mentor; firms typically assign one for your first tasks' },
      { rest: 'Read last cycle\u2019s workpapers or evidence packages to calibrate \u201Cwhat good looks like\u201D' },
    ],
  },
  {
    n: 4,
    short: '30 / 60 / 90',
    title: 'Days 30 / 60 / 90',
    body: (
      <>
        The generic scaffolding: days 0–30 you&rsquo;re judged on learning
        velocity, not output — context, access, stakeholders. Days 31–60 you
        own defined work and get direct feedback. Days 61–90 you operate
        independently and hit the probation or goal-setting decision{' '}
        <SourceTag dark>(wideandwise.co, Jul 2026)</SourceTag>. What that means
        concretely depends on your track:
      </>
    ),
    subrows: [
      {
        track: 'c',
        lead: 'External firm associate:',
        rest: '0–30 shadow walkthroughs with line-by-line workpaper review; 31–60 own PBC follow-ups and low-risk control tests; 61–90 run a control area end-to-end and learn timekeeping and utilization mechanics',
      },
      {
        track: 'b',
        lead: 'Internal audit / SOX hire:',
        rest: '0–30 learn the RCM, in-scope applications, and the SOX PMO tooling (Workiva/AuditBoard); 31–60 run your first design walkthrough; 61–90 own a small set of ITGC tests and face the external auditors\u2019 PBC requests',
      },
      {
        track: 'a',
        lead: 'GRC analyst:',
        rest: '0–30 learn framework scope, the evidence repository, and the vendor inventory; 31–60 own evidence collection for one framework cycle and run first vendor assessments; 61–90 own a control family end-to-end, ship a policy revision, and write your first exec-facing report section',
      },
    ],
  },
  {
    n: 5,
    short: 'First solo',
    title: 'First Solo Engagement',
    stamp: true,
    body: (
      <>
        Somewhere around the end of your first year, someone hands you a
        control area — or a small client account — and stops looking over your
        shoulder. At a firm, month two onward typically means managing small
        client workstreams with moderate supervision and handling routine
        client comms yourself{' '}
        <SourceTag dark>(trainual.com, Jan 2026)</SourceTag>. The standard
        you&rsquo;re held to doesn&rsquo;t change: execute the test steps,
        document so that someone who wasn&rsquo;t there could re-perform your
        work, ask good questions, and hit the budget. This is the stop where
        skepticism becomes a habit instead of an interview answer.
      </>
    ),
  },
  {
    n: 6,
    short: 'Senior',
    title: 'Senior',
    body: (
      <>
        Around years 2–4 — firm track promotions to senior now commonly land at
        2–3 years, with accelerated second-year promotions common since 2021{' '}
        <SourceTag dark>(NCSU audit-profession research)</SourceTag> — you stop
        executing tests and start running engagements. You own the day-to-day:
        assigning and reviewing staff work, managing the client request list,
        drafting findings, coaching juniors, and spotting scope and risk issues
        before the manager does{' '}
        <SourceTag dark>(weinsteinspira.com; NCSU)</SourceTag>. It&rsquo;s also
        where the credential expectation hardens — CISA is expected by senior
        level across all three tracks{' '}
        <SourceTag dark>
          (ISACA; 3,000+ Indeed US listings mention it, Jul 2026)
        </SourceTag>
        .
      </>
    ),
  },
  {
    n: 7,
    short: 'Manager +',
    title: 'Manager & Beyond',
    body: (
      <>
        Managers (typically years 5–8) own engagement economics — budget and
        realization — review every workpaper, manage client relationships and
        expectations, handle deficiency negotiations, and develop staff. Senior
        managers and directors (years 8–12) carry a portfolio of engagements,
        sign-off responsibility, practice development, and sales support{' '}
        <SourceTag dark>(weinsteinspira.com; NCSU)</SourceTag>. Past that, the
        ladder forks into leadership: Chief Audit Executive, CISO, CRO, or VP
        Compliance at 12+ years{' '}
        <SourceTag dark>(NexusGRC academy, Jan 2026)</SourceTag> — or, on the
        firm side, partner, a 13–17 year road at the Big 4{' '}
        <SourceTag dark>(casebasix.com, May 2026)</SourceTag>.
      </>
    ),
  },
]
