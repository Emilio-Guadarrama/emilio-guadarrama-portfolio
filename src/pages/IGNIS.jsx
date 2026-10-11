import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tag, SectionLabel } from '../components/ui'
import Gallery from '../components/Gallery'
import MobileCollapse from '../components/MobileCollapse'
import { GitHubIcon } from '../components/icons'
import { usePageTitle } from '../hooks/usePageTitle'

const P = '/photos'

// Hardware tables come from the IGNIS v2 and v5 repository READMEs
const v2Hardware = [
  ['MCU', 'ESP32-S3-WROOM-1-N8R8'],
  ['RF telemetry', 'RFM95W · 915 MHz LoRa · SMA antenna'],
  ['Barometer', 'BMP180'],
  ['IMU', 'MPU-6050 · 6-DOF'],
  ['GPS', 'Adafruit Ultimate GPS breakout'],
  ['Storage', 'MicroSD · SPI'],
  ['Power', 'Dual AMS1117 · VBAT → 5 V → 3.3 V'],
  ['Pyro', '2-channel MOSFET deployment'],
  ['PCB', '4-layer · Altium Designer · JLCPCB fab'],
]

const v5Hardware = [
  ['MCU', 'ESP32-S3-WROOM-1-N16R8 · 16 MB flash / 8 MB PSRAM'],
  ['RF telemetry', 'RFM95W · 915 MHz LoRa · SMA antenna port'],
  ['GNSS', 'u-blox SAM-M10Q · integrated patch antenna'],
  ['IMU', 'LSM6DSV32X · 6-DOF · ±32 g / ±4000 dps'],
  ['Barometer', 'Infineon DPS368 (BMP280 drop-in compatible)'],
  ['Storage', 'MicroSD · SPI · card detect'],
  ['Power', 'Dual AMS1117 · VBAT → 5 V → 3.3 V · battery monitoring'],
  ['USB', 'USB-C 2.0 · ESD protected · native USB programming'],
  ['Pyro', '2 channels · optically isolated MOSFET · continuity sensing'],
  ['PCB', '4-layer · Ø75 mm · JLCPCB fabrication and assembly'],
]

const designDecisions = [
  { decision: 'ESP32-S3 as MCU', reason: 'Native USB (no USB-UART bridge), dual-core LX7 at 240 MHz, octal PSRAM for flight logging' },
  { decision: 'Dual AMS1117 instead of XL4005 buck', reason: 'XL4005 not available in Mexico; thermal analysis: 0.95 W on the 5 V stage, 0.68 W on 3.3 V — acceptable for a short flight' },
  { decision: 'LoRa 915 MHz', reason: 'Long range, low power, license-free band in Latin America' },
]

// Revisions that get their own section on this page
const revAnchor = { 'v2': 'v2', 'v2.2': 'flight', 'v5': 'v5' }

const mono = { fontFamily: 'var(--font-mono)' }
const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }
const section = { padding: '80px 0', borderBottom: '1px solid var(--divider)' }
const h2 = { fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }
const lead = { fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '68ch', marginBottom: 40 }
const h3 = { fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }

function HardwareTable({ rows }) {
  return (
    <div className="hw-table">
      {rows.map(([k, v]) => (
        <div key={k} className="hw-row">
          <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 2 }}>{k}</div>
          <div style={{ ...mono, fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.6 }}>{v}</div>
        </div>
      ))}
    </div>
  )
}

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ext-link"
    >
      {children}
    </a>
  )
}

