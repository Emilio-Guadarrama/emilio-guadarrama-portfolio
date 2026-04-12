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

const timeline = [
  { year: '2022', event: 'AKIRA II Validation Mission', detail: '1,000m apogee · flight stability, recovery, and onboard electronics validation' },
  { year: '2023', event: 'Watakame I Launch', detail: 'Team milestone' },
  { year: '2023', event: 'Spaceport America Cup', detail: 'WATAKAME I · First Mexican team to complete full mission profile · Rank 79' },
  { year: '2023–2024', event: 'ENMICE', detail: 'WATAKAME IA · 5,000m apogee design · Technical Excellence Award' },
  { year: 'Oct 2025', event: 'WATI I Qualification Mission', detail: 'First successful launch · 124m apogee · avionics, ignition, recovery validated' },
  { year: '2025', event: 'ENMICE 2025', detail: 'WATI I launch (129m) · WIRIKUTA 1.1 test bench · 2nd place presentation · Honorific conduct award' },
  { year: '2025', event: 'Engineering Expo TEC', detail: '1st place Physical Prototype' },
  { year: '2025', event: 'FIL Guadalajara', detail: 'Scientific outreach exhibition' },
  { year: 'Sep 2026', event: 'LASC 2026', detail: 'Upcoming · Iacanga, São Paulo, Brazil', upcoming: true },
]

const achievements = [
  { title: 'ENMICE 2025', desc: '2nd place project presentation (WIRIKUTA 1.1) + Honorific conduct award' },
  { title: 'Engineering Expo TEC 2025', desc: '1st place Physical Prototype' },
  { title: 'ENMICE 2023–2024', desc: 'Technical Excellence Award (WATAKAME IA)' },
  { title: 'Spaceport America Cup 2023', desc: 'First Mexican team to complete full mission' },
]

const team = [
  { role: 'President', name: 'Maximiliano Funoy Serrano' },
  { role: 'Vice President', name: 'Emilio Guadarrama Gutiérrez' },
  { role: 'Avionics Lead', name: 'Braulio García Rayas' },
  { role: 'Avionics Sub-Lead', name: 'Julia Blanco Sánchez' },
  { role: 'Physical Modelling Lead', name: 'Fernanda Ivet Acevedo Ávalos' },
  { role: 'Structural Lead', name: 'Luis Humberto Mota Reyes' },
  { role: 'Propulsion Lead', name: 'José David Lagunes Higareda' },
  { role: 'Faculty Advisor', name: 'José Luis Henríquez Mercado' },
  { role: 'Faculty Advisor', name: 'Luis Manuel Rico Gutiérrez' },
]

export default function Ignitia() {
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
            {t('ignitia.hero.back')}
          </Link>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <Tag amber>LASC 2026</Tag>
            <Tag>Rocketry</Tag>
            <Tag>Tec de Monterrey</Tag>
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
            {t('ignitia.hero.title')}
          </h1>
          <div style={{ fontSize: 15, color: '#424242', marginBottom: 8 }}>
            {t('ignitia.hero.subtitle')}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#b89060',
              marginBottom: 16,
            }}
          >
            {t('ignitia.hero.tagline')}
          </div>

          <div
            style={{
              display: 'inline-flex',
              border: '1px solid #242424',
              padding: '10px 16px',
              background: '#111111',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#424242',
                  marginBottom: 4,
                }}
              >
                Emilio's Role
              </div>
              <div style={{ fontSize: 13, color: '#c8c8c8' }}>{t('ignitia.role')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Timeline */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.timeline.title')}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 24,
                  padding: '20px 0',
                  borderTop: '1px solid #242424',
                  alignItems: 'start',
                }}
                className="timeline-row"
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: item.upcoming ? '#b89060' : '#424242',
                    paddingTop: 2,
                  }}
                >
                  {item.year}
                  {item.upcoming && (
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 9,
                        border: '1px solid #28200e',
                        padding: '1px 5px',
                        color: '#b89060',
                        background: '#120e06',
                        letterSpacing: '0.06em',
                        display: 'inline-block',
                      }}
                    >
                      UPCOMING
                    </div>
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: item.upcoming ? '#b89060' : '#f0f0f0',
                      marginBottom: 4,
                    }}
                  >
                    {item.event}
                  </div>
                  <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #242424' }} />
          </div>
        </div>
        <style>{`@media (max-width: 500px) { .timeline-row { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
      </section>

      {/* Achievements */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.achievements.title')}</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }} className="ach-grid">
            {achievements.map((ach, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  padding: '24px',
                  background: '#111111',
                  marginTop: i > 1 ? -1 : 0,
                  marginLeft: i % 2 === 1 ? -1 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#f0f0f0',
                    marginBottom: 8,
                  }}
                >
                  {ach.title}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>{ach.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 600px) { .ach-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Image Carousel Placeholder */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>Gallery</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }} className="gallery-placeholders">
            {['ENMICE 2025', 'WATI I Launch', 'WIRIKUTA 1.1', 'Spaceport America Cup 2023'].map((label, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  background: '#111111',
                  aspectRatio: '4/3',
                  marginLeft: i > 0 ? -1 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 16,
                }}
              >
                <img
                  src={`https://placehold.co/300x225/111111/242424`}
                  alt={label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', opacity: 0 }}
                />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#242424',
                    textAlign: 'center',
                    letterSpacing: '0.06em',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#424242', marginTop: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            Photos coming soon.
          </p>
        </div>
        <style>{`@media (max-width: 768px) { .gallery-placeholders { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
      </section>

      {/* Team */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.team.title')}</SectionLabel>
          <div style={{ border: '1px solid #242424', background: '#111111', overflow: 'hidden' }}>
            {team.map((member, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr',
                  borderBottom: i < team.length - 1 ? '1px solid #1a1a1a' : 'none',
                  padding: '12px 20px',
                }}
                className="team-row"
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#424242',
                    ...(member.name.includes('Emilio') ? { color: '#b89060' } : {}),
                  }}
                >
                  {member.role}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: member.name.includes('Emilio') ? '#b89060' : '#c8c8c8',
                    fontWeight: member.name.includes('Emilio') ? 500 : 400,
                  }}
                >
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 480px) { .team-row { grid-template-columns: 1fr !important; gap: 4px; } }`}</style>
      </section>

      {/* Subprojects */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.subprojects.title')}</SectionLabel>
          <div style={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[
              { name: 'FC-2026 Flight Computer', link: '/projects/fc-2026', amber: true },
              { name: 'LASC 2026 Satellite Challenge', link: '/projects/satellite', amber: true },
            ].map((sub) => (
              <Link
                key={sub.link}
                to={sub.link}
                style={{
                  display: 'inline-flex',
                  border: `1px solid ${sub.amber ? '#28200e' : '#242424'}`,
                  padding: '12px 20px',
                  background: sub.amber ? '#120e06' : '#111111',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = sub.amber ? '#b89060' : '#2a2a2a')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = sub.amber ? '#28200e' : '#242424')}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: sub.amber ? '#b89060' : '#c8c8c8',
                    fontWeight: 500,
                  }}
                >
                  → {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
