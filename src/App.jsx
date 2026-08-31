import { motion, useScroll, useSpring } from 'motion/react'
import Hero from './components/Hero'
import WishButton from './components/WishButton'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Closing from './components/Closing'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Hero />
      <main>
        <WishButton />
        <Timeline />
        <Gallery />
        <Closing />
      </main>
    </>
  )
}
