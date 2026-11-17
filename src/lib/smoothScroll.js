import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion.js'

let lenis = null

// Para pausar el scroll suave cuando hay un menú o un lightbox abierto.
export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked)
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      anchors: { offset: -72 },
      // Elementos con scroll propio (lightbox, carrusel nativo) mantienen su scroll.
      prevent: (node) => node.closest?.('[data-lenis-prevent], dialog') != null,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
