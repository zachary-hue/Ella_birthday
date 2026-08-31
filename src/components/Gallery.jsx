import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { galleryAside, galleryPhotos } from '../content'
import { byId } from '../photos'
import TapedPhoto from './TapedPhoto'
import Lightbox from './Lightbox'
import Doodle from './Doodle'
import './Gallery.css'

export default function Gallery() {
  const reduced = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(null)
  const photos = galleryPhotos.map((entry) => byId[entry.photo])

  return (
    <section className="scrap gallery">
      <div className="gallery-aside">
        <motion.p
          className="hand"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {galleryAside}
        </motion.p>
        <Doodle name="burst" className="gallery-burst" color="var(--tangerine)" width={3} delay={0.35} />
      </div>

      <div className="gallery-wall">
        {galleryPhotos.map((entry, i) => (
          <TapedPhoto
            key={entry.photo}
            photo={byId[entry.photo]}
            caption={entry.caption}
            tilt={entry.tilt}
            tape={i % 4 === 0 ? 'single' : i % 3 === 0 ? 'top' : 'corners'}
            sizes="(max-width: 700px) 82vw, 320px"
            layoutId={`shot-${entry.photo}`}
            onClick={() => setOpenIndex(i)}
            className="gallery-item"
            style={{ opacity: openIndex === i ? 0 : 1, rotate: reduced ? 0 : entry.tilt }}
            initial={reduced ? false : { opacity: 0, y: 54, scale: 0.88, rotate: entry.tilt * 3.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: entry.tilt }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 115, damping: 15, delay: (i % 3) * 0.08 }}
          />
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
