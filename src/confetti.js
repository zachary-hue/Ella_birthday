import confetti from 'canvas-confetti'

export const PARTY_COLORS = ['#ff2d95', '#ff8a3d', '#b06bff', '#2fe3c2', '#ffd93d', '#fff4ec']

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

/** Two cannons firing inward from the bottom corners. */
export function burst() {
  if (prefersReducedMotion()) return

  const shared = { particleCount: 70, spread: 70, startVelocity: 55, colors: PARTY_COLORS, zIndex: 60 }
  confetti({ ...shared, angle: 60, origin: { x: 0, y: 0.9 } })
  confetti({ ...shared, angle: 120, origin: { x: 1, y: 0.9 } })
  setTimeout(() => {
    confetti({ ...shared, particleCount: 40, angle: 75, origin: { x: 0.2, y: 1 } })
    confetti({ ...shared, particleCount: 40, angle: 105, origin: { x: 0.8, y: 1 } })
  }, 180)
}

/** A single pop centred on an element -- used when the cake is pressed. */
export function popFrom(element) {
  if (prefersReducedMotion() || !element) return

  const box = element.getBoundingClientRect()
  confetti({
    particleCount: 90,
    spread: 360,
    startVelocity: 32,
    ticks: 140,
    scalar: 0.95,
    colors: PARTY_COLORS,
    zIndex: 60,
    origin: {
      x: (box.left + box.width / 2) / window.innerWidth,
      y: (box.top + box.height / 2) / window.innerHeight,
    },
  })
}

/** Slow drift for the end of the page. */
export function shower(durationMs = 2200) {
  if (prefersReducedMotion()) return

  const end = Date.now() + durationMs
  const frame = () => {
    confetti({
      particleCount: 4,
      startVelocity: 0,
      ticks: 260,
      gravity: 0.45,
      scalar: 1.1,
      colors: PARTY_COLORS,
      zIndex: 60,
      origin: { x: Math.random(), y: -0.05 },
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
