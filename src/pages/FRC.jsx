import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#424242',
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  )
}

const seasons = [
  {
    year: '2023',
    role: 'Robotics Technician',
    highlights: 'Scouting, drive team, mechanical systems',
  },
  {
    year: '2024',
    role: 'Mechanical Lead',
    highlights: 'Led mechanical area and drive team · Won Regional Hermosillo · Qualified FIRST World Championship Houston',
    featured: true,
  },
  {
    year: '2025',
    role: 'Mechanical Lead & Mentor',
    highlights: "Guided team's final high-school season · Mentored new members · Participated Monterrey and León Regionals",
  },
]

export default function FRC() {
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
            {t('frc.hero.back')}
          </Link>

          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            {['Robotics', 'FIRST', 'Team Daedalus'].map((tag) => (
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
              marginBottom: 8,
            }}
          >
            {t('frc.hero.title')}
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: '0 32px',
              marginTop: 16,
              width: 'fit-content',
            }}
            className="frc-meta"
          >
            {[
              { k: 'Team', v: t('frc.hero.team') },
              { k: 'Period', v: t('frc.hero.period') },
              { k: 'Location', v: t('frc.hero.location') },
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
                <div style={{ fontSize: 14, color: '#c8c8c8' }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 480px) { .frc-meta { grid-template-columns: 1fr !important; gap: 16px !important; } }`}</style>
      </section>

      {/* Key Achievement */}
      <section style={{ padding: '32px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              border: '1px solid #242424',
              padding: '20px 24px',
              background: '#111111',
            }}
          >
            <div
              style={{
                width: 4,
                height: 40,
                background: '#d8d8d8',
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#424242',
                  marginBottom: 6,
                }}
              >
                Key Achievement
              </div>
              <div style={{ fontSize: 15, color: '#f0f0f0', fontWeight: 500 }}>
                {t('frc.achievement')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Timeline */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('frc.timeline')}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {seasons.map((season, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 24,
                  padding: '24px 0',
                  borderTop: '1px solid #242424',
                  alignItems: 'start',
                }}
                className="season-row"
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    fontWeight: 600,
                    color: season.featured ? '#f0f0f0' : '#424242',
                    paddingTop: 2,
                  }}
                >
                  {season.year}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#f0f0f0',
                      marginBottom: 8,
                    }}
                  >
                    {season.role}
                  </div>
                  <div style={{ fontSize: 14, color: '#c8c8c8', lineHeight: 1.6 }}>
                    {season.highlights}
                  </div>
                  {season.featured && (
                    <div
                      style={{
                        marginTop: 12,
                        display: 'inline-flex',
                        border: '1px solid #242424',
                        padding: '4px 10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: '#d8d8d8',
                        letterSpacing: '0.06em',
                      }}
                    >
                      ★ World Championship Qualifier
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #242424' }} />
          </div>
        </div>
        <style>{`@media (max-width: 480px) { .season-row { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
      </section>

      {/* Gallery Placeholder */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>Gallery</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
            }}
            className="frc-gallery"
          >
            {Array.from({ length: 4 }).map((_, i) => (
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
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#242424',
                  }}
                >
                  Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#424242', marginTop: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            Competition photos coming soon.
          </p>
        </div>
        <style>{`@media (max-width: 768px) { .frc-gallery { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
      </section>
    </div>
  )
}
