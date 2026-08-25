import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BEHAVIORAL, TECHNICAL } from './data'
import type { Question } from './data'

function QuestionList({
  questions,
  label,
  idPrefix,
}: {
  questions: Question[]
  label: string
  idPrefix: string
}) {
  return (
    <div className="rounded-2xl border border-carbon-line bg-carbon-raised">
      <p className="border-b border-carbon-line px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {label} · {questions.length} questions
      </p>
      <Accordion type="single" collapsible>
        {questions.map((item, i) => (
          <AccordionItem
            key={i}
            value={`${idPrefix}-${i}`}
            className="border-carbon-line px-6 last:border-b-0"
          >
            <AccordionTrigger className="py-4 text-[15px] font-semibold leading-snug text-paper hover:no-underline hover:text-track-c-dark">
              <span>
                <span className="mr-2 font-mono text-[11px] font-semibold text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {item.aside && (
                <p className="font-display text-[15px] font-medium italic leading-relaxed text-paper/90">
                  {item.aside}
                </p>
              )}
              <p className={item.aside ? 'mt-3' : ''}>
                <span className="rounded-[4px] border border-carbon-line bg-carbon px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-track-c-dark">
                  Tests: {item.tests}
                </span>
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

/**
 * Question bank — Behavioral and Technical/controls accordions side by side
 * (home.md §8). Expanding a question reveals the verbatim coaching aside
 * (where present) plus a mono tag of what's being tested.
 */
export default function QuestionBank() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <QuestionList questions={BEHAVIORAL} label="Behavioral" idPrefix="beh" />
      <QuestionList questions={TECHNICAL} label="Technical / controls" idPrefix="tech" />
    </div>
  )
}
