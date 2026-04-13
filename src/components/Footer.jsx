import { useTranslation } from 'react-i18next'
import { GitHubIcon, LinkedInIcon, EmailIcon } from './icons'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      style={{
        borderTop: '1px solid #1a1a1a',
        padding: '40px 0',
        background: '#070707',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Left: name + role */}
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              color: '#f0f0f0',
              marginBottom: 4,
            }}
          >
            Emilio Guadarrama Gutiérrez
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#424242',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {t('footer.role')}
          </div>
        </div>

        {/* Center: social links */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a
            href="mailto:emilio.guadarrama@outlook.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#424242',
              fontSize: 13,
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8c8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
          >
            <EmailIcon />
            <span style={{ display: 'none' }}>Email</span>
          </a>
          <a
            href="https://github.com/Emilio-Guadarrama"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#424242',
              fontSize: 13,
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8c8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/emilioguadarrama/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#424242',
              fontSize: 13,
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8c8c8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
          >
            <LinkedInIcon />
          </a>
        </div>

        {/* Right: copyright */}
        <div
          style={{
            fontSize: 12,
            color: '#424242',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
