import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from '../components/contrail-sim/Scene'
import SatelliteView from '../components/contrail-sim/SatelliteView'
import SimDriver from '../components/contrail-sim/SimDriver'
import TimelineControls from '../components/contrail-sim/TimelineControls'
import './ContrailSim.css'

type View = '3d' | 'sat'

/**
 * Interactive cartoon of the contrail modelling pipeline. An aircraft crosses a
 * numerical-weather-prediction (NWP) grid and lays a contrail that spreads,
 * sinks and shears as it ages; toggle to the corresponding synthetic satellite
 * image. Both views share one timeline and physics state.
 */
export default function ContrailSim() {
  const [view, setView] = useState<View>('3d')

  return (
    <div className="sim-page">
      <header className="sim-header">
        <h1>Contrail simulation</h1>
        <p className="sim-intro">
          A cartoon of the modelling pipeline behind my research. An aircraft
          crosses a numerical weather prediction (NWP) grid and forms a
          contrail, which spreads, slowly sinks, and shears with the wind as it
          ages — persisting only where the air is ice-supersaturated. Toggle the
          top-down satellite view to see the corresponding synthetic infrared
          image. Press play or scrub through time, and adjust the physics below.
        </p>
      </header>

      {/* Time advances independently of the visible view */}
      <SimDriver />

      <div className="sim-viewtabs" role="tablist">
        <button
          role="tab"
          aria-selected={view === '3d'}
          className={view === '3d' ? 'active' : ''}
          onClick={() => setView('3d')}
        >
          3D view
        </button>
        <button
          role="tab"
          aria-selected={view === 'sat'}
          className={view === 'sat' ? 'active' : ''}
          onClick={() => setView('sat')}
        >
          Satellite view
        </button>
      </div>

      <div className="sim-stage">
        <div className="sim-canvas-wrap">
          {/* 3D stays mounted (hidden when inactive) to avoid re-initialising WebGL */}
          <div
            className="sim-3d"
            style={{ display: view === '3d' ? 'block' : 'none' }}
          >
            <Canvas
              frameloop={view === '3d' ? 'always' : 'never'}
              camera={{ position: [10, 6.5, 12], fov: 42 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {view === 'sat' && <SatelliteView />}
        </div>
      </div>

      <TimelineControls />
    </div>
  )
}
