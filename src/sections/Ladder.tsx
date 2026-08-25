import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MoveRight } from 'lucide-react'
import SectionEyebrow from '@/components/SectionEyebrow'
import SourceTag from '@/components/SourceTag'
import DiagramFrame from '@/components/DiagramFrame'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Staircase from './ladder/Staircase'
import CertSubwayMap from './ladder/CertSubwayMap'
import { LEVELS, PROMOTIONS, EXITS, CERTS } from './ladder/data'

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

/** Inline salary-framing stat chip (echoes the Stop-2 scale, home.md §7). */
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <span className="mx-1 inline-flex translate-y-[-1px] items-baseline gap-1.5 rounded-[4px] border border-line bg-paper-raised px-2 py-0.5 align-baseline shadow-paper">
      <span className="font-display text-[15px] font-semibold text-ink">{value}</span>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </span>
    </span>
  )
}

/** Sub-heading in Fraunces. */
function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[30px]">
      {children}
    </h3>
  )
}

/**
 * Ladder — Section 06: the career staircase, promotion levers, exit
 * opportunities, and the certification subway map (info.md SECTION:
 * career-ladder; home.md §7). Paper section.
 */
export default function Ladder() {
  return (
    <section id="ladder" className="bg-graph bg-paper">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <SectionEyebrow index="06" label="The Career Ladder" />

        <FadeUp>
          <h2 className="mt-6 font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink md:text-[56px]">
            Unusually legible.
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p className="mt-6 max-w-measure text-[17px] leading-[1.65] text-ink-soft">
            The ladder in this field is unusually legible — levels have names, typical year ranges,
            and recognizable pay bands. Two honest caveats before the numbers: firm-track and
            in-house ladders pay differently at the same level title, and salary sources genuinely
            diverge — government data maps GRC work to the broad &ldquo;Compliance Officers&rdquo;
            occupation
            <StatChip value="$80,730" label="BLS median" />
            <SourceTag>(median $80,730; BLS OEWS 2025 via hyring.com)</SourceTag>, while
            cyber-market recruiters report an average GRC analyst base of
            <StatChip value="$133k" label="CyberSN average" />
            <SourceTag>(CyberSN, Jul 2025)</SourceTag>. Read both framings; your metro and employer
            type decide which one you&rsquo;re in.
          </p>
        </FadeUp>

        {/* ── The staircase + full ladder table ── */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <H3>The ladder</H3>
            <div className="mt-6">
              <Staircase />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-paper-raised shadow-paper">
              <Accordion type="single" collapsible>
                <AccordionItem value="full-table" className="border-b-0">
                  <AccordionTrigger className="px-6 py-5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft hover:no-underline md:px-8">
                    See the full table — every sourced number
                  </AccordionTrigger>
                  <AccordionContent className="px-6 md:px-8">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-relaxed">
                        <thead>
                          <tr className="border-b border-line font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                            <th className="py-2 pr-3 font-semibold">Level</th>
                            <th className="py-2 pr-3 font-semibold">Years</th>
                            <th className="py-2 pr-3 font-semibold">What you&rsquo;re expected to do</th>
                            <th className="py-2 font-semibold">US pay range</th>
                          </tr>
                        </thead>
                        <tbody className="text-ink-soft">
                          {LEVELS.map((level) => (
                            <tr key={level.id} className="border-b border-line/60 align-top last:border-b-0">
                              <td className="py-3 pr-3 font-semibold text-ink">{level.name}</td>
                              <td className="whitespace-nowrap py-3 pr-3 font-mono text-[11px]">
                                {level.years.replace(' YRS', '')}
                              </td>
                              <td className="py-3 pr-3">{level.expect}</td>
                              <td className="py-3">{level.pay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* What gets you promoted */}
            <div className="mt-10 lg:mt-12">
              <H3>What gets you promoted</H3>
            </div>
          </FadeUp>
        </div>

        {/* ── Promotion cards (2-col grid, spans full width) ── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {PROMOTIONS.map((card, i) => {
            const Icon = card.icon
            return (
              <FadeUp
                key={card.title}
                delay={i * 0.06}
                className={
                  i < 2 ? 'lg:col-span-3' : i < 5 ? 'lg:col-span-2' : 'lg:col-span-3'
                }
              >
                <div className="group h-full rounded-[10px] border border-line bg-paper-raised p-5 shadow-paper transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-line bg-paper">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-ink transition-transform duration-200 group-hover:-rotate-6"
                      />
                    </span>
                    <p className="font-display text-[16px] font-semibold leading-snug text-ink">
                      {card.title}
                    </p>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{card.body}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* ── Exit opportunities: departure arrows ── */}
        <FadeUp className="mt-16">
          <H3>Exit opportunities</H3>
        </FadeUp>
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <FadeUp className="lg:w-56 lg:shrink-0">
            <div className="flex h-full items-center justify-center rounded-[10px] border-2 border-ink bg-paper-raised px-6 py-8 text-center shadow-paper">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
                Firm /<br />
                In-house
              </p>
            </div>
          </FadeUp>
          <div className="grid flex-1 gap-3">
            {EXITS.map((exit, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="group flex items-center gap-4 rounded-[10px] border border-line bg-paper-raised px-5 py-4 shadow-paper transition-colors duration-150 hover:bg-highlight">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-snug text-ink">{exit.title}</p>
                    {exit.body && (
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{exit.body}</p>
                    )}
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-exception transition-transform duration-200 group-hover:translate-x-2"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── Certification subway map ── */}
        <FadeUp className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <H3>Certification map</H3>
            <p className="max-w-md text-[13.5px] leading-relaxed text-ink-soft">
              Three lines, one shared interchange: hover a station for cost, experience, and when
              it matters.
            </p>
          </div>
          <div className="mt-8">
            <DiagramFrame caption="FIG. 4 — CERTIFICATION SUBWAY MAP · CISA IS THE INTERCHANGE" bodyClassName="p-4 md:p-8">
              <CertSubwayMap />
            </DiagramFrame>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper-raised shadow-paper">
            <Accordion type="single" collapsible>
              <AccordionItem value="cert-table" className="border-b-0">
                <AccordionTrigger className="px-6 py-5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft hover:no-underline md:px-8">
                  Full cert table — 8 credentials, verified 2025–26
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left text-[13px] leading-relaxed">
                      <thead>
                        <tr className="border-b border-line font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                          <th className="py-2 pr-3 font-semibold">Cert</th>
                          <th className="py-2 pr-3 font-semibold">What it is</th>
                          <th className="py-2 pr-3 font-semibold">Cost (verified 2025–26)</th>
                          <th className="py-2 pr-3 font-semibold">Experience required</th>
                          <th className="py-2 font-semibold">When it matters</th>
                        </tr>
                      </thead>
                      <tbody className="text-ink-soft">
                        {CERTS.map((c) => (
                          <tr key={c.id} className="border-b border-line/60 align-top last:border-b-0">
                            <td className="whitespace-nowrap py-3 pr-3 font-semibold text-ink">
                              {c.name}
                              {c.org && (
                                <span className="ml-1 font-mono text-[10px] font-normal text-ink-faint">
                                  ({c.org})
                                </span>
                              )}
                            </td>
                            <td className="py-3 pr-3">{c.what}</td>
                            <td className="py-3 pr-3">{c.cost}</td>
                            <td className="py-3 pr-3">{c.experience}</td>
                            <td className="py-3">{c.when}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </FadeUp>

        {/* destination mono strip, echoing the terminus roundels */}
        <FadeUp className="mt-10">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            <MoveRight aria-hidden="true" className="h-4 w-4 text-ink-soft" />
            End of the line: CAE · CISO · CRO · VP Compliance · Partner
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
