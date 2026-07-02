import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'interactive-3d-sim',
  title: 'Interactive 3D Contrail Simulation',
  date: '2026-06-11',
  model: 'Claude Opus 4.8 (1M context)',
  duration: '~1 session',
  artifacts: [{ label: 'Live demo — Contrail simulation', to: '/sim' }],
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
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

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Opus 4.8 (1M context) — design stress-testing (grill-me),
        react-three-fiber scene building, cartoon physics modeling, performance
        optimization, and CI maintenance.
      </p>

      <h2>Comments</h2>
      <p className="text">
        Very autonomous probably thanks to using Opus instead of Haiku. Discussed
        high level goals, and only gave a simple description for the contrails
        (Gaussian plume parametrizations) and got very reasonable outputs for a
        sketch like this. Similarly, decided on its own to simulate BTs at 10.8 um
        which is very relevant for contrails. I am happy with this first pass and
        this would have taken so much longer to do by myself.
      </p>
    </>
  )
}
