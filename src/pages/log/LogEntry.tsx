import { Link, useParams } from 'react-router-dom'
import { getEntry } from './entries'
import LogEntryLayout from './LogEntryLayout'

export default function LogEntry() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? getEntry(slug) : undefined

  if (!entry) {
    return (
      <div className="container blog main">
        <h1>Entry not found</h1>
        <p className="text">
          That log entry doesn't exist. <Link to="/log">Back to the research log →</Link>
        </p>
      </div>
    )
  }

  const { Body } = entry
  return (
    <LogEntryLayout meta={entry.meta}>
      <Body />
    </LogEntryLayout>
  )
}
