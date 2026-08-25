import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionEyebrow from '@/components/SectionEyebrow'
import SourceTag from '@/components/SourceTag'
import EvidenceChip from '@/components/EvidenceChip'
import LoopTabs from './interview/LoopTabs'
import QuestionBank from './interview/QuestionBank'
import ScenarioCards from './interview/ScenarioCards'
import PrepChecklist from './interview/PrepChecklist'
import { SCREENING, TOOLING, TESTED_QUALITIES } from './interview/data'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-paper md:text-[30px]">
      {children}
    </h3>
  )
}

/**
 * Interview — Section 07: the loop by employer type, the question bank,
 * flip-card scenarios, screening signals, and the persisted prep checklist
 * (info.md SECTION: the-interview; home.md §8). Carbon / dark section.
 */
export default function Interview() {
  return (
    <section id="interview" className="bg-dots bg-carbon text-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <SectionEyebrow index="07" label="The Interview" dark />

        <FadeUp>
          <h2 className="mt-6 max-w-[16ch] font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper md:text-[56px]">
            They&rsquo;re grading your structure, not your answer.
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p className="mt-6 max-w-measure text-[17px] leading-[1.65] text-ink-faint">
            GRC and IT audit interviews are not really testing whether you memorized a framework.
            They&rsquo;re testing four things at once: frameworks fluency — do you know{' '}
            <em className="text-paper">which</em> framework applies and why, without fumbling;
            skepticism — do you believe &ldquo;no evidence means weak assurance&rdquo; in your
            bones; evidence discipline — can you rank a system-generated export against a
            screenshot against a chat message; and communication — can you translate technical risk
            into business impact and stay collaborative with engineers instead of adversarial{' '}
            <SourceTag dark>(amdari.io; wiz.io, Jan 2026)</SourceTag>. The scenario question is the
            signature of these interviews — expect at least one, and expect it to be graded on your
            structure, not your answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TESTED_QUALITIES.map((quality) => (
              <span
                key={quality}
                className="rounded-[4px] border border-carbon-line bg-carbon-raised px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-paper"
              >
                {quality}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* ── The loop, by employer type ── */}
        <FadeUp className="mt-16">
          <H3>The loop, by employer type</H3>
          <div className="mt-8">
            <LoopTabs />
          </div>
        </FadeUp>

        {/* ── Question bank ── */}
        <FadeUp className="mt-20">
          <H3>The question bank</H3>
          <div className="mt-8">
            <QuestionBank />
          </div>
        </FadeUp>

        {/* ── The signature scenarios — flip cards ── */}
        <FadeUp className="mt-20">
          <H3>The signature scenario questions</H3>
          <div className="mt-8">
            <ScenarioCards />
          </div>
        </FadeUp>

        {/* ── What hiring managers screen for ── */}
        <FadeUp className="mt-20">
          <H3>What hiring managers screen for</H3>
          <div className="mt-8 rounded-2xl border border-carbon-line bg-carbon-raised p-6 md:p-8">
            <ul className="space-y-4">
              {SCREENING.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-ok"
                  >
                    <Check className="h-3.5 w-3.5 text-ok" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-faint">
                    <strong className="font-semibold text-paper">{point.title}</strong> —{' '}
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-carbon-line pt-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                The tooling names to know
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOOLING.map((tool) => (
                  <EvidenceChip key={tool} dark>
                    {tool}
                  </EvidenceChip>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Prep checklist ── */}
        <FadeUp className="mt-20">
          <H3>The prep checklist</H3>
          <p className="mt-4 max-w-measure text-[15px] leading-relaxed text-ink-faint">
            Eight items. Tick them off — your progress is saved on this device.
          </p>
          <div className="mt-8">
            <PrepChecklist />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
