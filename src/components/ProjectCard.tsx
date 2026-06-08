import './ProjectCard.css'

interface ProjectCardProps {
  title: string
  description: string
  imagePath: string
  onClick?: () => void
}

function ProjectCard({ title, description, imagePath, onClick }: ProjectCardProps) {
  return (
    <div className="project-card" onClick={onClick}>
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
