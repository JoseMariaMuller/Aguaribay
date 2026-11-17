import { about, hotel, stats, marquee } from '../data.js'
import { formatNumber } from '../lib/motion.js'
import { Img } from './ui.jsx'

export function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <h2 id="about-title" className="about__title display-l" data-split>{about.title}</h2>

        <figure className="about__arch arch" data-img>
          <Img photo={about.image} alt={about.imageAlt} sizes="(min-width: 960px) 30vw, 70vw" data-parallax="8" />
        </figure>

        <div className="about__text">
          {about.text.map((p) => <p key={p} data-reveal>{p}</p>)}
          <p className="about__hours" data-reveal>
            Check-in desde las <strong>{hotel.checkIn}</strong>, check-out hasta las <strong>{hotel.checkOut}</strong>.
          </p>
        </div>

        <figure className="about__small" data-img>
          <Img photo={about.image2} alt={about.image2Alt} sizes="(min-width: 960px) 22vw, 50vw" />
        </figure>
      </div>

      <dl className="wrap stats">
        {stats.map((s) => {
          const final = formatNumber(s.value, s.decimals) + s.suffix
          return (
            <div className="stat" key={s.label} data-reveal>
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__value">
                <span
                  aria-hidden="true"
                  data-count
                  data-value={s.value}
                  data-decimals={s.decimals}
                  data-suffix={s.suffix}
                >
                  {final}
                </span>
                <span className="sr-only">{final}</span>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

// Cinta infinita. La segunda copia es decorativa (aria-hidden) para que el loop no tenga cortes.
export function Marquee() {
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {marquee.map((t) => (
        <li key={t}>
          <span>{t}</span>
          <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><circle cx="6" cy="6" r="4" /></svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" role="region" aria-label="Lo que incluye tu estadía">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
