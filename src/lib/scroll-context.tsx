import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import type { TrackKey } from '@/lib/tracks'

/** All page sections in order — wired to nav + side progress rail (home.md). */
export const SECTIONS = [
  { id: 'hero', label: 'Hero', theme: 'paper' },
  { id: 'tracks', label: 'Tracks', theme: 'paper' },
  { id: 'journey', label: 'Journey', theme: 'carbon' },
  { id: 'the-day', label: 'The Day', theme: 'paper' },
  { id: 'lifecycles', label: 'Lifecycles', theme: 'carbon' },
  { id: 'artifacts', label: 'Artifacts', theme: 'paper' },
  { id: 'ladder', label: 'Ladder', theme: 'paper' },
  { id: 'interview', label: 'Interview', theme: 'carbon' },
  { id: 'footer', label: 'Footer', theme: 'carbon' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

const NAV_OFFSET = 80 // smooth scroll-to anchors with 80px offset (design.md §6)

interface ScrollContextValue {
  activeSection: SectionId
  /** Track letters whose [data-track] elements are currently in view. */
  visibleTracks: Set<TrackKey>
  scrollToSection: (id: SectionId) => void
}

const ScrollContext = createContext<ScrollContextValue>({
  activeSection: 'hero',
  visibleTracks: new Set(),
  scrollToSection: () => {},
})

export function useScrollContext() {
  return useContext(ScrollContext)
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const [visibleTracks, setVisibleTracks] = useState<Set<TrackKey>>(new Set())
  const lenisRef = useRef<Lenis | null>(null)
  const visibleRef = useRef<Set<TrackKey>>(new Set())

  // ── Lenis smooth scroll, lerp 0.1; disabled under prefers-reduced-motion ──
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // ── Active section tracking (drives nav underline, rail, nav inversion) ──
  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const probe = 96 // px from top of viewport
      let current: SectionId = 'hero'
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= probe) current = s.id
      }
      setActiveSection((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // ── Track legend pulse: watch [data-track="a|b|c"] elements in view ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.track as
            | TrackKey
            | undefined
          if (!key) continue
          if (entry.isIntersecting) {
            if (!visibleRef.current.has(key)) {
              visibleRef.current.add(key)
              changed = true
            }
          } else if (visibleRef.current.delete(key)) {
            changed = true
          }
        }
        if (changed) setVisibleTracks(new Set(visibleRef.current))
      },
      { rootMargin: '-30% 0px -30% 0px' },
    )
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>('[data-track]')
        .forEach((el) => observer.observe(el))
    scan()
    // Sections mount lazily as other agents land; rescan briefly.
    const rescan = window.setInterval(scan, 2000)
    const stop = window.setTimeout(() => window.clearInterval(rescan), 20000)
    return () => {
      observer.disconnect()
      window.clearInterval(rescan)
      window.clearTimeout(stop)
    }
  }, [])

  const value = useMemo<ScrollContextValue>(
    () => ({
      activeSection,
      visibleTracks,
      scrollToSection: (id) => {
        const el = document.getElementById(id)
        if (!el) return
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -NAV_OFFSET })
        } else {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
            behavior: 'auto',
          })
        }
      },
    }),
    [activeSection, visibleTracks],
  )

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

/** Theme of the currently active section — drives nav inversion. */
export function useActiveTheme(): 'paper' | 'carbon' {
  const { activeSection } = useScrollContext()
  const found = SECTIONS.find((s) => s.id === activeSection)
  return found?.theme ?? 'paper'
}
