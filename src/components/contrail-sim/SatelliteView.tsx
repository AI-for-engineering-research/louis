import { useEffect, useMemo, useRef } from 'react'
import { AXIS, BOX, FLIGHT, ISSR, latAt, lerp, lonAt } from './scene'
import { clock, useSimStore } from './simStore'
import { flightFraction, makePuffs, puffAt } from './contrailModel'

// Internal resolution of the brightness-temperature buffer (then scaled up to
// the panel with smoothing for a soft, satellite-like look).
const GRID_W = 300
const GRID_H = Math.round((GRID_W * BOX.d) / BOX.w)

const TAU_K = 1.6 // optical-depth → coldness saturation
const PUFF_AMP = 1.3 // optical-depth gain per puff
const CIRRUS_AMP = 0.22 // faint background cirrus

// Lookup tables to keep the per-pixel loops free of exp()/ramp() each frame.
const TAU_LUT_MAX = 5 // optical depth spanned by the 256-entry colour LUT
const GAUSS_N = 512 // Gaussian-falloff LUT resolution
const GAUSS_QMAX = 18 // max squared radius it covers (±3σ in each axis)

// Brightness-temperature range shown by the colormap / colorbar (Kelvin).
const BT_WARM = 290 // background (low optical depth)
const BT_COLD = 220 // thick cold contrail

// IR enhancement ramp: warm/clear = dark, cold/thick = bright (inverted IR).
const RAMP: [number, [number, number, number]][] = [
  [0.0, [11, 18, 32]],
  [0.3, [33, 58, 92]],
  [0.55, [80, 120, 165]],
  [0.78, [165, 200, 230]],
  [1.0, [240, 250, 255]],
]

function ramp(c: number): [number, number, number] {
  const t = Math.min(1, Math.max(0, c))
  for (let i = 1; i < RAMP.length; i++) {
    if (t <= RAMP[i][0]) {
      const [t0, a] = RAMP[i - 1]
      const [t1, b] = RAMP[i]
      const f = (t - t0) / (t1 - t0)
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
    }
  }
  return RAMP[RAMP.length - 1][1]
}

const rgb = ([r, g, b]: [number, number, number]) =>
  `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`

