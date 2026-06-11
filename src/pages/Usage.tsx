import './Usage.css'

function Usage() {
  return (
    <div className="usage">
      <h1>AI Usage Log</h1>
      <p className="intro">
        This page documents my usage of AI assistants (Claude, ChatGPT, etc.) throughout the course to ensure transparency and track how AI impacts my learning and productivity.
      </p>

      <div className="log-entry">
        <h3>Week 1 (Jun 8–11, 2026)</h3>
        <div className="entry-content">
          <div className="entry-section">
            <h4>Portfolio Landing Page Setup</h4>
            <p><strong>Duration:</strong> ~1 hour (single session)</p>
            <p><strong>Tasks:</strong></p>
            <ul>
              <li>Stress-tested project design decisions via grill-with-docs session</li>
              <li>Set up Vite + React + TypeScript project structure</li>
              <li>Created responsive landing page with bio and project showcase</li>
              <li>Configured GitHub Pages deployment with base path routing</li>
              <li>Built navigation between Home and AI Usage Log pages</li>
            </ul>
            <p><strong>AI Assistance:</strong> Claude Haiku 4.5 — consulting on architecture, asking clarifying questions, reducing ambiguity in requirements</p>
            <p><strong>Comments:</strong> Overall worked well with some clarification needed multiple times on features that did not work. .js / .tsx confusion leading to out of sync text took a few tries for the model to figure out. Lots of performance issues when adding the transparent text + rotating background, Claude could not figure that out so we dropped it for now.</p>
          </div>
          <div className="entry-section">
            <h4>Interactive 3D Contrail Simulation</h4>
            <p><strong>Duration:</strong> ~1 session</p>
            <p><strong>Model:</strong> Claude Opus 4.8 (1M context)</p>
            <p><strong>Tasks:</strong></p>
            <ul>
              <li>Planned the feature via a grill-me session, resolving the full design tree before writing code</li>
              <li>Built a lazy-loaded 3D "Contrail simulation" page with react-three-fiber (code-split so the Home page stays fast)</li>
              <li>Modeled an aging Gaussian-plume contrail: spreading, sinking, shearing, and northward wind advection</li>
              <li>Added a play/scrub timeline and live sliders for wind shear, sink rate, and humidity (RHi)</li>
              <li>Made the contrail persist only inside the ice-supersaturated region (ISSR)</li>
              <li>Built a top-down synthetic infrared satellite view from the same model, with a 3D/satellite toggle</li>
              <li>Added a centerline to visualize advection and clipped the contrail to behind the aircraft</li>
              <li>Deployed to GitHub Pages and modernized the deploy workflow to current action versions</li>
            </ul>
            <p><strong>AI Assistance:</strong> Claude Opus 4.8 (1M context) — design stress-testing (grill-me), react-three-fiber scene building, cartoon physics modeling, performance optimization, and CI maintenance</p>
            <p><strong>Comments:</strong> Very autonomous probably thanks to using Opus instead of Haiku. Discussed high level goals, and only gave a simple description for the contrails (Gaussian plume parametrizations) and got very reasonable outputs for a sketch like this. Similarly, decided on its own to simulate BTs at 10.8 um which is very relevant for contrails. I am happy with this first pass and this would have taken so much longer to do by myself.</p>
          </div>
        </div>
      </div>

      <div className="log-stats">
        <h3>Summary</h3>
        <p><strong>Total AI usage this week:</strong> 3 sessions</p>
        <p><strong>Primary use cases:</strong> Requirement clarification, rapid prototyping, and an interactive 3D research visualization</p>
      </div>
    </div>
  )
}

export default Usage
