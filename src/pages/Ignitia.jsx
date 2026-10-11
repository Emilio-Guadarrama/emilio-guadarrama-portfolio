import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag, SectionLabel } from '../components/ui'
import Gallery from '../components/Gallery'
import { usePageTitle } from '../hooks/usePageTitle'

const P = '/photos'
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const mono = { fontFamily: 'var(--font-mono)' }
const section = { padding: '80px 0', borderBottom: '1px solid var(--divider)' }
const h2 = { fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }
const lead = { fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '66ch', marginBottom: 40 }

const LINKS = {
  website: 'https://ignitia.space',
  instagram: 'https://www.instagram.com/ignitia.rocketlab',
  lasc: 'https://www.lasc.space/',
}

function ResultBoxes({ items }) {
  return (
    <div className="cgrid result-grid" style={{ marginBottom: 48 }}>
      {items.map((r) => (
        <div key={r.label} style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '24px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ ...mono, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10 }}>{r.value}</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Ignitia() {
  usePageTitle('Ignitia Rocket Lab — Emilio Guadarrama')
  const { t } = useTranslation()
  const list = (k) => t(k, { returnObjects: true })
  const c = (k) => t(`captions.${k}`)

  const lascPhotos = [
    { video: `${P}/lasc/ignition-launch.mp4`, poster: `${P}/lasc/ignition-launch-poster.jpg`, caption: c('lasc.ignition') },
    { src: `${P}/lasc/avionics-bay.jpg`, caption: c('lasc.avionicsBay') },
    { src: `${P}/lasc/ignis1-on-rail.jpg`, caption: c('lasc.onRail') },
    { video: `${P}/lasc/remove-before-flight.mp4`, poster: `${P}/lasc/remove-before-flight-poster.jpg`, caption: c('lasc.rbf') },
    { video: `${P}/lasc/ignis1-rail.mp4`, poster: `${P}/lasc/ignis1-rail-poster.jpg`, caption: c('lasc.railVideo') },
    { src: `${P}/lasc/launch-control.jpg`, caption: c('lasc.launchControl') },
    { src: `${P}/lasc/recovery.jpg`, caption: c('lasc.recovery') },
    { src: `${P}/lasc/launch-team.jpg`, caption: c('lasc.launchTeam') },
    { src: `${P}/lasc/rail-team.jpg`, caption: c('lasc.railTeam') },
    { src: `${P}/lasc/integration.jpg`, caption: c('lasc.integration') },
    { src: `${P}/lasc/integration-check.jpg`, caption: c('lasc.integrationCheck') },
  ]
  const enmicePhotos = [
    { src: `${P}/ignitia/enmice-team.jpg`, caption: c('ignitia.enmiceTeam') },
    { src: `${P}/ignitia/enmice-booth.jpg`, caption: c('ignitia.enmiceBooth') },
    { src: `${P}/ignitia/enmice-electronics.jpg`, caption: c('ignitia.enmiceElectronics') },
    { src: `${P}/ignitia/enmice-launch-rail.jpg`, caption: c('ignitia.enmiceRail') },
    { src: `${P}/ignitia/enmice-wati.jpg`, caption: c('ignitia.enmiceWati') },
  ]
  const flightPhotos = [
    { src: `${P}/ignitia/launch-day-team.jpg`, caption: c('ignitia.launchDayTeam') },
    { src: `${P}/ignitia/launch-day-integration.jpg`, caption: c('ignitia.launchDayIntegration') },
    { src: `${P}/ignitia/launch-day-electronics.jpg`, caption: c('ignitia.launchDayElectronics') },
    { src: `${P}/ignitia/wati-ii.jpg`, caption: c('ignitia.watiII') },
    { src: `${P}/ignitia/ignis1-after-test-flight.jpg`, caption: c('ignitia.ignis1Test') },
  ]
  const patches = [
    { src: `${P}/lasc/patch-rocket-challenge.png`, caption: t('ignitia.lasc.patchRocket') },
    { src: `${P}/lasc/patch-cansat.png`, caption: t('ignitia.lasc.patchCansat') },
  ]
  const timeline = list('ignitia.timeline.items')

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('ignitia.hero.back')}</Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <Tag amber>LASC 2026</Tag>
            <Tag>Rocketry</Tag>
            <Tag>Tec de Monterrey</Tag>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 12 }}>
            {t('ignitia.hero.title')}
          </h1>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 6 }}>{t('ignitia.hero.subtitle')}</div>
          <div style={{ ...mono, fontSize: 13, color: 'var(--amber)', marginBottom: 32 }}>{t('ignitia.hero.tagline')}</div>

          <div style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '18px 20px', borderRadius: 'var(--radius-sm)', maxWidth: 760, marginBottom: 28 }}>
            <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{t('ignitia.roleLabel')}</div>
            <div style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>{t('ignitia.role')}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={LINKS.website} target="_blank" rel="noopener noreferrer" className="ext-link">ignitia.space ↗</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="ext-link">Instagram · @ignitia.rocketlab ↗</a>
          </div>
        </div>
      </section>

      {/* ── JUMP LINKS ── */}
      <nav aria-label={t('ignitia.sectionsLabel')} style={{ borderBottom: '1px solid var(--divider)' }}>
        <div style={{ ...wrap, display: 'flex', gap: 24, flexWrap: 'wrap', padding: '18px 24px' }}>
          {['lasc', 'enmice', 'flights', 'other', 'history'].map((id) => (
            <a key={id} href={`#${id}`} className="text-link">{t(`ignitia.${id}.title`)}</a>
          ))}
        </div>
      </nav>

      {/* ── LASC 2026 ── */}
      <section id="lasc" style={section}>
        <div style={wrap}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><Tag amber>LASC 2026</Tag></div>
          <h2 style={h2}>{t('ignitia.lasc.title')}</h2>
          <p style={lead}>{t('ignitia.lasc.lead')}</p>
          <ResultBoxes items={list('ignitia.lasc.results')} />

          <div style={{ marginBottom: 56 }}>
            <Gallery items={lascPhotos} variant="carousel" />
          </div>

          <SectionLabel>{t('ignitia.lasc.patchesTitle')}</SectionLabel>
          <div className="patch-row">
            {patches.map((p) => (
              <figure key={p.src} style={{ margin: 0 }}>
                <img src={p.src} alt={p.caption} loading="lazy" className="patch-img" />
                <figcaption className="gallery-caption" style={{ textAlign: 'center', margin: '12px auto 0' }}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 48 }}>
            <Link to="/projects/ignis" className="ext-link">{t('ignitia.lasc.toIgnis')} →</Link>
            <Link to="/projects/satellite" className="ext-link">{t('ignitia.lasc.toCansat')} →</Link>
            <a href={LINKS.lasc} target="_blank" rel="noopener noreferrer" className="ext-link">lasc.space ↗</a>
          </div>
        </div>
      </section>

      {/* ── ENMICE 2025 ── */}
      <section id="enmice" style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignitia.enmice.title')}</h2>
          <p style={lead}>{t('ignitia.enmice.lead')}</p>
          <ResultBoxes items={list('ignitia.enmice.results')} />
          <Gallery items={enmicePhotos} variant="carousel" />
        </div>
      </section>

      {/* ── TEST FLIGHTS ── */}
      <section id="flights" style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignitia.flights.title')}</h2>
          <p style={lead}>{t('ignitia.flights.lead')}</p>
          <ul style={{ listStyle: 'none', borderTop: '1px solid var(--border)', marginBottom: 48, maxWidth: 760 }}>
            {list('ignitia.flights.items').map((it) => (
              <li key={it.event} className="timeline-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ ...mono, fontSize: 12, color: 'var(--text-secondary)', paddingTop: 2 }}>{it.year}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{it.event}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{it.detail}</div>
                </div>
              </li>
            ))}
          </ul>
          <Gallery items={flightPhotos} variant="carousel" />
        </div>
      </section>

      {/* ── OTHER ACTIVITIES ── */}
      <section id="other" style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignitia.other.title')}</h2>
          <div className="cgrid ach-grid">
            {list('ignitia.other.items').map((it) => (
              <div key={it.title} style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '24px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ ...mono, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{it.year}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{it.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM HISTORY ── */}
      <section id="history" style={{ ...section, borderBottom: 'none' }}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignitia.history.title')}</h2>
          <p style={lead}>{t('ignitia.history.lead')}</p>
          <ol style={{ listStyle: 'none', borderTop: '1px solid var(--border)' }}>
            {timeline.map((item, i) => (
              <li key={i} className="timeline-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ ...mono, fontSize: 12, color: item.highlight ? 'var(--amber)' : 'var(--text-secondary)', paddingTop: 2 }}>{item.year}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.event}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
