import { useSimStore, T_TOTAL, type Params } from './simStore'

const pct = (v: number) => `${Math.round(v * 100)}%`

const SLIDERS: {
  key: keyof Params
  label: string
  hint: string
  display: (v: number) => string
}[] = [
  { key: 'shear', label: 'Wind shear', hint: 'tilts & drifts the contrail', display: pct },
  { key: 'sink', label: 'Sink rate', hint: 'how fast ice crystals fall', display: pct },
  {
    key: 'humidity',
    label: 'Humidity',
    hint: 'RHi — persistence & spread',
    // A contrail only persists in ice-supersaturated air, so this maps to
    // RHi 100–150% (100% = barely persistent, 150% = strongly persistent).
    display: (v) => `RHi ${Math.round(100 + v * 50)}%`,
  },
]

/**
 * Transport (play / restart / scrub) and the physics sliders. Reads the
 * simulation store; updates here never touch the 3D scene's render loop.
 */
export default function TimelineControls() {
  const playing = useSimStore((s) => s.playing)
  const displayTime = useSimStore((s) => s.displayTime)
  const params = useSimStore((s) => s.params)
  const togglePlaying = useSimStore((s) => s.togglePlaying)
  const restart = useSimStore((s) => s.restart)
  const scrubTo = useSimStore((s) => s.scrubTo)
  const setParam = useSimStore((s) => s.setParam)

  return (
    <div className="sim-controls">
      <div className="sim-transport">
        <button
          className="sim-btn"
          onClick={togglePlaying}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button className="sim-btn sim-btn-ghost" onClick={restart} aria-label="Restart">
          ⟲
        </button>

        <input
          className="sim-scrub"
          type="range"
          min={0}
          max={T_TOTAL}
          step={0.1}
          value={displayTime}
          onChange={(e) => scrubTo(Number(e.target.value))}
          aria-label="Contrail age"
        />
        <span className="sim-time">{Math.round(displayTime)} min</span>
      </div>

      <div className="sim-sliders">
        {SLIDERS.map(({ key, label, hint, display }) => (
          <div className="sim-slider" key={key}>
            <label htmlFor={`slider-${key}`}>
              <span>
                {label} <em>{hint}</em>
              </span>
              <span className="sim-slider-val">{display(params[key])}</span>
            </label>
            <input
              id={`slider-${key}`}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={params[key]}
              onChange={(e) => setParam(key, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
