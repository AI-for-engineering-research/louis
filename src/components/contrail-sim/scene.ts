// Shared coordinate model for the contrail simulation scene.
//
// World-space axes (three.js): X = longitude (the flight direction, east),
// Z = latitude (depth, north), Y = vertical. The vertical axis represents
// atmospheric *pressure* — higher up = lower pressure (higher altitude), as in
// a standard atmospheric cross-section. The box floor sits at y = 0.
//
// Everything downstream (contrail puffs, the timeline, the satellite view)
// derives its geometry from these constants and helpers, so the 3D and 2D
// views stay consistent by construction.

export const BOX = { w: 9, h: 4.5, d: 5.5 } as const

// Real-world ranges used for axis tick labels. Pressure runs 300 hPa at the
// floor up to 200 hPa at the top (decreasing with altitude).
export const AXIS = {
  lon: { label: 'longitude', unit: '°E', min: 8, max: 12 },
  lat: { label: 'latitude', unit: '°N', min: 46, max: 50 },
  pres: { label: 'pressure', unit: ' hPa', bottom: 300, top: 200 },
} as const

// Cruise flight: constant pressure (y) and latitude (z), crossing the full
// longitude span (x) from west to east.
export const FLIGHT = {
  y: BOX.h * 0.68,
  z: 0,
  x0: -BOX.w / 2,
  x1: BOX.w / 2,
} as const

// Ice-supersaturated region: a humid pressure layer, finite in longitude so the
// aircraft enters and exits it. Inside it a contrail persists and spreads;
// outside (dry air) it fades. Stored as [min, max] ranges per axis.
export const ISSR = {
  x: [-BOX.w * 0.4, BOX.w * 0.46] as [number, number],
  y: [BOX.h * 0.55, BOX.h * 0.86] as [number, number],
  z: [-BOX.d / 2, BOX.d / 2] as [number, number],
} as const

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// World position -> labelled value, for axis ticks and readouts.
export const lonAt = (x: number) => lerp(AXIS.lon.min, AXIS.lon.max, (x + BOX.w / 2) / BOX.w)
export const latAt = (z: number) => lerp(AXIS.lat.min, AXIS.lat.max, (z + BOX.d / 2) / BOX.d)
export const presAt = (y: number) => lerp(AXIS.pres.bottom, AXIS.pres.top, y / BOX.h)

// Center and size of a [min, max] range trio, e.g. for placing a box mesh.
export function rangeBox(r: { x: [number, number]; y: [number, number]; z: [number, number] }) {
  return {
    center: [
      (r.x[0] + r.x[1]) / 2,
      (r.y[0] + r.y[1]) / 2,
      (r.z[0] + r.z[1]) / 2,
    ] as [number, number, number],
    size: [r.x[1] - r.x[0], r.y[1] - r.y[0], r.z[1] - r.z[0]] as [number, number, number],
  }
}

// Evenly spaced fractions 0..1 inclusive, for n divisions.
export function ticks(n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => i / n)
}
