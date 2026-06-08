import './ContrailGallery.css'

function ContrailGallery() {
  return (
    <section className="contrail-gallery">
      <div className="gallery-container">
        <h2>Contrail Evolution</h2>

        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="gallery-image">
              <img src="/louis/early-contrail.jpg" alt="Early contrail" />
            </div>
            <h3>Early</h3>
            <p>Fresh contrail formation - linear and highly visible against the sky</p>
          </div>

          <div className="gallery-item">
            <div className="gallery-image">
              <img src="/louis/medium-contrail.jpg" alt="Medium contrail" />
            </div>
            <h3>Medium</h3>
            <p>Transitional stage - spreading and beginning to merge with ambient clouds</p>
          </div>

          <div className="gallery-item">
            <div className="gallery-image">
              <img src="/louis/old-contrail.jpg" alt="Young contrail" />
            </div>
            <h3>Mature</h3>
            <p>Aged contrail - evolved into cirrus-like structures, visually indistinguishable from natural clouds</p>
          </div>
        </div>

        <div className="gallery-description">
          <p>
            Contrails undergo a significant visual transformation over time. Immediately after formation, they appear as sharp, linear clouds
            that clearly mark the aircraft's flight path. As they age, atmospheric mixing causes them to spread and lose their distinct linear shape.
            Within hours, mature contrails become visually similar to natural cirrus clouds, making it increasingly difficult to distinguish them
            from naturally occurring cloud formations. This evolution is driven by atmospheric humidity, temperature, and wind patterns that gradually
            homogenize the contrail structure with surrounding air.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContrailGallery
