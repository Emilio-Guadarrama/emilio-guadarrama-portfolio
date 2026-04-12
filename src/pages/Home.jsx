import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Stagger, staggerItem, slideItem } from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import AwardsCarousel from '../components/AwardsCarousel'
import { ChevronDown } from 'lucide-react'

/* ── Hero entrance variants (unchanged) ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Shared icons ────────────────────────────────────────────────────── */
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

function Tag({ children, amber }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11, fontWeight: 500, letterSpacing: '0.06em',
      padding: '3px 8px',
      border: `1px solid ${amber ? '#28200e' : '#242424'}`,
      color: amber ? '#b89060' : '#424242',
      background: amber ? '#120e06' : 'transparent',
    }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <Reveal y={10}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#424242', marginBottom: 48,
      }}>
        {children}
      </div>
    </Reveal>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const stats        = t('stats',              { returnObjects: true })
  const skillGroups  = t('skills.groups',      { returnObjects: true })
  const expItems     = t('experience.items',   { returnObjects: true })
  const projects     = t('projects.items',     { returnObjects: true })
  const achievements = t('achievements.items', { returnObjects: true })
  const languages    = t('about.languages',    { returnObjects: true })

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 'calc(60px + 80px)', paddingBottom: 80, borderBottom: '1px solid #1a1a1a' }}>
        <div
          style={{
            maxWidth: 1100, margin: '0 auto', padding: '0 24px',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'center',
          }}
          className="hero-grid"
        >
          <div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#424242', marginBottom: 20 }}>
              Emilio Guadarrama Gutiérrez
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#f0f0f0',
                letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
              {t('hero.title')}
            </motion.h1>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
              style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, color: '#424242',
                letterSpacing: '-0.02em', marginBottom: 24 }}>
              {t('hero.subtitle')}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#b89060',
                borderLeft: '2px solid #28200e', paddingLeft: 12, marginBottom: 28, lineHeight: 1.5 }}>
              {t('hero.role')}
            </motion.div>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={4}
              style={{ fontSize: 15, color: '#c8c8c8', lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              {t('hero.description')}
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <Link to="#projects"
                onClick={() => { const el = document.getElementById('projects'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #d8d8d8',
                  padding: '10px 24px', fontSize: 14, fontWeight: 500, color: '#d8d8d8', textDecoration: 'none',
                  transition: 'border-color 0.15s ease, color 0.15s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.color = '#f0f0f0' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d8d8d8'; e.currentTarget.style.color = '#d8d8d8' }}>
                {t('hero.viewProjects')}
              </Link>
              <a href="https://github.com/Emilio-Guadarrama" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #242424',
                  padding: '10px 20px', fontSize: 14, color: '#c8c8c8', textDecoration: 'none',
                  transition: 'border-color 0.15s ease, color 0.15s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#f0f0f0' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#c8c8c8' }}>
                <GitHubIcon /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/emilioguadarrama/" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #242424',
                  padding: '10px 20px', fontSize: 14, color: '#c8c8c8', textDecoration: 'none',
                  transition: 'border-color 0.15s ease, color 0.15s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#f0f0f0' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#c8c8c8' }}>
                <LinkedInIcon /> LinkedIn
              </a>
              <CVDropdown label={t('hero.downloadCV')} />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-photo-wrap" style={{ flexShrink: 0 }}>
            <div style={{ width: 240, height: 300, border: '1px solid #242424', overflow: 'hidden' }}>
              <img src="/brand_assets/photos/hero/photo.png" alt="Emilio Guadarrama"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-photo-wrap { display: none; }
          }
        `}</style>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid #1a1a1a' }}>
        <Stagger
          style={{
            maxWidth: 1100, margin: '0 auto', padding: '0 24px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="stats-grid"
          stagger={0.09}
          delayChildren={0.1}
        >
          {Array.isArray(stats) && stats.map((stat, i) => (
            <motion.div key={i} variants={staggerItem}
              style={{
                padding: '28px 0',
                borderRight: i < stats.length - 1 ? '1px solid #1a1a1a' : 'none',
                paddingLeft: i > 0 ? 24 : 0,
              }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600,
                color: i < 2 ? '#b89060' : '#f0f0f0', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: '#424242', lineHeight: 1.4 }}>{stat.label}</div>
            </motion.div>
          ))}
        </Stagger>
        <style>{`@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '96px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64 }} className="about-grid">

            <Reveal>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#424242', marginBottom: 12 }}>
                  {t('about.title')}
                </div>
                <p style={{ fontSize: 16, color: '#c8c8c8', lineHeight: 1.8, maxWidth: 600 }}>
                  {t('about.bio')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#424242', marginBottom: 12 }}>
                    {t('about.educationLabel')}
                  </div>
                  <div style={{ border: '1px solid #242424', padding: '16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{t('about.degree')}</div>
                    <div style={{ fontSize: 13, color: '#c8c8c8', marginBottom: 4 }}>{t('about.institution')}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#424242' }}>{t('about.period')}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#424242', marginBottom: 12 }}>
                    {t('about.languagesLabel')}
                  </div>

                  {/* Language bars */}
                  <div style={{ border: '1px solid #242424', background: '#111111' }}>
                    {Array.isArray(languages) && languages.map((lang, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '14px 16px',
                          borderBottom: i < languages.length - 1 ? '1px solid #1a1a1a' : 'none',
                        }}
                      >
                        {/* Row: code+name | level */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: 10,
                        }}>
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12, fontWeight: 500,
                            color: '#f0f0f0', letterSpacing: '0.06em',
                          }}>
                            {lang.code} — {lang.name}
                          </span>
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10, color: '#424242', letterSpacing: '0.06em',
                          }}>
                            {lang.level}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div style={{
                          height: 2,
                          background: '#1a1a1a',
                          position: 'relative',
                          overflow: 'hidden',
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percent}%` }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              position: 'absolute', top: 0, left: 0, bottom: 0,
                              background: '#b89060',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ── TECHNICAL SKILLS ─────────────────────────────────────────── */}
      <section id="skills" style={{ padding: '96px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('skills.title')}</SectionLabel>
          <Stagger
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}
            className="skills-grid"
            stagger={0.08}
          >
            {Array.isArray(skillGroups) && skillGroups.map((group, i) => (
              <motion.div key={i} variants={staggerItem}
                style={{ background: '#111111', border: '1px solid #242424', padding: '24px', marginLeft: i > 0 ? -1 : 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f0f0f0',
                  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #242424' }}>
                  {group.name}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {group.items.map((item, j) => (
                    <li key={j} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c8c8c8' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Stagger>
        </div>
        <style>{`
          @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .skills-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: '96px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('experience.title')}</SectionLabel>
          <Stagger style={{ display: 'flex', flexDirection: 'column' }} stagger={0.1}>
            {Array.isArray(expItems) && expItems.map((item, i) => (
              <motion.div key={i} variants={slideItem}
                style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
                  padding: '28px 0', borderTop: '1px solid #242424', alignItems: 'start' }}
                className="exp-row">
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#424242', paddingTop: 2 }}>
                  {item.period}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{item.role}</div>
                  <div style={{ fontSize: 14, color: '#c8c8c8' }}>{item.org}</div>
                </div>
              </motion.div>
            ))}
            <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.4 } } }}
              style={{ borderTop: '1px solid #242424', transformOrigin: 'left' }} />
          </Stagger>
        </div>
        <style>{`@media (max-width: 600px) { .exp-row { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: '96px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('projects.title')}</SectionLabel>

          {Array.isArray(projects) && (
            <div>
              {/* Featured card */}
              <Reveal>
                <Link to={projects[0].link}
                  style={{ display: 'block', background: '#111111', border: '1px solid #242424',
                    padding: '32px', marginBottom: 1, textDecoration: 'none',
                    transition: 'border-color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#242424')}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                        <Tag amber>{t('projects.featuredLabel')}</Tag>
                        {projects[0].tags.map((tag, j) => <Tag key={j} amber={projects[0].amber}>{tag}</Tag>)}
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 600, color: '#f0f0f0', marginBottom: 12, letterSpacing: '-0.02em' }}>
                        {projects[0].name}
                      </div>
                      <p style={{ fontSize: 14, color: '#c8c8c8', lineHeight: 1.7, maxWidth: 560 }}>{projects[0].desc}</p>
                    </div>
                    <div style={{ border: '1px solid #242424', overflow: 'hidden', flexShrink: 0 }} className="featured-pcb">
                      <img src="/brand_assets/photos/fc2026/pcb_3d_top.png" alt="FC-2026 PCB"
                        style={{ width: 200, height: 140, objectFit: 'cover', display: 'block' }} />
                    </div>
                  </div>
                  <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: '#b89060', letterSpacing: '0.06em' }}>
                    {t('projects.viewProject')}
                  </div>
                </Link>
              </Reveal>

              {/* Regular cards grid */}
              <Stagger
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}
                className="projects-grid"
                stagger={0.07}
              >
                {projects.slice(1).map((project) => (
                  <motion.div key={project.key} variants={staggerItem}>
                    <Link to={project.link}
                      style={{ display: 'block', background: '#111111', border: '1px solid #242424',
                        padding: '24px', textDecoration: 'none', marginTop: -1,
                        transition: 'border-color 0.15s ease', height: '100%' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#242424')}>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {project.tags.map((tag, j) => <Tag key={j} amber={project.amber}>{tag}</Tag>)}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', marginBottom: 10,
                        letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                        {project.name}
                      </div>
                      <p style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.65, marginBottom: 16 }}>{project.desc}</p>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#424242', letterSpacing: '0.06em' }}>
                        {t('projects.viewProject')}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } .featured-pcb { display: none !important; } }
          @media (max-width: 500px) { .projects-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── AWARDS CAROUSEL ──────────────────────────────────────────── */}
      <AwardsCarousel />

      {/* ── ACHIEVEMENTS ─────────────────────────────────────────────── */}
      <section id="achievements" style={{ padding: '96px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel>{t('achievements.title')}</SectionLabel>
          <Stagger
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
            className="ach-grid"
            stagger={0.08}
          >
            {Array.isArray(achievements) && achievements.map((ach, i) => (
              <motion.div key={i} variants={staggerItem}
                style={{ border: '1px solid #242424', padding: '24px', background: '#111111',
                  marginTop: i > 1 ? -1 : 0, marginLeft: i % 2 === 1 ? -1 : 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
                  color: '#f0f0f0', marginBottom: 8 }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: 13, color: '#c8c8c8', lineHeight: 1.6 }}>{ach.desc}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
        <style>{`@media (max-width: 600px) { .ach-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <ContactForm />
    </>
  )
}

