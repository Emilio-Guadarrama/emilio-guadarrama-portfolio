import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Tag({ children, amber }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
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

const pcbImages = [
  { src: '/brand_assets/photos/fc2026/pcb_3d_top.png',    label: '3D — Top View' },
  { src: '/brand_assets/photos/fc2026/pcb_3d_angle.png',  label: '3D — Angled View' },
  { src: '/brand_assets/photos/fc2026/pcb_3d_bottom.png', label: '3D — Bottom View' },
  { src: '/brand_assets/photos/fc2026/pcb_layout.png',    label: 'PCB Layout — Altium 2D' },
]

const designDecisions = [
  {
    decision: 'ESP32-S3 as MCU',
    reason: 'Native USB 1.1 OTG (no CH340C), dual-core LX7 240MHz, 8MB Octal PSRAM for flight logging',
  },
  {
    decision: 'Dual AMS1117 instead of XL4005 buck',
    reason: 'XL4005 not available in Mexico; thermal analysis: 0.95W on 5V stage, 0.68W on 3.3V — acceptable for short flight duration',
  },
  {
    decision: 'LoRa 915MHz',
    reason: 'Long range, low power, license-free band in Latin America',
  },
  {
    decision: 'Rectangular PCB',
    reason: 'Changed from circular — better component placement, easier manufacturing',
  },
  {
    decision: 'I2C pull-ups on MCU sheet only',
    reason: 'Prevents conflicts in hierarchical Altium schematic',
  },
]

const subsystems = [
  {
    name: 'Power System',
    items: [
      { label: 'Battery', value: '2S3P LiPo — 7.4V nominal / 8.4V max / 6.0V cutoff / 6,600mAh' },
      { label: 'Connector', value: 'XT30 or JST-PH' },
      { label: 'Stage 1', value: 'AMS1117-5.0 LDO (SOT-223) — VBAT → VCC_5V' },
      { label: 'Stage 2', value: 'AMS1117-3.3 LDO (SOT-223) — VCC_5V → VCC_3V3' },
      { label: 'Battery monitor', value: '100kΩ / 47kΩ voltage divider → IO3 (ADC) — max 2.69V at 8.4V' },
      { label: 'Pyro rail', value: 'Direct VBAT via arm switch (hardware disconnect)' },
    ],
  },
  {
    name: 'Sensors — I2C Bus (IO21 SDA / IO38 SCL)',
    items: [
      { label: 'Pull-ups', value: '4.7kΩ on SCL and SDA — on MCU sheet only' },
      { label: 'MPU6050', value: '6-DOF IMU · 0x68 · AD0 pull-down 10kΩ · INT → IO46' },
      { label: 'BMP180', value: 'Barometer · 0x77 · near pressure vent' },
      { label: 'SHT40-AD1B-R2', value: 'Temp & Humidity · 0x44 · 100nF decoupling' },
    ],
  },
  {
    name: 'Telemetry',
    items: [
      { label: 'Module', value: 'RFM95W-915S2 — LoRa 915MHz' },
      { label: 'Interface', value: 'SPI (shared bus with SD)' },
      { label: 'CS / INT / RST', value: 'IO10 / IO7 (DIO0) / IO8' },
      { label: 'Antenna', value: 'SMA connector (BWSMA-KE-Z001) — 50Ω impedance' },
    ],
  },
  {
    name: 'Recovery (Pyro — Aristoteles Prieto)',
    items: [
      { label: 'CH1 — Drogue', value: 'Fires at apogee — gate IO4 — continuity IO1' },
      { label: 'CH2 — Main', value: 'Fires at ~300m AGL — gate IO5 — continuity IO2' },
      { label: 'MOSFET', value: 'IRLML2502 (SOT-23) — 100Ω gate resistor' },
      { label: 'Protection', value: '10kΩ pull-up + BZX84C3V3 Zener — 470µF/16V pyro cap' },
      { label: 'Arm switch', value: 'IO47 — hardware disconnect in series with VBAT → pyro rail' },
    ],
  },
  {
    name: 'Navigation & Logging',
    items: [
      { label: 'GPS', value: 'PA1616S — UART 9600 baud — NMEA — IO17 TX / IO18 RX' },
      { label: 'MicroSD', value: 'MSD-11-A — SPI — CS: IO9 — Detect: IO42' },
      { label: 'SD pull-ups', value: '10kΩ on MOSI/MISO/CLK' },
    ],
  },
  {
    name: 'Redundancy',
    items: [
      { label: 'RRC3 Altimeter', value: 'Missile Works COTS — MS5607 pressure sensor' },
      { label: 'Operation', value: 'Fully independent from FC-2026' },
      { label: 'Capacity', value: 'Up to 15 flights at 20Hz altitude/velocity' },
    ],
  },
]

const statusSteps = [
  { label: 'Schematic Design', done: true },
  { label: 'PCB Layout', done: false },
  { label: 'Gerber Review', done: false },
  { label: 'Manufacturing', done: false },
  { label: 'Assembly & Testing', done: false },
  { label: 'LASC 2026 — September 2026 · Iacanga, São Paulo, Brazil', done: false },
]

export default function FC2026() {
  const { t } = useTranslation()
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO BANNER ── */}
      <section
        style={{
          borderBottom: '1px solid #1a1a1a',
          padding: '64px 0 48px',
        }}
      >
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
            {t('fc2026.hero.back')}
          </Link>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <Tag amber>LASC 2026</Tag>
            <Tag amber>FC-2026</Tag>
            <Tag amber>Avionics</Tag>
            <Tag>Ignitia Rocket Lab</Tag>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: '#f0f0f0',
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}
          >
            {t('fc2026.hero.title')}
          </h1>
          <div style={{ fontSize: 15, color: '#424242', marginBottom: 24 }}>
            {t('fc2026.hero.subtitle')}
          </div>

          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid #242424',
              padding: '8px 16px',
              background: '#111111',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#b89060',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#b89060',
                letterSpacing: '0.06em',
              }}
            >
              {t('fc2026.hero.status')}
            </span>
          </div>
        </div>
      </section>

      {/* ── PCB GALLERY ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.gallery')}</SectionLabel>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px',
              gap: 8,
              alignItems: 'start',
            }}
            className="gallery-grid"
          >
            {/* Main image */}
            <div
              style={{
                border: '1px solid #242424',
                overflow: 'hidden',
                background: '#111111',
                aspectRatio: '16/9',
              }}
            >
              <img
                src={pcbImages[activeImg].src}
                alt={pcbImages[activeImg].label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pcbImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    border: `1px solid ${activeImg === i ? '#b89060' : '#242424'}`,
                    background: activeImg === i ? '#120e06' : '#111111',
                    padding: 0,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'border-color 0.15s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (activeImg !== i) e.currentTarget.style.borderColor = '#2a2a2a'
                  }}
                  onMouseLeave={(e) => {
                    if (activeImg !== i) e.currentTarget.style.borderColor = '#242424'
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: '100%',
                      height: 60,
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      padding: '6px 8px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: activeImg === i ? '#b89060' : '#424242',
                      borderTop: `1px solid ${activeImg === i ? '#28200e' : '#242424'}`,
                      lineHeight: 1.3,
                    }}
                  >
                    {img.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Image label */}
          <div
            style={{
              marginTop: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#424242',
            }}
          >
            {pcbImages[activeImg].label}
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.overview.title')}</SectionLabel>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
            className="overview-grid"
          >
            {[
              { k: 'What', v: t('fc2026.overview.what') },
              { k: 'Role', v: t('fc2026.overview.role') },
              { k: 'Co-designer', v: t('fc2026.overview.partner') },
              { k: 'PCB Manufacturer', v: t('fc2026.overview.manufacturer') },
              { k: 'Reflow System', v: t('fc2026.overview.reflow') },
              { k: 'Board Form Factor', v: t('fc2026.overview.board') },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  padding: '20px',
                  background: '#111111',
                  marginTop: i > 1 ? -1 : 0,
                  marginLeft: i % 2 === 1 ? -1 : 0,
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 16,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#424242',
                    paddingTop: 2,
                  }}
                >
                  {row.k}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .overview-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── SYSTEM ARCHITECTURE ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.architecture')}</SectionLabel>
          <div
            style={{
              border: '1px solid #242424',
              background: '#111111',
              padding: '24px 28px',
              overflowX: 'auto',
            }}
          >
            <pre
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#c8c8c8',
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
{`Battery (2S3P LiPo — 7.4V nominal / 8.4V max / 6,600mAh)
  └─► Power System (Dual AMS1117 series)
        ├─► VCC_5V ──► WS2812B RGB LEDs (×3) · Buzzer CMI-1275C
        └─► VCC_3V3 ──► MCU (ESP32-S3-WROOM-1-N8R8)
                          ├─► Sensors (I2C)
                          │     ├─ MPU6050 — IMU 6-DOF — 0x68
                          │     ├─ BMP180 — Barometer — 0x77
                          │     └─ SHT40-AD1B-R2 — Temp/Humidity — 0x44
                          ├─► Telemetry (SPI)
                          │     └─ RFM95W-915S2 — LoRa 915MHz — SMA antenna
                          ├─► Navigation (UART)
                          │     └─ PA1616S GPS — 9600 baud — NMEA
                          ├─► Storage (SPI)
                          │     └─ MicroSD (MSD-11-A)
                          ├─► Recovery (Pyro)
                          │     ├─ CH1 — Drogue — IRLML2502 MOSFET — fires at apogee
                          │     └─ CH2 — Main — IRLML2502 MOSFET — fires at ~300m AGL
                          ├─► Indicators
                          │     ├─ WS2812B RGB LEDs (IO6)
                          │     └─ Buzzer (IO14 PWM)
                          └─► Interface
                                └─ USB-C (native USB 1.1 OTG — IO19/IO20)

Redundancy (independent):
  └─► RRC3 Altimeter (Missile Works COTS) — MS5607 — up to 15 flights at 20Hz`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── SUBSYSTEMS ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.subsystems')}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {subsystems.map((sub, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #242424',
                  background: '#111111',
                  marginTop: i > 0 ? -1 : 0,
                }}
              >
                <div
                  style={{
                    borderBottom: '1px solid #242424',
                    padding: '12px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#f0f0f0',
                    letterSpacing: '0.06em',
                  }}
                >
                  {sub.name}
                </div>
                <div>
                  {sub.items.map((row, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '200px 1fr',
                        borderBottom: j < sub.items.length - 1 ? '1px solid #1a1a1a' : 'none',
                        padding: '10px 20px',
                        gap: 16,
                      }}
                      className="subsys-row"
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: '#424242',
                        }}
                      >
                        {row.label}
                      </div>
                      <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.5 }}>
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .subsys-row { grid-template-columns: 1fr !important; gap: 4px !important; }
          }
        `}</style>
      </section>

      {/* ── KEY DESIGN DECISIONS ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.decisions.title')}</SectionLabel>
          <div
            style={{
              border: '1px solid #242424',
              background: '#111111',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                borderBottom: '1px solid #242424',
              }}
              className="decisions-row"
            >
              {[t('fc2026.decisions.headers[0]') || 'Decision', t('fc2026.decisions.headers[1]') || 'Reason'].map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#424242',
                    borderLeft: i > 0 ? '1px solid #242424' : 'none',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {designDecisions.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '280px 1fr',
                  borderBottom: i < designDecisions.length - 1 ? '1px solid #1a1a1a' : 'none',
                }}
                className="decisions-row"
              >
                <div
                  style={{
                    padding: '14px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#f0f0f0',
                    lineHeight: 1.5,
                  }}
                >
                  {row.decision}
                </div>
                <div
                  style={{
                    padding: '14px 20px',
                    fontSize: 13,
                    color: '#c8c8c8',
                    lineHeight: 1.6,
                    borderLeft: '1px solid #242424',
                  }}
                >
                  {row.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .decisions-row { grid-template-columns: 1fr !important; }
            .decisions-row > div:last-child { border-left: none !important; border-top: 1px solid #1a1a1a; }
          }
        `}</style>
      </section>

      {/* ── DEVELOPMENT STATUS ── */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.status.title')}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {statusSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: i < statusSteps.length - 1 ? '1px solid #1a1a1a' : 'none',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: `1px solid ${step.done ? '#b89060' : '#242424'}`,
                    background: step.done ? '#120e06' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {step.done && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L4 7L9 1" stroke="#b89060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: step.done ? '#b89060' : i === 1 ? '#c8c8c8' : '#424242',
                  }}
                >
                  {step.label}
                  {step.done && (
                    <span
                      style={{
                        marginLeft: 12,
                        fontSize: 10,
                        border: '1px solid #28200e',
                        padding: '1px 6px',
                        color: '#b89060',
                        background: '#120e06',
                        letterSpacing: '0.06em',
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('fc2026.docs.title')}</SectionLabel>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: t('fc2026.docs.report'), href: null, disabled: true },
              { label: t('fc2026.docs.github'), href: null, disabled: true },
              {
                label: t('fc2026.docs.lasc'),
                href: 'https://latinamericanspacechallenge.com',
                disabled: false,
              },
            ].map((doc, i) => (
              doc.disabled ? (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1px solid #242424',
                    padding: '10px 20px',
                    fontSize: 13,
                    color: '#424242',
                    cursor: 'not-allowed',
                  }}
                >
                  {doc.label}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#424242',
                      letterSpacing: '0.08em',
                    }}
                  >
                    SOON
                  </span>
                </span>
              ) : (
                <a
                  key={i}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #242424',
                    padding: '10px 20px',
                    fontSize: 13,
                    color: '#c8c8c8',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a'
                    e.currentTarget.style.color = '#f0f0f0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#242424'
                    e.currentTarget.style.color = '#c8c8c8'
                  }}
                >
                  {doc.label} ↗
                </a>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
