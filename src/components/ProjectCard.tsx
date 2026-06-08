import './ProjectCard.css'

interface ProjectCardProps {
  title: string
  description: string
  imagePath: string
}

function ProjectCard({ title, description, imagePath }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={imagePath} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ProjectCard
