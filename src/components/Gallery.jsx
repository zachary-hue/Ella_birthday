import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { gallery, galleryPhotos } from '../content'
import { byId } from '../photos'
import Photo from './Photo'
import Lightbox from './Lightbox'
import './Gallery.css'

// Small fixed rotations so the grid feels hand-placed rather than CSS-placed.
const TILTS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2, -2.6, 1.9, -1.4]

export default function Gallery() {
  const reduced = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(null)
  const photos = galleryPhotos.map((id) => byId[id])

  return (
    <section className="section gallery" aria-labelledby="gallery-heading">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-heading" id="gallery-heading">
          {gallery.heading}
        </h2>
        <p className="section-body">{gallery.body}</p>
      </motion.div>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <motion.button
            type="button"
            key={photo.id}
            className="gallery-item"
            style={{ opacity: openIndex === i ? 0 : 1 }}
            layoutId={`shot-${photo.id}`}
            onClick={() => setOpenIndex(i)}
            initial={reduced ? false : { opacity: 0, y: 60, scale: 0.85, rotate: TILTS[i % TILTS.length] * 3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: TILTS[i % TILTS.length] }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 110, damping: 15, delay: (i % 3) * 0.09 }}
            whileHover={reduced ? undefined : { scale: 1.05, rotate: 0, y: -10, zIndex: 2 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
          >
            <Photo photo={photo} sizes="(max-width: 700px) 45vw, 340px" />
            <span className="gallery-glow" aria-hidden="true" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(next) => setOpenIndex((next + photos.length) % photos.length)}
      />
    </section>
  )
}
