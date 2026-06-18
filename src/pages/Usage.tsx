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

      <div className="log-entry">
        <h3>Week 2 (Jun 16-18, 2026)</h3>
        <div className="entry-content">
          <div className="entry-section">
            <h4>CRTM Pipeline Fixes — Issues #18, #19, #21, #22</h4>
            <p><strong>Duration:</strong> ~2.5 hours (single session, 2026-06-15)</p>
            <p><strong>Model:</strong> Claude Opus 4.8</p>
            <p>
              <strong>Session log:</strong>{' '}
              <a href="logs/crtm-2026-06-15.html" target="_blank" rel="noopener noreferrer">
                crtm-2026-06-15.html
              </a>
            </p>
            <p><strong>Tasks:</strong></p>
            <ul>
              <li>Initialized CLAUDE.md for the crtm-experiments repo (two-component Python + Fortran pipeline)</li>
              <li>Fixed longitude normalization (#18): Python normalizes to [0,360); Fortran warns and converts to [−180,180) for the sun-angle call using the canonical modulo idiom</li>
              <li>Added NetCDF output chunking and deflate compression (#19) for radiance, brightness temperature, and K-matrix variables</li>
              <li>Enforced consistent (profile, vertical) array orientation (#21) via a base-class method, removing fragile per-class transpose logic</li>
              <li>Added NWP-source / particle-scheme compatibility validation (#22) with an early-fail error for incompatible combinations (e.g., Thompson microphysics requires HRRR, not ERA5)</li>
              <li>Verified with a clean CMake build, ctest, Python unit tests, and a full ERA5 end-to-end pipeline run</li>
              <li>Opened PR #23 to LAE/crtm-experiments:main</li>
            </ul>
            <p><strong>AI Assistance:</strong> Claude Opus 4.8 — codebase exploration and CLAUDE.md authoring, issue triage, Fortran + Python implementation, git/PR workflow</p>
            <p><strong>Comments:</strong></p>
            <ul>
              <li>Guided bug fixing and improvements to synthetic imagery simulation. I started by writing multiple GitHub issues describing each change I wanted to make. 
            None of the changes were particularly complicated conceptually but needed refactoring and consistency between the two codebases. I didn't describe each issue in detail, isntead relying on the agent to
            explore + ask questions via a grill-me session to clarify some of the code design choices that had to be made.</li>
            <li>With the <code>gh</code> CLI, it was easy for the agent to parse the issues and ask a couple of questions.</li>
            <li>It picked up an edge case I had discarded because I expected to not be an issue but proposed a defensive fix regardless which was helpful (NetCDF chunksizes that could blow up). All the defaults it proposed were reasonable
            (checked online after the fact), and was helpful to understand niche functions that I had not worked with previously. This was overall super helpful and quick to implement changes that are conceptually simple but require
            a bit of knowledge of the actual machinery of a specific library / language.</li>
            <li>Passing it real test data allowed it to confirm that all changes were fine. Before the merging the PR it drafted, I did a review of its changes which were
            well targeted (the right amount of diffs) and simple to follow.</li>
            <li>Once the plan was drafted, it might have been more efficient to spawn another session with a smaller model to complete the task. I still need to get better at this agent / context management.</li>
            </ul>
          </div>
          <div className="entry-section">
            <h4>Architecture refactoring for CRTM</h4>
            <p><strong>Duration:</strong> ~4 session</p>
            <p><strong>Model:</strong> Claude Opus 4.8 (1M context)</p>
            <p><strong>Tasks:</strong></p>
            <ul>
              <li>Planned refactoring of calculations via a grill-me session: goal is to stream large dataset instead of loading it all in memory</li>
              <li>Drafted the plan using netCDF4 using the changes that were made in another repository as a baseline</li>
              <li>Implemented the changes, testing and debugging of the new feature. Probably saved me a day or two of work</li>
            </ul>
            <p><strong>AI Assistance:</strong> Claude Opus 4.8 (1M context) — design stress-testing (grill-me)</p>
            <p><strong>Comments:</strong> This exercise was interesting because I have ground truth data for the LLM to compare to as it makes the changes. The code changes are supposed to be 0-diff, the computation is just
            batched and streamed to disk instead of occuring all in memory. I broke this up in two tasks: first batching (0-diff), then parallelism over the batches (0-diff also, but harder for the agent to check). We only
            got through task 1: the grill-me session was useful but lead to a lot of decision fatigue. Some of the questions felt like questions I would not have asked myself about the new layout of the code. This is bad and good,
            some decisions genuinely improved the codebase, but some others felt like having 1 good option and 2 terrible options presented to you and should have been a no brainer.</p>
            <p><strong>Some notes on 0-diff testing:</strong> The agent was given some test files so that it could evaluate the batched (new) implementation vs the single-shot (old) implementation. It wrote tests to run the cases
            and compare them, and the tests seemed at first glance in-depth. It was very happy to report 0-diff between the old and new implementation for simulations using ERA5. Using HRRR, it would find a small 1e-12 difference and
            incorrectly discarded it as "a documented issue with reprojections of HRRR data": this was tricky because it sounded plausible and in my tests I did documented a 1e-14 difference but for completely unrelated reasons! The agent
            saw there was an explanation of something that looked like it could also explain this problem and confidently said that was it. What made it worse is that it documented this difference in the deisgn document for the new feature,
            such that it kept on going back to it with confidence. It turns out there were two errors in was not catching in its testing, and the weird difference was one of them. I had too push back a few times explaining that we should not
            be finding any numerical differences. We eventually made it, but it's good to clearly know when a change is supposed to be 0-diff regardless of what the agent says about it: you can then push it to find a subtle issue. 1e-12 looks
            negligible but pointed at a deeper issue in the code...</p>
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
