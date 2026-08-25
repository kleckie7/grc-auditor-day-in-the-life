import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LOOPS } from './data'
import type { Loop } from './data'

/** Horizontal process flow of connected node chips; cascades on tab select. */
function ProcessFlow({ loop }: { loop: Loop }) {
  const reduced = useReducedMotion()
  return (
    <div
      role="img"
      aria-label={`${loop.title} interview process: ${loop.stages.join(', then ')}`}
      className="flex flex-wrap items-center gap-y-3"
    >
      {loop.stages.map((stage, i) => (
        <motion.span
          key={stage}
          initial={reduced ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center"
        >
          <span className="rounded-[4px] border border-carbon-line bg-carbon px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-paper md:text-[11px]">
            {stage}
          </span>
          {i < loop.stages.length - 1 && (
            <ArrowRight aria-hidden="true" className="mx-1.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
          )}
        </motion.span>
      ))}
      {loop.duration && (
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: loop.stages.length * 0.07 }}
          className="ml-3 rounded-[4px] border border-ok px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ok"
        >
          {loop.duration}
        </motion.span>
      )}
    </div>
  )
}

/**
 * The loop, by employer type — 4 tabs, each with its process flow, verbatim
 * body copy, and (for Big 4 campus) firm-flavor accordion rows.
 */
export default function LoopTabs() {
  return (
    <Tabs defaultValue={LOOPS[0].id} className="gap-0">
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-[10px] border border-carbon-line bg-carbon-raised p-1.5">
        {LOOPS.map((loop) => (
          <TabsTrigger
            key={loop.id}
            value={loop.id}
            className="h-auto flex-none rounded-[6px] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint data-[state=active]:bg-carbon data-[state=active]:text-paper data-[state=active]:shadow-none md:text-[11px]"
          >
            {loop.tab}
          </TabsTrigger>
        ))}
      </TabsList>

      {LOOPS.map((loop) => (
        <TabsContent key={loop.id} value={loop.id} className="mt-6">
          <div className="rounded-2xl border border-carbon-line bg-carbon-raised p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-display text-[20px] font-semibold text-paper">{loop.title}</h4>
            </div>
            <div className="mt-6">
              {/* keyed by tab so the cascade replays on select */}
              <ProcessFlow key={loop.id} loop={loop} />
            </div>
            <p className="mt-6 max-w-measure text-[15px] leading-relaxed text-ink-faint [&_strong]:text-paper">
              {loop.body}
            </p>

            {loop.firms && (
              <div className="mt-6 rounded-[10px] border border-carbon-line bg-carbon">
                <Accordion type="single" collapsible>
                  {loop.firms.map((firm) => (
                    <AccordionItem
                      key={firm.firm}
                      value={firm.firm}
                      className="border-carbon-line px-5 last:border-b-0"
                    >
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-display text-[16px] font-semibold text-paper">
                            {firm.firm}
                          </span>
                          <span className="rounded-[4px] border border-carbon-line px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                            {firm.tag}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] leading-relaxed text-ink-faint">
                        {firm.detail}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
