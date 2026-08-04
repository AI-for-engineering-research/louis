import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
    slug: 'less-verbose',
    title: 'Making Claude less verbose',
    date: '2026-08-03',
    model: 'Claude Opus 5',
    duration: '1 session',
    artifacts: [],
}

export function Body() {
    return (
        <>
            <h2>AI Assistance</h2>
            <p className="text">
                Claude Opus 5 — testing.
            </p>

            <h2>Comments</h2>
            <p className="text">
                Claude, and in particular Opus 5 feels very verbose jargony and uses complicated sentence structures
                that are too long and muddy the point it's making. I've seen people talking about chaging Claude's writing
                style to simplified techninal English from the ASD-STE100 standard. The standard itself is quite long and has
                a dictionnary of allowed words with the goal of making communication about aircraft maintenance unambiguous.
                This is clearly too long to implement as a skill / system prompt. Instead I added the main takeaways of the
                standard as 10 bullet points in my system <code>CLAUDE.md</code>. I haven't had the chance to test it much yet
                but will come back with experiments.
            </p>

            <h2>CLAUDE.md writing style paragraph</h2>

            <p className="text">
                Write prose in simplified technical English.
                Applies to explanations and comments, not to code, paths, or quoted output.
            </p>

            <ul>
                <li>One idea per sentence. Aim for 20 words or fewer.</li>
                <li>Use the active voice and the imperative: "Run the tests", not "The tests should be run".</li>
                <li>Use simple present, past, or future tense. Avoid perfect and continuous forms.</li>
                <li>Use the shortest word that keeps the meaning. Keep exact technical terms as-is.</li>
                <li>Use one word per concept. Do not vary wording for style.</li>
                <li>Keep noun strings to three words. Break longer ones with "of" or "for".</li>
                <li>Put the condition first: "If the job fails, check the log."</li>
                <li>State the risk before the procedure it applies to.</li>
                <li>Do not drop articles, "that", or other function words. Short is not telegraphic.</li>
                <li>No idioms, metaphors, or filler ("basically", "essentially", "simply", "just").</li>
                <li>Six sentences per paragraph maximum. Use a list beyond that.</li>
            </ul>
        </>
    )
}
