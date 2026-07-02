import type { LogEntryMeta } from '../types'

export const meta: LogEntryMeta = {
  slug: 'website-redesign',
  title: 'Website redesign',
  date: '2026-07-01',
  model: 'Claude Opus 4.8 (1M context)',
  duration: '~1 sessions',
  artifacts: [],
}

export function Body() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        <li>Refactoring of the website (grill-me session) + implementation</li>
      </ul>

      <h2>AI Assistance</h2>
      <p className="text">
        Claude Opus 4.8 (1M context).
      </p>

      <h2>Comments</h2>
      <p className="text">
        I was getting tired of the look of my website, I didn't like the colors, it was messy
        the images were not very pretty and finding stuff did not feel very intuitive. My main
        gripe was the general feel/visuals. I found a simple template by Shikun Liu dubbed the{' '}
        <a
          href="https://shikun.io/projects/clarity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clarity Template
        </a>. The template is plain .css / .html which I guess does not play nice with React here?
        I don't know much about this so I let Claude reimplement the template as needed. The result is not
        as nice as the original, but good enough and much better than before! The reorganization is going
        to allow me to add more stuff in the project page and keep the logs more consistent. Future work for now.
      </p>
    </>
  )
}