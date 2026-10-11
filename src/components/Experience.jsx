/* ── Experience: LinkedIn-style groups ───────────────────────────────
 * One block per organization, with its roles (newest first) on a
 * vertical line. Each role can carry a photo, shown on desktop only.
 * Data: experience.items in i18n →
 *   { org, sub, period, location, logo, roles: [{ title, period, bullets, image, imageAlt }] }
 *   compact: true → one summary line and the roles as single rows (no bullets or photos)
 *   bullets may mark resume keywords with **double asterisks** (rendered bold)
 *   links: [{ label, to }] on a role (or on a compact org) → related project pages
 * ─────────────────────────────────────────────────────────────────── */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stagger } from './Reveal'
import { staggerItem } from './variants'

const mono = { fontFamily: 'var(--font-mono)' }

// "**Lead hardware designer** of IGNIS" → bold keyword spans
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**')
      ? <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
      : part,
  )
}

function ProjectLinks({ links }) {
  if (!links?.length) return null
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14 }}>
      {links.map((l) => <Link key={l.to} to={l.to} className="text-link">{l.label} →</Link>)}
    </div>
  )
}

export default function Experience({ items }) {
  if (!Array.isArray(items)) return null
  return (
    <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 16 }} stagger={0.1}>
      {items.map((org) => (
        <motion.article key={org.org} variants={staggerItem} className="exp-org">
          <header className="exp-org-head">
            {org.logo ? (
              <img src={org.logo} alt="" className="exp-logo" />
            ) : (
              <span className="exp-logo exp-logo-text" aria-hidden="true">{org.mark}</span>
            )}
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{org.org}</h3>
              {org.sub && <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{org.sub}</div>}
              <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
                {org.period} · {org.location}
              </div>
            </div>
          </header>

          {org.compact ? (
            <div className="exp-compact">
              {org.summary && <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '72ch', marginBottom: 12 }}>{org.summary}</p>}
              <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px 24px' }}>
                {org.roles.map((r) => (
                  <li key={r.title} style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                    <span style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginRight: 8 }}>{r.period}</span>
                    {r.title}
                  </li>
                ))}
              </ul>
              <ProjectLinks links={org.links} />
            </div>
          ) : (
          <ol className="exp-roles">
            {org.roles.map((r) => (
              <li key={r.title + r.period} className={`exp-role${r.image ? ' has-image' : ''}`}>
                <span className="exp-dot" aria-hidden="true" />
                <div style={{ minWidth: 0 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>{r.title}</h4>
                  <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', margin: '6px 0 12px' }}>{r.period}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {r.bullets.map((b, i) => (
                      <li key={i} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '68ch' }}>
                        <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>–</span>
                        <span><Rich text={b} /></span>
                      </li>
                    ))}
                  </ul>
                  <ProjectLinks links={r.links} />
                </div>
                {r.image && <img src={r.image} alt={r.imageAlt || ''} loading="lazy" className="exp-role-img" />}
              </li>
            ))}
          </ol>
          )}
        </motion.article>
      ))}
    </Stagger>
  )
}
