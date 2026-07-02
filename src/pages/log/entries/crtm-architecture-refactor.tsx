import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'crtm-architecture-refactor',
  title: 'Architecture Refactoring for CRTM',
  date: '2026-06-18',
  model: 'Claude Opus 4.8 (1M context)',
  duration: '~4 sessions',
  artifacts: [
    {
      label: 'Flowchart — make_crtm_input (NWP → CRTM input pipeline)',
      href: '/louis/logs/make_crtm_input_flowchart.html',
    },
  ],
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        <li>Planned refactoring of calculations via a grill-me session: goal is to stream large dataset instead of loading it all in memory</li>
        <li>Drafted the plan using netCDF4 using the changes that were made in another repository as a baseline</li>
        <li>Implemented the changes, testing and debugging of the new feature. Probably saved me a day or two of work</li>
        <li>Tested Prashanth's /visual-walkthrough skill on a semi complex code base, the result are pretty cool!</li>
      </ul>

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Opus 4.8 (1M context) — design stress-testing (grill-me).
      </p>

      <h2>Comments</h2>
      <p className="text">
        This exercise was interesting because I have ground truth data for the LLM
        to compare to as it makes the changes. The code changes are supposed to be
        0-diff, the computation is just batched and streamed to disk instead of
        occuring all in memory. I broke this up in two tasks: first batching
        (0-diff), then parallelism over the batches (0-diff also, but harder for
        the agent to check). We only got through task 1: the grill-me session was
        useful but lead to a lot of decision fatigue. Some of the questions felt
        like questions I would not have asked myself about the new layout of the
        code. This is bad and good, some decisions genuinely improved the
        codebase, but some others felt like having 1 good option and 2 terrible
        options presented to you and should have been a no brainer.
      </p>
      <p className="text">
        <strong>Some notes on 0-diff testing:</strong> The agent was given some
        test files so that it could evaluate the batched (new) implementation vs
        the single-shot (old) implementation. It wrote tests to run the cases and
        compare them, and the tests seemed at first glance in-depth. It was very
        happy to report 0-diff between the old and new implementation for
        simulations using ERA5. Using HRRR, it would find a small 1e-12 difference
        and incorrectly discarded it as "a documented issue with reprojections of
        HRRR data": this was tricky because it sounded plausible and in my tests I
        did documented a 1e-14 difference but for completely unrelated reasons! The
        agent saw there was an explanation of something that looked like it could
        also explain this problem and confidently said that was it. What made it
        worse is that it documented this difference in the design document for the
        new feature, such that it kept on going back to it with confidence. It
        turns out there were two errors in was not catching in its testing, and the
        weird difference was one of them. I had too push back a few times
        explaining that we should not be finding any numerical differences. We
        eventually made it, but it's good to clearly know when a change is supposed
        to be 0-diff regardless of what the agent says about it: you can then push
        it to find a subtle issue. 1e-12 looks negligible but pointed at a deeper
        issue in the code...
      </p>
    </>
  )
}
