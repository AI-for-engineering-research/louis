import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'color-optimization-loop',
    title: 'Claude as a research assistant for RT parametrizations',
    date: '2026-07-03',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '~9 sessions',
    artifacts: [
    { label: 'Exploration workflow', href: '/louis/logs/img/optim-color-loop-workflow.svg' },
  ],
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>grill-me session to setup a harness for Claude to try new parametrizations of cloud effective radius</li>
                <li>Debugging the harness</li>
                <li>grill-me session on how to best keep artifacts + log of what was tried / what worked &rarr; see artifacts below</li>
                <li>Lots of loops (starting from fresh sessions) trying different parametrizations from IFS, the literature etc...</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context) — grill-me + research loop.
            </p>

            <h2>Comments</h2>
            <p className="text">
                I gave Claude a bounded research task with semi-defined feedback loop. The goal is simple to qualitatively describe: improve
                the realisticness of the simulated imagery. Simulated ash images has some features which do not match the ones scene on real observations.
                Some clouds are too dark, some are not brown when they should be (thick cirrus), some are too green, or the ground is the wrong color.
                There are many parameters that can affects this: choice of cloud effective radius parametrization, overlap choice and other ad-hoc fixes.
            </p>
            <p className="text">
                This is a large decision space which would take time to explore manually. I would need to find each paper that contains a relevant parametrization,
                implement it, verify that the implementatin is correct, integrate it to my CRTM input preparation and run the CRTM simulation to see if it makes
                a difference in the resulting ash image. This is the case for each parameter, and there are many to tune so this seemed like prime agent task.
                I got Claude started by describing the end goal loosely, and asking how it would want to setup its harness and progress tracking. It figured out some
                good baseline cases and milestones and started implementing a couple of schemes I pointed it out by passing it papers. I did not use a formal optimization
                method here because I did not want any "fudge" factors: I want the best parametrization I can get using published results and methods for simulate synthetic images.
            </p>
            <p className="text">
                I let it run autonomously for a few hours multiple times after which we'd check in on what choices were made and narrowing down the best set of parameters.
                Eventually, we saw large improvements using the Wyser + Martin scheme and maxrand overlap. Other small correctness fixes helped but not as much as these three changes.
                I ran a similar agent loop setup on HRRR data as well, but the results have not been as interesting yet, though it has been useful to validate implementation choices.
            </p>
        </>
    )
}
