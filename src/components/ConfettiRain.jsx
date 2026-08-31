import { useReducedMotion } from 'motion/react'
import './ConfettiRain.css'

const COLORS = ['var(--pink)', 'var(--tangerine)', 'var(--lilac)', 'var(--mint)', 'var(--lemon)']

// Deterministic pseudo-random, so the confetti does not reshuffle on re-render.
function makePieces(count) {
  let seed = 20260831
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  return Array.from({ length: count }, () => {
    const width = 6 + rand() * 9
    return {
      left: `${rand() * 100}%`,
      width,
      height: rand() > 0.35 ? width * (0.5 + rand() * 0.5) : width,
      round: rand() > 0.72,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      drift: `${-70 + rand() * 140}px`,
      spin: `${(rand() > 0.5 ? 1 : -1) * (360 + rand() * 720)}deg`,
      duration: 13 + rand() * 15,
      delay: -rand() * 28,
      opacity: 0.45 + rand() * 0.4,
    }
  })
}

const PIECES = makePieces(30)

/** Paper confetti falling behind the whole page, start to finish. */
export default function ConfettiRain() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="confetti-rain" aria-hidden="true">
      {PIECES.map((p, i) => (
        <i
          key={i}
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.color,
            opacity: p.opacity,
            borderRadius: p.round ? '50%' : '1px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': p.drift,
            '--spin': p.spin,
          }}
        />
      ))}
    </div>
  )
}
