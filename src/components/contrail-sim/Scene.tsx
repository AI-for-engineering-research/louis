import Airplane from './Airplane'
import IssrSlab from './IssrSlab'
import NwpGrid from './NwpGrid'
import SceneControls from './SceneControls'
import { FLIGHT } from './scene'

/**
 * Assembles the 3D view: soft sky lighting, the NWP grid, the ISSR slab, and
 * the aircraft on its cruise path. Phase 1 — the aircraft is static; the
 * contrail and timeline arrive in Phase 2.
 */
export default function Scene() {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#9fbcd8', 0.55]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 11, 5]} intensity={1.05} />

      <NwpGrid />
      <IssrSlab />
      <Airplane position={[FLIGHT.x0 + 6, FLIGHT.y, FLIGHT.z]} />

      <SceneControls />
    </>
  )
}
