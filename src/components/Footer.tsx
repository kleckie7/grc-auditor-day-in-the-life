import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FINE_PRINT =
  'This page synthesizes sources published between 2024 and 2026, and the ground shifts — Big 4 assessment stages and certification fees change, so verify against the firm\u2019s or body\u2019s current page before you act on any detail. Salary figures vary substantially by metro and employer type: where government data (BLS "Compliance Officers," median $80,730) and cyber-market recruiter data (CyberSN, $133k average) diverge, we\u2019ve shown both framings rather than picking one. Interview loops for corporate internal audit and boutique SOC 2 firms are typical patterns from thinner published sources, not guarantees — individual companies will vary. One framework nuance worth knowing: you\u2019ll often read that the Security category is mandatory in SOC 2; the precise phrasing is that Security (the Common Criteria) is included in virtually every SOC 2 report. And busy-season hour figures (up to 70\u201390 charged hours) come partly from self-reported sources — directionally consistent with 2026 firm guides, but anecdotal.'

/** Bolded source bodies from the verbatim sources paragraph, as inline chips. */
const SOURCE_BODIES = [
  'AICPA',
  'ISACA',
  'ISO / IAF',
  'IIA',
  'PCAOB',
  'US Bureau of Labor Statistics',
  'Glassdoor',
  'salary.com',
  'Payscale',
  'ZipRecruiter',
  'CyberSN',
  'infosecjobboard.com',
  'Coursera',
]

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Footer — the fine print, collapsible full source list, and the
 * last-verified badge (info.md SECTION: footer; design.md home §SECTION 9).
 * Carbon background, continuous with the Interview section above.
 */
export default function Footer() {
  return (
    <footer id="footer" className="bg-carbon text-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        {/* Fine print — three-column on desktop */}
        <FadeUp>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
                GRC<span className="text-exception">//</span>A DAY IN THE LIFE
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em]">
                The fine print
              </h2>
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink-faint">
              {FINE_PRINT.slice(0, FINE_PRINT.indexOf('One framework nuance'))}
            </p>
            <p className="text-[13.5px] leading-relaxed text-ink-faint">
              {FINE_PRINT.slice(FINE_PRINT.indexOf('One framework nuance'))}
            </p>
          </div>
        </FadeUp>

        {/* Sources */}
        <FadeUp delay={0.1} className="mt-16">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Sources
          </h3>
          <p className="mt-4 max-w-measure text-[13.5px] leading-relaxed text-ink-faint">
            Research compiled August 2026 from:
          </p>
          <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
            {SOURCE_BODIES.map((body) => (
              <span
                key={body}
                className="rounded-[4px] border border-carbon-line bg-carbon-raised px-2 py-0.5 font-mono text-[11px] tracking-wide text-ink-faint"
              >
                {body}
              </span>
            ))}
          </div>
          <Accordion type="single" collapsible className="mt-6 max-w-3xl">
            <AccordionItem value="sources" className="border-carbon-line">
              <AccordionTrigger className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint hover:text-paper hover:no-underline">
                Full source list
              </AccordionTrigger>
              <AccordionContent className="text-[13.5px] leading-relaxed text-ink-faint">
                Research compiled August 2026 from: <strong className="text-paper/80">AICPA</strong> (SOC
                2 / Trust Services Criteria, TSP Section 100; SSAE 18 / AT-C 105
                &amp; 205) · <strong className="text-paper/80">ISACA</strong> (CISA, CRISC, CISM exam and
                fee details) · <strong className="text-paper/80">ISO / IAF</strong> (ISO/IEC 27001:2022,
                ISO/IEC 17021-1, IAF MD 5) · <strong className="text-paper/80">IIA</strong> (CIA program;
                Global Internal Audit Standards) · <strong className="text-paper/80">PCAOB</strong> (AS
                2201; deficiency taxonomy) · <strong className="text-paper/80">US Bureau of Labor
                Statistics</strong> (OEWS 2025, Compliance Officers) ·{' '}
                <strong className="text-paper/80">Glassdoor, salary.com, Payscale, ZipRecruiter,
                CyberSN, infosecjobboard.com, Coursera</strong> (salary data,
                2025–26) · plus practitioner guides and firm resources including
                soc2auditors.org, auditbadger.com, trullion.com, safeguard.sh,
                linfordco.com, hicomply.com, isoqar.com, secureleap.tech,
                big4events.com, casebasix.com, amdari.io, hyring.com,
                mycybersecuritypath.com, unihackers.com, xcademia.com,
                vero-ai.com, trainual.com, wideandwise.co, wiz.io, and NCSU
                audit-profession research. Full citations with dates appear
                inline beside each claim.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FadeUp>

        {/* Badges row */}
        <FadeUp delay={0.2} className="mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-[4px] border border-carbon-line bg-carbon-raised px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ok"
              />
              Last verified · Aug 2026
            </span>
            <p className="font-mono text-[12px] italic leading-relaxed text-ink-faint">
              This page is educational career content, not career, legal, or
              financial advice. Verify current fees, timelines, and requirements
              with the certifying body or employer before making decisions.
            </p>
          </div>
        </FadeUp>

        {/* Bottom hairline */}
        <div className="mt-16 flex flex-col gap-2 border-t border-carbon-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            GRC<span className="text-exception">//</span>A DAY IN THE LIFE
          </p>
          <p className="font-mono text-[11px] text-ink-faint">
            Educational content — not career, legal, or financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
