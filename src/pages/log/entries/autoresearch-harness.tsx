import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'autoresearch-harness',
    title: 'Improving the research harness',
    date: '2026-07-15',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '~10 sessions',
    artifacts: [
        {
            label: 'Diagram - autoresearch setup',
            href: '/louis/logs/img/autoresearch-overview.svg',
        },
        {
            label: 'Diagram - version control setup',
            href: '/louis/logs/img/submodule-interactions.svg',
        },
        {
            label: 'Doc - research loop operating manual',
            href: '/louis/logs/research-loop.html',
        },
    ],
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Extracted research sandbox into separate repository</li>
                <li>Drafted the plan (grill-me) for interface setup between research sandbox plugins and source code</li>
                <li>Implemented the harness</li>
                <li>Updated agent documentation workflow</li>
                <li>Design autoresearch skill / instructions for reproducible tests</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context) — design (grill-me) and implementation.
            </p>

            <h2>Comments</h2>
            <p className="text">
                Looking at Ian's autoresearch setup, I wanted to improve mine by extracting the experimentation sandbox
                out of the main repository. The issue is that my experiments need to modify the source code (add a new
                parametrization, expose a new interface, change a default look-up table...) but I want to ensure that
                the core of the codebase does not change: the goal is to minimize agent experimentation within the trusted
                codebase, and have it mess around outside where it's easy to review.
            </p>
            <p className="text">
                I chose a "plugin" architecture because it minimizes main code base modification, and makes each plugin reusable
                when doing many experiments (no reimplementation by the agent of the same physics, that would be error prone).
            </p>
            <p className="text">
                The experimentation code being external and version controlled in a separate repository led to a tracking problem:
                how do I ensure that I can reproduce an experiment given that the the main code base may change. To do so, I setup
                the main code base as a submodule of the research repository. I am not sure if that's the best approach but the rationale
                is as follows:
                Any "successful" experiment can get promoted to the main codebase. The advantage is that all future experiments start
                from this upgraded baseline for free (no risk of the LLM reimplementing something slightly differently), but it means
                I need to rewrite the hooks of the plugins into main everytime (in practice forward merges with conflicts...). This is
                the part I like the least. I don't think I can spin up VMs with independent instances of the main code (great for not
                making weird modifications to the main code base, but bad given the scale of what is shared / needs to be reproducible).
            </p>
            <p className="text">
                Reproducing an experiment needs to use the same version of main code base and of the plugins + any other file pulled by CRTM.
                To wrangle this, I track for each experiment the commit hash of the submodule, the repo and a hash of the cloud coeff file
                (I should expand this to more files...). These checks are partly automated (ran by a python script) but some rely on the agent
                respecting the rules laid out in the research-loop, which is not guaranteed... That is also an area for improvement. The
                research loop, submodule tracking, and instructions are attached to this log.
            </p>
        </>
    )
}
