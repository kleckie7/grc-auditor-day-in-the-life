import type { ReactNode } from 'react'
import SourceTag from '@/components/SourceTag'

/* ──────────────────────────────────────────────────────────────────────────
   Verbatim copy for The Interview section (info.md SECTION: the-interview)
   ────────────────────────────────────────────────────────────────────────── */

/* ── The loop, by employer type ── */

export interface FirmFlavor {
  firm: string
  tag: string
  detail: ReactNode
}

export interface Loop {
  id: string
  tab: string
  title: string
  /** Connected node chips of the process flow */
  stages: string[]
  /** Mono duration badge */
  duration?: string
  body: ReactNode
  firms?: FirmFlavor[]
}

export const LOOPS: Loop[] = [
  {
    id: 'big4-campus',
    tab: 'Big 4 — Campus',
    title: 'Big 4 — campus / entry level',
    stages: ['APPLICATION', 'SJT + NUMERICAL', 'PHONE SCREEN', 'ASSESSMENT DAY', 'PARTNER ROUND'],
    duration: '3–6 WEEKS',
    body: (
      <>
        Multi-stage and gamified, with published timelines of roughly 3–6 weeks — and rolling
        recruitment, so roles fill before posted deadlines{' '}
        <SourceTag dark>(big4events.com, Jun 2026)</SourceTag>. The flavors differ by firm:
      </>
    ),
    firms: [
      {
        firm: 'Deloitte',
        tag: '3–6 WEEKS TOTAL',
        detail:
          'Online application → situational judgement and numerical tests → a 15–20 minute phone screen → an assessment day with a case exercise and competency interviews → a partner round for senior roles. Total: 3–6 weeks.',
      },
      {
        firm: 'KPMG',
        tag: '36-MIN COGNITIVE + LAUNCH PAD',
        detail:
          'A 36-minute timed cognitive assessment → a pre-recorded AI video interview ("Leah," 6 questions) → "Launch Pad," a full assessment day (8:30am–5pm) with a group exercise, an analysis task, and a partner interview.',
      },
      {
        firm: 'EY',
        tag: 'AVG 41 DAYS TO OFFER',
        detail:
          'Game-based (Pymetrics-style) assessments → a HireVue pre-recorded video interview (30 seconds to prep, 2-minute answers, no retakes) → a panel interview / Experience Day. Average application-to-offer: 41 days.',
      },
      {
        firm: 'PwC',
        tag: 'TARGET: WITHIN 6 WEEKS',
        detail:
          'Behavioral screening form → SHL aptitude tests → a recorded digital interview scored on the "PwC Professional" framework → the "Career Focus" assessment centre (a day-in-the-life simulation) → a final 30-minute partner/director interview. Target: within 6 weeks.',
      },
    ],
  },
  {
    id: 'big4-experienced',
    tab: 'Big 4 — Experienced',
    title: 'Big 4 — experienced hire',
    stages: ['APPLICATION', 'CASE STUDY / TAKE-HOME', 'SENIOR ROUND', 'PARTNER ROUND'],
    body: (
      <>
        The automated stages compress; expect a case study or take-home exercise plus two rounds of
        senior/partner-level interviews <SourceTag dark>(big4events.com)</SourceTag>. The bar
        shifts from potential to judgment — bring real examples of findings you wrote and pushback
        you survived.
      </>
    ),
  },
  {
    id: 'corporate-ia',
    tab: 'Corporate IA',
    title: 'Corporate internal audit / IT audit',
    stages: ['RECRUITER SCREEN', 'HIRING MANAGER', 'TEAM + STAKEHOLDER PANEL', 'CAE / DIRECTOR FINAL'],
    duration: '3–8 WEEKS',
    body: (
      <>
        Typically: recruiter screen → hiring manager interview → a panel with the audit team and key
        stakeholders (IT leadership, control owners) → a final round with the CAE/director or an
        audit-committee-adjacent executive. Fewer gamified assessments, much heavier emphasis on
        walk-through-your-experience and scenario questions; commonly 3–8 weeks end to end.{' '}
        <SourceTag dark>
          (Typical pattern — published detail on corporate loops is thinner, so treat stage counts
          as directional.)
        </SourceTag>
      </>
    ),
  },
  {
    id: 'boutique',
    tab: 'Boutique SOC 2',
    title: 'Boutique / specialist SOC 2 firms',
    stages: ['RECRUITER SCREEN', 'HM TECHNICAL DEEP-DIVE', 'PRACTICAL SCENARIO', 'FOUNDER / PARTNER ROUND'],
    duration: '2–4 WEEKS',
    body: (
      <>
        Typically leaner and faster — often 2–4 weeks: a recruiter screen, a hiring-manager
        technical deep-dive on frameworks, evidence, and sampling, a practical scenario
        (&ldquo;review this access-review evidence — is it sufficient?&rdquo;), and a
        founder/partner culture round. Volume-hiring firms weigh audit-season stamina and
        client-communication polish heavily.{' '}
        <SourceTag dark>
          (Typical pattern inferred from firm profiles and role descriptions — individual firms
          vary.)
        </SourceTag>
      </>
    ),
  },
]

