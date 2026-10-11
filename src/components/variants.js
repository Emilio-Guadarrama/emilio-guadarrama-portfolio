// Framer Motion variants shared by <Stagger> children

/** Variant object for direct children of <Stagger> */
export const staggerItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

