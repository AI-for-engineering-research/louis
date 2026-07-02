import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'crtm-effr-parametrizations',
  title: 'CRTM Refactoring #20 and Effective-Radius Parametrizations',
  date: '2026-06-22',
  model: 'Claude Opus 4.8',
  duration: '~10 hours (three sessions?)',
  artifacts: [
    { label: 'Session log — crtm-effr-2026-06-22.html', href: '/louis/logs/crtm-effr-2026-06-22.html' },
    {
      label: 'Ash RGB comparison — baseline vs best-physics (simulated vs GOES-19)',
      href: '/louis/logs/crtm-effr-ash-compare-2026-06-22.html',
    },
  ],
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        <li>Large refactor of dataset processing to be streamed with incremental writes (fix OOM)</li>
        <li>Exploration of what affects cloud color on ash imagery</li>
      </ul>

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Opus 4.8 — codebase refactoring, Fortran + Python implementation,
        Independent literature exploration / implementation.
      </p>

      <h2>Comments</h2>
      <ul>
        <li>
          <strong>Pipeline refactor:</strong> The pipeline updates was largely
          planned and implemented in the past, this week focused on validation of
          bit-wise reproducibility with previous implementation.
        </li>
        <li>
          For validation, I gave it a couple of tests datasets so that it could
          autonomously iterate until convergence. The tests for bit-wise
          reproducibility were not the most appropriate, it did not use dedicated
          functions such as <code>xr.equals()</code>, instead doing per variable
          comparisons which led to some uncaught differences. Once pointed out and
          told to use stricted equality checks the errors were fixed.
        </li>
        <li>
          Before merging the ~8 commits of changes, I did a manual cleanup step
          (looking for bad code patterns <code>x = y = None</code>???) and
          squashing the history into something readable.
        </li>
        <li>
          As the final pre-merge step, I used the <code>/code-review</code> skill:
          this is expensive (used 2M+ tokens in 10 mins) and spawned 50+
          sub-agents. However it drafted a good list of insights, some on
          correctness, some on error prone code duplication, and some on pitfalls
          of the code that were not clear from the interface. This was very
          helpful, and I chose to fix most of the hightlighted issues. I will use
          this more often, it was impressive to watch it catch knowledge that I had
          of the code base that was not documented anywhere.
        </li>
        <li>
          <strong>Effective radius parametrizations:</strong> The goal was to setup
          a knockoff "Empirical research assistant" over a larger research
          questions instead of a simple code architecture change. The goal given to
          the agent was along the lines of "simulated ash images for clouds do not
          look like what is seen on GOES, here's a reference image, the
          corresponding NWP data. You can run the entire simulation pipeline until
          you get a better match. Here's a list of things I have tried (cloud
          radius parametrizations, ...) and levers you can pull, there should not be
          magic coefficients and everything must be justifiable from literature. The
          grill-me session's goal is to setup the harness for you to iterate +
          handoff to your subagents to do the actual work." The full log for the
          session is linked above.
        </li>
        <li>
          After a long grill-me session which established, what it was allowed to
          touch, how it was going to do the "optimization" (no gradients) and how it
          should setup its own harness, Claude setup a LOG.md to track the results
          of each iteration, a Python harness for running experiments
          (non-intrusive changes to the source code), and a methodology for
          quantify what "better matching" meant. It also identified different
          requirements on simulation fidelity (subsample the image by factors of 12,
          8, 1, depending on if we are iterating or validating a result whil keeping
          fast runtimes).
        </li>
        <li>
          It ran for a few hours loosely guided by me on which directions to pick
          based on the what it found. It asked for ECMWF documentation which I
          provided with page numbers.
        </li>
        <li>
          The systematic exploration of a lot of combinations of effective radius
          parametrizations + cloud fraction parametrizations was extremely helpful
          and much faster than what I could have done. While each task is simple
          enough, systematically exploration of all of the possible choices that
          wuickly while keeping track of what made sense would have taken me a long
          time to do.
        </li>
        <li>
          After the session, this allowed to confirm via actual experimentation a
          set of parametrizations that performed better than anything I had
          previously, while staying grounded in explainable changes.
        </li>
        <li>
          It did do code base changes that make no sense however: it decided to move
          all my source code from src/ to its own little sandbox...
        </li>
      </ul>
    </>
  )
}
