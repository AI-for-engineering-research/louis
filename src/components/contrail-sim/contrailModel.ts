import { AXIS, BOX, FLIGHT, ISSR, lerp } from './scene'
import type { Params } from './simStore'
import { T_TOTAL } from './simStore'

// Cartoon Gaussian-plume model. The flight path is discretized into puffs; each
// is "born" as the aircraft passes its location and then ages. With age a puff
// spreads (mostly cross-wind, into a thin wide sheet), slowly sinks, and shears
// (the sheet tilts about the flight axis and drifts cross-wind). A puff only
// persists while its *centre* sits inside the ice-supersaturated region; once
// the centre leaves the ISSR box — born in dry air, or sunk out of the humid
// layer — the ice sublimates and the puff vanishes within PERSIST_STEPS steps.

export const N_PUFFS = 64

// One trail-discretisation step: the gap (in minutes) between successive puffs.
export const TIMESTEP_MIN = T_TOTAL / N_PUFFS
const PERSIST_STEPS = 4 // steps a puff survives after its centre leaves the ISSR

const SIGMA0 = 0.06 // initial half-width (world units)
const H_GROWTH = 1.7 // cross-wind (z) half-width gain over full age
const V_GROWTH = 0.3 // vertical (y) half-width gain over full age
const X_HALF0 = 0.12 // along-flight half-extent (puffs overlap to blend)
const X_GROWTH = 0.05
const SINK_MAX = 1.25 // vertical descent over full age (world units)
const SHEAR_TILT = 1.15 // sheet tilt (radians) at full shear + age (~66°)
const DRY_FACTOR = 0.18 // growth multiplier for non-persistent puffs
const FRESH_OPACITY = 0.5
const OLD_OPACITY = 0.12

// --- Cross-flight (northward, +z) advection ---
// The contrail is carried by the ambient wind: WIND0 at the formation altitude,
// changing with height via the user's shear, so as a puff sinks it samples a
// different wind speed. Real grid dimensions convert the time-integrated drift
// into world units (SHEAR_MAX is a touch exaggerated for on-screen visibility).
const WIND0 = 40 // m/s, wind at formation altitude
const SHEAR_MAX = 0.04 // (m/s) per metre of altitude at shear = 1
const M_PER_WORLD_Z = ((AXIS.lat.max - AXIS.lat.min) * 111_000) / BOX.d
const M_PER_WORLD_Y = 2600 / BOX.h // 200–300 hPa layer ≈ 2.6 km deep
const T_SEC = T_TOTAL * 60 // full timeline length in seconds

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

/**
 * Minutes the puff centre has spent outside the ISSR box at the given age
 * (0 while still inside). Longitude/latitude membership is fixed per puff, and
 * altitude decreases monotonically as it sinks, so the exit age is analytic.
 */
function centreOutsideMinutes(px: number, pz: number, an: number, prm: Params): number {
  const xIn = px >= ISSR.x[0] && px <= ISSR.x[1]
  const zIn = pz >= ISSR.z[0] && pz <= ISSR.z[1]
  if (!xIn || !zIn) return an * T_TOTAL // never in the humid column → outside since birth

  const sinkRate = SINK_MAX * prm.sink // descent per unit normalized age
  if (sinkRate <= 1e-6) return 0
  const anExit = (FLIGHT.y - ISSR.y[0]) / sinkRate // age when the centre sinks below the slab
  if (an <= anExit) return 0
  return (an - anExit) * T_TOTAL
}

/**
 * Northward (+z, perpendicular to the flight path) advection of a puff centre,
 * in world units, at normalized age `an`. Instantaneous wind is
 * WIND0 + shear·Δaltitude; since the puff sinks linearly with age, integrating
 * the wind over its life is a closed-form quadratic in age.
 */
function advectionZ(an: number, prm: Params): number {
  const shearRate = SHEAR_MAX * prm.shear // (m/s) per metre of altitude
  const sinkRate = SINK_MAX * prm.sink * M_PER_WORLD_Y // metres of descent per unit age
  // ∫₀^age [WIND0 − shearRate·sink(t)] dt, with sink(t) linear in age.
  const driftM = T_SEC * (WIND0 * an - 0.5 * shearRate * sinkRate * an * an)
  return driftM / M_PER_WORLD_Z
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
  const tilt = SHEAR_TILT * prm.shear * an
  const px = p.x
  const py = FLIGHT.y - sink
  const pz = FLIGHT.z + advectionZ(an, prm)

  // Survive for PERSIST_STEPS timesteps after the centre leaves the ISSR,
  // fading over the final step; then gone.
  const outside = centreOutsideMinutes(px, pz, an, prm)
  const life = Math.min(
    1,
    Math.max(0, (PERSIST_STEPS * TIMESTEP_MIN - outside) / TIMESTEP_MIN),
  )

  let opacity = lerp(FRESH_OPACITY, OLD_OPACITY, an) * humid * life
  opacity = Math.min(0.55, Math.max(0, opacity))

  return {
    visible: opacity > 0.01,
    px, py, pz,
    sx, sy, sz,
    tilt,
    opacity,
  }
}
