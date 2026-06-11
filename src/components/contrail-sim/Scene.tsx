import Contrail from './Contrail'
import IssrSlab from './IssrSlab'
import NwpGrid from './NwpGrid'
import SceneControls from './SceneControls'

/**
 * Assembles the 3D view: soft lighting, the NWP grid, the ISSR slab, and the
 * contrail system (the aircraft plus its aging Gaussian-plume puffs). Playback
 * and the physics sliders are driven by the simulation store.
 */
export default function Scene() {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#9fbcd8', 0.55]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 11, 5]} intensity={1.05} />

      <NwpGrid />
      <IssrSlab />
      <Contrail />

      <SceneControls />
    </>
  )
}
