import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { wish } from '../content'
import { burst, popFrom } from '../confetti'
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
    <section className="section wish" aria-labelledby="wish-heading">
      <motion.div
        className="wish-inner"
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-heading" id="wish-heading">
          {wish.heading}
        </h2>
        <p className="section-body">{wish.body}</p>

        <motion.div
          className="cake"
          ref={cakeRef}
          aria-hidden="true"
          animate={reduced ? undefined : lit ? { y: [0, -6, 0] } : { y: 0, scale: [1, 0.92, 1] }}
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
                      exit={{ scale: 0, opacity: 0, y: -18 }}
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

        <motion.button
          type="button"
          className="wish-button"
          onClick={makeWish}
          whileHover={reduced ? undefined : { scale: 1.06, rotate: -1.5 }}
          whileTap={reduced ? undefined : { scale: 0.92, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {wishes === 0 ? wish.button : wish.again}
        </motion.button>

        <div className="wish-status" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {wishes > 0 && (
              <motion.p
                key={wishes}
                initial={reduced ? false : { opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <strong>{wish.granted}</strong> <span>{wish.counter(wishes)}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
