import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { BOX } from './scene'

/**
 * Orbit controls with a gentle idle auto-rotation that stops while the user is
 * interacting and resumes a few seconds after they let go.
 */
export default function SceneControls() {
  const ref = useRef<any>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    let timer: number | undefined

    const onStart = () => {
      c.autoRotate = false
      if (timer) window.clearTimeout(timer)
    }
    const onEnd = () => {
      timer = window.setTimeout(() => {
        if (ref.current) ref.current.autoRotate = true
      }, 3500)
    }

    c.addEventListener('start', onStart)
    c.addEventListener('end', onEnd)
    return () => {
      c.removeEventListener('start', onStart)
      c.removeEventListener('end', onEnd)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan
      autoRotate
      autoRotateSpeed={0.45}
      minDistance={6}
      maxDistance={24}
      maxPolarAngle={Math.PI * 0.5}
      target={[0, BOX.h * 0.45, 0]}
    />
  )
}
