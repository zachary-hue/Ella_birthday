import { motion, useReducedMotion } from 'motion/react'
import { notes, notesAside } from '../content'
import Doodle from './Doodle'
import './Notes.css'

const COLORS = ['#fff3a8', '#c9f5e6', '#ffd3e2', '#e0d6ff']

export default function Notes() {
  const reduced = useReducedMotion()

  return (
    <section className="scrap notes">
      <div className="notes-aside">
        <motion.p
          className="hand"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {notesAside}
        </motion.p>
        <Doodle name="underline" className="notes-underline" color="var(--lilac)" width={3.5} delay={0.3} stretch />
      </div>

      <ul className="notes-wall">
        {notes.map((note, i) => (
          <motion.li
            key={note.label}
            className="sticky"
            style={{ background: COLORS[i % COLORS.length] }}
            initial={reduced ? false : { opacity: 0, y: 44, rotate: note.tilt * 4, scale: 0.86 }}
            whileInView={{ opacity: 1, y: 0, rotate: note.tilt, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 130, damping: 14, delay: i * 0.09 }}
            whileHover={reduced ? undefined : { rotate: 0, scale: 1.04, y: -6 }}
          >
            <span className="sticky-pin" aria-hidden="true" />
            <h3 className="hand">{note.label}</h3>
            <p>{note.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
