import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag, SectionLabel } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

// Roles are translated; names stay as written
const team = [
  { role: 'president', name: 'Maximiliano Funoy Serrano' },
  { role: 'vpAvionics', name: 'Emilio Guadarrama Gutiérrez' },
  { role: 'avionicsSub', name: 'Damaris Mariscal' },
  { role: 'physical', name: 'Fernanda Ivet Acevedo Ávalos' },
  { role: 'structural', name: 'Luis Humberto Mota Reyes' },
  { role: 'propulsion', name: 'José David Lagunes Higareda' },
  { role: 'advisor', name: 'José Luis Henríquez Mercado' },
  { role: 'advisor', name: 'Luis Manuel Rico Gutiérrez' },
]

const P = '/photos'

export default function Ignitia() {
  usePageTitle('Ignitia Rocket Lab — Emilio Guadarrama')
  const { t } = useTranslation()
  const timeline = t('ignitia.timeline.items', { returnObjects: true })
  const achievements = t('ignitia.achievements.items', { returnObjects: true })
  const c = (k) => t(`captions.ignitia.${k}`)
  const photos = [
    { src: `${P}/lasc/launch-team.jpg`, caption: t('captions.lasc.launchTeam') },
    { src: `${P}/lasc/rail-team.jpg`, caption: t('captions.lasc.railTeam'), focus: 'center 70%' },
    { src: `${P}/ignitia/enmice-team.jpg`, caption: c('enmiceTeam') },
    { src: `${P}/ignitia/enmice-booth.jpg`, caption: c('enmiceBooth') },
    { src: `${P}/ignitia/enmice-electronics.jpg`, caption: c('enmiceElectronics') },
    { src: `${P}/ignitia/enmice-launch-rail.jpg`, caption: c('enmiceRail') },
    { src: `${P}/ignitia/launch-day-team.jpg`, caption: c('launchDayTeam') },
    { src: `${P}/ignitia/launch-day-integration.jpg`, caption: c('launchDayIntegration') },
    { src: `${P}/ignitia/launch-day-electronics.jpg`, caption: c('launchDayElectronics') },
    { src: `${P}/ignitia/wati-ii.jpg`, caption: c('watiII') },
    { src: `${P}/ignitia/ignis1-after-test-flight.jpg`, caption: c('ignis1Test') },
    { src: `${P}/ignitia/enmice-wati.jpg`, caption: c('enmiceWati') },
  ]

  return (
    <div style={{ paddingTop: 60 }}>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Link to="/" className="back-link">
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
              borderRadius: 'var(--radius-sm)',
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
                {t('ignitia.roleLabel')}
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
                    color: item.highlight ? '#b89060' : '#424242',
                    paddingTop: 2,
                  }}
                >
                  {item.year}
                  {item.highlight && (
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 9,
                        border: '1px solid #28200e',
                        padding: '1px 5px',
                        color: '#b89060',
                        background: '#120e06',
                        letterSpacing: '0.06em',
                        display: 'block',
                        width: 'fit-content',
                        borderRadius: 2,
                      }}
                    >
                      {t('ignitia.timeline.latest')}
                    </div>
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: item.highlight ? '#b89060' : '#f0f0f0',
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
      </section>

      {/* Achievements */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.achievements.title')}</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }} className="ach-grid">
            {achievements.map((ach, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  padding: '24px',
                  background: '#111111',
                  borderRadius: 'var(--radius-sm)',
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
      </section>

      {/* Photos */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.photosTitle')}</SectionLabel>
          <Gallery items={photos} columns={3} />
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.team.title')}</SectionLabel>
          <div style={{ border: '1px solid #242424', background: '#111111', overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
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
                  {t(`ignitia.team.roles.${member.role}`)}
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
      </section>

      {/* Subprojects */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('ignitia.subprojects.title')}</SectionLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: 'IGNIS Flight Computer', link: '/projects/ignis', amber: true },
              { name: 'LASC 2026 CanSat', link: '/projects/satellite', amber: true },
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
                  borderRadius: 'var(--radius-sm)',
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
