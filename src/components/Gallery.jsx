/* ── Photo gallery + lightbox ─────────────────────────────────────────
 * items: [{ src, caption, video?, poster?, focus? }]
 *   - focus: CSS object-position for the cropped thumbnail (e.g. 'center 80%')
 *   - images: `src` is the photo
 *   - videos: `video` is the mp4, `poster` the still shown in the grid
 * columns: grid columns on desktop (collapses to 2, then 1 on mobile)
 * aspect:  thumbnail aspect ratio (photos are cropped to fill it)
 * ─────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

export default function Gallery({ items, columns = 3, aspect = '4 / 3' }) {
  const [open, setOpen] = useState(null)
  const triggers = useRef([])
  const { t } = useTranslation()

  const close = useCallback(() => {
    setOpen((i) => {
      if (i !== null) triggers.current[i]?.focus()
      return null
    })
  }, [])

  return (
    <>
      <div className={`gallery gallery-cols-${columns}`}>
        {items.map((item, i) => (
          <figure key={item.video || item.src} style={{ margin: 0 }}>
            <button
              ref={(el) => (triggers.current[i] = el)}
              type="button"
              className="gallery-thumb"
              onClick={() => setOpen(i)}
              aria-label={`${t('gallery.open')}: ${item.caption}`}
              style={{ aspectRatio: aspect }}
            >
              <img
                src={item.video ? item.poster : item.src}
                alt=""
                loading="lazy"
                style={item.focus ? { objectPosition: item.focus } : undefined}
                decoding="async"
              />
              {item.video && (
                <span className="gallery-video-badge">
                  <Play size={11} strokeWidth={2.5} aria-hidden="true" />
                  {t('gallery.video')}
                </span>
              )}
            </button>
            <figcaption className="gallery-caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {open !== null && (
            <Lightbox items={items} index={open} setIndex={setOpen} onClose={close} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function Lightbox({ items, index, setIndex, onClose }) {
  const { t } = useTranslation()
  const closeBtn = useRef(null)
  const item = items[index]
  const many = items.length > 1

  const go = useCallback(
    (d) => setIndex((i) => (i + d + items.length) % items.length),
    [items.length, setIndex],
  )

  useEffect(() => {
    closeBtn.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && many) go(1)
      if (e.key === 'ArrowLeft' && many) go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [go, many, onClose])

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox-bar">
        <span className="lightbox-count">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeBtn} type="button" className="lightbox-btn" onClick={onClose} aria-label={t('gallery.close')}>
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <figure className="lightbox-figure" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
        {item.video ? (
          <video key={item.video} src={item.video} poster={item.poster} controls autoPlay playsInline className="lightbox-media" />
        ) : (
          <img key={item.src} src={item.src} alt={item.caption} className="lightbox-media" />
        )}
        <figcaption className="lightbox-caption">{item.caption}</figcaption>
      </figure>

      {many && (
        <>
          <button type="button" className="lightbox-btn lightbox-prev" onClick={() => go(-1)} aria-label={t('gallery.prev')}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox-btn lightbox-next" onClick={() => go(1)} aria-label={t('gallery.next')}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </>
      )}
    </motion.div>
  )
}
