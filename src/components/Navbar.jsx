import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Radio, Flame, Bot, Droplets, Home, Trophy,
  ChevronDown,
} from 'lucide-react'

/* ── Project links with icons ──────────────────────────────────────── */
const projectLinks = [
  {
    name: 'FC-2026 Flight Computer',
    desc: 'Custom SRAD avionics · ESP32-S3 · LoRa',
    link: '/projects/fc-2026',
    amber: true,
    Icon: Cpu,
  },
  {
    name: 'LASC 2026 Satellite Challenge',
    desc: 'CanSat / PocketQube design · LASC 2026',
    link: '/projects/satellite',
    amber: true,
    Icon: Radio,
  },
  {
    name: 'Ignitia Rocket Lab',
    desc: 'Student rocketry · Tec de Monterrey',
    link: '/projects/ignitia',
    amber: true,
    Icon: Flame,
  },
  {
    name: 'FIRST Robotics — Team Daedalus',
    desc: 'Won Regional Hermosillo · Houston WC 2024',
    link: '/projects/frc',
    amber: false,
    Icon: Bot,
  },
  {
    name: 'Water Growth Solutions',
    desc: 'Smart irrigation · Arduino · React IoT',
    link: '/projects/wgs',
    amber: false,
    Icon: Droplets,
  },
]

/* ── Volunteering links ────────────────────────────────────────────── */
const volunteeringLinks = [
  {
    name: 'TECHO México',
    desc: 'Emergency housing · Crew Leader · Jalisco',
    link: '/volunteering/techo',
    amber: false,
    Icon: Home,
  },
  {
    name: 'FIFA World Cup 2026™',
    desc: 'Volunteer · Estadio Akron · Guadalajara',
    link: '/volunteering/fifa-wc',
    amber: false,
    Icon: Trophy,
  },
]

/* ── Scroll detection ──────────────────────────────────────────────── */
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/* ── Animated hamburger ────────────────────────────────────────────── */
function MenuToggleIcon({ open, duration = 300 }) {
  const d = `${duration}ms`
  return (
    <svg
      width="20" height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: `transform ${d} ease`,
        transform: open ? 'rotate(-45deg)' : 'rotate(0deg)',
      }}
    >
      <path
        style={{
          transition: `stroke-dasharray ${d} ease, stroke-dashoffset ${d} ease`,
          strokeDasharray: open ? '20 300' : '12 63',
          strokeDashoffset: open ? '-32.42px' : '0',
        }}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  )
}

/* ── Project card (dropdown & mobile) ─────────────────────────────── */
function ProjectCard({ proj, onClick }) {
  const [hovered, setHovered] = useState(false)
  const accent = proj.amber ? '#b89060' : '#d8d8d8'
  const iconBg  = proj.amber ? '#120e06' : '#111111'
  const iconBorder = proj.amber ? '#28200e' : '#242424'

  return (
    <Link
      to={proj.link}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 14px',
        textDecoration: 'none',
        background: hovered ? '#141414' : 'transparent',
        transition: 'background 0.12s ease',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 38, height: 38, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: iconBg,
        border: `1px solid ${iconBorder}`,
        marginTop: 1,
      }}>
        <proj.Icon size={17} color={accent} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontSize: 13, fontWeight: 500, lineHeight: 1.4,
          color: proj.amber ? '#b89060' : '#d8d8d8',
          marginBottom: 3,
        }}>
          {proj.name}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, color: '#424242', lineHeight: 1.5,
        }}>
          {proj.desc}
        </div>
      </div>
    </Link>
  )
}