/* ── CV download dropdown ──────────────────────────────────────────── */
function CVDropdown({ label }) {
  const [open, setOpen]   = useState(false)
  const [hovered, setHovered] = useState(false)
  const timer = useRef(null)

  const openMenu  = () => { clearTimeout(timer.current); setOpen(true) }
  const closeMenu = () => { timer.current = setTimeout(() => setOpen(false), 150) }

  const lit = open || hovered

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: `1px solid ${lit ? '#2a2a2a' : '#242424'}`,
          background: 'none',
          padding: '10px 18px',
          fontSize: 14, color: lit ? '#f0f0f0' : '#c8c8c8',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'border-color 0.15s ease, color 0.15s ease',
        }}
      >
        {label}
        <ChevronDown
          size={13}
          style={{
            transition: 'transform 0.18s ease',
            transform: open ? 'rotate(180deg)' : 'none',
            opacity: 0.5,
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              minWidth: '100%',
              background: '#0d0d0d',
              border: '1px solid #242424',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'English', file: 'Resume_English.pdf' },
              { label: 'Español', file: 'Resume_Spanish.pdf' },
            ].map(({ label: lang, file }, i) => (
              <a
                key={file}
                href={`/brand_assets/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 16px',
                  borderBottom: i === 0 ? '1px solid #1a1a1a' : 'none',
                  textDecoration: 'none',
                  fontSize: 13, color: '#c8c8c8',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.1s ease, color 0.1s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#141414'; e.currentTarget.style.color = '#f0f0f0' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8c8c8' }}
              >
                {lang}
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
  )
}
