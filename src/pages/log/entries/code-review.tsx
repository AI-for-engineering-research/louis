import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'code-reviews',
    title: 'Adversarial code reviews',
    date: '2026-07-23',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '~4 sessions',
    artifacts: [],
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Adversarial code reviews of PRs</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context) — implementation and reviews.
            </p>

            <h2>Comments</h2>
            <p className="text">
                I've been making a lot of updates to <code>crtm-experiments</code>, some of which touch large parts
                of the codebase. These introduce new behaviors / options and it can get a little tricky to keep track
                of everything. One thing I've done to help is to "harden" all my inputs against decisions/mistakes future
                me might make. Not assuming input validity, rechecking, having some invariants to satisfy have been helpful
                to prevent this class of bugs. Claude has been helpful in 1. looking for these types of tests/validations
                2. their implementation. One thing I have found it less good as is where to implement these things. It would
                do redundant calls to some validation functions instead of placing them at an entry point, or put them in the
                scope of some functions which I believe were already overloaded with responsabilities. I guess this is more
                software engineery work which I am not an expert at either, so there's been a lot of back and forth between
                Claude and I. Thinking about these things and bouncing the ideas of of something is still very helpful.
            </p>
        </>
    )
}
