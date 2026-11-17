import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)')

// Pantalla de carga: se muestra una sola vez por sesión y nunca con movimiento reducido.
const INTRO_KEY = 'aguaribay-intro'
function decideLoader() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false
  try {
    return !window.sessionStorage.getItem(INTRO_KEY)
  } catch {
    return false
  }
}
export const SHOW_LOADER = decideLoader()
export const LOADER_MS = 1300
// Cuándo arranca la animación del hero (segundos).
export const INTRO_DELAY = SHOW_LOADER ? 0.85 : 0.1
export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    /* modo privado: no pasa nada */
  }
}

export const formatNumber = (v, decimals = 0) =>
  v.toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
