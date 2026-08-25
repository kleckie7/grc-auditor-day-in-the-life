import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor — 10px ink dot + 36px ring that expands to 48px and gains a
 * mono label ("READ", "FLIP", "FILTER", "PAY") over [data-cursor] elements
 * (design.md §5). Falls back to default cursor on touch devices; the native
 * cursor stays visible alongside.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor]',
      ) as HTMLElement | null
      setLabel(target?.dataset.cursor ?? null)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-2.5 w-2.5 rounded-full bg-ink mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      {/* ring + label */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border border-ink/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 48 : 36,
          height: label ? 48 : 36,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        {label && (
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
