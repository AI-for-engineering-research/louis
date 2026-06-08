import { useState } from 'react'
import Home from './pages/Home'
import Usage from './pages/Usage'
import './App.css'

type Page = 'home' | 'usage'

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
        {page === 'home' && <Home />}
        {page === 'usage' && <Usage />}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Louis Robion. MIT LAE.</p>
      </footer>
    </div>
  )
}

export default App
