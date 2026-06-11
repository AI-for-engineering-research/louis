import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from '../components/contrail-sim/Scene'
import './ContrailSim.css'

/**
 * Interactive cartoon of the contrail modelling pipeline. An aircraft crosses a
 * numerical-weather-prediction (NWP) grid and lays a contrail that spreads,
 * sinks and shears as it ages; a future toggle will show the corresponding
 * synthetic satellite image.
 */
export default function ContrailSim() {
  return (
    <div className="contrail-sim">
      <header className="sim-header">
        <h1>Contrail simulation</h1>
        <p className="sim-intro">
          A cartoon of the modelling pipeline behind my research. An aircraft
          crosses a numerical weather prediction (NWP) grid and forms a
          contrail, which spreads, slowly sinks, and shears with the wind as it
          ages. Drag to orbit, scroll to zoom.
        </p>
      </header>

      <div className="sim-stage">
        <div className="sim-canvas-wrap">
          <Canvas
            camera={{ position: [10, 6.5, 12], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  )
}
