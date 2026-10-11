import { motion } from 'framer-motion'

/**
 * Reveal — fade + slide up on scroll entry (once)
 * Use for section-level blocks, headings, standalone elements.
 */
export function Reveal({ children, delay = 0, y = 22, duration = 0.5, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger — parent container that fires staggered animation on children.
 * Wrap grid/list containers with this, then use <motion.div variants={staggerItem}> on each child.
 */
export function Stagger({ children, stagger = 0.07, delayChildren = 0, className, style }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
