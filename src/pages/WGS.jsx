import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'

export default function WGS() {
  const { t } = useTranslation()
  usePageTitle(t('titles.wgs'))

  const techs = ['Arduino', 'Sensors', 'Bluetooth / Wi-Fi', 'Web interface', 'Solar power']

  return (
    <div style={{ paddingTop: 60 }}>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Link to="/" className="back-link">
            {t('wgs.hero.back')}
          </Link>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['IoT', 'Sustainability', 'Arduino'].map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  padding: '3px 8px',
                  border: '1px solid #242424',
                  color: '#8a8a8a',
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
              marginBottom: 4,
            }}
          >
            {t('wgs.hero.title')}
          </h1>
          <div style={{ fontSize: 20, color: '#8a8a8a', marginBottom: 8, fontWeight: 400 }}>
            {t('wgs.hero.subtitle')}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#8a8a8a',
            }}
          >
            {t('wgs.hero.context')}
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
              color: '#8a8a8a',
              marginBottom: 24,
            }}
          >
            {t('wgs.overview')}
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'start' }}
            className="wgs-overview-grid"
          >
            <div>
              {[
                { k: t('wgs.whatLabel'), v: t('wgs.what') },
                { k: t('wgs.roleLabel'), v: t('wgs.role') },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 16,
                    padding: '16px 0',
                    borderTop: i === 0 ? 'none' : '1px solid #1a1a1a',
                    borderBottom: i === 2 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#8a8a8a',
                      paddingTop: 2,
                    }}
                  >
                    {row.k}
                  </div>
                  <div style={{ fontSize: 14, color: '#c8c8c8', lineHeight: 1.6 }}>{row.v}</div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8a8a8a',
                  marginBottom: 16,
                }}
              >
                {t('wgs.tech')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {techs.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      padding: '4px 10px',
                      border: '1px solid #242424',
                      color: '#c8c8c8',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
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
              color: '#8a8a8a',
              marginBottom: 24,
            }}
          >
            {t('wgs.media')}
          </div>
          <div className="cgrid wgs-gallery">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  background: '#111111',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#242424' }}>
                  Demo {i + 1}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#8a8a8a', marginTop: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            {t('wgs.mediaSoon')}
          </p>
        </div>
      </section>
    </div>
  )
}
