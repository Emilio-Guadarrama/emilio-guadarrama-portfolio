/* ── Photo gallery + lightbox ─────────────────────────────────────────
 * items: [{ src, caption, video?, poster?, focus?, label? }]
 *   - images: `src` is the photo
 *   - videos: `video` is the mp4, `poster` the still shown in the grid
 *   - focus: CSS object-position for the cropped thumbnail (e.g. 'center 80%')
 *   - label: short tag shown under the thumbnail in the carousel (e.g. "3D top")
 * variant: 'grid' (default) — captioned thumbnails, click opens the lightbox
 *          'carousel' — one slide with arrows/swipe, plus a thumbnail column
 *                       on the right (below on phones) to jump to any photo
 * columns: grid columns on desktop (collapses to 2, then 1 on mobile)
 * aspect:  thumbnail aspect ratio in grid mode (photos are cropped to fill it)
 * stageAspect / mobileAspect: slide aspect ratio in carousel mode on desktop / phones
 * ─────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react'

export default function Gallery({ items, columns = 3, aspect = '4 / 3', variant = 'grid', stageAspect = '16 / 10', mobileAspect = '1 / 1' }) {
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
      {variant === 'carousel' ? (
        <Carousel items={items} stageAspect={stageAspect} mobileAspect={mobileAspect} onOpen={setOpen} registerTrigger={(i, el) => { triggers.current[i] = el }} />
      ) : (
        <div className={`cgrid gallery gallery-cols-${columns}`}>
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
      )}

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

/* ── Carousel: large slide + thumbnail grid ────────────────────────── */
function Carousel({ items, stageAspect, mobileAspect, onOpen, registerTrigger }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const touchX = useRef(null)
  const item = items[index]
  const many = items.length > 1
  const go = (d) => setIndex((i) => (i + d + items.length) % items.length)

  const onKeyDown = (e) => {
    if (e.target.tagName === 'VIDEO') return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <div className={`carousel${many ? '' : ' is-single'}`} onKeyDown={onKeyDown}>
      <figure style={{ margin: 0 }}>
        <div className="carousel-stage" style={{ aspectRatio: stageAspect, '--mobile-aspect': mobileAspect }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.video || item.src}
              className="carousel-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {item.video ? (
                <video src={item.video} poster={item.poster} controls playsInline preload="none" />
              ) : (
                <button
                  ref={(el) => registerTrigger(index, el)}
                  type="button"
                  className="carousel-open"
                  onClick={() => onOpen(index)}
                  aria-label={`${t('gallery.open')}: ${item.caption}`}
                >
                  <img src={item.src} alt={item.caption} decoding="async" />
                  <span className="carousel-expand" aria-hidden="true"><Maximize2 size={14} /></span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {many && (
            <>
              <button type="button" className="lightbox-btn carousel-prev" onClick={() => go(-1)} aria-label={t('gallery.prev')}>
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" className="lightbox-btn carousel-next" onClick={() => go(1)} aria-label={t('gallery.next')}>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <figcaption className="carousel-caption">
          {many && (
            <span className="lightbox-count">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          )}
          <span aria-live="polite">{item.caption}</span>
        </figcaption>
      </figure>

      {many && (
        <div className="carousel-side">
        <div className="carousel-thumbs" role="group" aria-label={t('gallery.all')}>
          {items.map((it, i) => (
            <button
              key={it.video || it.src}
              type="button"
              aria-pressed={i === index}
              aria-label={it.label || it.caption}
              className={`carousel-thumb${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <span className="carousel-thumb-img">
                <img
                  src={it.video ? it.poster : it.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={it.focus ? { objectPosition: it.focus } : undefined}
                />
                {it.video && <Play size={12} strokeWidth={2.5} className="carousel-thumb-play" aria-hidden="true" />}
              </span>
              {it.label && <span className="carousel-thumb-label">{it.label}</span>}
            </button>
          ))}
        </div>
        </div>
      )}
    </div>
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
