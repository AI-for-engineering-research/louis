import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'research-loop-liquid-clouds',
    title: 'Autoresearch on liquid cloud parametrizations',
    date: '2026-07-16',
    model: 'Claude Opus 4.8 (1M context) - Research loop',
    duration: '3 session',
    artifacts: [
        {
            label: 'Transcript - Diagnosing the issue',
            href: '/louis/logs/crtm-green-patch-2026-07-16.html',
        },
        {
            label: 'Transcript - Autoresearch for parametrizations',
            href: '/louis/logs/crtm-cam6liq-2026-07-16.html',
        },
        {
            label: 'Transcript - Post discussion',
            href: '/louis/logs/crtm-cam3liq-florida-2026-07-22.html',
        },
    ],
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Diagnose source of green clouds</li>
                <li>Propose and test implementations of liquid cloud parametrizations</li>
                <li>Evaluate limitations of parametrizations</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context)
            </p>

            <h2>Comments</h2>
            <p className="text">
                Looking at the simulated ash imagery, certain clouds appeared bright light green,
                compared to their ~olive green color on the real GOES image. I suspect this to be
                low liquid clouds but was not sure. I used the <code>/autoresearch</code> skill to
                identify which types of clouds were the cause of the problem, then propose parametrizations
                that could fix this. The session transcripts are attached. The CAM3 liquid parametrization
                leads to much better results!
            </p>
            <p className="text">
                Not in the transcript are all the tool calls + my own research on CAM3/4 and CAM5/6 + the IFS CY49R1
                implementation of the Martin et al. (1994) scheme.
            </p>
        </>
    )
}
