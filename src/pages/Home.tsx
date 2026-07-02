import LinkCard from '../components/LinkCard'

const COVER =
  '/louis/sky_contrail_flyer_jets_blue_flight_movements_aircraft_clouds-623084.jpg'

export default function Home() {
  return (
    <>
      {/* Hero (Clarity title block + cover) */}
      <div
        className="container blog"
        id="first-content"
        style={{ backgroundColor: '#d9e6f2' }}
      >
        <div className="blog-title">
          <div className="blog-intro">
            <div>
              <h1 className="title">Contrails and satellite imagery shenanigans</h1>
              <p className="hero-tagline">
                &mdash; Louis Robion
              </p>
              <p className="abstract">
                This site collects my experiments with satellite imagery and physics-based
                modeling to aircraft contrails. It gathers a
                focused project, an interactive simulation, and a running research
                log documenting how I learn to integrate agents in research.
              </p>
            </div>
          </div>
          <div className="blog-cover">
            <img
              className="foreground"
              src={COVER}
              alt="Contrails criss-crossing a blue sky"
            />
            <img className="background" src={COVER} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Link cards */}
      <div className="container blog main">
        <h1>Explore</h1>
        <div className="home-cards">
          <LinkCard
            to="/project"
            title="Satellite vs. Synthetic Contrails"
            desc="Comparing real satellite imagery of contrails with synthetic imagery from physics-based modeling."
          />
          <LinkCard
            to="/sim"
            title="Contrail simulation"
            desc="An interactive 3D cartoon of the contrail modeling pipeline, with a synthetic satellite view."
          />
          <LinkCard
            to="/log"
            title="Research log"
            desc="A running, per-session log of how I use AI tools across my research."
          />
        </div>
      </div>

      <div className="container blog main">
        <h1>About me</h1>
        <p className="text">
          <em>
            PhD candidate working on the climate impacts of contrails. My research focus is on better
            constraining modeling with large scale satellite imagery.
          </em>
        </p>
      </div>
    </>
  )
}
