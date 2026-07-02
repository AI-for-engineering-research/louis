import type { ReactNode } from 'react'

export interface Artifact {
  label: string
  /** External/static URL (opens in a new tab), e.g. a raw transcript. */
  href?: string
  /** Internal route (react-router Link), e.g. '/sim'. */
  to?: string
}

export interface LogEntryMeta {
  slug: string
  title: string
  /** ISO date (yyyy-mm-dd); drives sort order + display. */
  date: string
  model: string
  duration: string
  artifacts?: Artifact[]
}

export interface LogEntryModule {
  meta: LogEntryMeta
  Body: () => ReactNode
}
