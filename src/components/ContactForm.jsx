/**
 * Terminal-style contact form.
 *
 * Email delivery via Formspree (free tier — 50 submissions/month).
 * Setup:
 *   1. Go to https://formspree.io → New Form → set email to emilio.guadarrama@outlook.com
 *   2. Copy the form ID (e.g. "xkgwlrpb") from the endpoint URL
 *   3. Replace FORMSPREE_ID below with your actual ID
 */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Reveal } from './Reveal'

const FORMSPREE_ID = 'xpqoveeo' // ← replace with your Formspree form ID
const ENDPOINT     = `https://formspree.io/f/${FORMSPREE_ID}`

/* ── Contact info rows ─────────────────────────────────────────────── */
const contactInfo = [
  {
    Icon: Mail,
    label: 'emilio.guadarrama@outlook.com',
    href: 'mailto:emilio.guadarrama@outlook.com',
  },
  {
    Icon: LinkedInIcon,
    label: 'linkedin.com/in/emilioguadarrama',
    href: 'https://www.linkedin.com/in/emilioguadarrama/',
  },
  {
    Icon: GitHubIcon,
    label: 'github.com/Emilio-Guadarrama',
    href: 'https://github.com/Emilio-Guadarrama',
  },
  {
    Icon: MapPin,
    label: 'Zapopan, Jalisco, México',
    href: null,
  },
]

/* ── Blinking cursor ───────────────────────────────────────────────── */
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
      style={{
        display: 'inline-block',
        width: 7, height: 13,
        background: '#d8d8d8',
        verticalAlign: 'middle',
        marginLeft: 2,
      }}
    />
  )
}

