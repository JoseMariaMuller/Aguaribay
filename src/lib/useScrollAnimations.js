import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, formatNumber } from './motion.js'

/*
  Orquestador de animaciones de scroll. Se declaran en el HTML con atributos:
    data-split          título que se revela por líneas
    data-reveal         texto que aparece con fade + leve subida
    data-img            imagen (o su marco) que aparece con fade + leve subida
    data-parallax="10"  desplazamiento vertical suave, en % (dentro de un contenedor con overflow hidden)
    data-count          contador animado (data-value, data-decimals, data-suffix)
    data-scale-in       la sección "crece" al entrar

  Reglas para que nada parpadee:
  - El estado oculto se aplica UNA vez, al montar y antes de pintar, y solo a elementos que todavía
    están debajo de la pantalla. Lo que ya se ve al cargar se muestra directo, sin animación.
    (Antes el estado oculto se ponía recién en onEnter, cuando el elemento ya era visible: se veía,
    desaparecía y volvía a aparecer.)
  - Cada elemento se anima una sola vez (once: true) con un tween independiente del ScrollTrigger:
    ni scroll hacia arriba ni ScrollTrigger.refresh() lo revierten. Al terminar se limpian los estilos
    inline y queda visible por CSS.
  - Si el JS falla, nada se oculta: todo es visible por CSS.
  - Con prefers-reduced-motion no se registra nada.
*/

const START = 'top 92%'

// ¿Está debajo del borde inferior de la pantalla? (lo que ya se ve, o quedó arriba, no se anima)
const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight

function revealOnce(elements, from, to) {
  const pending = elements.filter(belowFold)
  if (!pending.length) return
  gsap.set(pending, from)
  ScrollTrigger.batch(pending, {
    start: START,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { ...to, stagger: 0.08, overwrite: true, clearProps: Object.keys(from).join(',') }),
  })
}

export function useScrollAnimations(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope)

        // Imágenes: fade + leve desplazamiento, 0,8 s.
        revealOnce(q('[data-img]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })

        // Textos.
        revealOnce(q('[data-reveal]'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })

        // Títulos por líneas. autoSplit vuelve a dividir al cargar fuentes o cambiar el ancho:
        // si el título ya se reveló, no se repite la animación.
        q('[data-split]').filter(belowFold).forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) => {
              if (el.dataset.revealed) return undefined
              return gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: START, once: true },
                onStart: () => { el.dataset.revealed = '1' },
              })
            },
          })
        })

        // Contadores: solo los que todavía no se ven arrancan en 0.
        q('[data-count]').filter(belowFold).forEach((el) => {
          const value = Number(el.dataset.value)
          const decimals = Number(el.dataset.decimals) || 0
          const suffix = el.dataset.suffix || ''
          const counter = { v: 0 }
          const render = () => { el.textContent = formatNumber(counter.v, decimals) + suffix }
          render()
          ScrollTrigger.create({
            trigger: el,
            start: START,
            once: true,
            onEnter: () => gsap.to(counter, { v: value, duration: 1.6, ease: 'power2.out', onUpdate: render }),
          })
        })

        // Parallax suave (solo transform, acompaña al scroll; nunca oculta la imagen).
        q('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 10
          gsap.fromTo(
            el,
            { yPercent: -amount, scale: 1 + amount / 50 },
            {
              yPercent: amount,
              scale: 1 + amount / 50,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        q('[data-scale-in]').forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.94 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true },
            },
          )
        })
      })

      // Recalcular posiciones cuando terminan de cargar fuentes e imágenes.
      // Es seguro: las animaciones de entrada no dependen del ScrollTrigger una vez disparadas.
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      document.fonts?.ready.then(refresh)
      return () => window.removeEventListener('load', refresh)
    },
    { scope },
  )
}
