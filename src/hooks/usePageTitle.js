import { useEffect } from 'react'

/**
 * Sets document.title for the duration the component is mounted.
 * Restores the base title on unmount (route change).
 *
 * Usage:
 *   usePageTitle('FC-2026 Flight Computer — Emilio Guadarrama')
 */
export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => { document.title = prev }
  }, [title])
}
