import { motion, useReducedMotion } from 'motion/react'
import { letter } from '../content'
import { shower } from '../confetti'
import Doodle from './Doodle'
import './Letter.css'

export default function Letter() {
  const reduced = useReducedMotion()

  return (
    <section className="scrap letter">
      <motion.article
        className="letter-page"
        initial={reduced ? false : { opacity: 0, y: 50, rotate: -2.5, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.8, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 70, damping: 18 }}
      >
        <span className="tape-strip letter-tape" aria-hidden="true" />

        <motion.p
          className="letter-greeting hand"
          initial={reduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter.greeting}
        </motion.p>

        {letter.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            className="letter-para"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraph}
          </motion.p>
        ))}

        <motion.p
          className="letter-signoff hand"
          initial={reduced ? false : { opacity: 0, scale: 0.88, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14 }}
        >
          {letter.signoff}
          <Doodle name="underline" className="letter-underline" color="var(--pink)" width={4} delay={0.3} stretch />
        </motion.p>

        <p className="letter-signature hand">{letter.signature}</p>
      </motion.article>

      <motion.button
        type="button"
        className="letter-encore hand"
        onClick={() => shower()}
        whileHover={reduced ? undefined : { scale: 1.05, rotate: 1.5 }}
        whileTap={reduced ? undefined : { scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {letter.encore}
      </motion.button>

      <footer className="letter-footer hand">{letter.footerNote}</footer>
    </section>
  )
}
