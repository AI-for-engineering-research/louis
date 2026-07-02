import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'portfolio-landing-page',
  title: 'Portfolio Landing Page Setup',
  date: '2026-06-10',
  model: 'Claude Haiku 4.5',
  duration: '~1 hour (single session)',
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        <li>Stress-tested project design decisions via grill-with-docs session</li>
        <li>Set up Vite + React + TypeScript project structure</li>
        <li>Created responsive landing page with bio and project showcase</li>
        <li>Configured GitHub Pages deployment with base path routing</li>
        <li>Built navigation between Home and AI Usage Log pages</li>
      </ul>

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Haiku 4.5 — consulting on architecture, asking clarifying
        questions, reducing ambiguity in requirements.
      </p>

      <h2>Comments</h2>
      <p className="text">
        Overall worked well with some clarification needed multiple times on
        features that did not work. .js / .tsx confusion leading to out of sync
        text took a few tries for the model to figure out. Lots of performance
        issues when adding the transparent text + rotating background, Claude
        could not figure that out so we dropped it for now.
      </p>
    </>
  )
}
