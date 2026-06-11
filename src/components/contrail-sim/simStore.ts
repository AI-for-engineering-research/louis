import { create } from 'zustand'

// Full timeline length, in simulated minutes.
export const T_TOTAL = 60
// Playback speed: simulated minutes advanced per real second (≈11 s per loop).
export const PLAY_RATE = 5.25

// The live simulation time, mutated every frame by the render loop and read
// transiently by the contrail/airplane. Deliberately NOT in the reactive store
// so 60 fps updates never trigger React re-renders.
export const clock = { time: 0 }

export interface Params {
  shear: number // 0..1 wind shear strength
  sink: number // 0..1 fall/sink rate
  humidity: number // 0..1 ambient ice-supersaturation (persistence + spread)
}

interface SimState {
  playing: boolean
  /** Throttled copy of clock.time for the scrubber + readout. */
  displayTime: number
  params: Params
  togglePlaying: () => void
  setPlaying: (p: boolean) => void
  setDisplayTime: (t: number) => void
  /** Move to a specific time (pauses playback) — used by the scrubber. */
  scrubTo: (t: number) => void
  restart: () => void
  setParam: (key: keyof Params, value: number) => void
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const useSimStore = create<SimState>((set) => ({
  playing: !prefersReducedMotion(),
  displayTime: 0,
  params: { shear: 0.5, sink: 0.45, humidity: 0.6 },
  togglePlaying: () =>
    set((s) => {
      // Restart from the beginning if resuming from the very end.
      if (!s.playing && clock.time >= T_TOTAL - 0.01) clock.time = 0
      return { playing: !s.playing }
    }),
  setPlaying: (p) => set({ playing: p }),
  setDisplayTime: (t) => set({ displayTime: t }),
  scrubTo: (t) => {
    clock.time = t
    set({ displayTime: t, playing: false })
  },
  restart: () => {
    clock.time = 0
    set({ displayTime: 0, playing: true })
  },
  setParam: (key, value) =>
    set((s) => ({ params: { ...s.params, [key]: value } })),
}))
