import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { wish } from '../content'
import { burst, popFrom } from '../confetti'
import Doodle from './Doodle'
import './WishButton.css'

const CANDLES = [0, 1, 2]

export default function WishButton() {
  const reduced = useReducedMotion()
  const cakeRef = useRef(null)
  const timerRef = useRef(null)
  const [lit, setLit] = useState(true)
  const [wishes, setWishes] = useState(0)

  const makeWish = () => {
    popFrom(cakeRef.current)
    burst()
    setLit(false)
    setWishes((n) => n + 1)

    // Relight so it can be pressed again -- everyone presses it twice.
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setLit(true), 2600)
  }

  return (
    <section className="scrap wish">
      <motion.div
        className="wish-inner"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="cake"
          ref={cakeRef}
          aria-hidden="true"
          animate={reduced ? undefined : lit ? { y: [0, -5, 0] } : { y: 0, scale: [1, 0.93, 1] }}
          transition={lit ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.45 }}
        >
          <div className="cake-candles">
            {CANDLES.map((i) => (
              <span className="candle" key={i}>
                <AnimatePresence>
                  {lit && (
                    <motion.span
                      className="flame"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -16 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.08 }}
                      style={{ animationDelay: `${i * 0.23}s` }}
                    />
                  )}
                </AnimatePresence>
                <span className="candle-smoke" data-on={!lit} />
              </span>
            ))}
          </div>
          <div className="cake-frosting" />
          <div className="cake-tier cake-tier-top" />
          <div className="cake-tier cake-tier-bottom" />
          <div className="cake-plate" />
        </motion.div>

        <div className="wish-aside">
          <p className="hand">{wish.aside}</p>
          <Doodle name="arrow" className="wish-arrow" color="var(--lilac)" width={3.5} />
        </div>

        <motion.button
          type="button"
          className="wish-button hand"
          onClick={makeWish}
          whileHover={reduced ? undefined : { scale: 1.05, rotate: -1.5 }}
          whileTap={reduced ? undefined : { scale: 0.93, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {wishes === 0 ? wish.button : wish.again}
        </motion.button>

        <div className="wish-status hand" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {wishes > 0 && (
              <motion.p
                key={wishes}
                initial={reduced ? false : { opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <strong>{wish.granted}</strong>
                <span>{wish.counter(wishes)}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
