import { useRef, useState } from 'react'
import './VideoPlayer.css'

const SPEEDS = [0.25, 0.5, 1, 1.5, 2]
const DEFAULT_SPEED = SPEEDS.indexOf(1)

type Props = {
  src: string
  label: string
  /** Frame rate of `src`, needed to seek a single frame at a time. */
  fps: number
}

export default function VideoPlayer({ src, label, fps }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  // Bumping the pulse remounts the readout, restarting its fade animation.
  const [readout, setReadout] = useState({ text: '', pulse: 0 })

  const flash = (text: string) => setReadout((r) => ({ text, pulse: r.pulse + 1 }))

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const stepSpeed = (delta: number) => {
    const video = videoRef.current
    if (!video) return
    const next = Math.min(SPEEDS.length - 1, Math.max(0, speed + delta))
    video.playbackRate = SPEEDS[next]
    setSpeed(next)
    flash(`${SPEEDS[next]}×`)
  }

  const stepFrame = (delta: number) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    video.pause()

    const total = Math.round(video.duration * fps)
    const current = Math.min(total - 1, Math.floor(video.currentTime * fps))
    const next = (current + delta + total) % total
    // Frame n spans [n/fps, (n+1)/fps); aim at its middle so a seek never
    // lands on the boundary and resolves to the neighbouring frame.
    video.currentTime = (next + 0.5) / fps

    flash(`${next + 1} / ${total}`)
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="video-control">
        <button onClick={() => stepFrame(-1)} aria-label="Previous frame">
          Prev
        </button>
        <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={() => stepFrame(1)} aria-label="Next frame">
          Next
        </button>
        <button onClick={() => stepSpeed(-1)} disabled={speed === 0}>
          Slower
        </button>
        <button onClick={() => stepSpeed(1)} disabled={speed === SPEEDS.length - 1}>
          Faster
        </button>
        <span
          key={readout.pulse}
          className={`video-speed${readout.pulse ? ' fade-in-out' : ''}`}
        >
          {readout.text}
        </span>
      </div>
    </div>
  )
}
