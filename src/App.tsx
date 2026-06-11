import { useState, lazy, Suspense } from 'react'
import Home from './pages/Home'
import Usage from './pages/Usage'
import './App.css'

// Lazy-loaded so the Three.js bundle only loads when this page is opened.
const ContrailSim = lazy(() => import('./pages/ContrailSim'))

type Page = 'home' | 'usage' | 'sim'

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">Louis Robion</h1>
          <ul className="nav-links">
            <li>
              <button
                className={page === 'home' ? 'active' : ''}
                onClick={() => setPage('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={page === 'sim' ? 'active' : ''}
                onClick={() => setPage('sim')}
              >
                Contrail simulation
              </button>
            </li>
            <li>
              <button
                className={page === 'usage' ? 'active' : ''}
                onClick={() => setPage('usage')}
              >
                AI Usage Log
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Suspense fallback={<div className="page-loading">Loading…</div>}>
          {page === 'home' && <Home />}
          {page === 'usage' && <Usage />}
          {page === 'sim' && <ContrailSim />}
        </Suspense>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Louis Robion. MIT LAE.</p>
      </footer>
    </div>
  )
}

export default App
