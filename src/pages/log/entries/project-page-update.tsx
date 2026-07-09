import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'project-page-update',
    title: 'Project page update',
    date: '2026-07-09',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '~1 sessions',
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Implement slider image comparisons and videos</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context)
            </p>

            <h2>Comments</h2>
            <p className="text">
                Wanted to make use the Clarity template's nice image slider to showcase the differences between simulated and real ash imagery.
                Added some discussions and showcases some of the contrail simulations. This page will be updated as the simulations progress!
            </p>
        </>
    )
}
