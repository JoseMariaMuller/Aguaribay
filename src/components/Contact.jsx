import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { PiEnvelopeSimpleLight, PiMapPinLight, PiPhoneLight } from 'react-icons/pi'
import { hotel, contactMap } from '../data.js'
import { clean, mapsLink, openWhatsApp } from '../lib/links.js'
import { External, Img } from './ui.jsx'

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/
const LIMITS = { nombre: 80, email: 120, mensaje: 1000 }

function validate(v) {
  const e = {}
  if (v.nombre.length < 2) e.nombre = 'Escribí tu nombre (al menos 2 letras).'
  if (!EMAIL.test(v.email)) e.email = 'Revisá el email: tiene que tener el formato nombre@dominio.com.'
  if (v.mensaje.length < 10) e.mensaje = 'Contanos un poco más (al menos 10 caracteres).'
  return e
}

export default function Contact() {
  const [v, setV] = useState({ nombre: '', email: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value.slice(0, LIMITS[k]) })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
    setSent(false)
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      nombre: clean(v.nombre, LIMITS.nombre).replace(/\s+/g, ' '),
      email: clean(v.email, LIMITS.email),
      mensaje: clean(v.mensaje, LIMITS.mensaje),
    }
    const found = validate(data)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`c-${first}`)?.focus()
      return
    }
    openWhatsApp(`Hola, soy ${data.nombre} (${data.email}).\n\n${data.mensaje}`)
    setSent(true)
  }

  const aria = (id) => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `c-${id}-err` : undefined })
  const error = (id) => errors[id] && <p className="field__error" id={`c-${id}-err`}>{errors[id]}</p>

  return (
    <section className="contact section" id="contacto" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div className="contact__info">
          <h2 id="contact-title" className="display-l" data-split>¿Venís? Escribinos.</h2>
          <ul className="contact__list" data-reveal>
            <li><PiMapPinLight aria-hidden="true" /> <External className="u-link" href={mapsLink}>{hotel.address}</External></li>
            <li><PiPhoneLight aria-hidden="true" /> <a className="u-link" href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}>{hotel.phone}</a></li>
            <li><PiEnvelopeSimpleLight aria-hidden="true" /> <a className="u-link" href={`mailto:${hotel.email}`}>{hotel.email}</a></li>
          </ul>
          <External className="map" href={mapsLink} aria-label="Abrir en Google Maps (se abre en otra pestaña)">
            <span className="map__frame" data-img>
              <Img photo={contactMap} alt="" sizes="(min-width: 960px) 45vw, 92vw" />
            </span>
            <span className="map__pill"><PiMapPinLight aria-hidden="true" /> Abrir en Google Maps</span>
          </External>
        </div>

        <form className="contact__form" onSubmit={submit} noValidate data-reveal>
          <div className={`field ${errors.nombre ? 'has-error' : ''}`}>
            <label htmlFor="c-nombre">Nombre</label>
            <input id="c-nombre" type="text" required autoComplete="name" maxLength={LIMITS.nombre} value={v.nombre} onChange={set('nombre')} {...aria('nombre')} />
            {error('nombre')}
          </div>
          <div className={`field ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="c-email">Email</label>
            <input id="c-email" type="email" required autoComplete="email" inputMode="email" maxLength={LIMITS.email} value={v.email} onChange={set('email')} {...aria('email')} />
            {error('email')}
          </div>
          <div className={`field ${errors.mensaje ? 'has-error' : ''}`}>
            <label htmlFor="c-mensaje">Mensaje</label>
            <textarea id="c-mensaje" rows="5" required maxLength={LIMITS.mensaje} value={v.mensaje} onChange={set('mensaje')} {...aria('mensaje')} />
            <p className="field__hint" aria-hidden="true">{v.mensaje.length} / {LIMITS.mensaje}</p>
            {error('mensaje')}
          </div>
          <button type="submit" className="btn btn--wa">
            <FaWhatsapp aria-hidden="true" /> Enviar por WhatsApp
          </button>
          <p className="notice" role="status">
            {sent ? 'Listo: abrimos WhatsApp con tu mensaje. Si no se abrió, revisá el bloqueador de ventanas.' : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
