import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  {
    key: 'lasc26-rocket',
    source: 'LASC 2026',
    category: 'Competition',
    highlight: '9th',
    highlightLabel: 'of 25 teams',
    title: 'Rocket Challenge — 1 km category',
    detail: 'Placed 9th of 25 in the 1 km category at the Latin American Space Challenge 2026 in Brazil, flying IGNIS v2.2.',
    amber: true,
  },
  {
    key: 'lasc26-cansat',
    source: 'LASC 2026',
    category: 'Competition',
    highlight: '9th',
    highlightLabel: 'of 50 teams',
    title: 'Satellite Challenge — CanSat Mission Leader',
    detail: 'Placed 9th of 50 in the CanSat category at the Latin American Space Challenge 2026 in Brazil with an IGNIS-derived CanSat.',
    amber: true,
  },
  {
    key: 'frc24',
    source: 'FIRST Robotics',
    category: 'Competition',
    highlight: 'WC',
    highlightLabel: 'Qualifier',
    title: 'World Championship Houston 2024',
    detail: 'Qualified for FIRST World Championship in Houston, TX by winning the Hermosillo Regional — Team Daedalus.',
    amber: false,
  },
  {
    key: 'enmice25-2nd',
    source: 'ENMICE 2025',
    category: 'Competition',
    highlight: '2nd',
    highlightLabel: 'Place',
    title: 'Project Presentation — WIRIKUTA 1.1',
    detail: 'Test bench for experimental rocketry. Awarded 2nd place in project presentation at ENMICE 2025.',
    amber: true,
  },
  {
    key: 'enmice25-conduct',
    source: 'ENMICE 2025',
    category: 'Award',
    highlight: '★',
    highlightLabel: 'Honorary',
    title: 'Honorary Recognition for Team Conduct',
    detail: 'Recognition for team behavior and sportsmanship at ENMICE 2025.',
    amber: true,
  },
  {
    key: 'expo25',
    source: 'Tec de Monterrey',
    category: 'Competition',
    highlight: '1st',
    highlightLabel: 'Place',
    title: 'Engineering Expo — Physical Prototype',
    detail: '1st place in the Physical Prototype category at the Engineering Expo 2025 — Ignitia Rocket Lab.',
    amber: true,
  },
  {
    key: 'toefl',
    source: 'ETS',
    category: 'Certification',
    highlight: '99',
    highlightLabel: 'TOEFL iBT',
    title: 'C1 CEFR — Academic English',
    detail: 'Score 99 out of 120. C1 CEFR level. Tested April 2025.',
    amber: false,
  },
  {
    key: 'robotics-course',
    source: 'UNAM-affiliated',
    category: 'Certification',
    highlight: '10',
    highlightLabel: 'Final grade',
    title: 'Advanced Robotics Course',
    detail: 'Asociación de Robótica Aplicada y Ciencias de la Tecnología · 45 hours · July 2024.',
    amber: false,
  },
  {
    key: 'bicultural',
    source: 'Tec de Monterrey',
    category: 'Academic',
    highlight: '96',
    highlightLabel: 'GPA / 100',
    title: 'Honorable Mention — Bicultural HS',
    detail: 'GPA 96/100. Honorable mention awarded at graduation from Bicultural High School — May 2025.',
    amber: false,
  },
]

// Duplicate for seamless infinite loop
const TRACK = [...ITEMS, ...ITEMS]

const SPEED = 40 // px per second auto-scroll

function normalizeX(val, halfWidth) {
  if (halfWidth === 0) return val
  let n = val % halfWidth
  if (n > 0) n -= halfWidth
  return n
}

