import type { ReactNode } from 'react'
import { Camera } from 'lucide-react'
import SourceTag from '@/components/SourceTag'

export interface LifecycleStep {
  /** Short bolded phase label (verbatim from copy). */
  title: string
  /** Verbatim step description (info.md § engagement-lifecycles). */
  body: ReactNode
}

/* ── Track B clock — SOX Annual Cycle (verbatim) ─────────────────────── */

export const SOX_STEPS: LifecycleStep[] = [
  {
    title: 'Q1 — Scoping & Risk Assessment.',
    body: (
      <>
        Identify in-scope accounts, processes, and systems by materiality and
        risk; build or update the Risk-Control Matrix (RCM). COSO is the
        standard structure, and the four ITGC domains — access to programs &
        data, program changes, program development, and computer operations —
        anchor the IT scope{' '}
        <SourceTag dark>(trullion.com, Mar 2026; cybersigmacs.com, May 2026)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Q2 — Walkthroughs & Design.',
    body: (
      <>
        Trace a transaction end-to-end with the control owner to confirm
        controls are designed correctly. Internal audit runs parallel interim
        testing to catch issues early, while they&rsquo;re still cheap to fix.
      </>
    ),
  },
  {
    title: 'Q3 — Operating-Effectiveness Testing.',
    body: (
      <>
        Sample-based testing across the period, with sample size scaling to
        control frequency — a daily control may need 25+ samples, a quarterly
        control 2–3 <SourceTag dark>(trullion.com, Mar 2026)</SourceTag>.
        Deviations get escalated early so owners can remediate.
      </>
    ),
  },
  {
    title: 'Q4 — Remediation, Roll-Forward & Reporting.',
    body: (
      <>
        Deficiencies get remediated and retested before year-end; roll-forward
        testing confirms controls operated through fiscal year-end. Findings
        are classified up the deficiency hierarchy — control deficiency →
        significant deficiency (merits audit-committee attention) → material
        weakness (reasonable possibility a material misstatement won&rsquo;t be
        prevented or detected; disclosed in SEC filings) — and evaluated both
        individually and in aggregate, because several small issues can roll up{' '}
        <SourceTag dark>(trullion.com; safetyculture.com)</SourceTag>.
        Conclusions land in the 10-K under 404(a), with the external
        auditor&rsquo;s attestation under 404(b) for accelerated filers. Then
        Q1 starts again.
      </>
    ),
  },
]

/* ── Track C clock — SOC 2 Engagement Cycle (verbatim) ───────────────── */

export const SOC2_STEPS: LifecycleStep[] = [
  {
    title: 'Readiness / Gap (client-side).',
    body: (
      <>
        Before an auditor is involved, the client closes gaps against the
        Trust Services Criteria — Security (the Common Criteria) is included
        in virtually every SOC 2 report, with Availability, Processing
        Integrity, Confidentiality, and Privacy added as the service
        commitments require{' '}
        <SourceTag dark>(AICPA TSP Section 100)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Type I — The Snapshot.',
    body: (
      <>
        An opinion on the suitability of control <em className="font-display">design</em>{' '}
        as of a single date — a photograph, not a film. A Type I can complete
        in weeks after readiness; figure roughly 8–14 weeks
        engagement-to-report{' '}
        <SourceTag dark>(bdemerson.com, Jul 2026; soc2auditors.org, Aug 2026)</SourceTag>.
        <span className="mt-2 inline-flex items-center gap-1.5 font-display text-[13px] italic text-ink-faint">
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
          a photograph, not a film
        </span>
      </>
    ),
  },
  {
    title: 'Observation Window (Type II).',
    body: (
      <>
        Controls must <em className="font-display">operate</em> over a window,
        typically 3–12 months — 6–12 is most common, and first-timers often
        choose 3 months to get a report out faster, then move to 12-month
        annual renewals{' '}
        <SourceTag dark>(bdemerson.com, Jul 2026; soc2auditors.org, Dec 2025)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Fieldwork & Sampling.',
    body: (
      <>
        The auditor tests population completeness first, then selects the
        samples — the client never picks its own — and every piece of evidence
        must be dated inside the window, with metadata checked for retroactive
        creation <SourceTag dark>(auditbadger.com, Jul 2026)</SourceTag>.
        Commonly 15–25 samples per recurring control, with fieldwork running
        2–12 weeks{' '}
        <SourceTag dark>(safeguard.sh, Mar 2026; soc2auditors.org, Aug 2026)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Report Issued.',
    body: (
      <>
        SOC 2 is an attestation report issued by a licensed CPA firm under
        SSAE 18 / AT-C 205 — not a certification. Exceptions and deviations
        are disclosed in the report.
      </>
    ),
  },
  {
    title: 'Annual Renewal.',
    body: (
      <>
        Reports recur annually per client — the engagement ends, the
        relationship doesn&rsquo;t. A first Type II can take 6–18 months
        including the observation window; renewals settle into a yearly
        rhythm <SourceTag dark>(soc2auditors.org, Dec 2025)</SourceTag>.
      </>
    ),
  },
]

/* ── Track C clock — ISO 27001 Certificate Cycle (verbatim) ──────────── */

export const ISO_STEPS: LifecycleStep[] = [
  {
    title: 'ISMS Built & Operated ≥ 3 Months.',
    body: (
      <>
        Before certification, the client builds its information security
        management system and runs it for at least three months — including at
        least one full internal audit and one management review{' '}
        <SourceTag dark>(hicomply.com, Jul 2026; cybernion.com.au, Jun 2026)</SourceTag>.
        All current certificates are ISO/IEC 27001:2022 (93 Annex A controls);
        the 2013→2022 transition closed 31 Oct 2025{' '}
        <SourceTag dark>(soc2auditors.org, Aug 2026)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Stage 1 — Documentation Review.',
    body: (
      <>
        The auditor reviews scope, policy, risk assessment, the Statement of
        Applicability, and internal audit/management review records. The
        output is findings and concerns to close — not pass/fail.
      </>
    ),
  },
  {
    title: 'Stage 2 — Certification Audit.',
    body: (
      <>
        Evidence sampling and staff interviews test whether the ISMS is
        implemented and effective. The gap between stages is typically 4–6
        weeks — wait more than about 6 months and Stage 1 repeats{' '}
        <SourceTag dark>(isoqar.com, Apr 2026)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Certificate Issued — 3 Years.',
    body: (
      <>
        An accredited certification body (BSI, Schellman, A-LIGN, Bureau
        Veritas — never the consultant who built the ISMS) issues the
        certificate. Findings are classified as{' '}
        <strong className="font-semibold text-paper">major nonconformity</strong>{' '}
        (blocks certification; up to 6 months to fix before withdrawal),{' '}
        <strong className="font-semibold text-paper">minor nonconformity</strong>{' '}
        (90 days to fix, evidence reviewed remotely), or{' '}
        <strong className="font-semibold text-paper">opportunity for improvement</strong>{' '}
        <SourceTag dark>(isoqar.com; secureleap.tech, May 2026)</SourceTag>.
      </>
    ),
  },
  {
    title: 'Surveillance Audits (~12 & ~24 months).',
    body: (
      <>
        Lighter audits — 1–2 days, roughly 30–50% of initial audit cost —
        sample a rotating subset of controls. Miss one and the certificate is
        suspended; fail one and it&rsquo;s withdrawn{' '}
        <SourceTag dark>(secureleap.tech, May 2026; elevateconsult.com, May 2026)</SourceTag>.
        (Sources variously label these &ldquo;years 1 and 2&rdquo; or
        &ldquo;years 2 and 3&rdquo; — same schedule, different numbering.)
      </>
    ),
  },
  {
    title: 'Recertification.',
    body: (
      <>
        A full re-audit around the three-year mark restarts the cycle — the
        auditor sees the same client on a multi-year cadence.
      </>
    ),
  },
]
