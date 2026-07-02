import type { LogEntryModule } from '../types'
import * as portfolio from './portfolio-landing-page'
import * as sim from './interactive-3d-sim'
import * as pipeline from './crtm-pipeline-fixes'
import * as refactor from './crtm-architecture-refactor'
import * as effr from './crtm-effr-parametrizations'
import * as redesign from './website-redesign'

// Registry of all log entries. Add a new entry by creating a module here that
// exports `meta` + `Body`, then adding it to this list — the index and the
// /log/:slug route pick it up automatically (sorted newest-first by date).
export const entries: LogEntryModule[] = [portfolio, sim, pipeline, refactor, effr, redesign]
  .map((m) => ({ meta: m.meta, Body: m.Body }))
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date))

export function getEntry(slug: string): LogEntryModule | undefined {
  return entries.find((e) => e.meta.slug === slug)
}
