import { useEffect } from 'react'
import { clock, PLAY_RATE, T_TOTAL, useSimStore } from './simStore'

/**
 * Advances the simulation clock on its own requestAnimationFrame loop —
 * independent of which view (3D or satellite) is on screen — so playback
 * continues seamlessly across the toggle. Both views only ever *read* the clock.
 * Renders nothing.
 */
export default function SimDriver() {
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let acc = 0
    const setDisplayTime = useSimStore.getState().setDisplayTime

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now

      if (useSimStore.getState().playing) {
        clock.time += dt * PLAY_RATE
        if (clock.time >= T_TOTAL) clock.time -= T_TOTAL
        // Throttle the reactive readout/scrubber to ~15 Hz.
        acc += dt
        if (acc >= 0.066) {
          acc = 0
          setDisplayTime(clock.time)
        }
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
