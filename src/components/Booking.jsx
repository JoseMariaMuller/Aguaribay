import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { hotel, rooms } from '../data.js'
import { openWhatsApp } from '../lib/links.js'

const iso = (d) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return z.toISOString().slice(0, 10)
}
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s))
const nice = (s) => s.split('-').reverse().join('/')
const GUESTS = [1, 2, 3, 4, 5, 6]

function validate(f, today) {
  const e = {}
  if (!isDate(f.desde)) e.desde = 'Elegí la fecha de ingreso.'
  else if (f.desde < today) e.desde = 'La fecha de ingreso no puede ser anterior a hoy.'
  if (!isDate(f.hasta)) e.hasta = 'Elegí la fecha de salida.'
  else if (isDate(f.desde) && f.hasta <= f.desde) e.hasta = 'La salida tiene que ser posterior al ingreso.'
  else if (isDate(f.desde) && (Date.parse(f.hasta) - Date.parse(f.desde)) / 864e5 > 30) e.hasta = 'Para estadías de más de 30 noches escribinos directamente.'
  if (!GUESTS.includes(Number(f.personas))) e.personas = 'Elegí entre 1 y 6 huéspedes.'
  if (!rooms.some((r) => r.name === f.tipo)) e.tipo = 'Elegí una habitación de la lista.'
  return e
}

export default function Booking() {
  const today = iso(new Date())
  const [f, setF] = useState({ desde: '', hasta: '', personas: '2', tipo: rooms[0].name })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(f, today)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`b-${first}`)?.focus()
      return
    }
    openWhatsApp(
      `Hola, quiero consultar disponibilidad en Hotel ${hotel.name}.\n` +
        `Ingreso: ${nice(f.desde)}\nSalida: ${nice(f.hasta)}\nHuéspedes: ${Number(f.personas)}\nHabitación: ${f.tipo}`,
    )
  }

  const field = (id, label, input) => (
    <div className={`field ${errors[id] ? 'has-error' : ''}`}>
      <label htmlFor={`b-${id}`}>{label}</label>
      {input}
      {errors[id] && <p className="field__error" id={`b-${id}-err`}>{errors[id]}</p>}
    </div>
  )
  const aria = (id) => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `b-${id}-err` : undefined })

  return (
    <section className="booking" id="reservar" aria-labelledby="booking-title">
      <div className="wrap booking__in">
        <div className="booking__head" data-reveal>
          <h2 id="booking-title" className="booking__title">Consultá disponibilidad</h2>
          <p>Te respondemos por WhatsApp, en general en menos de una hora.</p>
        </div>
        <form className="booking__form" onSubmit={submit} noValidate data-reveal>
          {field('desde', 'Ingreso',
            <input id="b-desde" type="date" min={today} required value={f.desde} onChange={set('desde')} {...aria('desde')} />)}
          {field('hasta', 'Salida',
            <input id="b-hasta" type="date" min={f.desde || today} required value={f.hasta} onChange={set('hasta')} {...aria('hasta')} />)}
          {field('personas', 'Huéspedes',
            <select id="b-personas" value={f.personas} onChange={set('personas')} {...aria('personas')}>
              {GUESTS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>)}
          {field('tipo', 'Habitación',
            <select id="b-tipo" value={f.tipo} onChange={set('tipo')} {...aria('tipo')}>
              {rooms.map((r) => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>)}
          <button type="submit" className="btn btn--wa booking__submit">
            <FaWhatsapp aria-hidden="true" /> Consultar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
