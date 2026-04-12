import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Boot sequence lines ──────────────────────────────────────────────
   Each entry: { text, suffix, color, sufColor, delay (ms) }
   suffix = the status token at the end of a line (e.g. "OK")
   Delays are cumulative times from mount.
──────────────────────────────────────────────────────────────────── */
const LINES = [
  { text: 'FC-2026 FLIGHT COMPUTER',           suffix: null,   color: '#f0f0f0', sufColor: null,     delay: 80  },
  { text: 'IGNITIA ROCKET LAB · LASC 2026',    suffix: null,   color: '#b89060', sufColor: null,     delay: 220 },
  { text: '─'.repeat(46),                       suffix: null,   color: '#1e1e1e', sufColor: null,     delay: 380 },
  { text: 'BOOT SEQUENCE v1.0.0',               suffix: null,   color: '#424242', sufColor: null,     delay: 520 },
  { text: 'INITIALIZING AVIONICS STACK',        suffix: null,   color: '#424242', sufColor: null,     delay: 700 },
  { text: '  ESP32-S3-WROOM-1-N8R8         ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 900  },
  { text: '  MPU6050 — IMU 6-DOF           ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1060 },
  { text: '  BMP180 — BAROMETER            ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1200 },
  { text: '  SHT40 — TEMP/HUMIDITY         ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1330 },
  { text: '  RFM95W — LoRa 915MHz          ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1460 },
  { text: '  PA1616S — GPS NMEA 9600bd     ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1590 },
  { text: '  MSD-11-A — MicroSD SPI        ',  suffix: 'OK',   color: '#c8c8c8', sufColor: '#b89060', delay: 1710 },
  { text: '  PYRO CH1 / CH2 — IRLML2502   ',  suffix: 'SAFE', color: '#c8c8c8', sufColor: '#b89060', delay: 1850 },
  { text: '─'.repeat(46),                       suffix: null,   color: '#1e1e1e', sufColor: null,     delay: 2020 },
  { text: 'ALL SYSTEMS NOMINAL',                suffix: null,   color: '#f0f0f0', sufColor: null,     delay: 2180 },
  { text: 'FLIGHT COMPUTER READY',              suffix: null,   color: '#b89060', sufColor: null,     delay: 2340 },
]

const TOTAL_MS    = 2340  // last line delay
const AUTO_EXIT   = TOTAL_MS + 900   // dismiss this many ms after mount

export default function BootScreen({ onDone }) {
  const [visible, setVisible]       = useState([])   // indices of rendered lines
  const [exiting, setExiting]       = useState(false)
  const [progress, setProgress]     = useState(0)    // 0-100

  /* Show lines at scheduled times */
  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  /* Animate progress bar in sync with content */
  useEffect(() => {
    const start = performance.now()
    let raf
    const tick = (now) => {
      const elapsed = now - start
      setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100))
      if (elapsed < TOTAL_MS) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* Auto-dismiss */
  useEffect(() => {
    const t = setTimeout(dismiss, AUTO_EXIT)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    if (exiting) return
    setExiting(true)
    setTimeout(onDone, 600)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: '#070707',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* Terminal window */}
          <div style={{
            width: '100%', maxWidth: 560, padding: '0 24px',
          }}>
            {/* Lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={visible.includes(i) ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    lineHeight: 1.65,
                    letterSpacing: '0.02em',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 8,
                    whiteSpace: 'pre',
                  }}
                >
                  <span style={{ color: line.color }}>{line.text}</span>
                  {line.suffix && (
                    <span style={{
                      color: line.sufColor,
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      border: `1px solid #28200e`,
                      background: '#120e06',
                      padding: '1px 7px',
                      flexShrink: 0,
                    }}>
                      {line.suffix}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: 32,
              height: 1,
              background: '#1a1a1a',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${progress}%`,
                background: '#b89060',
                transition: 'width 60ms linear',
              }} />
            </div>

            {/* Skip hint */}
            <div style={{
              marginTop: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: '#242424', letterSpacing: '0.08em',
              }}>
                {Math.round(progress)}%
              </span>
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: '#424242', letterSpacing: '0.08em',
                }}
              >
                CLICK TO SKIP
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
