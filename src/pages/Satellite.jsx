import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Tag({ children, amber }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        padding: '3px 8px',
        border: `1px solid ${amber ? '#28200e' : '#242424'}`,
        color: amber ? '#b89060' : '#424242',
        background: amber ? '#120e06' : 'transparent',
      }}
    >
      {children}
    </span>
  )
}

export default function Satellite() {
  const { t } = useTranslation()

  return (
    <div style={{ paddingTop: 60 }}>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#424242',
              textDecoration: 'none',
              marginBottom: 32,
              letterSpacing: '0.06em',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8c8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
          >
            {t('satellite.hero.back')}
          </Link>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <Tag amber>LASC 2026</Tag>
            <Tag>Ignitia Rocket Lab</Tag>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: '#f0f0f0',
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            {t('satellite.hero.title')}
          </h1>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid #242424',
              padding: '8px 16px',
              background: '#111111',
              marginTop: 8,
            }}
          >
            <div style={{ width: 6, height: 6, background: '#424242', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#424242',
                letterSpacing: '0.06em',
              }}
            >
              {t('satellite.hero.status')}
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#424242',
              marginBottom: 24,
            }}
          >
            {t('satellite.overview')}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
            }}
            className="sat-grid"
          >
            {[
              { k: 'Competition', v: 'LASC 2026 — Latin American Space Challenge · Iacanga, São Paulo, Brazil · September 2026' },
              { k: 'Type', v: 'CanSat / PocketQube / CubeSat (TBD)' },
              { k: 'Constraints', v: 'No propulsion · Budget ≤ $1,000 USD · Operation ≥ 4 hours' },
              { k: 'Scoring', v: 'Readiness/TORL 55% · Mission report 20% · Team effort 10% · Design 10% · Bonus 5%' },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  padding: '20px',
                  background: '#111111',
                  marginTop: i > 1 ? -1 : 0,
                  marginLeft: i % 2 === 1 ? -1 : 0,
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#424242',
                    paddingTop: 2,
                  }}
                >
                  {row.k}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 600px) { .sat-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* WIP Notice */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              border: '1px solid #242424',
              padding: '40px',
              background: '#111111',
              maxWidth: 600,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#424242',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              STATUS
            </div>
            <p style={{ fontSize: 15, color: '#c8c8c8', lineHeight: 1.7, marginBottom: 24 }}>
              {t('satellite.wip')}
            </p>
            <Link
              to="/projects/ignitia"
              style={{
                display: 'inline-flex',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#b89060',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a070')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#b89060')}
            >
              {t('satellite.backToIgnitia')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
