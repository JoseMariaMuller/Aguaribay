import { useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { PiPauseLight, PiPlayLight, PiStarFill } from 'react-icons/pi'
import { reviews, hotel } from '../data.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { Arrows, Dots, useCarouselState } from './Carousel.jsx'

export default function Reviews() {
  const reduced = useMemo(() => prefersReducedMotion(), [])
  // Con movimiento reducido no hay autoplay.
  const plugins = useMemo(
    () => (reduced ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnFocusIn: false, stopOnMouseEnter: false })]),
    [reduced],
  )
  const [viewportRef, api] = useEmblaCarousel({ loop: true, duration: 38 }, plugins)
  const state = useCarouselState(api)
  // userPaused: el usuario apretó "pausa". Aparte, el pase se detiene mientras el mouse
  // o el foco están sobre el carrusel, y se reanuda al salir (si no está en pausa).
  const [userPaused, setUserPaused] = useState(false)
  const paused = useRef(false)
  paused.current = userPaused

  const autoplay = () => api?.plugins()?.autoplay
  const pause = () => autoplay()?.stop()
  const resume = () => { if (!paused.current) autoplay()?.play() }

  const toggle = () => {
    if (userPaused) {
      setUserPaused(false)
    } else {
      setUserPaused(true)
      pause()
    }
  }
  const playing = !reduced && !userPaused

  return (
    <section className="reviews section" id="opiniones" aria-labelledby="reviews-title">
      <div className="wrap reviews__grid">
        <div className="reviews__side">
          <h2 id="reviews-title" className="display-l" data-split>Lo que cuentan al volver.</h2>
          <p className="reviews__score" data-reveal>
            <span className="reviews__big">{hotel.rating}</span>
            <span>
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <PiStarFill key={i} />)}
              </span>
              promedio de {hotel.reviewsCount} opiniones
            </span>
          </p>
        </div>

        <div
          className="reviews__carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Opiniones de huéspedes"
          onKeyDown={state.onKeyDown}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) resume() }}
        >
          <div className="embla__viewport" ref={viewportRef}>
            <div className="embla__container" aria-live={playing ? 'off' : 'polite'}>
              {reviews.map((r, i) => (
                <figure
                  className="review"
                  key={r.name}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`${i + 1} de ${reviews.length}`}
                >
                  <blockquote className="review__text">
                    <p>{r.text}</p>
                  </blockquote>
                  <figcaption className="review__who">
                    <strong>{r.name}</strong>, {r.from}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="reviews__controls">
            <Dots state={state} label="la opinión" />
            <div className="reviews__buttons">
              {!reduced && (
                <button
                  type="button"
                  className="arrow"
                  onClick={toggle}
                  aria-label={playing ? 'Pausar el pase automático' : 'Reanudar el pase automático'}
                >
                  {playing ? <PiPauseLight aria-hidden="true" /> : <PiPlayLight aria-hidden="true" />}
                </button>
              )}
              <Arrows state={state} label="Opinión" loop />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
