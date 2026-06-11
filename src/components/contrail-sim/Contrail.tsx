import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Airplane from './Airplane'
import { FLIGHT, lerp } from './scene'
import { clock, useSimStore } from './simStore'
import { flightFraction, makePuffs, puffAt } from './contrailModel'

/**
 * The contrail system: a row of Gaussian puffs plus the aircraft that lays
 * them. A single frame loop advances the simulation clock, moves the plane
 * along its cruise path, and updates every puff's transform + opacity
 * imperatively — keeping React out of the 60 fps hot path.
 */
export default function Contrail() {
  const puffs = useMemo(() => makePuffs(), [])
  const gl = useThree((s) => s.gl)

  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const planeRef = useRef<THREE.Group>(null)

  // Clip the puffs at the aircraft's longitude — there is no contrail ahead of
  // the plane. Normal -X keeps the half-space x ≤ constant; constant tracks the
  // plane each frame. (Only the puff materials use it, so the plane/grid show.)
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), [])

  useEffect(() => {
    gl.localClippingEnabled = true
  }, [gl])

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
            clippingPlanes: [clipPlane],
          }),
      ),
    [puffs, clipPlane],
  )

  // Polyline through the puff centres, to make the advection legible.
  const centerline = useMemo(() => {
    const positions = new Float32Array(puffs.length * 3)
    const geom = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(positions, 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    geom.setAttribute('position', attr)
    geom.setDrawRange(0, 0)
    const material = new THREE.LineBasicMaterial({
      color: '#ff8a2a',
      transparent: true,
      opacity: 0.95,
      depthTest: false,
    })
    const line = new THREE.Line(geom, material)
    line.frustumCulled = false
    line.renderOrder = 10 // draw over the translucent puffs
    return { line, geom, material, positions }
  }, [puffs])

  useEffect(() => {
    return () => {
      geometry.dispose()
      materials.forEach((m) => m.dispose())
      centerline.geom.dispose()
      centerline.material.dispose()
    }
  }, [geometry, materials, centerline])

  useFrame(() => {
    const { params } = useSimStore.getState()

    // Fly the aircraft along the cruise path (clock advanced by SimDriver).
    const frac = flightFraction(clock.time)
    const planeX = lerp(FLIGHT.x0, FLIGHT.x1, frac)
    if (planeRef.current) {
      planeRef.current.position.set(planeX, FLIGHT.y, FLIGHT.z)
    }
    // Clip puffs to behind the aircraft.
    clipPlane.constant = planeX

    // Update every puff, and collect visible centres for the centreline.
    const linePos = centerline.positions
    let k = 0
    for (let i = 0; i < puffs.length; i++) {
      const ps = puffAt(puffs[i], clock.time, params)
      const m = meshes.current[i]
      if (m) {
        m.visible = ps.visible
        if (ps.visible) {
          m.position.set(ps.px, ps.py, ps.pz)
          m.scale.set(ps.sx, ps.sy, ps.sz)
          m.rotation.set(ps.tilt, 0, 0)
          materials[i].opacity = ps.opacity
        }
      }
      if (ps.visible) {
        linePos[k * 3] = ps.px
        linePos[k * 3 + 1] = ps.py
        linePos[k * 3 + 2] = ps.pz
        k++
      }
    }
    centerline.geom.setDrawRange(0, k)
    centerline.geom.attributes.position.needsUpdate = true
    centerline.line.visible = k > 1
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

      <primitive object={centerline.line} />

      <group ref={planeRef}>
        <Airplane />
      </group>
    </group>
  )
}
