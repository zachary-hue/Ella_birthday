import { motion, useReducedMotion } from 'motion/react'
import { traits, traitsSection } from '../content'
import './Traits.css'

const ACCENTS = ['var(--lemon)', 'var(--mint)', 'var(--pink)', 'var(--lilac)']

export default function Traits() {
  const reduced = useReducedMotion()

  return (
    <section className="section traits" aria-labelledby="traits-heading">
      <motion.h2
        className="section-heading"
        id="traits-heading"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {traitsSection.heading}
      </motion.h2>

      <ul className="traits-grid">
        {traits.map((trait, i) => (
          <motion.li
            key={trait.label}
            className="trait-card"
            style={{ '--accent': ACCENTS[i % ACCENTS.length] }}
            initial={reduced ? false : { opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 130, damping: 15, delay: i * 0.1 }}
            whileHover={reduced ? undefined : { y: -8, rotate: i % 2 ? 1.2 : -1.2 }}
          >
            <span className="trait-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{trait.label}</h3>
            <p>{trait.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
