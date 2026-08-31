import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Photo from './Photo'
import './Lightbox.css'

const SWIPE_THRESHOLD = 90

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const reduced = useReducedMotion()
  const isOpen = index !== null
  const photo = isOpen ? photos[index] : null

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(index + 1)
      if (e.key === 'ArrowLeft') onNavigate(index - 1)
    }

    document.addEventListener('keydown', onKey)
    // Stop the page scrolling behind the overlay.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, index, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.figure
            className="lightbox-figure"
            layoutId={`shot-${photo.id}`}
            onClick={(e) => e.stopPropagation()}
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) onNavigate(index + 1)
              else if (info.offset.x > SWIPE_THRESHOLD) onNavigate(index - 1)
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <Photo photo={photo} alt={`Photo ${index + 1} of ${photos.length}`} priority sizes="90vw" />
          </motion.figure>

          <motion.div
            className="lightbox-chrome"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="lb-arrow" onClick={() => onNavigate(index - 1)} aria-label="Previous photo">
              ←
            </button>
            <span className="lb-count">
              {index + 1} / {photos.length}
            </span>
            <button type="button" className="lb-arrow" onClick={() => onNavigate(index + 1)} aria-label="Next photo">
              →
            </button>
          </motion.div>

          <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
