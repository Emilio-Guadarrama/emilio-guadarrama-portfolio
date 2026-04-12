import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const constructions = [
  { num: '1st', role: 'Volunteer', location: 'Comunidad Indígena Sergio Barrios, Tlajomulco, Jalisco' },
  { num: '2nd', role: 'Crew Co-Leader', location: 'Comunidad Indígena Sergio Barrios, Tlajomulco, Jalisco' },
  { num: '3rd', role: 'Crew Leader', location: 'Comunidad de Jauja, Tonalá, Jalisco' },
]

export default function TECHO() {
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
            {t('techo.hero.back')}
          </Link>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['Volunteering', 'TECHO', 'Jalisco'].map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  padding: '3px 8px',
                  border: '1px solid #242424',
                  color: '#424242',
                }}
              >
                {tag}
              </span>
            ))}
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
            {t('techo.hero.title')}
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: '0 32px',
              width: 'fit-content',
            }}
            className="techo-meta"
          >
            {[
              { k: 'Role', v: t('techo.hero.role') },
              { k: 'Period', v: t('techo.hero.period') },
              { k: 'Location', v: t('techo.hero.location') },
            ].map((item) => (
              <div key={item.k}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#424242',
                    marginBottom: 4,
                  }}
                >
                  {item.k}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8' }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 480px) { .techo-meta { grid-template-columns: 1fr !important; gap: 16px !important; } }`}</style>
      </section>

      {/* Description */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <p
            style={{
              fontSize: 16,
              color: '#c8c8c8',
              lineHeight: 1.8,
              maxWidth: 640,
            }}
          >
            {t('techo.description')}
          </p>
        </div>
      </section>

      {/* Construction History */}
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
            {t('techo.history')}
          </div>

          <div style={{ border: '1px solid #242424', background: '#111111', overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr',
                borderBottom: '1px solid #242424',
              }}
              className="techo-row"
            >
              {['#', 'Role', 'Location'].map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#424242',
                    borderLeft: i > 0 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {constructions.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 200px 1fr',
                  borderBottom: i < constructions.length - 1 ? '1px solid #1a1a1a' : 'none',
                }}
                className="techo-row"
              >
                <div
                  style={{
                    padding: '16px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#424242',
                  }}
                >
                  {c.num}
                </div>
                <div
                  style={{
                    padding: '16px 20px',
                    fontSize: 13,
                    color: '#c8c8c8',
                    fontWeight: 500,
                    borderLeft: '1px solid #1a1a1a',
                  }}
                >
                  {c.role}
                </div>
                <div
                  style={{
                    padding: '16px 20px',
                    fontSize: 13,
                    color: '#c8c8c8',
                    lineHeight: 1.5,
                    borderLeft: '1px solid #1a1a1a',
                  }}
                >
                  {c.location}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .techo-row { grid-template-columns: 1fr !important; }
            .techo-row > div { border-left: none !important; border-top: 1px solid #1a1a1a; }
            .techo-row > div:first-child { border-top: none; }
          }
        `}</style>
      </section>

      {/* Gallery Placeholder */}
      <section style={{ padding: '64px 0' }}>
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
            Gallery
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }} className="techo-gallery">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  background: '#111111',
                  aspectRatio: '4/3',
                  marginLeft: i > 0 ? -1 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#242424' }}>
                  Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#424242', marginTop: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            Construction photos coming soon.
          </p>
        </div>
        <style>{`@media (max-width: 600px) { .techo-gallery { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </div>
  )
}
