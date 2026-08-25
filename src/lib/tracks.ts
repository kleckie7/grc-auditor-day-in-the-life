/** Shared track metadata — the "one title, three tracks" system (design.md §1–2). */

export type TrackKey = 'a' | 'b' | 'c'

export interface TrackMeta {
  key: TrackKey
  letter: 'A' | 'B' | 'C'
  /** Short name used in badges / legends */
  short: string
  /** Full track name */
  name: string
  /** Hex colors */
  hex: string
  hexOnDark: string
  /** Tailwind class fragments (enumerated, not interpolated) */
  text: string
  textOnDark: string
  bg: string
  border: string
  borderLeft: string
}

export const TRACKS: Record<TrackKey, TrackMeta> = {
  a: {
    key: 'a',
    letter: 'A',
    short: 'GRC Analyst',
    name: 'GRC Analyst (in-house)',
    hex: '#0E8A5F',
    hexOnDark: '#3ECF9A',
    text: 'text-track-a',
    textOnDark: 'text-track-a-dark',
    bg: 'bg-track-a',
    border: 'border-track-a',
    borderLeft: 'border-l-track-a',
  },
  b: {
    key: 'b',
    letter: 'B',
    short: 'IT Internal Auditor',
    name: 'IT Internal Auditor / SOX',
    hex: '#C47A12',
    hexOnDark: '#F2B23E',
    text: 'text-track-b',
    textOnDark: 'text-track-b-dark',
    bg: 'bg-track-b',
    border: 'border-track-b',
    borderLeft: 'border-l-track-b',
  },
  c: {
    key: 'c',
    letter: 'C',
    short: 'External Auditor',
    name: 'External Auditor — SOC 2 & ISO 27001',
    hex: '#4A4FD8',
    hexOnDark: '#8B8FF0',
    text: 'text-track-c',
    textOnDark: 'text-track-c-dark',
    bg: 'bg-track-c',
    border: 'border-track-c',
    borderLeft: 'border-l-track-c',
  },
}

export const TRACK_LIST: TrackMeta[] = [TRACKS.a, TRACKS.b, TRACKS.c]