/* ── Question bank ── */

export interface Question {
  q: string
  /** Italic coaching aside, verbatim where present in copy */
  aside?: ReactNode
  /** Mono tag of what's being tested (vocabulary from the section copy) */
  tests: string
}

export const BEHAVIORAL: Question[] = [
  {
    q: 'Tell me about a time a developer or control owner pushed back on your finding — what did you do?',
    tests: 'Communication',
  },
  {
    q: 'Describe a time you had to explain a technical risk to a non-technical executive. How did you land it?',
    tests: 'Communication',
  },
  {
    q: 'Walk me through a time you managed competing audit deadlines. What slipped, and how did you decide?',
    tests: 'Structured thinking',
  },
  {
    q: 'Tell me about an issue you found that others had missed. What made you look there?',
    tests: 'Skepticism',
  },
  {
    q: "Describe a time you had to deliver a finding a stakeholder really didn't want to hear.",
    tests: 'Communication',
  },
  {
    q: 'Tell me about a time you chased evidence from someone who kept not responding. What worked?',
    tests: 'Evidence discipline',
  },
  {
    q: 'Give an example of a process you improved or automated in a compliance or audit workflow.',
    tests: 'Automation mindset',
  },
  {
    q: 'Tell me about a mistake you made in documentation or testing. How was it caught, and what changed?',
    tests: 'Evidence discipline',
  },
]

export const TECHNICAL: Question[] = [
  {
    q: 'Walk me through a control test end-to-end — objective, testing method, sampling, evidence quality, conclusion.',
    tests: 'Evidence discipline',
  },
  {
    q: 'Name the four testing methods and rank them by strength. Why is inquiry alone weak?',
    aside: "Inquiry, observation, inspection, re-performance — words are cheap, paper isn't.",
    tests: 'Evidence discipline',
  },
  {
    q: 'Rank these evidence types: a system-generated export, a parameterized report, a screenshot with full context, a self-attestation in chat. Defend your ordering.',
    tests: 'Evidence discipline',
  },
  {
    q: 'What are the four ITGC domains, and why does a weak ITGC opinion matter for everything downstream?',
    aside:
      'Access to programs & data; program changes; program development/SDLC; computer operations — if ITGC fail, no automated control or system-generated report can be relied upon.',
    tests: 'Frameworks fluency',
  },
  {
    q: 'Explain the difference between a SOC 2 Type I and Type II report. When would you advise a client to start with Type I?',
    tests: 'Frameworks fluency',
  },
  {
    q: 'Explain ISO 27001 Stage 1 versus Stage 2. What has to exist before Stage 2 can happen?',
    tests: 'Frameworks fluency',
  },
  {
    q: 'Classify these: a control deficiency, a significant deficiency, and a material weakness. Which one ends up in an SEC filing?',
    aside: 'And why are deficiencies evaluated in aggregate, not just individually?',
    tests: 'Frameworks fluency',
  },
  {
    q: 'How do you choose a sample size? What do you do when you find one deviation?',
    tests: 'Evidence discipline',
  },
]

/* ── The signature scenario questions ── */

export interface Scenario {
  n: string
  question: string
  answer: ReactNode
}

export const SCENARIOS: Scenario[] = [
  {
    n: '01',
    question: 'A control owner says the control worked all year, but has no evidence. What do you do?',
    answer: (
      <>
        First, confirm what the control&rsquo;s frequency and evidence expectation actually are —
        maybe evidence exists elsewhere. Seek alternative proof: system logs, tickets, configs that
        indirectly demonstrate operation. If none exists, treat it as an exception — controls need
        proof, and undocumented operation is a finding regardless of how sincerely the owner
        believes it happened <SourceTag>(hyring.com, May 2026)</SourceTag>.
      </>
    ),
  },
  {
    n: '02',
    question:
      'You discover a control owner missed the quarterly access review all year — and the external auditor arrives in 12 weeks. Walk me through your response.',
    answer: (
      <>
        Name the risks first — unauthorized access persisting, an audit finding, potential
        deficiency classification. Then act: perform a retrospective review now, escalate to the
        CISO, remediate and automate the process so it can&rsquo;t be silently skipped again, and
        document everything — the external auditor finding your remediation story is far better
        than finding your gap <SourceTag>(amdari.io)</SourceTag>.
      </>
    ),
  },
  {
    n: '03',
    question: 'Your client keeps delaying PBC items and fieldwork starts in two weeks. What do you do?',
    answer: (
      <>
        Confirm each item&rsquo;s owner, due date, and audit impact — not all delays are equal.
        Prioritize the critical requests and re-sequence fieldwork around what exists. Then
        escalate the aging items through the engagement chain — unmanaged PBC lists are the single
        most common reason fieldwork slips, and silence is how you become the reason{' '}
        <SourceTag>(safeguard.sh)</SourceTag>.
      </>
    ),
  },
  {
    n: '04',
    question: 'You pull your samples and one of them shows an exception. Now what?',
    answer: (
      <>
        Don&rsquo;t panic and don&rsquo;t average it away — first confirm the population was
        complete and correctly defined, then understand the cause: isolated error or systemic
        breakdown? Compute the deviation rate and decide whether to expand testing — one deviation
        on a base of 25 means expanding toward 40; the finding grows or shrinks on evidence, not
        optimism <SourceTag>(linfordco.com, Apr 2025)</SourceTag>.
      </>
    ),
  },
  {
    n: '05',
    question: 'Management pressures you to soften or drop a finding. What do you do?',
    answer: (
      <>
        Hold independence — the finding is the finding. Distinguish legitimate disagreement (new
        evidence, factual error — re-test those) from pressure (tone, severity, disclosure).
        Escalate through audit leadership rather than litigating alone, and document the exchange.
        Your credibility is the entire product <SourceTag>(hyring.com, Apr 2026)</SourceTag>.
      </>
    ),
  },
]

