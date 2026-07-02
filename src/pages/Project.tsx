import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icon'

const GRID = '/louis/synthetic_images.png'

export default function Project() {
  return (
    <>
      <div className="container blog main first">
        <h1>Satellite Imagery vs. Synthetic Contrails</h1>
        <div className="prose">
          <p className="text">
            A comparison of real satellite imagery of contrails with synthetic
            imagery computed from physics-based contrail modeling. The goal is to
            understand how well the modeling pipeline reproduces the appearance of
            contrails — and the surrounding cloud field — as seen from space.
          </p>
          <p className="text">
            Starting from numerical weather prediction (NWP) fields, the pipeline
            simulates contrail formation and persistence and renders the scene as
            it would appear in infrared satellite channels, so simulated and
            observed imagery can be compared directly.
          </p>
        </div>
      </div>

      <div className="container blog main gray">
        <img src={GRID} alt="Grid of synthetic infrared satellite panels" />
        <p className="caption">
          Synthetic infrared satellite panels from the modeling pipeline. Top row
          uses ERA5 NWP input, bottom row uses HRRR; within each row: contrail-free,
          with contrails, and with contrails highlighted.
        </p>
      </div>

      <div className="container blog main">
        <Link to="/sim" className="button project accent">
          Explore the interactive model
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Placeholder writeup — Louis to fill in */}
      <div className="container blog main">
        <h1>Overview</h1>
        <p className="text">
          <em>Placeholder — high-level overview of the project and its motivation.</em>
        </p>

        <h2>Approach</h2>
        <p className="text">
          <em>
            Placeholder — the modeling pipeline, NWP inputs, and how synthetic
            imagery is produced.
          </em>
        </p>

        <h2>Results</h2>
        <p className="text">
          <em>
            Placeholder — comparison findings once a real-satellite reference image
            is added (a before/after slider can go here later).
          </em>
        </p>
      </div>
    </>
  )
}
