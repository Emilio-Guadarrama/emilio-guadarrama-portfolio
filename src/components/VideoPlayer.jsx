/* ── Video with a YouTube-style centre play button ───────────────────
 * Paused: the poster shows with a large play button, and clicking
 * anywhere on the frame starts playback. Playing: the native controls
 * take over (seek, volume, fullscreen) and clicking the picture pauses.
 * ─────────────────────────────────────────────────────────────────── */

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play } from 'lucide-react'

export default function VideoPlayer({ src, poster, autoPlay = false, className = '', label }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(autoPlay)
  const [started, setStarted] = useState(autoPlay)
  const { t } = useTranslation()

  const play = () => {
    setStarted(true)
    ref.current?.play()
  }

  return (
    <div className={`video-player${playing ? ' is-playing' : ''} ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload={autoPlay ? 'auto' : 'none'}
        controls={started}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        // Native controls only toggle on click in some browsers; do it everywhere
        onClick={(e) => {
          if (!started) return
          const v = e.currentTarget
          // Leave clicks on the native control bar (bottom strip) alone
          if (e.clientY > v.getBoundingClientRect().bottom - 56) return
          e.preventDefault()
          if (v.paused) v.play()
          else v.pause()
        }}
      />
      {!playing && (
        <button
          type="button"
          className={`video-play${started ? ' leaves-controls' : ''}`}
          onClick={play}
          aria-label={label ? `${t('gallery.play')}: ${label}` : t('gallery.play')}
        >
          <span className="video-play-icon" aria-hidden="true">
            <Play size={30} strokeWidth={2} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}
