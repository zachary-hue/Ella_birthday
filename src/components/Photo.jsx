import { useState } from 'react'
import './Photo.css'

/**
 * A photo that fades in over its own blurred placeholder, so nothing ever
 * pops in against an empty white box.
 */
export default function Photo({ photo, alt = '', sizes, ratio, priority = false, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`photo ${className}`}
      style={{ aspectRatio: ratio ?? `${photo.w} / ${photo.h}`, backgroundImage: `url(${photo.lqip})` }}
    >
      <img
        src={photo.src}
        width={photo.w}
        height={photo.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={loaded ? 'is-loaded' : ''}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
