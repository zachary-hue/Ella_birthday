import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { moments } from '../content'
import { byId } from '../photos'
import TapedPhoto from './TapedPhoto'
import Doodle from './Doodle'
import './Moments.css'

// A loose S-curve for the thread running down the page.
const THREAD = (() => {
  let d = 'M20 0'
  for (let y = 0; y < 1000; y += 125) {
    d += ` C 36 ${y + 32} 4 ${y + 94} 20 ${y + 125}`
  }
  return d
})()

function Moment({ moment, index }) {
  const reduced = useReducedMotion()
  const fromLeft = index % 2 === 0

  return (
    <li className={`moment ${fromLeft ? 'is-left' : 'is-right'}`}>
      <TapedPhoto
        photo={byId[moment.photo]}
        tilt={moment.tilt}
        tape={index % 3 === 0 ? 'top' : 'corners'}
        ratio="4 / 5"
        sizes="(max-width: 860px) 78vw, 340px"
        className="moment-photo"
        initial={reduced ? false : { opacity: 0, x: fromLeft ? -60 : 60, rotate: moment.tilt * 4, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, rotate: moment.tilt, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ type: 'spring', stiffness: 95, damping: 16 }}
      />

      <motion.div
        className="moment-note"
        initial={reduced ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="moment-when hand">{moment.when}</span>
        <h2 className="moment-title hand">{moment.title}</h2>
        <p>{moment.body}</p>
        {index === 1 && <Doodle name="squiggle" className="moment-squiggle" color="var(--mint)" width={3} />}
        {index === 3 && <Doodle name="sparkle" className="moment-mark" color="var(--lemon)" width={2.6} />}
      </motion.div>
    </li>
  )
}

export default function Moments() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 65%'] })
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="scrap moments" ref={ref}>
      <svg
        className="moments-thread"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {/* A faint dashed track, then the real line drawn over it on scroll.
            They are separate paths because animating pathLength takes over
            strokeDasharray, so one path cannot be both dashed and drawn. */}
        <path
          d={THREAD}
          stroke="var(--paper-edge)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="9 11"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={THREAD}
          stroke="var(--ink-faint)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={reduced ? { pathLength: 1 } : { pathLength: drawn }}
        />
      </svg>

      <ol className="moments-list">
        {moments.map((moment, i) => (
          <Moment key={moment.photo} moment={moment} index={i} />
        ))}
      </ol>
    </section>
  )
}
