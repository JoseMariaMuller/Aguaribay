import {
  PiSwimmingPoolLight, PiCoffeeLight, PiFlowerLotusLight, PiWifiHighLight,
  PiCarLight, PiPawPrintLight, PiForkKnifeLight, PiMountainsLight,
} from 'react-icons/pi'
import { services, servicesIntro } from '../data.js'
import { Img } from './ui.jsx'

const icons = {
  pool: PiSwimmingPoolLight, coffee: PiCoffeeLight, spa: PiFlowerLotusLight, wifi: PiWifiHighLight,
  car: PiCarLight, paw: PiPawPrintLight, food: PiForkKnifeLight, hike: PiMountainsLight,
}

export default function Services() {
  return (
    <section className="services" id="servicios" aria-labelledby="services-title">
      <div className="services__panel" data-scale-in>
        <div className="wrap services__grid">
          <div className="services__media">
            <figure className="arch services__arch" data-img>
              <Img photo={servicesIntro.image} alt={servicesIntro.imageAlt} sizes="(min-width: 960px) 36vw, 90vw" data-parallax="10" />
            </figure>
          </div>
          <div className="services__body">
            <h2 id="services-title" className="display-l" data-split>{servicesIntro.title}</h2>
            <ul className="services__list">
              {services.map((s) => {
                const Icon = icons[s.icon] ?? PiMountainsLight
                return (
                  <li key={s.title} className="service" data-reveal>
                    <Icon className="service__icon" aria-hidden="true" />
                    <div>
                      <h3 className="service__title">{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
