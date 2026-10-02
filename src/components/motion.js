// Shared animation variants.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

// Parent/child pair for staggered grids.
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
export const staggerChild = fadeUp
