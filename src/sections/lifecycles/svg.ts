/** Small SVG geometry helpers shared by the lifecycle diagrams. */

/** Point on a circle; angle in degrees, 0° = 3 o'clock, clockwise (y-down). */
export function polar(
  cx: number,
  cy: number,
  r: number,
  deg: number,
): [number, number] {
  const rad = (deg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

const fmt = (n: number) => Math.round(n * 100) / 100

/** Clockwise arc path from a0 to a1 (degrees). a1 must be > a0. */
export function arcPath(
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
): string {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${fmt(x0)} ${fmt(y0)} A ${r} ${r} 0 ${large} 1 ${fmt(x1)} ${fmt(y1)}`
}

/**
 * Arrowhead at angle `deg` on circle r, pointing in the direction of
 * clockwise travel. Returns a path for a small open chevron.
 */
export function arrowheadPath(
  cx: number,
  cy: number,
  r: number,
  deg: number,
  size = 9,
): string {
  const [tx, ty] = polar(cx, cy, r, deg)
  // Tangent direction of clockwise travel at deg is deg + 90.
  const tipRad = ((deg + 90) * Math.PI) / 180
  const back = (a: number) => {
    const rad = tipRad + (a * Math.PI) / 180
    return [fmt(tx - size * Math.cos(rad)), fmt(ty - size * Math.sin(rad))]
  }
  const [lx, ly] = back(-26)
  const [rx, ry] = back(26)
  return `M ${lx} ${ly} L ${fmt(tx)} ${fmt(ty)} L ${rx} ${ry}`
}
