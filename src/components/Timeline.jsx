import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { timeline } from '../content'
import { byId } from '../photos'
import Photo from './Photo'
import './Timeline.css'

function TimelineItem({ item, index }) {
  const reduced = useReducedMotion()
  const fromLeft = index % 2 === 0

  return (
    <li className={`tl-item ${fromLeft ? 'is-left' : 'is-right'}`}>
      <motion.span
        className="tl-dot"
        initial={reduced ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 14 }}
      />

      <motion.div
        className="tl-card"
        initial={reduced ? false : { opacity: 0, x: fromLeft ? -70 : 70, rotate: fromLeft ? -4 : 4, scale: 0.92 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        whileHover={reduced ? undefined : { y: -8, rotate: fromLeft ? -1 : 1 }}
      >
        <div className="tl-photo">
          <Photo photo={byId[item.photo]} alt={item.title} ratio="4 / 5" sizes="(max-width: 860px) 86vw, 380px" />
        </div>
        <div className="tl-text">
          <span className="tl-date">{item.date}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      </motion.div>
    </li>
  )
}

export default function Timeline() {
  const reduced = useReducedMotion()
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 60%'],
  })
  const spineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="section timeline" aria-labelledby="timeline-heading">
      <motion.h2
        className="section-heading"
        id="timeline-heading"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        A few greatest hits
      </motion.h2>

      <div className="tl-wrap" ref={listRef}>
        <div className="tl-spine" aria-hidden="true">
          <motion.div
            className="tl-spine-fill"
            style={reduced ? { scaleY: 1 } : { scaleY: spineScale }}
          />
        </div>

        <ol className="tl-list">
          {timeline.map((item, i) => (
            <TimelineItem key={item.photo} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
