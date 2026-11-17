import { useRef } from 'react'
import { day } from '../data.js'
import { gsap, useGSAP, MOTION_OK } from '../lib/motion.js'
import { Img } from './ui.jsx'

/*
  "Un día en Aguaribay": en escritorio la sección queda fija (pin) y los momentos pasan en horizontal.
  En celulares, tablets chicas o con movimiento reducido es una fila con scroll-snap nativo (se desliza con el dedo).
*/
export default function DayScroll() {
  const section = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`(min-width: 960px) and (min-height: 560px) and ${MOTION_OK}`, () => {
        const el = section.current
        el.classList.add('is-pinned')
        const distance = () => track.current.scrollWidth - document.documentElement.clientWidth

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.fromTo(bar.current, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        })
        // Las fotos se desplazan un poco dentro de su marco mientras pasa el carrusel.
        gsap.utils.toArray('.moment__media img', el).forEach((img) => {
          gsap.fromTo(img, { xPercent: -6, scale: 1.14 }, {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          })
        })
        return () => el.classList.remove('is-pinned')
      })
    },
    { scope: section },
  )

  return (
    <div className="day-wrap">
      <section className="day" id="un-dia" ref={section} aria-labelledby="day-title">
        <div className="wrap day__head">
          <h2 id="day-title" className="display-l" data-split>Un día en Aguaribay</h2>
          <p className="day__hint">De la primera luz a la sobremesa, así pasan las horas acá.</p>
        </div>
        <div className="day__viewport">
          <ol className="day__track" ref={track} tabIndex={0} aria-label="Momentos del día, en orden horario">
            {day.map((m, i) => (
              <li className="moment" key={m.time}>
                <div className={`moment__media ${i % 2 ? '' : 'arch'}`}>
                  <Img photo={m.image} alt="" sizes="(min-width: 960px) 40vw, 80vw" draggable="false" />
                </div>
                <div className="moment__text">
                  <p className="moment__time"><time>{m.time}</time></p>
                  <h3 className="moment__title">{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap day__progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </section>
    </div>
  )
}
