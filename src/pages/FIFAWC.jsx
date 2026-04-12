import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, staggerItem } from '../components/Reveal'
import { motion } from 'framer-motion'

export default function FIFAWC() {
  const { t } = useTranslation()
  const lang = t('fifawc', { returnObjects: true })

  return (
    <div style={{ paddingTop: 60 }}>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Link to="/" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: '#424242', textDecoration: 'none',
            letterSpacing: '0.08em', display: 'inline-block', marginBottom: 32,
            transition: 'color 0.15s ease',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8c8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
          >
            {lang.hero.back}
          </Link>

          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#424242', marginBottom: 16,
            }}>
              // Volunteering
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700,
              color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.1,
              marginBottom: 12,
            }}>
              {lang.hero.title}
            </h1>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13, color: '#d8d8d8', marginBottom: 8,
            }}>
              {lang.hero.role}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: '#424242',
            }}>
              {lang.hero.period} · {lang.hero.location}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 64 }} className="fifawc-grid">
            <Reveal>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#424242', marginBottom: 16,
              }}>
                {lang.overview.title}
              </div>
              <p style={{ fontSize: 15, color: '#c8c8c8', lineHeight: 1.8, marginBottom: 20 }}>
                {lang.overview.desc}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ border: '1px solid #242424', background: '#111111' }}>
                {[
                  { label: 'Event', value: 'FIFA World Cup 2026™' },
                  { label: 'Hosts', value: 'USA · Canada · Mexico' },
                  { label: 'Mexico venue', value: 'Estadio Akron, Guadalajara' },
                  { label: 'Role', value: lang.hero.role },
                  { label: 'Period', value: lang.hero.period },
                ].map((row, i, arr) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '120px 1fr',
                    padding: '12px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: '#424242',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      paddingTop: 1,
                    }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: 13, color: '#c8c8c8' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .fifawc-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* Responsibilities */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#424242', marginBottom: 32,
            }}>
              {lang.responsibilities.title}
            </div>
          </Reveal>
          <Stagger
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
            className="fifawc-resp-grid"
            stagger={0.07}
          >
            {lang.responsibilities.items.map((item, i) => (
              <motion.div key={i} variants={staggerItem}
                style={{
                  border: '1px solid #242424', padding: '20px 24px',
                  background: '#111111',
                  marginTop: i > 1 ? -1 : 0,
                  marginLeft: i % 2 === 1 ? -1 : 0,
                }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, fontWeight: 600, color: '#d8d8d8',
                  letterSpacing: '0.04em', marginBottom: 6,
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
        <style>{`@media (max-width: 600px) { .fifawc-resp-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Status banner */}
      <section style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Reveal>
            <div style={{
              border: '1px solid #242424', background: '#111111',
              padding: '24px 28px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 16,
            }}>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: '#424242',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  // Current Status
                </div>
                <div style={{ fontSize: 15, color: '#f0f0f0', fontWeight: 500 }}>
                  {lang.status}
                </div>
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: '0.08em',
                border: '1px solid #242424', color: '#d8d8d8',
                padding: '4px 10px', background: '#111111',
              }}>
                In Progress
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
