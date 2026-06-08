import './ProjectModal.css'

interface ProjectModalProps {
  title: string
  description: string
  imagePath: string
  onClose: () => void
}

function ProjectModal({ title, description, imagePath, onClose }: ProjectModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={imagePath} alt={title} />
          </div>

          <div className="modal-text">
            <h2>{title}</h2>
            <p className="modal-description">{description}</p>

            <div className="modal-gallery">
              <h3>Gallery</h3>
              <p className="gallery-placeholder">Additional images coming soon...</p>
            </div>

            <div className="modal-details">
              <h3>Details</h3>
              <p>This section will contain more detailed information about the project, methodology, results, and insights.</p>
            </div>

            <div className="modal-footer">
              <p><em>Click outside or press × to close</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