/* ── Portal mobile menu ────────────────────────────────────────────── */
function MobileMenu({ open, children }) {
  if (typeof window === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 60, left: 0, right: 0, bottom: 0,
            zIndex: 99,
            background: '#070707',
            borderTop: '1px solid #242424',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ── Main Navbar ───────────────────────────────────────────────────── */
export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location     = useLocation()
  const navigate     = useNavigate()
  const scrolled     = useScrolled(10)
  const [menuOpen,           setMenuOpen]           = useState(false)
  const [dropOpen,           setDropOpen]           = useState(false)
  const [volDropOpen,        setVolDropOpen]        = useState(false)
  const [cvDropOpen,         setCvDropOpen]         = useState(false)
  const [mobileProjects,     setMobileProjects]     = useState(false)
  const [mobileVolunteering, setMobileVolunteering] = useState(false)
  const dropTimer    = useRef(null)
  const volDropTimer = useRef(null)
  const cvDropTimer  = useRef(null)

  const isHome = location.pathname === '/'

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
    setVolDropOpen(false)
    setMobileProjects(false)
    setMobileVolunteering(false)
  }, [location.pathname])

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')

  const handleNavClick = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#' + sectionId)
    }
    setMenuOpen(false)
  }

  const openDrop     = () => { clearTimeout(dropTimer.current);    setDropOpen(true) }
  const closeDrop    = () => { dropTimer.current    = setTimeout(() => setDropOpen(false), 140) }
  const openVolDrop  = () => { clearTimeout(volDropTimer.current); setVolDropOpen(true) }
  const closeVolDrop = () => { volDropTimer.current = setTimeout(() => setVolDropOpen(false), 140) }
  const openCvDrop   = () => { clearTimeout(cvDropTimer.current);  setCvDropOpen(true) }
  const closeCvDrop  = () => { cvDropTimer.current  = setTimeout(() => setCvDropOpen(false), 140) }

  const simpleLinks = [
    { label: t('nav.about'),      id: 'about'      },
    { label: t('nav.experience'), id: 'experience' },
    { label: t('nav.contact'),    id: 'contact'    },
  ]

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 60,
        borderBottom: `1px solid ${scrolled ? '#242424' : 'transparent'}`,
        background: scrolled ? '#0a0a0a' : 'transparent',
        transition: 'border-color 0.2s ease, background 0.25s ease',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px',
          height: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 32,
        }}>

          {/* ── Logo */}
          <Link to="/" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700, fontSize: 16, color: '#f0f0f0',
            letterSpacing: '0.06em', textDecoration: 'none',
            flexShrink: 0,
          }}>
            EG
          </Link>

          {/* ── Desktop nav */}
          <nav
            className="navbar-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}
          >
            {simpleLinks.map((lnk) => (
              <NavPill key={lnk.id} onClick={() => handleNavClick(lnk.id)}>
                {lnk.label}
              </NavPill>
            ))}

            {/* Projects dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <NavPill
                as="button"
                active={dropOpen}
                trailingIcon={
                  <ChevronDown
                    size={13}
                    style={{
                      transition: 'transform 0.18s ease',
                      transform: dropOpen ? 'rotate(180deg)' : 'none',
                      opacity: 0.5,
                    }}
                  />
                }
                onClick={() => handleNavClick('projects')}
              >
                {t('nav.projects')}
              </NavPill>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 560,
                      background: '#0d0d0d',
                      border: '1px solid #242424',
                      padding: 6,
                      zIndex: 200,
                    }}
                  >
                    {/* Notch */}
                    <div style={{
                      position: 'absolute', top: -5, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8, height: 5, overflow: 'hidden',
                    }}>
                      <div style={{
                        width: 8, height: 8,
                        background: '#0d0d0d',
                        border: '1px solid #242424',
                        transform: 'rotate(45deg)',
                        marginTop: 3,
                      }} />
                    </div>

                    {/* 2-column grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1,
                    }}>
                      {projectLinks.map((proj) => (
                        <ProjectCard
                          key={proj.link}
                          proj={proj}
                          onClick={() => setDropOpen(false)}
                        />
                      ))}
                    </div>

                    {/* Footer hint */}
                    <div style={{
                      marginTop: 8,
                      paddingTop: 8,
                      borderTop: '1px solid #1a1a1a',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: '#2a2a2a',
                      letterSpacing: '0.08em',
                      paddingLeft: 12,
                    }}>
                      // 5 active projects
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Volunteering dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openVolDrop}
              onMouseLeave={closeVolDrop}
            >
              <NavPill
                active={volDropOpen}
                trailingIcon={
                  <ChevronDown
                    size={13}
                    style={{
                      transition: 'transform 0.18s ease',
                      transform: volDropOpen ? 'rotate(180deg)' : 'none',
                      opacity: 0.5,
                    }}
                  />
                }
                onClick={() => {}}
              >
                {t('nav.volunteering')}
              </NavPill>

              <AnimatePresence>
                {volDropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openVolDrop}
                    onMouseLeave={closeVolDrop}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 360,
                      background: '#0d0d0d',
                      border: '1px solid #242424',
                      padding: 6,
                      zIndex: 200,
                    }}
                  >
                    {/* Notch */}
                    <div style={{
                      position: 'absolute', top: -5, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8, height: 5, overflow: 'hidden',
                    }}>
                      <div style={{
                        width: 8, height: 8,
                        background: '#0d0d0d',
                        border: '1px solid #242424',
                        transform: 'rotate(45deg)',
                        marginTop: 3,
                      }} />
                    </div>

                    {/* Single-column list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {volunteeringLinks.map((proj) => (
                        <ProjectCard
                          key={proj.link}
                          proj={proj}
                          onClick={() => setVolDropOpen(false)}
                        />
                      ))}
                    </div>

                    {/* Footer hint */}
                    <div style={{
                      marginTop: 8,
                      paddingTop: 8,
                      borderTop: '1px solid #1a1a1a',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: '#2a2a2a',
                      letterSpacing: '0.08em',
                      paddingLeft: 12,
                    }}>
                      // 2 volunteering programs
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ── Right actions (desktop) */}
          <div
            className="navbar-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
          >
            <button
              onClick={toggleLang}
              style={{
                background: 'none',
                border: '1px solid #242424',
                padding: '5px 10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                color: '#424242', cursor: 'pointer',
                transition: 'border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3a3a3a'; e.currentTarget.style.color = '#c8c8c8' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#424242' }}
            >
              {i18n.language === 'en' ? 'EN' : 'ES'}
            </button>

            {/* CV dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={openCvDrop}
              onMouseLeave={closeCvDrop}
            >
              <button
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  border: '1px solid #d8d8d8',
                  padding: '6px 16px',
                  background: 'none',
                  fontSize: 13, fontWeight: 500, color: cvDropOpen ? '#f0f0f0' : '#d8d8d8',
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                  borderColor: cvDropOpen ? '#f0f0f0' : '#d8d8d8',
                }}
              >
                {t('nav.downloadCV')}
                <ChevronDown
                  size={12}
                  style={{
                    transition: 'transform 0.18s ease',
                    transform: cvDropOpen ? 'rotate(180deg)' : 'none',
                    opacity: 0.6,
                  }}
                />
              </button>

              <AnimatePresence>
                {cvDropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openCvDrop}
                    onMouseLeave={closeCvDrop}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: 180,
                      background: '#0d0d0d',
                      border: '1px solid #242424',
                      zIndex: 200,
                      overflow: 'hidden',
                    }}
                  >
                    {[
                      { label: 'English', file: 'Resume_English.pdf' },
                      { label: 'Español', file: 'Resume_Spanish.pdf' },
                    ].map(({ label, file }, i) => (
                      <a
                        key={file}
                        href={`/brand_assets/${file}`}
                        target="_blank" rel="noopener noreferrer"
                        onClick={() => setCvDropOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '11px 14px',
                          borderBottom: i === 0 ? '1px solid #1a1a1a' : 'none',
                          textDecoration: 'none',
                          fontSize: 13, color: '#c8c8c8',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'background 0.1s ease, color 0.1s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#141414'; e.currentTarget.style.color = '#f0f0f0' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8c8c8' }}
                      >
                        {label}
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, color: '#424242', letterSpacing: '0.06em',
                        }}>
                          PDF ↓
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile hamburger */}
          <button
            className="navbar-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid #242424',
              padding: '7px',
              color: '#c8c8c8',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3a3a3a')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#242424')}
          >
            <MenuToggleIcon open={menuOpen} duration={280} />
          </button>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .navbar-desktop { display: none !important; }
            .navbar-mobile-btn { display: flex !important; }
          }
        `}</style>
      </header>

      {/* ── Portal mobile menu */}
      <MobileMenu open={menuOpen}>
        <div style={{ padding: '16px 24px', flex: 1 }}>

          {/* Simple links */}
          <div style={{ marginBottom: 8 }}>
            {simpleLinks.map((lnk) => (
              <button
                key={lnk.id}
                onClick={() => handleNavClick(lnk.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none',
                  borderBottom: '1px solid #1a1a1a',
                  padding: '15px 0',
                  fontSize: 16, color: '#c8c8c8',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#c8c8c8')}
              >
                {lnk.label}
              </button>
            ))}
          </div>

          {/* Projects accordion */}
          <MobileAccordion
            label={t('nav.projects')}
            open={mobileProjects}
            onToggle={() => setMobileProjects(!mobileProjects)}
          >
            {projectLinks.map((proj) => (
              <ProjectCard key={proj.link} proj={proj} onClick={() => setMenuOpen(false)} />
            ))}
          </MobileAccordion>

          {/* Volunteering accordion */}
          <MobileAccordion
            label={t('nav.volunteering')}
            open={mobileVolunteering}
            onToggle={() => setMobileVolunteering(!mobileVolunteering)}
          >
            {volunteeringLinks.map((proj) => (
              <ProjectCard key={proj.link} proj={proj} onClick={() => setMenuOpen(false)} />
            ))}
          </MobileAccordion>
        </div>

        {/* Bottom actions */}
        <div style={{
          padding: '16px 24px 32px',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          gap: 12,
        }}>
          <button
            onClick={toggleLang}
            style={{
              background: 'none',
              border: '1px solid #242424',
              padding: '9px 16px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: '0.08em',
              color: '#424242', cursor: 'pointer',
            }}
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          <a
            href="/brand_assets/Resume_English.pdf"
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              border: '1px solid #d8d8d8',
              padding: '9px 12px',
              fontSize: 13, fontWeight: 500, color: '#d8d8d8',
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            CV EN <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#424242' }}>PDF ↓</span>
          </a>
          <a
            href="/brand_assets/Resume_Spanish.pdf"
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              border: '1px solid #d8d8d8',
              padding: '9px 12px',
              fontSize: 13, fontWeight: 500, color: '#d8d8d8',
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            CV ES <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#424242' }}>PDF ↓</span>
          </a>
        </div>
      </MobileMenu>
    </>
  )
}

/* ── Mobile accordion section ─────────────────────────────────────── */
function MobileAccordion({ label, open, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', width: '100%',
          alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none',
          borderBottom: '1px solid #1a1a1a',
          padding: '15px 0',
          fontSize: 16, color: '#c8c8c8',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.18s ease',
            transform: open ? 'rotate(180deg)' : 'none',
            opacity: 0.5,
            color: '#c8c8c8',
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 4, paddingBottom: 4, borderBottom: '1px solid #1a1a1a' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Nav pill button / link ────────────────────────────────────────── */
function NavPill({ children, onClick, active, trailingIcon }) {
  const [hovered, setHovered] = useState(false)
  const lit = active || hovered
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        background: lit ? '#141414' : 'none',
        border: '1px solid',
        borderColor: lit ? '#2a2a2a' : 'transparent',
        padding: '6px 12px',
        fontSize: 14, color: lit ? '#f0f0f0' : '#c8c8c8',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.12s ease, border-color 0.12s ease, color 0.12s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      {trailingIcon}
    </button>
  )
}
