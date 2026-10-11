import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

const P = '/photos/frc'
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const mono = { fontFamily: 'var(--font-mono)' }

// Photos per season; captions live in i18n under captions.frc
const seasonPhotos = {
  2023: [
    { src: `${P}/2023-team.jpg`, key: 'team2023' },
    { src: `${P}/2023-intel.jpg`, key: 'intel' },
  ],
  2024: [
    { src: `${P}/2024-hermosillo-winners.jpg`, key: 'winners' },
    { src: `${P}/2024-robot.jpg`, key: 'robot2024' },
    { src: `${P}/2024-pits.jpg`, key: 'pits2024' },
    { src: `${P}/2024-houston.jpg`, key: 'houston' },
  ],
  2025: [
    { src: `${P}/2025-field.jpg`, key: 'field2025' },
    { src: `${P}/2025-pits.jpg`, key: 'pits2025' },
    { src: `${P}/2025-repair.jpg`, key: 'repair2025', focus: 'center 35%' },
    { src: `${P}/2025-inspection.jpg`, key: 'inspection2025' },
  ],
}

export default function FRC() {
  usePageTitle('FIRST Robotics — Team Daedalus — Emilio Guadarrama')
  const { t } = useTranslation()
  const seasons = t('frc.seasons', { returnObjects: true })

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('frc.hero.back')}</Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['Robotics', 'FIRST', 'Team Daedalus 7102'].map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
            {t('frc.hero.title')}
          </h1>
          <dl className="frc-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0 40px', width: 'fit-content', marginBottom: 40 }}>
            {[
              [t('frc.hero.teamLabel'), t('frc.hero.team')],
              [t('frc.hero.periodLabel'), t('frc.hero.period')],
              [t('frc.hero.locationLabel'), t('frc.hero.location')],
            ].map(([k, v]) => (
              <div key={k}>
                <dt style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{k}</dt>
                <dd style={{ fontSize: 15, color: 'var(--text-primary)' }}>{v}</dd>
              </div>
            ))}
          </dl>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', border: '1px solid var(--border)', background: 'var(--card)', padding: '20px 24px', borderRadius: 'var(--radius-sm)', maxWidth: 760 }}>
            <div style={{ width: 3, alignSelf: 'stretch', background: 'var(--accent-white)', flexShrink: 0 }} />
            <div>
              <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{t('frc.achievementLabel')}</div>
              <div style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>{t('frc.achievement')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASONS ── */}
      {seasons.map((s, i) => (
        <section key={s.year} style={{ padding: '72px 0', borderBottom: i < seasons.length - 1 ? '1px solid var(--divider)' : 'none' }}>
          <div style={wrap}>
            <div className="season-head">
              <div style={{ ...mono, fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 600, color: s.featured ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.year}
              </div>
              <div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{s.game}</div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 10 }}>{s.role}</h2>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '64ch' }}>{s.highlights}</p>
                {s.featured && (
                  <div style={{ marginTop: 14, display: 'inline-flex', border: '1px solid var(--border)', padding: '4px 10px', ...mono, fontSize: 11, color: 'var(--accent-white)', borderRadius: 'var(--radius-sm)' }}>
                    ★ {t('frc.qualifier')}
                  </div>
                )}
              </div>
            </div>
            <Gallery
              items={seasonPhotos[s.year].map((p) => ({ ...p, caption: t(`captions.frc.${p.key}`) }))}
              columns={4}
              variant={seasonPhotos[s.year].length > 2 ? 'carousel' : 'grid'}
            />
          </div>
        </section>
      ))}
    </div>
  )
}
