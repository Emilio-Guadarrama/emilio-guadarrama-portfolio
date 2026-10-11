import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

const P = '/photos/techo'
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const mono = { fontFamily: 'var(--font-mono)' }

// Photos per build (same order as techo.builds in i18n); captions under captions.techo
const buildPhotos = [
  [
    { src: `${P}/2024-group.jpg`, key: 'group2024' },
    { src: `${P}/2024-welcome.jpg`, key: 'welcome2024' },
    { src: `${P}/2024-floor.jpg`, key: 'floor2024' },
  ],
  [
    { src: `${P}/2025-sep-walls.jpg`, key: 'walls2025' },
    { src: `${P}/2025-sep-handover.jpg`, key: 'handover2025' },
  ],
  [
    { src: `${P}/2025-oct-floor.jpg`, key: 'floorOct2025' },
    { src: `${P}/2025-oct-walls.jpg`, key: 'wallsOct2025' },
    { src: `${P}/2025-oct-interior.jpg`, key: 'interiorOct2025', focus: 'center 35%' },
    { src: `${P}/2025-oct-roof.jpg`, key: 'roofOct2025', focus: 'center 60%' },
    { src: `${P}/2025-oct-handover.jpg`, key: 'handoverOct2025' },
  ],
  [
    { src: `${P}/2025-dec-crew.jpg`, key: 'crewDec2025' },
    { src: `${P}/2025-dec-house.jpg`, key: 'houseDec2025', focus: 'center 70%' },
  ],
  [
    { src: `${P}/2026-framing.jpg`, key: 'framing2026' },
    { src: `${P}/2026-handover.jpg`, key: 'handover2026' },
    { src: `${P}/2026-walls.jpg`, key: 'walls2026' },
  ],
]

export default function TECHO() {
  usePageTitle('TECHO México — Emilio Guadarrama')
  const { t } = useTranslation()
  const builds = t('techo.builds', { returnObjects: true })

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('techo.hero.back')}</Link>
          <div className="techo-hero">
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {['Volunteering', 'TECHO', 'Jalisco'].map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
                {t('techo.hero.title')}
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.7, maxWidth: '56ch', marginBottom: 32 }}>
                {t('techo.description')}
              </p>
              <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px 16px' }}>
                {[
                  [t('techo.hero.roleLabel'), t('techo.hero.role')],
                  [t('techo.hero.periodLabel'), t('techo.hero.period')],
                  [t('techo.hero.locationLabel'), t('techo.hero.location')],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'contents' }}>
                    <dt style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 3 }}>{k}</dt>
                    <dd style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5 }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Gallery items={[{ src: `${P}/hero.jpg`, caption: t('captions.techo.hero') }]} columns={1} aspect="4 / 5" />
          </div>
        </div>
      </section>

      {/* ── BUILDS ── */}
      {builds.map((b, i) => (
        <section key={i} style={{ padding: '64px 0', borderBottom: i < builds.length - 1 ? '1px solid var(--divider)' : 'none' }}>
          <div style={wrap}>
            <div className="season-head">
              <div>
                <div style={{ ...mono, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{b.num}</div>
                <div style={{ ...mono, fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>{b.date}</div>
              </div>
              <div>
                {b.role && <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{b.role}</div>}
                <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8 }}>{b.place}</h2>
                {b.note && <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '64ch' }}>{b.note}</p>}
              </div>
            </div>
            {buildPhotos[i].length > 0 ? (
              <Gallery
                items={buildPhotos[i].map((p) => ({ ...p, caption: t(`captions.techo.${p.key}`) }))}
                columns={3}
                variant={buildPhotos[i].length > 3 ? 'carousel' : 'grid'}
              />
            ) : (
              <p style={{ ...mono, fontSize: 12, color: 'var(--text-secondary)' }}>{t('techo.photosSoon')}</p>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
