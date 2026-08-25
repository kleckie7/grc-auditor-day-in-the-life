import type { ReactNode } from 'react'
import EvidenceChip from '@/components/EvidenceChip'
import SourceTag from '@/components/SourceTag'
import type { TrackKey } from '@/lib/tracks'

/** Copy verbatim from info.md SECTION: day-in-the-life. */

export interface DayEntry {
  time: string
  activity: string
  body: ReactNode
  /** Special row treatments (home.md §SECTION 4) */
  special?: 'deviation' | 'exception' | 'chat'
}

export interface DayTrack {
  key: TrackKey
  /** Day nickname in Fraunces italic */
  nickname: string
  entries: DayEntry[]
}

export const DAY_INTRO: ReactNode = (
  <>
    Tuesday, 9:04 AM. A control owner just replied &ldquo;we fixed that&rdquo;
    with no attachment — and your morning has its plot. Below are three
    real-flavor days, one per track. They&rsquo;re composites, not surveillance
    footage: the GRC analyst day follows a representative published schedule{' '}
    <SourceTag>(unihackers.com, Feb 2026)</SourceTag>; the internal auditor day
    is a Q3 testing-season Tuesday built from the quarterly rhythm of the SOX
    cycle <SourceTag>(trullion.com, Mar 2026)</SourceTag>; the external auditor
    day is a fieldwork Wednesday from the standard Mon–Wed fieldwork / Thu–Fri
    admin split <SourceTag>(soc2auditors.org, Feb 2026)</SourceTag>.
  </>
)

const DEFS = {
  pbc: 'Provided-by-client — the running list of evidence requests the auditor sends the client.',
  workpapers:
    'The auditor\u2019s documented record of test steps, evidence, and conclusions — written so a reviewer who wasn\u2019t there could re-perform the work.',
  deviationsLog:
    'The register of every control deviation found during testing, tracked through evaluation and escalation.',
  vanta:
    'A compliance-automation platform where the client uploads evidence against the auditor\u2019s open requests.',
  utilization:
    'The share of an auditor\u2019s hours billed to client engagements — a real number tracked per person by the firm.',
} as const

