import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'crtm-clouds',
    title: 'CRTM Cloud parametrizations',
    date: '2026-07-13',
    model: 'Claude Opus 4.8 (1M context)',
    duration: '~4 sessions',
}

export function Body() {
    return (
        <>
            <h2>Tasks</h2>
            <ul>
                <li>Use the brightness temperature optimization harness</li>
                <li>Lots of loops (starting from fresh sessions) to test CRTM parametrization limitations</li>
            </ul>

            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 4.8 (1M context) — research loop.
            </p>

            <h2>Comments</h2>
            <p className="text">
                Continuing to use the "Claude research harness" that I setup previously, this time to dig into the treatment of ice and snow clouds in CRTM. They are the
                main source of differences between my simulated images and the real GOES imagery, and I treat contrails as ice clouds so it's worth digging into it.
                Using Claude removes a lot of barriers to "just try stuff": I was able to question my assumption of treating snow as ice by trying additional parametrizations of snow.
                This led me down a rabbit hole of parsing the CRTM LUTs (Claude did all that) to understand how they are indexed and what kind of effective radius they expect.
                My parametrizations of snow outputted geometric effective radius whereas CRTM expects something else: all my snowflakes were clamped at the top end of the LUT.
                I also found a bug in a CTRM look-up table as highlighted by Claude. This is a known issue (published in the past in Grasso et al. 2018) but the default LUT still
                contains the problem. This is problematic because it affects ice clouds making their scattering essentially isotropic. 
            </p>
            <p className="text">
                Most of these trials were run autonomously, with me suggesting a few papers and ideas to Claude, and it doing the implementation and running my benchmarks. A lot of the digging
                in the CRTM internals would not have been as quick / I would not have questioned it, if it wasn't as easy as it is now. To test some of these issues, I also cloned CRTM v2.4.0
                to have Claude check if 1. there were algorithmic changes to the ADA solver (none) and if the LUTs had changed (no). This was extremely helpful to narrow down sources of differences
                between HRRR CRTM simulations and mine (which now excludes mismatch due to different CRTM version).
            </p>
        </>
    )
}
