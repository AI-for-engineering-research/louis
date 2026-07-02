import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to the top on every route change (multi-page feel). */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
