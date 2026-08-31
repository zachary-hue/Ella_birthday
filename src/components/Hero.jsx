import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { hero } from '../content'
import { byId } from '../photos'
import TapedPhoto from './TapedPhoto'
import Doodle from './Doodle'
import './Hero.css'

// Scraps of paper confetti. Fixed, so they do not reshuffle on every render.
const CONFETTI = [
  { left: '7%', top: '14%', color: 'var(--pink)', size: 13, rot: -18, delay: -1 },
  { left: '16%', top: '68%', color: 'var(--lemon)', size: 10, rot: 24, delay: -4 },
  { left: '27%', top: '31%', color: 'var(--mint)', size: 15, rot: 8, delay: -7 },
  { left: '38%', top: '81%', color: 'var(--lilac)', size: 11, rot: -30, delay: -2.5 },
  { left: '49%', top: '11%', color: 'var(--tangerine)', size: 14, rot: 14, delay: -6 },
  { left: '62%', top: '74%', color: 'var(--pink)', size: 12, rot: -8, delay: -3.5 },
  { left: '73%', top: '22%', color: 'var(--lemon)', size: 16, rot: 30, delay: -8 },
  { left: '86%', top: '58%', color: 'var(--mint)', size: 11, rot: -22, delay: -5 },
  { left: '93%', top: '17%', color: 'var(--lilac)', size: 13, rot: 12, delay: -1.8 },
]

function Age({ to }) {
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const [shown, setShown] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) return
    const stop = count.on('change', (v) => setShown(Math.round(v)))
    const controls = animate(count, to, { duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] })
    return () => {
      controls.stop()
      stop()
    }
  }, [count, to, reduced])

  return (
    <span className="hero-age">
      <span className="hero-age-number hand">{shown}</span>
      <Doodle name="circle" className="hero-age-ring" color="var(--pink)" width={4} delay={1.1} />
    </span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -110]), { stiffness: 90, damping: 20 })
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -220]), { stiffness: 70, damping: 20 })

  return (
    <header className="hero" ref={ref}>
      <div className="hero-confetti" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: c.size * 0.62,
              background: c.color,
              rotate: `${c.rot}deg`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div className="hero-words" style={reduced ? undefined : { y: textY }}>
        <motion.p
          className="hero-greeting hand"
          initial={reduced ? false : { opacity: 0, y: 18, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.greeting}
        </motion.p>

        <h1 className="hero-name hand" aria-label={hero.name}>
          {[...hero.name].map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduced ? false : { y: 70, opacity: 0, rotate: -10 }}
              animate={{ y: 0, opacity: 1, rotate: i % 2 ? 1.5 : -1.5 }}
              transition={{ type: 'spring', stiffness: 210, damping: 15, delay: 0.2 + i * 0.07 }}
            >
              {letter}
            </motion.span>
          ))}
          <Doodle name="underline" className="hero-underline" color="var(--tangerine)" width={4} delay={0.75} stretch />
        </h1>

        <motion.p
          className="hero-line"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Age to={hero.age} />
          <span className="hero-tagline hand">{hero.tagline}</span>
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-photo"
        style={reduced ? undefined : { y: photoY }}
        initial={reduced ? false : { opacity: 0, scale: 0.85, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 4 }}
        transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.5 }}
      >
        <TapedPhoto
          photo={byId.p03}
          caption={hero.photoCaption}
          tape="corners"
          priority
          sizes="(max-width: 860px) 46vw, 320px"
        />
        <Doodle name="sparkle" className="hero-sparkle" color="var(--lemon)" width={2.5} delay={1.4} />
      </motion.div>

      <motion.div
        className="hero-cue"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="hand">{hero.scrollCue}</span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Doodle name="arrow" className="hero-arrow" color="var(--ink-faint)" width={3.5} delay={2} />
        </motion.div>
      </motion.div>
    </header>
  )
}
