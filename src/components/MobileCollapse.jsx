/* ── Collapsible on phones, always open on desktop ───────────────────
 * Renders a <details> whose <summary> is the section heading. Above
 * 760px it is forced open and the heading isn't clickable; on phones it
 * starts closed and the heading toggles it.
 * ─────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const DESKTOP = '(min-width: 761px)'

export default function MobileCollapse({ summary, children, className = '', summaryStyle }) {
  const [open, setOpen] = useState(() => window.matchMedia(DESKTOP).matches)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => { if (mq.matches) setOpen(true) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <details
      className={`m-collapse ${className}`}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary style={summaryStyle}>
        <span>{summary}</span>
        <ChevronDown size={16} className="m-collapse-chevron" aria-hidden="true" />
      </summary>
      {children}
    </details>
  )
}
