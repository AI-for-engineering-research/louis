import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icon'
import ImageCompare, { type CompareImage } from '../components/ImageCompare'
import Math from '../components/Math'
import VideoPlayer from '../components/VideoPlayer'

const GRID = '/louis/synthetic_images.png'

const ASH_IMAGES: CompareImage[] = [
  { id: 'goes', label: 'GOES observation', src: '/louis/project/full-ash-goes.png' },
  { id: 'base', label: 'Synthetic — baseline', src: '/louis/project/full-ash-base.png' },
  { id: 'best', label: 'Synthetic — best parametrization', src: '/louis/project/full-ash-best.png' },
]

const CONTRAIL_IMAGES: CompareImage[] = [
  { id: 'goes', label: 'GOES observation', src: '/louis/project/scene04-goes.png' },
  { id: 'no-contrail', label: 'Synthetic — no contrail', src: '/louis/project/scene04-sim-nc.png' },
  { id: 'contrail', label: 'Synthetic — contrail', src: '/louis/project/scene04-sim-c.png' },
]

export default function Project() {
  return (
    <>
      <div className="container blog main first">
        <h1>Synthetic satellite imagery of contrails</h1>
        <div className="prose">
          <p className="text">
            Comparing real satellite imagery of contrails with synthetic
            imagery computed from physics-based contrail modeling is informative of NWP and
            contrail model limitations. The goal is to
            understand how well the modeling pipeline reproduces the appearance of
            contrails and the surrounding cloud field as seen from space.
            Starting from numerical weather prediction (NWP) fields, the pipeline
            simulates contrail formation and persistence using CoCiP and solves the
            radiative transfer for each pixel of the scene for each infrared satellite channel using CRTM.
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
          Ash RGB composites over the GOES-19 full disk for 2025-12-10 00:00Z. Synthetic images use ERA5 data on pressure levels.
        </p>
      </div>

      <div className="container blog main">
        <div className="prose">
          <p className="text">
            The "best" parametrization captures thick cirrus well (brown clouds in ash scheme) and generally looks "good" compared
            to the real GOES image. The main problem that remains is the spurious "greening" of clouds. The ash transform is defined as:

            <Math block>{String.raw`
            \begin{aligned}
              R &= \mathrm{BT}_{12.3\,\mu m} - \mathrm{BT}_{11.2\,\mu m} \\
              G &= \mathrm{BT}_{11.2\,\mu m} - \mathrm{BT}_{8.5\,\mu m} \\
              B &= \mathrm{BT}_{11.2\,\mu m}
            \end{aligned}
          `}</Math>

            The greening is driven by the BTD being too large. This needs more investigating and may point to discrepancies in particle effective
            radius, or optical depth (via cloud water content).
          </p>
          <p className="text">
            To make this validation quantitative, we can compare the simulated brightness temperatures (BT) directly to their
            real counterpart for each pixel. However the differences there will blend error in the NWP model's ability to
            reproduce reality and the radiative transfer chain.
          </p>
        </div>
      </div>
{/* 
      <div className="container blog main">
        <Link to="/sim" className="button project accent">
          Explore the interactive model
          <ArrowRight size={16} />
        </Link>
      </div> */}

      <div className="container blog main">
        <h2>Contrail synthetic satellite imagery</h2>
        <div className="prose">
          <p className="text">
            We can introduce contrails by simulating them using NWP + CoCiP and rasterizing their
            properties to the the radiative transfer model grid. CRTM does know what contrails are, they
            are simply treated as a generic ice cloud with a given ice crystal effective radius and water content.
          </p>
        </div>
      </div>

      <div className="container blog main gray">
        <ImageCompare images={CONTRAIL_IMAGES} defaultLeft="goes" defaultRight="contrail" />
        <p className="caption">
          Ash RGB composites over the GOES-16 CONUS crop for 2024-03-03 18:40Z. Synthetic images use ERA5 data on model levels.
          Contrails are simulated with as-flown ADS-B tracks, ERA5 on model levels and CoCiP with an 8h spin-up.
        </p>
      </div>

      <div className="container blog main">
        <div className="prose">
          <p className="text">
            Zooming into a specific scene over the US, the limits of ERA5's horizontal resolution start showing. 0.25&#176;&times;0.25&#176;
            is coarse, and interpolating it to the ABI grid leads to very smooth features. Again, certain clouds are overly green in the simulation.
            Comparing the synthetic image without contrails to the real GOES image leads to an interesting observation: the large cirrus cluster in the
            center of the scene is not captured by ERA5. Could this be because this is an aged contrail cluster which ERA5 cannot simulate as it does
            not know about aviation?
          </p>
        </div>
      </div>

      <div className="container blog main gray">
        <VideoPlayer
          src="/louis/project/timelapse-cluster.mp4"
          label="Timelapse of the GOES-16 ash RGB over the CONUS crop on 2024-03-03"
          fps={1}
        />
        <p className="caption">
          Ash RGB timelapse over the same GOES-16 CONUS crop, 03:40 to 13:40 local on 2024-03-03.
          13:40 local is exactly 18:40Z plotted above.
          The cirrus cluster near the center of the scene is already there but faint at the start of the
          sequence. As local air traffic pickups, many contrails form and spread in the cluster. This leads
          to the large cluster scene on the final timestep.
        </p>
      </div>
    </>
  )
}