/* ── What hiring managers screen for ── */

export interface ScreeningPoint {
  title: string
  body: ReactNode
}

export const SCREENING: ScreeningPoint[] = [
  {
    title: 'Frameworks fluency',
    body: (
      <>
        SOC 2 Trust Services Criteria, ISO 27001, NIST 800-53, SOX/COSO, PCI/HIPAA as relevant —
        knowing <em>which framework applies and why</em> without fumbling{' '}
        <SourceTag dark>(amdari.io)</SourceTag>
      </>
    ),
  },
  {
    title: 'Professional skepticism and evidence discipline',
    body: '"no evidence = weak assurance" as a reflex, not a slogan',
  },
  {
    title: 'Communication',
    body: 'translating technical risk into business impact, with a collaborative (not adversarial) stance toward engineers',
  },
  {
    title: 'Structured thinking',
    body: 'clarify scope → identify risks → stakeholders → corrective actions → monitoring',
  },
  {
    title: 'Automation and tooling mindset',
    body: (
      <>
        GRC platforms and automated evidence collection via cloud APIs{' '}
        <SourceTag dark>(wiz.io; cyberinterviewprep.com)</SourceTag>
      </>
    ),
  },
]

/** Tooling names from the screening copy, as an EvidenceChip cloud. */
export const TOOLING = [
  'ServiceNow GRC',
  'Archer',
  'MetricStream',
  'Vanta',
  'Drata',
  'Secureframe',
  'AuditBoard',
  'Workiva',
]

/* ── Prep checklist (verbatim items) ── */

export interface PrepItem {
  lead: string
  rest: ReactNode
}

export const PREP_ITEMS: PrepItem[] = [
  {
    lead: 'Rehearse five scenarios out loud',
    rest: 'using the 5-step framework (clarify → risks → stakeholders → corrective actions → monitoring) until the structure is automatic.',
  },
  {
    lead: 'Know the evidence hierarchy cold',
    rest: '— system-generated exports > parameterized reports > screenshots with full context > self-attestation/chat — and be ready to rank a scrambled list on a whiteboard.',
  },
  {
    lead: 'Whiteboard a walkthrough',
    rest: 'end-to-end: pick a change-management control and trace one item from ticket to production, narrating inquiry + inspection.',
  },
  {
    lead: 'Practice a sample-size decision out loud',
    rest: ': given a quarterly control, a daily control, and one deviation, talk through n and the expansion logic.',
  },
  {
    lead: 'Bring a portfolio artifact',
    rest: (
      <>
        — for entry-level GRC especially, a mock risk register or a sample workpaper makes you
        memorable <SourceTag dark>(mycybersecuritypath.com, Mar 2026)</SourceTag>.
      </>
    ),
  },
  {
    lead: 'Apply early',
    rest: (
      <>
        — Big 4 recruitment is rolling and roles fill before posted deadlines{' '}
        <SourceTag dark>(big4events.com, Jun 2026)</SourceTag>.
      </>
    ),
  },
  {
    lead: 'Have a cert strategy sentence ready',
    rest: '— e.g., "Security+ now, CISA as soon as my experience window allows" signals you understand the ladder.',
  },
  {
    lead: "Learn the employer's tool stack",
    rest: 'from the job posting — Vanta/Drata for boutiques, Workiva/AuditBoard for SOX shops — and have one question ready about how they use it.',
  },
]

/** The four tested qualities, as mono chips (verbatim from intro). */
export const TESTED_QUALITIES = [
  'Frameworks fluency',
  'Skepticism',
  'Evidence discipline',
  'Communication',
]

/** The 5-step scenario framework (verbatim skeleton). */
export const FRAMEWORK_STEPS = ['CLARIFY', 'RISKS', 'STAKEHOLDERS', 'CORRECTIVE ACTIONS', 'MONITORING']
