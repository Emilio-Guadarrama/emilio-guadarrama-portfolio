import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  const { t } = useTranslation()
  usePageTitle(t('titles.notFound'))

  return (
    <section style={{ paddingTop: 60, minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px', width: '100%' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
          {t('notFound.title')}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '52ch', marginBottom: 32 }}>
          {t('notFound.desc')}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/" className="ext-link">{t('notFound.home')}</Link>
          <Link to="/projects/ignis" className="ext-link">{t('notFound.ignis')} →</Link>
        </div>
      </div>
    </section>
  )
}
