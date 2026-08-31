import { motion, useReducedMotion } from 'motion/react'
import Photo from './Photo'
import './TapedPhoto.css'

/**
 * A photo stuck to the page: polaroid frame, a strip of tape, and a caption
 * in somebody's handwriting. `note` adds a smaller scribbled line under it.
 * `tilt` is degrees, `tape` picks the tape layout.
 */
export default function TapedPhoto({
  photo,
  caption,
  note,
  tilt = 0,
  tape = 'corners',
  sway = false,
  swaySeconds = 6,
  ratio,
  sizes,
  priority = false,
  onClick,
  layoutId,
  className = '',
  ...motionProps
}) {
  const reduced = useReducedMotion()
  const Wrapper = onClick ? motion.button : motion.figure

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      className={`taped tape-${tape} ${sway && !reduced ? 'is-swaying' : ''} ${onClick ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
      layoutId={layoutId}
      data-sway={sway ? swaySeconds : undefined}
      style={{ rotate: reduced ? 0 : tilt }}
      whileHover={reduced || !onClick ? undefined : { rotate: 0, scale: 1.03, y: -6 }}
      whileTap={onClick && !reduced ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      <span className="tape-strip tape-a" aria-hidden="true" />
      <span className="tape-strip tape-b" aria-hidden="true" />

      <div className="taped-window">
        <Photo photo={photo} alt={caption ?? ''} ratio={ratio} sizes={sizes} priority={priority} />
      </div>

      {(caption || note) && (
        <figcaption className="taped-caption hand">
          {caption}
          {note && <span className="taped-note">{note}</span>}
        </figcaption>
      )}
    </Wrapper>
  )
}
