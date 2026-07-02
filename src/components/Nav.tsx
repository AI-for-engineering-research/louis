import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/project', label: 'Project', end: false },
  { to: '/sim', label: 'Contrail simulation', end: false },
  { to: '/log', label: 'Research log', end: false },
]

export default function Nav() {
  return (
    <nav className="site-nav">
      <ul className="site-nav__links">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'site-nav__link is-active' : 'site-nav__link'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