export default function IGNIS() {
  const { t } = useTranslation()
  usePageTitle(t('titles.ignis'))
  const c = (k) => t(`captions.${k}`)
  const list = (k) => t(k, { returnObjects: true })

  const revisions = list('ignis.revisions.items')
  const changes = list('ignis.v2.changes')
  const failures = list('ignis.failures.items')
  const v5Stats = list('ignis.v5.stats')
  const v5Points = list('ignis.v5.points')
  const platformHw = list('ignis.platform.hardware')
  const firmware = list('ignis.platform.firmware')
  const decisionHeaders = list('ignis.decisions.headers')

  const boardPhotos = [
    { src: `${P}/ignis/v2-board.jpg`, caption: c('ignis.board') },
  ]
  const earlierRevs = [
    { src: `${P}/ignis/v1-3d-angle.jpg`, caption: c('ignis.v1') },
    { src: `${P}/ignis/v4-board.jpg`, caption: c('ignis.v4'), focus: 'center 85%' },
  ]
  const buildPhotos = [
    { src: `${P}/ignis/v2-bench.jpg`, caption: c('ignis.bench') },
    { src: `${P}/ignis/v2-reflow.jpg`, caption: c('ignis.reflow') },
    { src: `${P}/ignis/v2-bare-board.jpg`, caption: c('ignis.bareBoard') },
    { video: `${P}/ignis/v2-pyro-bench-test.mp4`, poster: `${P}/ignis/v2-pyro-bench-test-poster.jpg`, caption: c('ignis.pyroBench') },
    { video: `${P}/ignis/v2-pyro-command-test.mp4`, poster: `${P}/ignis/v2-pyro-command-test-poster.jpg`, caption: c('ignis.pyroCommand') },
    { src: `${P}/ignis/v2-assembled.jpg`, caption: c('ignis.assembled') },
    { src: `${P}/ignis/v2-silkscreen.jpg`, caption: c('ignis.silkscreen') },
  ]
  // PCB viewer: one view at a time, chosen from the labelled thumbnails
  const designFiles = [
    { src: `${P}/ignis/v2-3d-top.jpg`, caption: c('ignis.top3d'), label: '3D · top' },
    { src: `${P}/ignis/v2-3d-side.jpg`, caption: c('ignis.side3d'), label: '3D · angled' },
    { src: `${P}/ignis/v2-3d-bottom.jpg`, caption: c('ignis.bottom3d'), label: '3D · bottom' },
    { src: `${P}/ignis/v2-layer-top.jpg`, caption: c('ignis.layerTop'), label: 'Top copper' },
    { src: `${P}/ignis/v2-layer-gnd.jpg`, caption: c('ignis.layerGnd'), label: 'GND plane' },
    { src: `${P}/ignis/v2-layer-pwr.jpg`, caption: c('ignis.layerPwr'), label: 'PWR plane' },
    { src: `${P}/ignis/v2-layer-bottom.jpg`, caption: c('ignis.layerBottom'), label: 'Bottom copper' },
    { src: `${P}/ignis/v2-schematic.jpg`, caption: c('ignis.schematic'), label: 'Schematic' },
  ]
  const flightPhotos = [
    { video: `${P}/lasc/ignition-launch.mp4`, poster: `${P}/lasc/ignition-launch-poster.jpg`, caption: c('lasc.ignition') },
    { src: `${P}/lasc/avionics-bay.jpg`, caption: c('lasc.avionicsBay') },
    { src: `${P}/lasc/ignis1-on-rail.jpg`, caption: c('lasc.onRail') },
    { video: `${P}/lasc/remove-before-flight.mp4`, poster: `${P}/lasc/remove-before-flight-poster.jpg`, caption: c('lasc.rbf') },
    { video: `${P}/lasc/ignis1-rail.mp4`, poster: `${P}/lasc/ignis1-rail-poster.jpg`, caption: c('lasc.railVideo') },
    { src: `${P}/lasc/launch-control.jpg`, caption: c('lasc.launchControl') },
    { src: `${P}/lasc/recovery.jpg`, caption: c('lasc.recovery') },
  ]

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--divider)' }}>
        <div style={wrap}>
          <Link to="/" className="back-link">{t('ignis.hero.back')}</Link>

          <div className="ignis-hero-grid">
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <Tag amber>IGNIS</Tag>
                <Tag amber>LASC 2026</Tag>
                <Tag>Avionics</Tag>
                <Tag>Open source</Tag>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 12 }}>
                {t('ignis.hero.title')}
              </h1>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28 }}>{t('ignis.hero.subtitle')}</div>
              <p style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.7, maxWidth: '58ch', marginBottom: 32 }}>
                {t('ignis.hero.intro')}
              </p>

              <div className="ignis-meta" style={{ marginBottom: 32 }}>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 3 }}>{t('ignis.hero.roleLabel')}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '60ch' }}>{t('ignis.hero.role')}</div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', paddingTop: 3 }}>{t('ignis.hero.partnerLabel')}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t('ignis.hero.partner')}</div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--amber-border)', background: 'var(--amber-bg)', padding: '8px 14px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }} />
                <span style={{ ...mono, fontSize: 11, color: 'var(--amber)', letterSpacing: '0.04em' }}>{t('ignis.hero.status')}</span>
              </div>
            </div>

            <Gallery items={boardPhotos} columns={1} aspect="16 / 10" />
          </div>
        </div>
      </section>

      {/* ── REVISIONS ── */}
      <section style={section}>
        <div style={wrap}>
          <SectionLabel>{t('ignis.revisions.title')}</SectionLabel>
          <ol className="rev-track" style={{ listStyle: 'none' }}>
            {revisions.map((r) => {
              const anchor = revAnchor[r.rev]
              return (
                <li key={r.rev} className={`rev-cell${anchor ? ' is-main' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                    <span style={{ ...mono, fontSize: 20, fontWeight: 600, color: anchor ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{r.rev}</span>
                    {r.rev === 'v2.2' && <Tag amber>LASC 2026</Tag>}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{r.text}</p>
                  {anchor && (
                    <a href={`#${anchor}`} className="text-link" style={{ marginTop: 12 }}>{t('ignis.revisions.jump')} ↓</a>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ── v2 / v2.2 ── */}
      <section id="v2" style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignis.v2.title')}</h2>
          <p style={{ ...lead, marginBottom: 16 }}>{t('ignis.v2.lead')}</p>
          <p style={lead}>{t('ignis.v2.buildLead')}</p>

          <div style={{ marginBottom: 64 }}>
            <Gallery items={buildPhotos} variant="carousel" />
          </div>

          <div className="split-2" style={{ marginBottom: 64 }}>
            <MobileCollapse summary={t('ignis.v2.hardware')} summaryStyle={h3}>
              <HardwareTable rows={v2Hardware} />
            </MobileCollapse>
            <div>
              <h3 style={h3}>{t('ignis.v2.changesTitle')}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {changes.map((ch, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    <span aria-hidden="true" style={{ ...mono, color: 'var(--text-muted)' }}>→</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
                {t('ignis.v2.changesNote')}
              </p>
            </div>
          </div>

          <h3 style={h3}>{t('ignis.v2.designTitle')}</h3>
          <Gallery items={designFiles} variant="carousel" stageAspect="16 / 8" mobileAspect="16 / 9" />
        </div>
      </section>

      {/* ── FLIGHT AT LASC ── */}
      <section id="flight" style={section}>
        <div style={wrap}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><Tag amber>LASC 2026</Tag></div>
          <h2 style={h2}>{t('ignis.flight.title')}</h2>
          <p style={lead}>{t('ignis.flight.lead')}</p>

          <div className="big-stats" style={{ marginBottom: 48 }}>
            {[
              { value: '188 ms', label: t('ignis.flight.latency') },
              { value: '40.2%', label: t('ignis.flight.loss') },
            ].map((s) => (
              <div key={s.value} style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '28px 24px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ ...mono, fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '40ch' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <Gallery items={flightPhotos} variant="carousel" />
        </div>
      </section>

      {/* ── FAILURE ANALYSIS ── */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignis.failures.title')}</h2>
          <p style={lead}>{t('ignis.failures.lead')}</p>
          <div className="failure-grid">
            {failures.map((f) => (
              <article key={f.title} style={{ border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-sm)' }}>
                <MobileCollapse
                  className="failure-collapse"
                  summary={f.title}
                  summaryStyle={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', padding: '18px 20px' }}
                >
                <dl style={{ padding: '4px 20px 18px', borderTop: '1px solid var(--border)' }}>
                  {[
                    [t('ignis.failures.symptom'), f.symptom],
                    [t('ignis.failures.cause'), f.cause],
                    [t('ignis.failures.fix'), f.fix],
                  ].map(([k, v]) => (
                    <div key={k} style={{ paddingTop: 14 }}>
                      <dt style={{ ...mono, fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 4 }}>{k}</dt>
                      <dd style={{ fontSize: 14, color: k === t('ignis.failures.fix') ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.6 }}>{v}</dd>
                    </div>
                  ))}
                </dl>
                </MobileCollapse>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── v5 ── */}
      <section id="v5" style={section}>
        <div style={wrap}>
          <h2 style={h2}>{t('ignis.v5.title')}</h2>
          <p style={lead}>{t('ignis.v5.lead')}</p>

          <div className="v5-stats" style={{ marginBottom: 48 }}>
            {v5Stats.map((s) => (
              <div key={s.value}>
                <div style={{ ...mono, fontSize: 28, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="split-2">
            <MobileCollapse summary={t('ignis.v5.hardware')} summaryStyle={h3}>
              <HardwareTable rows={v5Hardware} />
            </MobileCollapse>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 36 }}>
              {v5Points.map((p, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  <span aria-hidden="true" style={{ ...mono, color: 'var(--text-muted)' }}>→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PLATFORM + FIRMWARE ── */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={{ ...h2, marginBottom: 40 }}>{t('ignis.platform.title')}</h2>
          <div className="split-2" style={{ marginBottom: 64 }}>
            {[
              [t('ignis.platform.hardwareTitle'), platformHw],
              [t('ignis.platform.firmwareTitle'), firmware],
            ].map(([title, items]) => (
              <div key={title}>
                <h3 style={h3}>{title}</h3>
                <ul style={{ listStyle: 'none', borderTop: '1px solid var(--border)' }}>
                  {items.map((it, i) => (
                    <li key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, padding: '12px 0', borderBottom: '1px solid var(--divider)' }}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 style={h3}>{t('ignis.decisions.title')}</h3>
          <div style={{ border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-sm)' }}>
            <div className="decisions-row" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', borderBottom: '1px solid var(--border)' }}>
              {decisionHeaders.map((h, i) => (
                <div key={h} style={{ padding: '10px 20px', ...mono, fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-secondary)', borderLeft: i ? '1px solid var(--border)' : 'none' }}>{h}</div>
              ))}
            </div>
            {designDecisions.map((row, i) => (
              <div key={row.decision} className="decisions-row" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', borderBottom: i < designDecisions.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div style={{ padding: '14px 20px', ...mono, fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>{row.decision}</div>
                <div style={{ padding: '14px 20px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, borderLeft: '1px solid var(--border)' }}>{row.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLIER REVISIONS ── */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={{ ...h2, fontSize: 'clamp(22px, 2.6vw, 26px)' }}>{t('ignis.revisions.earlier')}</h2>
          <p style={lead}>{t('ignis.revisions.earlierLead')}</p>
          <div style={{ maxWidth: 720 }}>
            <Gallery items={earlierRevs} columns={2} />
          </div>
        </div>
      </section>

      {/* ── SOURCE FILES ── */}
      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <SectionLabel>{t('ignis.docs.title')}</SectionLabel>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <ExternalLink href="https://github.com/IgnitiaRocketLab/IGNIS-v2-FlightComputer"><GitHubIcon /> {t('ignis.docs.v2')} ↗</ExternalLink>
            <ExternalLink href="https://github.com/Emilio-Guadarrama/IGNIS-v5-FlightComputer"><GitHubIcon /> {t('ignis.docs.v5')} ↗</ExternalLink>
            <ExternalLink href="https://www.lasc.space/">{t('ignis.docs.lasc')} ↗</ExternalLink>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Altium Designer', 'ESP32-S3', 'RFM95W LoRa', 'u-blox GNSS', 'C/C++', 'Python', 'JLCPCB / LCSC'].map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
