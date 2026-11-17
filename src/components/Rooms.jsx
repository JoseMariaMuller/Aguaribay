import useEmblaCarousel from 'embla-carousel-react'
import { PiRulerLight, PiUsersLight } from 'react-icons/pi'
import { rooms } from '../data.js'
import { money, waLink } from '../lib/links.js'
import { External, Img } from './ui.jsx'
import { Arrows, Dots, useCarouselState } from './Carousel.jsx'

export default function Rooms() {
  const [viewportRef, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', duration: 32 })
  const state = useCarouselState(api)

  return (
    <section className="rooms section" id="habitaciones" aria-labelledby="rooms-title">
      <div className="wrap rooms__head">
        <h2 id="rooms-title" className="display-l" data-split>Cinco maneras de quedarse.</h2>
        <p className="rooms__intro" data-reveal>
          Todas con desayuno, ropa de cama de algodón y ventana a la sierra. Deslizá para ver cada una.
        </p>
        <Arrows state={state} label="Habitación" className="rooms__arrows" />
      </div>

      <div
        className="rooms__carousel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Habitaciones"
        onKeyDown={state.onKeyDown}
      >
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container rooms__track">
            {rooms.map((r, i) => (
              <article
                className="room"
                key={r.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${rooms.length}: ${r.name}`}
              >
                <div className={`room__media ${i % 2 ? '' : 'arch'}`}>
                  <Img photo={r.image} alt={`Habitación ${r.name}`} sizes="(min-width: 960px) 34vw, (min-width: 640px) 55vw, 82vw" draggable="false" />
                  {r.tag && <span className="room__tag">{r.tag}</span>}
                </div>
                <div className="room__body">
                  <h3 className="room__name">{r.name}</h3>
                  <p className="room__desc">{r.desc}</p>
                  <ul className="room__meta">
                    <li><PiRulerLight aria-hidden="true" /> {r.size}</li>
                    <li><PiUsersLight aria-hidden="true" /> {r.guests} {r.guests === 1 ? 'huésped' : 'huéspedes'}</li>
                  </ul>
                  <div className="room__foot">
                    <p className="price">
                      <span className="price__amount">{money(r.price)}</span> por noche
                    </p>
                    <External
                      className="btn btn--line"
                      href={waLink(`Hola, me interesa la habitación ${r.name}.`)}
                      aria-label={`Reservar ${r.name} por WhatsApp (se abre en otra pestaña)`}
                    >
                      Reservar
                    </External>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="wrap rooms__nav">
          <Dots state={state} label="la posición" />
          <p className="rooms__count" aria-hidden="true">
            {String(state.selected + 1).padStart(2, '0')} / {String(state.snaps.length || rooms.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  )
}
