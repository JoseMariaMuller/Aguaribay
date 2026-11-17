import { useEffect, useRef, useState } from 'react'
import { PiListLight, PiXLight } from 'react-icons/pi'
import { nav } from '../data.js'
import { lockScroll } from '../lib/smoothScroll.js'
import { Logo } from './ui.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burger = useRef(null)
  const navRef = useRef(null)

  // Cambia de estado apenas se deja atrás el borde superior (IntersectionObserver, sin escuchar scroll).
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return undefined
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // Menú móvil: bloquea el scroll, deja inerte el resto y se cierra con Escape.
  useEffect(() => {
    const outside = document.querySelectorAll('main, footer, .wa-float')
    outside.forEach((el) => { el.inert = open })
    lockScroll(open)
    if (!open) return undefined
    navRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burger.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 960px)')
    const onMq = () => mq.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      outside.forEach((el) => { el.inert = false })
      lockScroll(false)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bg" aria-hidden="true" />
      <div className="wrap header__in">
        <Logo onClick={close} />
        <nav id="menu" ref={navRef} className="nav" aria-label="Principal">
          <ul className="nav__list">
            {nav.map(([href, label], i) => (
              <li key={href} style={{ '--i': i }}>
                <a className="nav__link u-link" href={href} onClick={close}>{label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn--solid nav__cta" href="#reservar" onClick={close}>
            Reservar
          </a>
        </nav>
        <button
          ref={burger}
          type="button"
          className="burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <PiXLight aria-hidden="true" /> : <PiListLight aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
