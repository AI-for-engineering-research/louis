import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'update-submodule-research-harness',
    title: 'Managing research code sync with research loop',
    date: '2026-07-23',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '1 session',
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
            label: 'Autoresearch repository',
            href: 'https://github.mit.edu/lrobion/crtm-effr-exploration',
        },
    ],
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Merge updated research code into exploration repository</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context)
            </p>

            <h2>Comments</h2>
            <p className="text">
                A challenge in using my autoresearch setup is the separation between the main simulation
                (that I want kept clean and auditable) and the exploration code (let the agent run free).
                Both need to interact as the exploration code plugs into the main code base to allow for
                changes / new parametrizations etc...
            </p>
            <p className="text">
                The exploration code is all managed in a self-contained repository, which has the main
                simulation code as a git submodule. All hooks are written in a separate branch of the
                submodule, and all new parametrizations/plugins are in the source code of the exploration
                repo. When changes are promoted from the exploration loop to the main code base (or new bugfixes
                etc...) I need to sync up the exploration repo with main. This involves updating the submodule,
                merging main onto the hooks branch and cleaning up a few conflicts.
            </p>
            <p className="text">
                TThis works reasonably well, but I do not know if this is the best approach. It's human in the loop
                by design as it forces me to be very intentional on when I bump the main simulation code version
                used in the research loop. All hashes are tracked so that research loop results are always versioned,
                but I am sure there are subtle ways that this could fail.
            </p>
        </>
    )
}
