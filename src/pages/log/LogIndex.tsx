import { Link } from 'react-router-dom'
import { entries } from './entries'
import { formatDate } from './format'

export default function LogIndex() {
  return (
    <div className="container blog main first">
      <h1>Research log</h1>
      <p className="text">
        A running, log of how I use AI tools across my research and small research updates.
      </p>

      <ul className="log-list">
        {entries.map(({ meta }) => (
          <li key={meta.slug}>
            <Link to={`/log/${meta.slug}`} className="log-row">
              <span className="log-row__date">{formatDate(meta.date)}</span>
              <span className="log-row__title">{meta.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
