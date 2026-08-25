import type { ReactNode } from 'react'
import { FileCheck, Handshake, Compass, Award, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SourceTag from '@/components/SourceTag'

/* ──────────────────────────────────────────────────────────────────────────
   Verbatim copy for the Career Ladder section (info.md SECTION: career-ladder)
   ────────────────────────────────────────────────────────────────────────── */

export interface LadderLevel {
  id: string
  name: string
  years: string
  /** Condensed pay-band headline on the step face */
  band: string
  /** Verbatim "What you're expected to do" */
  expect: ReactNode
  /** Verbatim full pay-range detail (sources as SourceTags) */
  pay: ReactNode
  /** Show the CISA GATE chip (Senior step) */
  cisaGate?: boolean
  /** Top the step with the leadership flag glyph */
  flag?: boolean
}

export const LEVELS: LadderLevel[] = [
  {
    id: 'associate',
    name: 'Associate / Staff',
    years: '0–2 YRS',
    band: '$55–90k',
    expect:
      'Execute test steps, document to standard, ask good questions, meet budgets and deadlines',
    pay: (
      <>
        Entry GRC analyst ~$60–80k <SourceTag>(infosecjobboard.com, Jul 2026)</SourceTag>; IT
        auditor entry ~$55–75k+ <SourceTag>(stationx.net, Jul 2026)</SourceTag>; Big 4 audit entry
        $55–65k, consulting-aligned $85–90k <SourceTag>(casebasix.com, May 2026)</SourceTag>
      </>
    ),
  },
  {
    id: 'senior',
    name: 'Senior',
    years: '2–4 YRS',
    band: '$75–125k',
    cisaGate: true,
    expect:
      'Run the engagement day-to-day, review staff work, own the client request list, draft findings, coach juniors',
    pay: (
      <>
        GRC senior $105–125k+ <SourceTag>(infosecjobboard.com, Jul 2026)</SourceTag>; Big 4 senior
        associate $75–115k <SourceTag>(casebasix.com, May 2026)</SourceTag>. Note: generic
        all-industry &ldquo;senior auditor&rdquo; averages near $75k{' '}
        <SourceTag>(VelvetJobs, Sep 2025)</SourceTag> conflict with Big 4 figures — segment by
        employer type
      </>
    ),
  },
  {
    id: 'manager',
    name: 'Manager',
    years: '5–8 YRS',
    band: '$110–180k+',
    expect:
      'Own engagement economics (budget, realization), review all workpapers, manage client relationships, handle deficiency negotiations, develop staff',
    pay: (
      <>
        GRC manager $130–180k+ <SourceTag>(infosecjobboard.com, Jul 2026)</SourceTag>; Big 4
        manager $110–160k <SourceTag>(casebasix.com, May 2026)</SourceTag>
      </>
    ),
  },
  {
    id: 'senior-manager',
    name: 'Senior Manager / Director',
    years: '8–12 YRS',
    band: '$140–220k+',
    expect:
      'Own a portfolio of engagements, carry sign-off responsibility, develop the practice, support sales',
    pay: (
      <>
        IT Audit Senior Manager averages $175,736 <SourceTag>(salary.com, Aug 2026)</SourceTag> to
        $197,271, with a 90th percentile of $291,586 <SourceTag>(Glassdoor, 2026)</SourceTag>; Big
        4 senior manager $140–220k <SourceTag>(casebasix.com, May 2026)</SourceTag>
      </>
    ),
  },
  {
    id: 'leadership',
    name: 'Leadership',
    years: '12+ YRS',
    band: '$230k–$5M',
    flag: true,
    expect: (
      <>
        CAE, CISO, CRO, or VP Compliance — own the function and its risk judgment{' '}
        <SourceTag>(NexusGRC academy, Jan 2026)</SourceTag>
      </>
    ),
    pay: (
      <>
        Big 4 MD $230–390k; partner $250k–$5M <SourceTag>(casebasix.com, May 2026)</SourceTag>. For
        calibration: CISA holders average $93k–$123k depending on source{' '}
        <SourceTag>(Glassdoor/Payscale via Coursera, May 2026)</SourceTag>; CISSP holders average
        $147,757 in North America <SourceTag>(Coursera/ISC2, Jul 2025)</SourceTag>
      </>
    ),
  },
]

/* ── What gets you promoted (verbatim bullets) ── */

export interface PromotionCard {
  icon: LucideIcon
  title: string
  body: ReactNode
}

export const PROMOTIONS: PromotionCard[] = [
  {
    icon: FileCheck,
    title: 'Documentation strangers can trust',
    body: "workpapers reviewable by someone who wasn't there, every time",
  },
  {
    icon: Handshake,
    title: 'Skepticism with diplomacy',
    body: (
      <>
        you catch what others missed <em>and</em> engineers still take your calls; &ldquo;design
        guardrails developers can live with&rdquo;
      </>
    ),
  },
  {
    icon: Compass,
    title: 'Risk judgment, not checklist completion',
    body: (
      <>
        you spot scope and risk issues before your manager does{' '}
        <SourceTag>(weinsteinspira.com; NCSU)</SourceTag>
      </>
    ),
  },
  {
    icon: Award,
    title: 'The credential at the gate',
    body: (
      <>
        CISA by senior level; CIA if you&rsquo;re internal audit; cert-stacking patterns like
        CISA+CISM or CIA+CRMA signal direction{' '}
        <SourceTag>(NexusGRC academy, Jan 2026)</SourceTag>
      </>
    ),
  },
  {
    icon: Users,
    title: 'Client and stakeholder ownership',
    body: 'by senior, you run the relationship and the request list, not just the tests',
  },
]

/* ── Exit opportunities (verbatim bullets) ── */

export interface ExitPath {
  title: ReactNode
  body: ReactNode
}

export const EXITS: ExitPath[] = [
  {
    title: <>Big 4 → industry internal audit/SOX</>,
    body: (
      <>
        better hours and a comp bump; the Big 4 brand materially widens exits{' '}
        <SourceTag>(soc2auditors.org)</SourceTag>
      </>
    ),
  },
  {
    title: <>Auditor → GRC program owner at a tech company</>,
    body: 'run the program you used to audit',
  },
  {
    title: <>Boutique SOC 2 auditor → compliance consulting or vCISO work</>,
    body: null,
  },
  {
    title: <>IT audit → product/security compliance or third-party risk leadership</>,
    body: null,
  },
  {
    title: <>CISO track</>,
    body: (
      <>
        via CISM plus security exposure <SourceTag>(NexusGRC academy, Jan 2026)</SourceTag>
      </>
    ),
  },
]

/* ── Certification map (verbatim 8-row table) ── */

export interface Cert {
  id: string
  name: string
  org: string
  what: ReactNode
  cost: ReactNode
  experience: ReactNode
  when: ReactNode
}

export const CERTS: Cert[] = [
  {
    id: 'cisa',
    name: 'CISA',
    org: 'ISACA',
    what: (
      <>
        <em>The</em> IT audit credential — the closest thing to a universal requirement in this
        field
      </>
    ),
    cost: '$575 member / $760 non-member exam + $50 app fee; $45/$85 annual maintenance; 20 CPE/yr',
    experience:
      '5 yrs IS audit/control/security (waivers up to 3); you can sit the exam before you have the experience; 6-month eligibility window after registration',
    when: (
      <>
        Expected by <strong>senior level in all three tracks</strong>; 3,000+ Indeed US listings
        mention it (Jul 2026)
      </>
    ),
  },
  {
    id: 'crisc',
    name: 'CRISC',
    org: 'ISACA',
    what: 'IT risk management credential',
    cost: '$575/$760 exam + $50 app',
    experience: '3 yrs IT risk (within 5-yr window post-exam)',
    when: 'Risk-heavy GRC and internal-audit roles; a strong second cert',
  },
  {
    id: 'cism',
    name: 'CISM',
    org: 'ISACA',
    what: 'Security management credential',
    cost: '$575/$760 exam',
    experience: '5 yrs security management',
    when: (
      <>
        The move into security/GRC <strong>management</strong>; pairs with CISA on the CISO track
      </>
    ),
  },
  {
    id: 'cia',
    name: 'CIA',
    org: 'IIA',
    what: 'Certified Internal Auditor — the gold standard for IA departments',
    cost: '~$990 total member / ~$1,515 non-member (app + 3 exam parts); 40 CPE/yr',
    experience:
      "Bachelor's + 24 months internal-audit-equivalent (master's = 12); 3 parts within 3 yrs; CPA/CISA holders qualify for a one-part challenge exam",
    when: (
      <>
        <strong>Internal audit / SOX track</strong>, especially toward CAE; new 2025 syllabus
        rolling out
      </>
    ),
  },
  {
    id: 'cissp',
    name: 'CISSP',
    org: 'ISC2',
    what: 'Broad security credential',
    cost: '$749 exam + $135 AMF; 120 CPE/3yr',
    experience:
      '5 yrs across 2+ of 8 domains (degree waives 1); Associate-of-ISC2 path without experience',
    when: (
      <>
        Security-adjacent credibility — matters more for the <strong>CISO track</strong> than pure
        audit
      </>
    ),
  },
  {
    id: 'iso-la',
    name: 'ISO 27001 Lead Auditor / Lead Implementer',
    org: 'PECB etc.',
    what: 'ISO audit/implementation credential',
    cost: 'eLearning + exam ~US$589 (2 attempts included); standalone lead exam $1,000; $500 certification app + $100/yr AMF; 3-hr, 80-question open-book exam, 70% to pass',
    experience:
      'Documented audit experience for the full credential, otherwise "Provisional Auditor"',
    when: (
      <>
        <strong>External ISO track</strong> — Lead Auditor for auditors; Lead Implementer for
        in-house GRC/ISMS builders
      </>
    ),
  },
  {
    id: 'secplus',
    name: 'Security+ / ISC2 CC',
    org: '',
    what: 'Entry door-openers',
    cost: '~$199–404 (CC $199)',
    experience: 'None',
    when: (
      <>
        <strong>Entry-level GRC analyst</strong> roles; the recommended career-changer ladder runs
        Security+ → CGRC ($599) → CRISC or CISA → CISM{' '}
        <SourceTag>(mycybersecuritypath.com, Mar 2026)</SourceTag>
      </>
    ),
  },
  {
    id: 'cpa',
    name: 'CPA',
    org: '',
    what: 'Licensed accountant',
    cost: 'Varies by state',
    experience: '150 credit hours etc.',
    when: (
      <>
        Only <em>required</em> to sign SOC reports at CPA firms — individual IT auditors rarely
        need it; valued in SOX-adjacent roles
      </>
    ),
  },
]