/* ── Main component ────────────────────────────────────────────────── */
export default function ContactForm() {
  const { t } = useTranslation()
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fields = [
    { key: 'name',    varName: 'SENDER_NAME',  placeholder: 'Your name',          type: 'text'  },
    { key: 'email',   varName: 'SENDER_EMAIL', placeholder: 'your@email.com',     type: 'email' },
    { key: 'message', varName: 'MESSAGE_BODY', placeholder: 'Enter your message…', type: 'textarea' },
  ]

  return (
    <section id="contact" style={{ padding: '96px 0', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <Reveal y={10}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#424242', marginBottom: 12,
          }}>
            // Open Channel
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
            color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: 48,
          }}>
            {t('contact.getInTouch')}
          </h2>
        </Reveal>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }}
          className="contact-form-grid"
        >

          {/* ── Left: Terminal form panel */}
          <Reveal>
            <div style={{
              border: '1px solid #242424',
              background: '#0a0a0a',
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
            }}>
              {/* Terminal chrome */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                borderBottom: '1px solid #1a1a1a',
                background: '#0d0d0d',
              }}>
                {/* Traffic-light dots */}
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
                ))}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: '#2a2a2a',
                  letterSpacing: '0.1em', marginLeft: 8,
                }}>
                  // MESSAGE TERMINAL — OPEN
                </span>
              </div>

              {/* Form body */}
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  /* ── Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ padding: '32px 20px', minHeight: 320 }}
                  >
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12, color: '#d8d8d8', lineHeight: 2,
                    }}>
                      <div style={{ color: '#424242' }}>$ transmit --status</div>
                      <div>› Packet received</div>
                      <div>› Routing to emilio.guadarrama@outlook.com</div>
                      <div style={{ marginTop: 16, color: '#d8d8d8' }}>
                        Message delivered. <Cursor />
                      </div>
                      <button
                        onClick={() => setStatus('idle')}
                        style={{
                          marginTop: 24,
                          background: 'none', border: '1px solid #242424',
                          padding: '6px 14px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11, color: '#424242', cursor: 'pointer',
                          letterSpacing: '0.08em',
                          transition: 'color 0.15s ease, border-color 0.15s ease',
                          borderRadius: 'var(--radius-sm)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#d8d8d8'; e.currentTarget.style.borderColor = '#3a3a3a' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#424242'; e.currentTarget.style.borderColor = '#242424' }}
                      >
                        › New message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    style={{ padding: '4px 0 0' }}
                  >
                    {fields.map((field, i) => {
                      const isFocused = focused === field.key
                      const hasVal    = form[field.key].length > 0
                      return (
                        <div
                          key={field.key}
                          style={{
                            borderBottom: i < fields.length - 1 ? '1px solid #1a1a1a' : 'none',
                            padding: '14px 20px',
                            background: isFocused ? '#0f0f0f' : 'transparent',
                            transition: 'background 0.12s ease',
                          }}
                        >
                          {/* Prompt label */}
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            color: isFocused || hasVal ? '#d8d8d8' : '#2a2a2a',
                            letterSpacing: '0.06em',
                            marginBottom: 6,
                            display: 'flex', alignItems: 'center', gap: 6,
                            transition: 'color 0.15s ease',
                          }}>
                            <span style={{ color: isFocused ? '#d8d8d8' : '#242424' }}>›</span>
                            {field.varName}:
                          </div>

                          {/* Input */}
                          {field.type === 'textarea' ? (
                            <textarea
                              name={field.key}
                              value={form[field.key]}
                              onChange={handleChange}
                              onFocus={() => setFocused(field.key)}
                              onBlur={() => setFocused(null)}
                              placeholder={field.placeholder}
                              rows={5}
                              required
                              style={{
                                width: '100%',
                                background: 'none', border: 'none', outline: 'none',
                                resize: 'none',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13, color: '#f0f0f0', lineHeight: 1.7,
                                caretColor: '#d8d8d8',
                              }}
                            />
                          ) : (
                            <input
                              name={field.key}
                              type={field.type}
                              value={form[field.key]}
                              onChange={handleChange}
                              onFocus={() => setFocused(field.key)}
                              onBlur={() => setFocused(null)}
                              placeholder={field.placeholder}
                              required
                              style={{
                                width: '100%',
                                background: 'none', border: 'none', outline: 'none',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13, color: '#f0f0f0',
                                caretColor: '#d8d8d8',
                              }}
                            />
                          )}
                        </div>
                      )
                    })}

                    {/* Submit */}
                    <div style={{ padding: '16px 20px', borderTop: '1px solid #1a1a1a' }}>
                      {status === 'error' && (
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11, color: '#c8c8c8', marginBottom: 12,
                          letterSpacing: '0.04em',
                        }}>
                          › Transmission failed — try again
                        </div>
                      )}
                      <SubmitButton sending={status === 'sending'} />
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* ── Right: Contact info */}
          <Reveal delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
              {contactInfo.map(({ Icon, label, href }, i) => (
                <ContactInfoRow
                  key={i}
                  Icon={Icon}
                  label={label}
                  href={href}
                  isLast={i === contactInfo.length - 1}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

/* ── Contact info row ──────────────────────────────────────────────── */
function ContactInfoRow({ Icon, label, href, isLast }) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '20px 0',
      borderBottom: isLast ? 'none' : '1px solid #1a1a1a',
    }}>
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${hovered ? '#2a2a2a' : '#242424'}`,
        background: '#111111',
        transition: 'border-color 0.15s ease',
        borderRadius: 'var(--radius-sm)',
      }}>
        <Icon size={15} color={hovered ? '#c8c8c8' : '#424242'} strokeWidth={1.75} />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: hovered ? '#f0f0f0' : '#c8c8c8',
        letterSpacing: '0.01em', lineHeight: 1.4,
        transition: 'color 0.15s ease',
      }}>
        {label}
      </span>
    </div>
  )

  if (!href) return inner

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </a>
  )
}

/* ── Submit button ─────────────────────────────────────────────────── */
function SubmitButton({ sending }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="submit"
      disabled={sending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: hovered && !sending ? '#141414' : 'transparent',
        border: `1px solid ${hovered && !sending ? '#3a3a3a' : '#242424'}`,
        padding: '12px 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, fontWeight: 500,
        color: sending ? '#424242' : hovered ? '#f0f0f0' : '#d8d8d8',
        letterSpacing: '0.1em',
        cursor: sending ? 'not-allowed' : 'pointer',
        transition: 'background 0.12s ease, border-color 0.12s ease, color 0.12s ease',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      {sending ? (
        <>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ›_
          </motion.span>
          TRANSMITTING…
        </>
      ) : (
        <>›_ TRANSMIT MESSAGE →</>
      )}
    </button>
  )
}
