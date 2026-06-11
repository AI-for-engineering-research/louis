import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Airplane from './Airplane'
import { FLIGHT, lerp } from './scene'
import { clock, PLAY_RATE, T_TOTAL, useSimStore } from './simStore'
import { flightFraction, makePuffs, puffAt } from './contrailModel'

/**
 * The contrail system: a row of Gaussian puffs plus the aircraft that lays
 * them. A single frame loop advances the simulation clock, moves the plane
 * along its cruise path, and updates every puff's transform + opacity
 * imperatively — keeping React out of the 60 fps hot path.
 */
export default function Contrail() {
  const puffs = useMemo(() => makePuffs(), [])

  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const planeRef = useRef<THREE.Group>(null)
  const uiAccum = useRef(0)

  // Shared low-poly sphere; one material per puff so each can fade independently.
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 14, 10), [])
  const materials = useMemo(
    () =>
      puffs.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: '#eef3f8',
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
            roughness: 0.95,
            metalness: 0,
          }),
      ),
    [puffs],
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      materials.forEach((m) => m.dispose())
    }
  }, [geometry, materials])

  useFrame((_, delta) => {
    const { playing, params, setDisplayTime } = useSimStore.getState()

    // Advance + loop the clock while playing.
    if (playing) {
      clock.time += delta * PLAY_RATE
      if (clock.time >= T_TOTAL) clock.time -= T_TOTAL
    }

    // Throttled UI sync (~15 Hz) for the scrubber and readout.
    uiAccum.current += delta
    if (uiAccum.current >= 0.066) {
      uiAccum.current = 0
      setDisplayTime(clock.time)
    }

    // Fly the aircraft along the cruise path.
    const frac = flightFraction(clock.time)
    if (planeRef.current) {
      planeRef.current.position.set(lerp(FLIGHT.x0, FLIGHT.x1, frac), FLIGHT.y, FLIGHT.z)
    }

    // Update every puff.
    for (let i = 0; i < puffs.length; i++) {
      const m = meshes.current[i]
      if (!m) continue
      const ps = puffAt(puffs[i], clock.time, params)
      m.visible = ps.visible
      if (!ps.visible) continue
      m.position.set(ps.px, ps.py, ps.pz)
      m.scale.set(ps.sx, ps.sy, ps.sz)
      m.rotation.set(ps.tilt, 0, 0)
      materials[i].opacity = ps.opacity
    }
  })

  return (
    <group>
      {puffs.map((p, i) => (
        <mesh
          key={p.s}
          ref={(el) => {
            meshes.current[i] = el
          }}
          geometry={geometry}
          material={materials[i]}
          visible={false}
        />
      ))}

      <group ref={planeRef}>
        <Airplane />
      </group>
    </group>
  )
}
