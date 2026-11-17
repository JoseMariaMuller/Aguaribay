import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { gallery } from '../data.js'
import { Img } from './ui.jsx'

// El lightbox se descarga recién cuando alguien abre una foto (o pasa el mouse / enfoca una).
const loadLightbox = () => import('./Lightbox.jsx')
const Lightbox = lazy(loadLightbox)

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const opener = useRef(null)

  const open = (i) => (e) => {
    opener.current = e.currentTarget
    setIndex(i)
  }
  const close = useCallback(() => {
    setIndex(null)
    // Devolver el foco a la foto que abrió el lightbox.
    requestAnimationFrame(() => opener.current?.focus())
  }, [])

  return (
    <section className="gallery-section section" id="galeria" aria-labelledby="gallery-title">
      <div className="wrap gallery__head">
        <h2 id="gallery-title" className="display-l" data-split>Así se ve un día acá.</h2>
        <p data-reveal>Tocá cualquier foto para verla grande.</p>
      </div>
      <ul className="wrap gallery">
        {gallery.map((g, i) => (
          <li key={g.src} className={`gallery__item g${i + 1}`}>
            <button
              type="button"
              className="gallery__btn"
              onClick={open(i)}
              onPointerEnter={loadLightbox}
              onFocus={loadLightbox}
              aria-label={`Ver foto ampliada: ${g.alt}`}
            >
              <span className="gallery__frame" data-img>
                <Img photo={g} alt="" sizes="(min-width: 960px) 40vw, 90vw" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {index !== null && (
        <Suspense fallback={null}>
          <Lightbox images={gallery} index={index} onChange={setIndex} onClose={close} />
        </Suspense>
      )}
    </section>
  )
}
