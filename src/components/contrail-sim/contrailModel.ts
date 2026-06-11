import { FLIGHT, ISSR, lerp } from './scene'
import type { Params } from './simStore'
import { T_TOTAL } from './simStore'

// Cartoon Gaussian-plume model. The flight path is discretized into puffs; each
// is "born" as the aircraft passes its location and then ages. With age a puff
// spreads (mostly cross-wind, into a thin wide sheet), slowly sinks, and shears
// (the sheet tilts about the flight axis and drifts cross-wind). Puffs born in
// the ice-supersaturated region persist; those born in dry air quickly fade.

export const N_PUFFS = 64

const SIGMA0 = 0.06 // initial half-width (world units)
const H_GROWTH = 1.7 // cross-wind (z) half-width gain over full age
const V_GROWTH = 0.3 // vertical (y) half-width gain over full age
const X_HALF0 = 0.12 // along-flight half-extent (puffs overlap to blend)
const X_GROWTH = 0.05
const SINK_MAX = 1.25 // vertical descent over full age (world units)
const SHEAR_TILT = 1.15 // sheet tilt (radians) at full shear + age (~66°)
const SHEAR_DRIFT = 0.55 // cross-wind centroid drift at full shear + age
const DRY_FACTOR = 0.18 // growth/drift multiplier for non-persistent puffs
const FRESH_OPACITY = 0.5
const OLD_OPACITY = 0.12

export interface PuffBirth {
  s: number // fraction along the path, 0..1
  x: number // birth longitude position (world)
  inIssr: boolean // born in ice-supersaturated (humid) air?
}

export interface PuffState {
  visible: boolean
  px: number
  py: number
  pz: number
  sx: number
  sy: number
  sz: number
  tilt: number // rotation about the flight (x) axis
  opacity: number
}

const HIDDEN: PuffState = {
  visible: false,
  px: 0, py: 0, pz: 0, sx: 0, sy: 0, sz: 0, tilt: 0, opacity: 0,
}

/** Fixed birth data for every puff along the flight path. */
export function makePuffs(): PuffBirth[] {
  const out: PuffBirth[] = []
  for (let i = 0; i < N_PUFFS; i++) {
    const s = (i + 0.5) / N_PUFFS
    const x = lerp(FLIGHT.x0, FLIGHT.x1, s)
    const inIssr = x >= ISSR.x[0] && x <= ISSR.x[1]
    out.push({ s, x, inIssr })
  }
  return out
}

/** Path fraction the aircraft has reached at the given time. */
export function flightFraction(time: number): number {
  return Math.min(Math.max(time / T_TOTAL, 0), 1)
}

/** Transform + opacity for one puff at the current simulation time. */
export function puffAt(p: PuffBirth, time: number, prm: Params): PuffState {
  const frac = time / T_TOTAL
  if (p.s > frac) return HIDDEN // not laid down yet

  const an = frac - p.s // normalized age, 0..1
  const humid = 0.4 + 0.6 * prm.humidity
  const growth = p.inIssr ? humid : DRY_FACTOR

  const sx = X_HALF0 + X_GROWTH * an
  const sz = SIGMA0 + H_GROWTH * an * growth
  const sy = SIGMA0 + V_GROWTH * an * growth

  const sink = SINK_MAX * prm.sink * an
  const drift = SHEAR_DRIFT * prm.shear * an * (p.inIssr ? 1 : DRY_FACTOR)
  const tilt = SHEAR_TILT * prm.shear * an

  let opacity = lerp(FRESH_OPACITY, OLD_OPACITY, an) * humid
  if (!p.inIssr) opacity *= Math.max(0, 1 - an * 6) // dry air: fade within ~10 min
  opacity = Math.min(0.55, Math.max(0, opacity))

  return {
    visible: opacity > 0.01,
    px: p.x,
    py: FLIGHT.y - sink,
    pz: FLIGHT.z + drift,
    sx, sy, sz,
    tilt,
    opacity,
  }
}
