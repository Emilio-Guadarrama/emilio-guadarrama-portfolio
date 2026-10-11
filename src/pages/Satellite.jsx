import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag, SectionLabel } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const mono = { fontFamily: 'var(--font-mono)' }

export default function Satellite() {
  usePageTitle('LASC 2026 CanSat — Emilio Guadarrama')
  const { t } = useTranslation()
  const facts = t('satellite.facts', { returnObjects: true })
  const points = t('satellite.points', { returnObjects: true })

  const photos = [
    { src: '/photos/lasc/launch-team.jpg', caption: t('captions.lasc.launchTeam') },
    { src: '/photos/lasc/integration-check.jpg', caption: t('captions.lasc.integrationCheck') },
    { src: '/photos/lasc/integration.jpg', caption: t('captions.lasc.integration') },
  ]

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('satellite.hero.back')}</Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <Tag amber>LASC 2026</Tag>
            <Tag>Ignitia Rocket Lab</Tag>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            {t('satellite.hero.title')}
          </h1>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 40 }}>{t('satellite.hero.role')}</div>

          <div className="sat-result">
            <div style={{ ...mono, fontSize: 'clamp(56px, 9vw, 96px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              9<span style={{ fontSize: '0.45em', letterSpacing: 0 }}>{t('satellite.hero.ordinal')}</span>
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '32ch' }}>{t('satellite.hero.result')}</div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <SectionLabel>{t('satellite.missionTitle')}</SectionLabel>
          <div className="split-2">
            <div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {points.map((p, i) => (
                  <li key={i} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '60ch' }}>{p}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
                <Link to="/projects/ignis" className="text-link">{t('satellite.toIgnis')}</Link>
                <Link to="/projects/ignitia" className="text-link">{t('satellite.toIgnitia')}</Link>
              </div>
            </div>

            <dl className="hw-table">
              {facts.map((f) => (
                <div key={f.k} className="hw-row">
                  <dt style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 2 }}>{f.k}</dt>
                  <dd style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section style={{ padding: '72px 0' }}>
        <div style={wrap}>
          <SectionLabel>{t('satellite.photosTitle')}</SectionLabel>
          <Gallery items={photos} columns={3} />
        </div>
      </section>
    </div>
  )
}
