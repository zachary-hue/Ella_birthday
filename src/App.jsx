import Hero from './components/Hero'
import WishButton from './components/WishButton'
import Moments from './components/Moments'
import Gallery from './components/Gallery'
import Notes from './components/Notes'
import Letter from './components/Letter'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <WishButton />
        <Moments />
        <Gallery />
        <Notes />
        <Letter />
      </main>
    </>
  )
}
