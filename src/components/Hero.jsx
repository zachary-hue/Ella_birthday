import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, animate } from 'motion/react'
import { hero } from '../content'
import { byId } from '../photos'
import Photo from './Photo'
import './Hero.css'

// Fixed rather than random so balloons do not reshuffle on every render.
const BALLOONS = [
  { left: '6%', color: 'var(--pink)', size: 62, delay: -2, duration: 15 },
  { left: '17%', color: 'var(--lemon)', size: 44, delay: -9, duration: 19 },
  { left: '29%', color: 'var(--mint)', size: 54, delay: -13, duration: 16 },
  { left: '41%', color: 'var(--lilac)', size: 38, delay: -5, duration: 21 },
  { left: '58%', color: 'var(--tangerine)', size: 58, delay: -11, duration: 17 },
  { left: '70%', color: 'var(--pink)', size: 40, delay: -16, duration: 20 },
  { left: '82%', color: 'var(--mint)', size: 66, delay: -7, duration: 14 },
  { left: '92%', color: 'var(--lemon)', size: 46, delay: -14, duration: 18 },
]

function AgeCounter({ to }) {
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const [shown, setShown] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) return
    const unsubscribe = count.on('change', (v) => setShown(Math.round(v)))
    const controls = animate(count, to, { duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, to, reduced])

  return (
    <motion.span
      className="hero-age"
      initial={reduced ? false : { scale: 0.4, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.35 }}
    >
      {shown}
    </motion.span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Everything drifts up at slightly different rates as you leave the hero.
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), { stiffness: 90, damping: 20 })
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -280]), { stiffness: 70, damping: 20 })
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const letters = [...hero.name]

  return (
    <header className="hero" ref={sectionRef}>
      <div className="hero-mesh" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>

      <div className="hero-balloons" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <span
            key={i}
            className="balloon"
            style={{
              left: b.left,
              width: b.size,
              height: b.size * 1.22,
              background: b.color,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <motion.div className="hero-inner" style={reduced ? undefined : { y: textY, opacity: fade }}>
        <motion.p
          className="hero-greeting"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.greeting}
        </motion.p>

        <h1 className="hero-name" aria-label={hero.name}>
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduced ? false : { y: 120, opacity: 0, rotate: -12, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 + i * 0.08 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <div className="hero-age-row">
          <AgeCounter to={hero.age} />
          <motion.span
            className="hero-age-label"
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {hero.ageLabel}
          </motion.span>
        </div>

        <motion.p
          className="hero-tagline"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          {hero.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-polaroid"
        style={reduced ? undefined : { y: photoY }}
        initial={reduced ? false : { opacity: 0, scale: 0.8, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.9 }}
        whileHover={reduced ? undefined : { rotate: 0, scale: 1.04 }}
      >
        <Photo photo={byId.p03} alt="Ella, mid-celebration" priority sizes="(max-width: 900px) 40vw, 320px" />
      </motion.div>

      <motion.div
        className="hero-cue"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
      >
        <span>{hero.scrollCue}</span>
        <motion.span
          className="hero-chevron"
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </header>
  )
}
