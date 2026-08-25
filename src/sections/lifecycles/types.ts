/** Props shared by all three lifecycle diagrams: bidirectional hover sync. */
export interface DiagramSyncProps {
  /** Index of the currently highlighted step/node (null = none). */
  active: number | null
  /** Set or clear the highlighted step (called on hover/focus/click). */
  onActive: (index: number | null) => void
}
