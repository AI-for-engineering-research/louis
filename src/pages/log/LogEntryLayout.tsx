import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LogEntryMeta } from './types'
import { formatDate } from './format'
import { ExternalLink } from '../../components/Icon'

interface Props {
  meta: LogEntryMeta
  children: ReactNode
}

export default function LogEntryLayout({ meta, children }: Props) {
  return (
    <article className="container blog main first">
      <Link to="/log" className="entry-back">
        ← Research log
      </Link>
      <h1>{meta.title}</h1>
      <p className="entry-meta">
        {formatDate(meta.date)}
        <span className="dot">·</span>
        {meta.model}
        <span className="dot">·</span>
        {meta.duration}
      </p>

      <div className="prose">{children}</div>

      {meta.artifacts && meta.artifacts.length > 0 && (
        <div className="entry-artifacts">
          <h2>Artifacts</h2>
          <ul>
            {meta.artifacts.map((a) =>
              a.to ? (
                <li key={a.label}>
                  <Link to={a.to}>{a.label}</Link>
                </li>
              ) : (
                <li key={a.label}>
                  <a href={a.href} target="_blank" rel="noopener noreferrer">
                    {a.label}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </article>
  )
}
