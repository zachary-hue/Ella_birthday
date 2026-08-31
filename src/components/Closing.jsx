import { motion, useReducedMotion } from 'motion/react'
import { closing } from '../content'
import { shower } from '../confetti'
import './Closing.css'

export default function Closing() {
  const reduced = useReducedMotion()

  return (
    <section className="section closing" aria-labelledby="closing-heading">
      <motion.h2
        className="section-heading"
        id="closing-heading"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {closing.heading}
      </motion.h2>

      <div className="closing-lines">
        {closing.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={reduced ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        className="closing-signoff"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      >
        {closing.signoff}
      </motion.p>

      <p className="closing-signature">{closing.signature}</p>

      <motion.button
        type="button"
        className="closing-encore"
        onClick={() => shower()}
        whileHover={reduced ? undefined : { scale: 1.05, rotate: 1.5 }}
        whileTap={reduced ? undefined : { scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        one more for the road
      </motion.button>

      <footer className="closing-footer">{closing.footerNote}</footer>
    </section>
  )
}
