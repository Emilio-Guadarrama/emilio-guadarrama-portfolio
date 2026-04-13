/* ── Shared UI primitives ──────────────────────────────────────────────
 * Tag and SectionLabel are used across every page. Keep them here.
 *
 * SectionLabel props:
 *   animate {boolean} — wrap in scroll-reveal (use on Home page sections)
 *   mb      {number}  — marginBottom in px (default 24; Home uses 48)
 * ─────────────────────────────────────────────────────────────────── */

import { Reveal } from './Reveal'

export function Tag({ children, amber }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        padding: '3px 8px',
        border: `1px solid ${amber ? 'var(--amber-border)' : 'var(--border)'}`,
        color: amber ? 'var(--amber)' : 'var(--text-muted)',
        background: amber ? 'var(--amber-bg)' : 'transparent',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      {children}
    </span>
  )
}

export function SectionLabel({ children, animate = false, mb = 24 }) {
  const inner = (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: mb,
      }}
    >
      {children}
    </div>
  )

  return animate ? <Reveal y={10}>{inner}</Reveal> : inner
}
