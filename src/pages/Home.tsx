import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import './Home.css'

interface Project {
  id: number
  title: string
  description: string
  imagePath: string
}

function Home() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Satellite Imagery vs. Synthetic Contrails",
      description: "Comparison of real satellite imagery of contrails with synthetic imagery computed from contrail modeling. This project explores how well physics-based models capture the appearance of contrails as seen from space.",
      imagePath: "/louis/project1-placeholder.gif"
    },
    {
      id: 2,
      title: "APCEMM Contrail Model",
      description: "Visualization and analysis of the APCEMM (Aircraft Plume Chemistry Emissions and Microphysics Model) contrail simulation. Includes 2D cross-sections showing contrail dynamics and simulation mechanics.",
      imagePath: "/louis/project2-placeholder.gif"
    }
  ]

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imagePath={project.imagePath}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          title={selectedProject.title}
          description={selectedProject.description}
          imagePath={selectedProject.imagePath}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default Home
