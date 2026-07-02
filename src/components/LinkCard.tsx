import { Link } from 'react-router-dom'
import { ArrowRight } from './Icon'

interface LinkCardProps {
  to: string
  title: string
  desc: string
}

export default function LinkCard({ to, title, desc }: LinkCardProps) {
  return (
    <Link to={to} className="link-card">
      <span className="link-card__title">
        {title}
        <ArrowRight size={18} />
      </span>
      <span className="link-card__desc">{desc}</span>
    </Link>
  )
}