export default function AwardsCarousel() {
  const [active,    setActive]    = useState(null)
  const trackRef    = useRef(null)
  const containerRef = useRef(null)
  const xRef        = useRef(0)
  const halfWidth   = useRef(0)
  const isDragging  = useRef(false)
  const dragMoved   = useRef(false)
  const dragStartX  = useRef(0)
  const dragStartVal = useRef(0)
  const lastTime    = useRef(null)
  const rafId       = useRef(null)

  // Measure actual half-width after mount
  useEffect(() => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2
    }
  }, [])

  // RAF auto-scroll
  useEffect(() => {
    const tick = (t) => {
      if (!isDragging.current) {
        if (lastTime.current !== null && halfWidth.current > 0) {
          const dt = t - lastTime.current
          xRef.current -= SPEED * dt / 1000
          if (xRef.current < -halfWidth.current) xRef.current += halfWidth.current
        }
        lastTime.current = t
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${xRef.current}px)`
        }
      } else {
        lastTime.current = null
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    isDragging.current = true
    dragMoved.current  = false
    dragStartX.current  = e.clientX
    dragStartVal.current = xRef.current
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
  }

  const onPointerMove = (e) => {
    if (!isDragging.current) return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 4) dragMoved.current = true
    const next = normalizeX(dragStartVal.current + delta, halfWidth.current)
    xRef.current = next
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${next}px)`
    }
  }

  const onPointerUp = () => {
    isDragging.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  const toggle = (key) => {
    if (dragMoved.current) return
    setActive(prev => prev === key ? null : key)
  }

  return (
    <section
      style={{
        padding: '96px 0',
        borderBottom: '1px solid #1a1a1a',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Reveal y={10} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', marginBottom: 48 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#8a8a8a',
        }}>
          // Certifications &amp; Awards
        </div>
      </Reveal>

      {/* Draggable scrolling track */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        // pan-y: horizontal swipes drive the carousel on touch screens, vertical ones still scroll the page
        style={{ position: 'relative', cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 8,
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {TRACK.map((item, i) => (
            <Card
              key={`${item.key}-${i}`}
              item={item}
              isActive={active === `${item.key}-${i}`}
              onToggle={() => toggle(`${item.key}-${i}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Single card ───────────────────────────────────────────────────── */
function Card({ item, isActive, onToggle }) {
  const accentColor  = item.amber ? '#b89060' : '#d8d8d8'
  const borderColor  = isActive
    ? (item.amber ? '#b89060' : '#2a2a2a')
    : '#242424'
  const bgColor      = isActive
    ? (item.amber ? '#120e06' : '#141414')
    : '#111111'

  return (
    <div
      onClick={onToggle}
      style={{
        width:        210,
        flexShrink:   0,
        background:   bgColor,
        border:       `1px solid ${borderColor}`,
        padding:      '20px',
        cursor:       'pointer',
        transition:   'border-color 0.15s ease, background 0.15s ease',
        userSelect:   'none',
        display:      'flex',
        flexDirection:'column',
        borderRadius: 'var(--radius-sm)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.borderColor = '#2a2a2a'
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.borderColor = '#242424'
      }}
    >
      {/* Top row: source + category badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 18,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8a8a8a', lineHeight: 1.4,
          maxWidth: 120,
        }}>
          {item.source}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: '0.06em',
          color: item.amber ? '#b89060' : '#8a8a8a',
          border: `1px solid ${item.amber ? '#28200e' : '#242424'}`,
          background: item.amber ? '#120e06' : 'transparent',
          padding: '1px 5px',
          flexShrink: 0,
          borderRadius: 2,
        }}>
          {item.category}
        </span>
      </div>

      {/* Big highlight number / label */}
      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 32, fontWeight: 700, lineHeight: 1,
          letterSpacing: '-0.02em',
          color: accentColor,
        }}>
          {item.highlight}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, color: '#8a8a8a',
          marginTop: 4, letterSpacing: '0.04em',
        }}>
          {item.highlightLabel}
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontSize: 12, fontWeight: 500,
        color: '#c8c8c8', lineHeight: 1.45,
        flex: 1,
      }}>
        {item.title}
      </div>

      {/* Expanded detail — slides open */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingTop: 12,
              marginTop: 12,
              borderTop: `1px solid ${item.amber ? '#28200e' : '#242424'}`,
              fontSize: 11,
              color: '#c8c8c8',
              lineHeight: 1.6,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {item.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Inline Reveal shim (avoids circular import) ─────────────────── */
function Reveal({ children, y = 20, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}
