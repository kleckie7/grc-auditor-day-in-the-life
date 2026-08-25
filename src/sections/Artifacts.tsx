import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionEyebrow from '@/components/SectionEyebrow'
import SourceTag from '@/components/SourceTag'
import PbcGrid from '@/sections/artifacts/PbcGrid'
import Workpaper from '@/sections/artifacts/Workpaper'
import Walkthrough from '@/sections/artifacts/Walkthrough'

/**
 * Artifacts — SECTION 6 "Over the Shoulder" (#artifacts, paper).
 * The screen-share section: filterable PBC request list, annotated
 * workpaper exhibit, and step-through walkthrough trace player
 * (home.md §6). Framer-only component tree.
 */
export default function Artifacts() {
  const reduced = useReducedMotion()
  const [pulseKey, setPulseKey] = useState(0)
  const pbcRef = useRef<HTMLDivElement | null>(null)

  // Workpaper cross-ref chips pulse the PBC table above (scroll-sync).
  const handleCrossRef = () => {
    pbcRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'center',
    })
    setPulseKey((k) => k + 1)
  }

  return (
    <section id="artifacts" className="bg-graph bg-paper text-ink">
      <div className="mx-auto max-w-content px-4 py-[72px] md:px-8 md:py-[128px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow index="05" label="Over the Shoulder" />
          <h2 className="mt-6 max-w-[20ch] font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink md:text-[56px]">
            What the work actually looks like.
          </h2>
          <p className="mt-6 max-w-measure text-[16px] leading-[1.65] text-ink-soft md:text-[17px]">
            This is what the work actually looks like — not the org-chart
            version, the screen-share version. Three artifacts do most of the
            talking in this profession: the request list that starts an audit,
            the workpaper that proves the test, and the walkthrough that
            decides whether a control can be trusted. Here&rsquo;s each one,
            filled in the way it would look on a real engagement.
          </p>
        </motion.div>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          <ExhibitShell
            reduced={reduced ?? false}
            index="Exhibit 1"
            title="A PBC (Provided-By-Client) Request List"
            lead={
              <>
                Every audit opens with a request list — typically 50–200+
                items organized by control area, each with an owner, a due
                date, and a status{' '}
                <SourceTag>(vamasters.com; auditbadger.com; bitrupt.co)</SourceTag>.
                Here&rsquo;s a realistic ten-row slice of one:
              </>
            }
          >
            <div ref={pbcRef} className="scroll-mt-24">
              <PbcGrid pulseKey={pulseKey} />
            </div>
          </ExhibitShell>

          <ExhibitShell
            reduced={reduced ?? false}
            index="Exhibit 2"
            title="A Control Test Sheet / Workpaper"
          >
            <Workpaper onCrossRef={handleCrossRef} />
          </ExhibitShell>

          <ExhibitShell
            reduced={reduced ?? false}
            index="Exhibit 3"
            title="A Walkthrough"
          >
            <Walkthrough />
          </ExhibitShell>
        </div>
      </div>
    </section>
  )
}

/**
 * Exhibit wrapper — surfaces enter as "documents dropped on a desk":
 * y 80→0, rotate 2.5°→0, staggered (home.md §6 animation notes).
 */
function ExhibitShell({
  reduced,
  index,
  title,
  lead,
  children,
}: {
  reduced: boolean
  index: string
  title: string
  lead?: ReactNode
  children: ReactNode
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 80, rotate: 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        {index}
      </p>
      <h3 className="mt-2 font-display text-[24px] font-semibold leading-[1.15] text-ink md:text-[30px]">
        {title}
      </h3>
      {lead && (
        <p className="mt-3 max-w-measure text-[15px] leading-relaxed text-ink-soft">
          {lead}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </motion.div>
  )
}
