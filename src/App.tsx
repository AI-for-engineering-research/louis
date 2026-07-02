import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Project from './pages/Project'
import LogIndex from './pages/log/LogIndex'
import LogEntry from './pages/log/LogEntry'

// Lazy-loaded so the Three.js bundle only loads when the sim page is opened.
const ContrailSim = lazy(() => import('./pages/ContrailSim'))

function NotFound() {
  return (
    <div className="container blog main">
      <h1>Page not found</h1>
      <p className="text">
        That page doesn't exist. <Link to="/">Back to home →</Link>
      </p>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Nav />
      <main className="site-main">
        <Suspense fallback={<div className="container blog main"><p className="text">Loading…</p></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/sim" element={<ContrailSim />} />
            <Route path="/log" element={<LogIndex />} />
            <Route path="/log/:slug" element={<LogEntry />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </HashRouter>
  )
}
