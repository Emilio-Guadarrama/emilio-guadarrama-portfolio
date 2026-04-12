import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Gaming-style crosshair:
 *   - 4 short arms tracking mouse instantly (DOM-driven, zero lag)
 *   - Hollow circle in the centre following with spring delay
 *   - White (#d8d8d8) → Amber (#b89060) on hover
 */
export default function Cursor() {
  const crossRef = useRef(null)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  // Circle trails the crosshair
  const circleX = useSpring(mouseX, { stiffness: 110, damping: 16, mass: 0.6 })
  const circleY = useSpring(mouseY, { stiffness: 110, damping: 16, mass: 0.6 })

  const [hovering, setHovering] = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [isTouch,  setIsTouch]  = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const el = crossRef.current

    const onMove = (e) => {
      if (el) {
        el.style.left = `${e.clientX}px`
        el.style.top  = `${e.clientY}px`
      }
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onOver  = (e) => {
      const hit = e.target.closest('a, button, [role="button"], input, select, textarea, label')
      setHovering(!!hit)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  if (isTouch) return null

  const color = hovering ? '#b89060' : '#d8d8d8'

  // Crosshair geometry (all in SVG units, viewBox 44×44, centre = 22)
  // Circle r=7, gap=3 → arms start at 22±10, length 9px → end at 22±19
  const C  = 22   // centre
  const R  = 7    // circle radius
  const G  = 3    // gap between circle edge and arm start
  const AL = 9    // arm length
  const a0 = C - R - G       // arm inner end  (13)
  const a1 = C - R - G - AL  // arm outer end  (4)

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* ── 4 ARMS — instant DOM positioning ─────────────────────── */}
      <div
        ref={crossRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         44,
          height:        44,
          pointerEvents: 'none',
          zIndex:        10000,
          transform:     'translate(-50%, -50%)',
          opacity:       visible ? 1 : 0,
          transition:    'opacity 0.2s ease',
        }}
      >
        <svg
          viewBox="0 0 44 44"
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          {/* Top */}
          <line x1={C} y1={a1} x2={C} y2={a0}
            stroke={color} strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: 'stroke 0.15s ease' }} />
          {/* Bottom */}
          <line x1={C} y1={44 - a0} x2={C} y2={44 - a1}
            stroke={color} strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: 'stroke 0.15s ease' }} />
          {/* Left */}
          <line x1={a1} y1={C} x2={a0} y2={C}
            stroke={color} strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: 'stroke 0.15s ease' }} />
          {/* Right */}
          <line x1={44 - a0} y1={C} x2={44 - a1} y2={C}
            stroke={color} strokeWidth="1.75" strokeLinecap="round"
            style={{ transition: 'stroke 0.15s ease' }} />
        </svg>
      </div>

      {/* ── HOLLOW CIRCLE — spring lag ────────────────────────────── */}
      <motion.div
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          x:             circleX,
          y:             circleY,
          pointerEvents: 'none',
          zIndex:        10001,
          opacity:       visible ? 1 : 0,
          transition:    'opacity 0.2s ease',
        }}
      >
        <div style={{ transform: 'translate(-50%, -50%)' }}>
          <div
            style={{
              width:        8,
              height:       8,
              borderRadius: '50%',
              border:       `1.5px solid ${color}`,
              transition:   'border-color 0.15s ease',
            }}
          />
        </div>
      </motion.div>
    </>
  )
}