export const DAY_TRACKS: DayTrack[] = [
  {
    key: 'a',
    nickname: 'Evidence Tuesday',
    entries: [
      {
        time: '8:30',
        activity: 'Email triage',
        body: 'The external auditor wants more SOC 2 evidence, and a business unit is stuck on a vendor-assessment question.',
      },
      {
        time: '9:00',
        activity: 'Team standup',
        body: 'The ISO 27001 certification project gets its status check and this week\u2019s action items get owners.',
      },
      {
        time: '9:30',
        activity: 'Evidence pull',
        body: 'You chase access-review documents from IT and grab config screenshots for the auditor\u2019s request.',
      },
      {
        time: '10:30',
        activity: 'Engineering meeting',
        body: 'A new cloud deployment is coming — you flag the compliance implications and the controls needed before launch.',
      },
      {
        time: '11:30',
        activity: 'Vendor questionnaire',
        body: 'You review and approve a vendor security questionnaire response that sales needs for due diligence.',
      },
      {
        time: '1:00',
        activity: 'Policy work',
        body: 'You update the information-security policy for new data-retention requirements.',
      },
      {
        time: '2:30',
        activity: 'Vendor risk assessment',
        body: 'You read a prospective vendor\u2019s SOC 2 report and decide whether their exceptions matter to you.',
      },
      {
        time: '3:30',
        activity: 'Board dashboard',
        body: 'You build the risk-committee dashboard — risk posture on one axis, remediation progress on the other.',
      },
      {
        time: '4:30',
        activity: 'Office hours',
        special: 'chat',
        body: 'You answer employee acceptable-use questions',
      },
      {
        time: '5:00',
        activity: 'Close out',
        body: 'You update the trackers and set tomorrow\u2019s chase list.',
      },
    ],
  },
  {
    key: 'b',
    nickname: 'A Wednesday in Q3 Testing Season',
    entries: [
      {
        time: '8:45',
        activity: 'Coffee + plan',
        body: 'You review today\u2019s test plan: three ITGC controls, two applications, one external-auditor check-in.',
      },
      {
        time: '9:15',
        activity: 'Population request',
        body: 'You ask IT for the complete change log and full user listing — system-generated exports with visible query criteria, not hand-picked rows.',
      },
      {
        time: '9:45',
        activity: 'Sample selection',
        body: (
          <>
            You select samples per control frequency — 25 for the daily
            job-failure review, 3 for the quarterly access review{' '}
            <SourceTag>(trullion.com, Mar 2026)</SourceTag>.
          </>
        ),
      },
      {
        time: '10:30',
        activity: 'Ticket inspection',
        body: 'You inspect change tickets for approvals, testing evidence, and a correct approver on every sampled item.',
      },
      {
        time: '11:15',
        activity: 'First deviation',
        special: 'deviation',
        body: 'A sampled change went to production without documented UAT — you note it and flag the owner early so remediation can start before year-end.',
      },
      {
        time: '1:00',
        activity: 'Control-owner call',
        body: 'You walk the owner through what \u201Ctimely approval\u201D means before a finding memo exists, not after.',
      },
      {
        time: '2:00',
        activity: 'Workpaper writing',
        body: 'You document population, sample-size rationale, per-item results, and conclusion — so a reviewer who wasn\u2019t there could re-perform it.',
      },
      {
        time: '3:30',
        activity: 'External-auditor sync',
        body: (
          <>
            Their <EvidenceChip definition={DEFS.pbc}>PBC</EvidenceChip> list
            wants your interim{' '}
            <EvidenceChip definition={DEFS.workpapers}>workpapers</EvidenceChip>
            ; you agree on what internal audit&rsquo;s work they can rely on.
          </>
        ),
      },
      {
        time: '4:30',
        activity: 'Deviation log',
        body: (
          <>
            You update the{' '}
            <EvidenceChip definition={DEFS.deviationsLog}>
              deviations log
            </EvidenceChip>{' '}
            and draft the escalation note — small issues get evaluated
            individually and in aggregate.
          </>
        ),
      },
      {
        time: '5:15',
        activity: 'Wrap',
        body: 'You check tomorrow\u2019s walkthrough invite and log hours against the SOX PMO plan.',
      },
    ],
  },
  {
    key: 'c',
    nickname: 'Fieldwork Wednesday',
    entries: [
      {
        time: '8:30',
        activity: 'Portal check',
        body: (
          <>
            You open the client&rsquo;s{' '}
            <EvidenceChip definition={DEFS.vanta}>Vanta portal</EvidenceChip> to
            see which of last night&rsquo;s evidence uploads actually satisfy
            your open <EvidenceChip definition={DEFS.pbc}>PBC</EvidenceChip>{' '}
            items.
          </>
        ),
      },
      {
        time: '9:00',
        activity: 'Standup',
        body: (
          <>
            The engagement team triages the request list — unmanaged{' '}
            <EvidenceChip definition={DEFS.pbc}>PBC</EvidenceChip> lists are
            the single most common reason fieldwork slips{' '}
            <SourceTag>(safeguard.sh)</SourceTag>.
          </>
        ),
      },
      {
        time: '9:30',
        activity: 'Access-review testing',
        body: 'You test the sampled quarterly access reviews for sign-off dates, remediation proof, and whether the reviewer was the right person.',
      },
      {
        time: '11:00',
        activity: 'Client interview',
        body: 'You interview the client\u2019s IT lead on their offboarding process, then ask them to screen-share the actual termination workflow.',
      },
      {
        time: '12:30',
        activity: 'Offboarding cross-check',
        special: 'exception',
        body: 'You cross-reference sampled leavers against HR termination dates — one account was disabled nine days late, and that\u2019s an exception.',
      },
      {
        time: '1:30',
        activity: 'Change-management sampling',
        body: (
          <>
            From the complete population of production changes, you pick your
            own 25 pull requests and check each for approval{' '}
            <SourceTag>(soc2auditors.org, Aug 2026)</SourceTag>.
          </>
        ),
      },
      {
        time: '3:00',
        activity: 'Evidence dating check',
        body: (
          <>
            You verify every piece of evidence is dated inside the observation
            window — and check file metadata for anything created retroactively{' '}
            <SourceTag>(auditbadger.com, Jul 2026)</SourceTag>.
          </>
        ),
      },
      {
        time: '4:00',
        activity: 'Workpapers',
        body: 'You write up the day\u2019s testing with cross-referenced evidence links before the details go cold.',
      },
      {
        time: '4:45',
        activity: 'Exception draft',
        body: 'You draft the two exception items in neutral language — tomorrow (Thursday) is for memos, client comms, and the manager review meeting.',
      },
      {
        time: '5:30',
        activity: 'Timekeeping',
        body: (
          <>
            You log your hours against the engagement code —{' '}
            <EvidenceChip definition={DEFS.utilization}>
              utilization
            </EvidenceChip>{' '}
            is a real number with your name on it.
          </>
        ),
      },
    ],
  },
]
