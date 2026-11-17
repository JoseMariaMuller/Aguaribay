import { FaWhatsapp } from 'react-icons/fa'
import { hotel, nav } from '../data.js'
import { waLink } from '../lib/links.js'
import { Logo, Socials } from './ui.jsx'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <Logo className="logo--light" />
          <p>Hotel de sierra en {hotel.city}.</p>
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <ul>
            {nav.map(([href, label]) => (
              <li key={href}><a className="u-link" href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="footer__social">
          <p className="footer__label">Seguinos</p>
          <Socials />
        </div>
      </div>
      <p className="footer__word" aria-hidden="true">{hotel.name}</p>
      <p className="wrap footer__legal">
        © {new Date().getFullYear()} Hotel {hotel.name}. Sitio de muestra: nombres, precios y opiniones son ficticios.
      </p>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={waLink('Hola, quiero hacer una consulta.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp (se abre en otra pestaña)"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  )
}
