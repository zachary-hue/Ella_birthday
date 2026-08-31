import { motion, useReducedMotion } from 'motion/react'
import Photo from './Photo'
import './TapedPhoto.css'

/**
 * A photo stuck to the page: polaroid frame, a strip of tape, and a caption
 * in somebody's handwriting. `tilt` is degrees, `tape` picks the tape layout.
 */
export default function TapedPhoto({
  photo,
  caption,
  tilt = 0,
  tape = 'corners',
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
      className={`taped tape-${tape} ${onClick ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
      layoutId={layoutId}
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

      {caption && <figcaption className="taped-caption hand">{caption}</figcaption>}
    </Wrapper>
  )
}
