import { useRef } from 'react'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Booking from './components/Booking.jsx'
import { About, Marquee } from './components/About.jsx'
import Rooms from './components/Rooms.jsx'
import Services from './components/Services.jsx'
import DayScroll from './components/DayScroll.jsx'
import Gallery from './components/Gallery.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import { Footer, WhatsAppFloat } from './components/Footer.jsx'
import { useSmoothScroll } from './lib/smoothScroll.js'
import { useScrollAnimations } from './lib/useScrollAnimations.js'

export default function App() {
  const main = useRef(null)
  useSmoothScroll()
  useScrollAnimations(main)

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div id="top-sentinel" aria-hidden="true" />
      <Loader />
      <Header />
      <main id="contenido" ref={main} tabIndex={-1}>
        <Hero />
        <Booking />
        <About />
        <Marquee />
        <Rooms />
        <Services />
        <DayScroll />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
