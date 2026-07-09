import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icon'
import ImageCompare, { type CompareImage } from '../components/ImageCompare'

const GRID = '/louis/synthetic_images.png'

const ASH_IMAGES: CompareImage[] = [
  { id: 'goes', label: 'GOES observation', src: '/louis/project/full-ash-goes.png' },
  { id: 'base', label: 'Synthetic — baseline', src: '/louis/project/full-ash-base.png' },
  { id: 'best', label: 'Synthetic — best parametrization', src: '/louis/project/full-ash-best.png' },
]

export default function Project() {
  return (
    <>
      <div className="container blog main first">
        <h1>Synthetic satellite imagery of contrails</h1>
        <div className="prose">
          <p className="text">
            A comparison of real satellite imagery of contrails with synthetic
            imagery computed from physics-based contrail modeling. The goal is to
            understand how well the modeling pipeline reproduces the appearance of
            contrails and the surrounding cloud field as seen from space.
            Starting from numerical weather prediction (NWP) fields, the pipeline
            simulates contrail formation and persistence using CoCiP and solves the
            radiative transfer for each pixel of the scene for each infrared satellite channel.
          </p>
        </div>
      </div>

      <div className="container blog main">
        <h2>Contrail-free synthetic satellite imagery</h2>
        <div className="prose">
          <p className="text">
            The first validation step is to simulate synthetic imagery without contrails. This is a simple verification
            step to test which microphysical parametrizations lead to the best results. Best here is qualitative: we use the ash
            transform as a reference point.
          </p>
        </div>
      </div>

      <div className="container blog main gray">
        <ImageCompare images={ASH_IMAGES} defaultLeft="goes" defaultRight="best" />
        <p className="caption">
          Ash RGB composites over the full scene. Pick an image for each side and drag
          the handle to blend between them.
        </p>
      </div>

      {/* <div className="container blog main gray">
        <img src={GRID} alt="Grid of synthetic infrared satellite panels" />
        <p className="caption">
          Synthetic infrared satellite panels from the modeling pipeline. Top row
          uses ERA5 NWP input, bottom row uses HRRR; within each row: contrail-free,
          with contrails, and with contrails highlighted.
        </p>
      </div> */}

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
