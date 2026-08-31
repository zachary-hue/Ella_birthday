import { motion, useReducedMotion } from 'motion/react'
import { letter } from '../content'
import { shower } from '../confetti'
import './Letter.css'

export default function Letter() {
  const reduced = useReducedMotion()

  return (
    <section className="section letter" aria-labelledby="letter-heading">
      <motion.h2
        className="section-heading"
        id="letter-heading"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {letter.heading}
      </motion.h2>

      <div className="letter-body">
        <motion.p
          className="letter-greeting"
          initial={reduced ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter.greeting}
        </motion.p>

        {letter.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.p
        className="letter-signoff"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      >
        {letter.signoff}
      </motion.p>

      <p className="letter-signature">{letter.signature}</p>

      <motion.button
        type="button"
        className="letter-encore"
        onClick={() => shower()}
        whileHover={reduced ? undefined : { scale: 1.05, rotate: 1.5 }}
        whileTap={reduced ? undefined : { scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        one more for the road
      </motion.button>

      <footer className="letter-footer">{letter.footerNote}</footer>
    </section>
  )
}
