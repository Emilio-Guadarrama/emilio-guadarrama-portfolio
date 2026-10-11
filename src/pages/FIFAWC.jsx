import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

const P = '/photos/fifa'
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const mono = { fontFamily: 'var(--font-mono)' }

export default function FIFAWC() {
  const { t } = useTranslation()
  usePageTitle(t('titles.fifawc'))
  const facts = t('fifawc.facts', { returnObjects: true })
  const c = (k) => t(`captions.fifa.${k}`)

  const photos = [
    { src: `${P}/pre-match-ceremony.jpg`, caption: c('ceremony') },
    { video: `${P}/ceremony.mp4`, poster: `${P}/ceremony-poster.jpg`, caption: c('ceremonyVideo') },
    { src: `${P}/stadium-day.jpg`, caption: c('stadiumDay') },
  ]

  return (
    <div style={{ paddingTop: 60 }}>
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('fifawc.hero.back')}</Link>
          <div className="techo-hero">
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {['Volunteering', 'FIFA', 'Guadalajara'].map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
                {t('fifawc.hero.title')}
              </h1>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28 }}>{t('fifawc.hero.role')}</div>
              <p style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.7, maxWidth: '56ch', marginBottom: 32 }}>
                {t('fifawc.desc')}
              </p>
              <dl className="hw-table">
                {facts.map((f) => (
                  <div key={f.k} className="hw-row">
                    <dt style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 2 }}>{f.k}</dt>
                    <dd style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Gallery items={[{ src: `${P}/stadium.jpg`, caption: c('stadium'), focus: 'center 30%' }]} columns={1} aspect="4 / 5" />
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div style={wrap}>
          <Gallery items={photos} columns={3} />
        </div>
      </section>
    </div>
  )
}