// Cheap deterministic value-noise for streaky background cirrus.
function hash(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

/**
 * Top-down synthetic infrared image of the contrail — the radiative-transfer
 * end of the pipeline, in cartoon form. Reads the same puffs as the 3D view at
 * the current timeline position, so the two views always correspond.
 */
export default function SatelliteView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const puffs = useMemo(() => makePuffs(), [])

  // Offscreen brightness-temperature buffer.
  const buf = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = GRID_W
    c.height = GRID_H
    const ctx = c.getContext('2d')!
    return { canvas: c, ctx, image: ctx.createImageData(GRID_W, GRID_H) }
  }, [])

  // Streaky background cirrus, computed once.
  const cirrus = useMemo(() => {
    const f = new Float32Array(GRID_W * GRID_H)
    for (let gy = 0; gy < GRID_H; gy++) {
      for (let gx = 0; gx < GRID_W; gx++) {
        let n = 0
        let amp = 0.5
        let fx = 0.04
        let fy = 0.16
        for (let o = 0; o < 3; o++) {
          n += amp * vnoise(gx * fx, gy * fy)
          fx *= 2
          fy *= 2
          amp *= 0.5
        }
        f[gy * GRID_W + gx] = Math.max(0, n - 0.46) * CIRRUS_AMP
      }
    }
    return f
  }, [])

  // tau → RGB, precomputed (collapses exp + ramp into one lookup per pixel).
  const colorLut = useMemo(() => {
    const lut = new Uint8Array(256 * 3)
    for (let i = 0; i < 256; i++) {
      const tauv = (i / 255) * TAU_LUT_MAX
      const [r, g, b] = ramp(1 - Math.exp(-TAU_K * tauv))
      lut[i * 3] = r
      lut[i * 3 + 1] = g
      lut[i * 3 + 2] = b
    }
    return lut
  }, [])

  // exp(-r²/2) sampled by squared radius, for puff accumulation.
  const gaussLut = useMemo(() => {
    const lut = new Float32Array(GAUSS_N + 1)
    for (let i = 0; i <= GAUSS_N; i++) {
      lut[i] = Math.exp(-0.5 * (i / GAUSS_N) * GAUSS_QMAX)
    }
    return lut
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const wrap = canvas.parentElement!
    const ctx = canvas.getContext('2d')!
    const tau = new Float32Array(GRID_W * GRID_H)
    let raf = 0
    let cssW = 0
    let cssH = 0

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (w !== cssW || h !== cssH) {
        cssW = w
        cssH = h
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Panel background.
      ctx.fillStyle = '#0a0f1a'
      ctx.fillRect(0, 0, cssW, cssH)

      // Image area (margins for title, axes, colorbar).
      const ml = 48
      const mr = 92
      const mt = 36
      const mb = 36
      const ix = ml
      const iy = mt
      const iw = Math.max(10, cssW - ml - mr)
      const ih = Math.max(10, cssH - mt - mb)

      // --- accumulate optical depth into the grid buffer ---
      tau.set(cirrus)
      const time = clock.time
      const { params } = useSimStore.getState()
      const frac = flightFraction(time)
      // The contrail exists only behind the aircraft, so clip every puff's
      // footprint to columns at or behind the plane's current longitude. This
      // removes the (unphysical) cold pixels the Gaussian tails would otherwise
      // bleed ahead of the marker.
      const planeGx = ((lerp(FLIGHT.x0, FLIGHT.x1, frac) + BOX.w / 2) / BOX.w) * GRID_W
      const xClip = Math.min(GRID_W - 1, Math.floor(planeGx))
      const qScale = GAUSS_N / GAUSS_QMAX
      const centers: [number, number][] = []
      for (let p = 0; p < puffs.length; p++) {
        const ps = puffAt(puffs[p], time, params)
        if (!ps.visible) continue
        centers.push([ps.px, ps.pz])
        const cosT = Math.cos(ps.tilt)
        const sinT = Math.sin(ps.tilt)
        const sigZ = Math.sqrt((ps.sz * cosT) ** 2 + (ps.sy * sinT) ** 2)
        const cgx = ((ps.px + BOX.w / 2) / BOX.w) * GRID_W
        const cgy = (1 - (ps.pz + BOX.d / 2) / BOX.d) * GRID_H
        const sgx = Math.max(0.6, (ps.sx / BOX.w) * GRID_W)
        const sgy = Math.max(0.6, (sigZ / BOX.d) * GRID_H)
        const amp = ps.opacity * PUFF_AMP
        const x0 = Math.max(0, Math.floor(cgx - 3 * sgx))
        const x1 = Math.min(xClip, Math.ceil(cgx + 3 * sgx))
        const y0 = Math.max(0, Math.floor(cgy - 3 * sgy))
        const y1 = Math.min(GRID_H - 1, Math.ceil(cgy + 3 * sgy))
        for (let gy = y0; gy <= y1; gy++) {
          const dz = (gy - cgy) / sgy
          const dz2 = dz * dz
          const row = gy * GRID_W
          for (let gx = x0; gx <= x1; gx++) {
            const dx = (gx - cgx) / sgx
            const q = dz2 + dx * dx
            if (q < GAUSS_QMAX) tau[row + gx] += amp * gaussLut[(q * qScale) | 0]
          }
        }
      }

      // --- map optical depth → brightness temperature colour (via LUT) ---
      const data = buf.image.data
      const cScale = 255 / TAU_LUT_MAX
      for (let i = 0; i < tau.length; i++) {
        let ti = tau[i] * cScale
        if (ti > 255) ti = 255
        const idx = (ti | 0) * 3
        const j = i * 4
        data[j] = colorLut[idx]
        data[j + 1] = colorLut[idx + 1]
        data[j + 2] = colorLut[idx + 2]
        data[j + 3] = 255
      }
      buf.ctx.putImageData(buf.image, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(buf.canvas, ix, iy, iw, ih)

      // --- overlays ---
      const wxToPx = (x: number) => ix + ((x + BOX.w / 2) / BOX.w) * iw
      const wzToPy = (z: number) => iy + (1 - (z + BOX.d / 2) / BOX.d) * ih

      // ISSR footprint (humid region, dashed).
      ctx.save()
      ctx.setLineDash([5, 4])
      ctx.strokeStyle = 'rgba(120,190,235,0.6)'
      ctx.lineWidth = 1
      ctx.strokeRect(wxToPx(ISSR.x[0]), iy, wxToPx(ISSR.x[1]) - wxToPx(ISSR.x[0]), ih)
      ctx.restore()
      ctx.fillStyle = 'rgba(150,200,235,0.85)'
      ctx.font = '11px "Segoe UI", sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('ISSR', wxToPx(ISSR.x[0]) + 4, iy + 13)

      // Contrail centreline through the puff centres (visualises advection).
      if (centers.length > 1) {
        ctx.strokeStyle = 'rgba(255,138,42,0.95)'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let c = 0; c < centers.length; c++) {
          const X = wxToPx(centers[c][0])
          const Y = wzToPy(centers[c][1])
          if (c === 0) ctx.moveTo(X, Y)
          else ctx.lineTo(X, Y)
        }
        ctx.stroke()
      }

      // Aircraft marker, at the contrail's (clipped) leading edge.
      const planeX = wxToPx(lerp(FLIGHT.x0, FLIGHT.x1, frac))
      const planeY = wzToPy(FLIGHT.z)
      ctx.fillStyle = '#ffd54a'
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(planeX + 11, planeY)
      ctx.lineTo(planeX - 7, planeY - 7)
      ctx.lineTo(planeX - 7, planeY + 7)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Image border.
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'
      ctx.lineWidth = 1
      ctx.strokeRect(ix + 0.5, iy + 0.5, iw - 1, ih - 1)

      // --- axes ---
      ctx.fillStyle = 'rgba(220,230,245,0.8)'
      ctx.font = '11px "Segoe UI", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      for (let t = 0; t <= 1.0001; t += 0.25) {
        const x = lerp(FLIGHT.x0, FLIGHT.x1, t)
        ctx.fillText(`${Math.round(lonAt(x))}`, ix + t * iw, iy + ih + 6)
      }
      ctx.fillText(`longitude (${AXIS.lon.unit})`, ix + iw / 2, iy + ih + 20)

      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      for (let t = 0; t <= 1.0001; t += 0.25) {
        const z = lerp(-BOX.d / 2, BOX.d / 2, t)
        ctx.fillText(`${Math.round(latAt(z))}`, ix - 8, iy + (1 - t) * ih)
      }
      ctx.save()
      ctx.translate(12, iy + ih / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`latitude (${AXIS.lat.unit})`, 0, 0)
      ctx.restore()

      // --- title + time ---
      ctx.fillStyle = 'rgba(235,242,252,0.92)'
      ctx.font = '600 13px "Segoe UI", sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText('Synthetic IR brightness temperature (10.8 µm)', ix, iy - 18)
      ctx.textAlign = 'right'
      ctx.fillText(`t = ${Math.round(time)} min`, ix + iw, iy - 18)

      // --- colorbar ---
      const cbx = cssW - mr + 22
      const cbw = 14
      const cby = iy
      const cbh = ih
      for (let s = 0; s < cbh; s++) {
        const c = 1 - s / cbh // top = cold/bright
        ctx.fillStyle = rgb(ramp(c))
        ctx.fillRect(cbx, cby + s, cbw, 1)
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'
      ctx.strokeRect(cbx + 0.5, cby + 0.5, cbw - 1, cbh - 1)
      ctx.fillStyle = 'rgba(220,230,245,0.85)'
      ctx.font = '10px "Segoe UI", sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      for (let bt = BT_COLD; bt <= BT_WARM + 0.1; bt += 20) {
        const c = (BT_WARM - bt) / (BT_WARM - BT_COLD)
        const yy = cby + (1 - c) * cbh
        ctx.fillText(`${bt}`, cbx + cbw + 5, yy)
      }
      ctx.save()
      ctx.translate(cbx + cbw + 34, cby + cbh / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.fillText('brightness temp (K)', 0, 0)
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [puffs, buf, cirrus])

  return <canvas ref={canvasRef} className="sim-sat-canvas" />
}
