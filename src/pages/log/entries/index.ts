import type { LogEntryModule } from '../types'

// Registry of all log entries. Add a new entry by dropping a `.tsx` file in this
// directory that exports `meta` + `Body` — the index and the /log/:slug route
// pick it up automatically (sorted newest-first by date).
const modules = import.meta.glob<LogEntryModule>('./*.tsx', { eager: true })

export const entries: LogEntryModule[] = Object.entries(modules)
  .map(([path, m]) => {
    if (!m.meta || !m.Body) {
      throw new Error(`Log entry ${path} must export both \`meta\` and \`Body\`.`)
    }
    return { meta: m.meta, Body: m.Body }
  })
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date))

export function getEntry(slug: string): LogEntryModule | undefined {
  return entries.find((e) => e.meta.slug === slug)
}
