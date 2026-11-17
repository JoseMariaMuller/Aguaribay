import { useRef } from 'react'
import { PiMapPinLight, PiStarFill } from 'react-icons/pi'
import { hero, hotel } from '../data.js'
import { gsap, useGSAP, MOTION_OK, INTRO_DELAY } from '../lib/motion.js'
import { Img } from './ui.jsx'

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const title = q('.hero__title')[0]

        // Zoom lento de la foto + parallax al scrollear.
        gsap.fromTo(q('.hero__img'), { scale: 1.22 }, { scale: 1.06, duration: 3.2, ease: 'power2.out', delay: INTRO_DELAY - 0.3 })
        gsap.to(q('.hero__media'), {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(q('.hero__content'), {
          yPercent: -12,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })

        // Titular: cada línea entra con fade + leve subida. Sin máscaras, así no se recorta ninguna letra.
        // Arranca en opacity 0.001 (no 0) para que el navegador lo cuente como pintado y no retrase el LCP.
        gsap.from(title.querySelectorAll('.hero__line'), {
          y: 36,
          opacity: 0.001,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: INTRO_DELAY,
          clearProps: 'transform,opacity',
        })

        // Solo transform (sin opacity) para que el texto se pinte enseguida y no retrase el LCP.
        gsap.from(q('[data-hero-fade]'), {
          y: 32,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.08,
          delay: INTRO_DELAY + 0.3,
          clearProps: 'transform',
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" id="inicio" ref={root} aria-labelledby="hero-title">
      <div className="hero__media">
        <Img className="hero__img" photo={hero.image} alt={hero.imageAlt} sizes="100vw" priority />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="wrap hero__content">
        <p className="hero__place" data-hero-fade>
          <PiMapPinLight aria-hidden="true" /> {hotel.city}
        </p>
        <h1 className="hero__title" id="hero-title">
          {hero.title.map((line) => (
            <span className="hero__line" key={line}>{line}</span>
          ))}
        </h1>
        <div className="hero__aside">
          <p className="hero__lead" data-hero-fade>{hero.lead}</p>
          <div className="hero__actions" data-hero-fade>
            <a className="btn btn--solid" href="#reservar">Consultar fechas</a>
            <a className="u-link hero__link" href="#habitaciones">Ver habitaciones</a>
          </div>
        </div>
        <p className="hero__rating" data-hero-fade>
          <span className="hero__score">
            {hotel.rating} <PiStarFill aria-hidden="true" />
          </span>
          <span>{hotel.reviewsCount} opiniones de huéspedes</span>
        </p>
      </div>
    </section>
  )
}
