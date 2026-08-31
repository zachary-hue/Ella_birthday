import { motion, useReducedMotion } from 'motion/react'
import './Doodle.css'

// Hand-drawn marks. Each one draws itself the first time it scrolls into view.
const DOODLES = {
  arrow: {
    viewBox: '0 0 80 80',
    paths: ['M6 6 C 36 16 56 34 60 60', 'M45 49 L 62 65 L 68 45'],
  },
  underline: {
    viewBox: '0 0 220 20',
    paths: ['M5 10 C 62 2 152 17 215 7', 'M14 17 C 72 11 142 20 206 14'],
  },
  sparkle: {
    viewBox: '0 0 40 40',
    paths: ['M20 3 C 22 15 25 18 37 20 C 25 22 22 25 20 37 C 18 25 15 22 3 20 C 15 18 18 15 20 3 Z'],
  },
  circle: {
    viewBox: '0 0 200 110',
    paths: ['M104 8 C 42 4 8 30 10 56 C 12 84 52 104 108 102 C 164 100 194 74 190 48 C 186 22 146 6 88 10'],
  },
  squiggle: {
    viewBox: '0 0 120 24',
    paths: ['M4 14 C 16 2 24 22 36 12 C 48 2 56 22 68 12 C 80 2 88 22 100 12 C 108 5 112 10 116 12'],
  },
  burst: {
    viewBox: '0 0 60 60',
    paths: ['M30 4 L 30 18', 'M30 42 L 30 56', 'M4 30 L 18 30', 'M42 30 L 56 30', 'M11 11 L 21 21', 'M39 39 L 49 49', 'M49 11 L 39 21', 'M21 39 L 11 49'],
  },
}

export default function Doodle({
  name,
  color = 'var(--ink)',
  width = 3,
  delay = 0,
  stretch = false,
  className = '',
  style,
}) {
  const reduced = useReducedMotion()
  const doodle = DOODLES[name]
  if (!doodle) return null

  return (
    <svg
      className={`doodle ${className}`}
      viewBox={doodle.viewBox}
      preserveAspectRatio={stretch ? 'none' : undefined}
      fill="none"
      aria-hidden="true"
      style={style}
    >
      {doodle.paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect={stretch ? 'non-scaling-stroke' : undefined}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            pathLength: { duration: 0.7, delay: delay + i * 0.12, ease: 'easeInOut' },
            opacity: { duration: 0.1, delay: delay + i * 0.12 },
          }}
        />
      ))}
    </svg>
  )
}
