import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ── Scroll on navigation ─────────────────────────────────────────────
 * New page → start at the top. URL with a hash (/#projects) → scroll to
 * that section once it has rendered.
 * ─────────────────────────────────────────────────────────────────── */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    // The target section may mount a frame later; retry briefly
    let tries = 0
    const id = decodeURIComponent(hash.slice(1))
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 20) {
        clearInterval(timer)
        // Jump (not smooth): arriving from another page, a smooth scroll gets
        // interrupted while the new page's images load
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}
