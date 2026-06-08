import ProjectCard from '../components/ProjectCard'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="bio">
        <h1>Welcome</h1>
        <p>
          Louis is a researcher at MIT's Laboratory for Aviation and the Environment
          investigating the climate impact of aircraft contrails. His work
          combines satellite imagery analysis with physics-based contrail
          modeling to better understand aviation's climate footprint.
        </p>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          <ProjectCard
            title="Satellite Imagery vs. Synthetic Contrails"
            description="Comparison of real satellite imagery of contrails with synthetic imagery computed from contrail modeling. This project explores how well physics-based models capture the appearance of contrails as seen from space."
            imagePath="/louis/project1-placeholder.gif"
          />
          <ProjectCard
            title="APCEMM Contrail Model"
            description="Visualization and analysis of the APCEMM (Aircraft Plume Chemistry Emissions and Microphysics Model) contrail simulation. Includes 2D cross-sections showing contrail dynamics and simulation mechanics."
            imagePath="/louis/project2-placeholder.gif"
          />
        </div>
      </section>
    </div>
  )
}

export default Home
