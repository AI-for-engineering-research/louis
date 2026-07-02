import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'crtm-pipeline-fixes',
  title: 'CRTM Pipeline Fixes — Issues #18, #19, #21, #22',
  date: '2026-06-15',
  model: 'Claude Opus 4.8',
  duration: '~2.5 hours (single session, 2026-06-15)',
  artifacts: [
    { label: 'Session log — crtm-2026-06-15.html', href: '/louis/logs/crtm-2026-06-15.html' },
  ],
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        <li>Initialized CLAUDE.md for the crtm-experiments repo (two-component Python + Fortran pipeline)</li>
        <li>Fixed longitude normalization (#18): Python normalizes to [0,360); Fortran warns and converts to [−180,180) for the sun-angle call using the canonical modulo idiom</li>
        <li>Added NetCDF output chunking and deflate compression (#19) for radiance, brightness temperature, and K-matrix variables</li>
        <li>Enforced consistent (profile, vertical) array orientation (#21) via a base-class method, removing fragile per-class transpose logic</li>
        <li>Added NWP-source / particle-scheme compatibility validation (#22) with an early-fail error for incompatible combinations (e.g., Thompson microphysics requires HRRR, not ERA5)</li>
        <li>Verified with a clean CMake build, ctest, Python unit tests, and a full ERA5 end-to-end pipeline run</li>
        <li>Opened PR #23 to LAE/crtm-experiments:main</li>
      </ul>

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Opus 4.8 — codebase exploration and CLAUDE.md authoring, issue
        triage, Fortran + Python implementation, git/PR workflow.
      </p>

      <h2>Comments</h2>
      <ul>
        <li>
          Guided bug fixing and improvements to synthetic imagery simulation. I
          started by writing multiple GitHub issues describing each change I
          wanted to make. None of the changes were particularly complicated
          conceptually but needed refactoring and consistency between the two
          codebases. I didn't describe each issue in detail, instead relying on
          the agent to explore + ask questions via a grill-me session to clarify
          some of the code design choices that had to be made.
        </li>
        <li>
          With the <code>gh</code> CLI, it was easy for the agent to parse the
          issues and ask a couple of questions.
        </li>
        <li>
          It picked up an edge case I had discarded because I expected to not be
          an issue but proposed a defensive fix regardless which was helpful
          (NetCDF chunksizes that could blow up). All the defaults it proposed
          were reasonable (checked online after the fact), and was helpful to
          understand niche functions that I had not worked with previously. This
          was overall super helpful and quick to implement changes that are
          conceptually simple but require a bit of knowledge of the actual
          machinery of a specific library / language.
        </li>
        <li>
          Passing it real test data allowed it to confirm that all changes were
          fine. Before the merging the PR it drafted, I did a review of its
          changes which were well targeted (the right amount of diffs) and simple
          to follow.
        </li>
        <li>
          Once the plan was drafted, it might have been more efficient to spawn
          another session with a smaller model to complete the task. I still need
          to get better at this agent / context management.
        </li>
      </ul>
    </>
  )
}
