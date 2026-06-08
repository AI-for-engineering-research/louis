import './Usage.css'

function Usage() {
  return (
    <div className="usage">
      <h1>AI Usage Log</h1>
      <p className="intro">
        This page documents my usage of AI assistants (Claude, ChatGPT, etc.) throughout the course to ensure transparency and track how AI impacts my learning and productivity.
      </p>

      <div className="log-entry">
        <h3>Week 1 (Jun 8, 2026)</h3>
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
        </div>
      </div>

      <div className="log-stats">
        <h3>Summary</h3>
        <p><strong>Total AI usage this week:</strong> 1 focused session</p>
        <p><strong>Primary use case:</strong> Requirement clarification and rapid prototyping</p>
      </div>
    </div>
  )
}

export default Usage
