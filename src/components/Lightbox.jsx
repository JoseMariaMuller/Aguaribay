import { useEffect, useRef } from 'react'
import { PiArrowLeftLight, PiArrowRightLight, PiXLight } from 'react-icons/pi'
import { lockScroll } from '../lib/smoothScroll.js'

/*
  Lightbox sobre <dialog> nativo: atrapa el foco, se cierra con Escape y queda por encima de todo.
  Teclado: ← → para navegar, Inicio / Fin para la primera y la última.
  Gestos: deslizar a los lados para cambiar de foto, hacia abajo para cerrar.
*/
export default function Lightbox({ images, index, onChange, onClose }) {
  const dialog = useRef(null)
  const start = useRef(null)
  const total = images.length
  const current = images[index]

  const go = (delta) => onChange((index + delta + total) % total)

  useEffect(() => {
    const d = dialog.current
    if (!d.open) d.showModal()
    lockScroll(true)
    return () => {
      lockScroll(false)
      if (d.open) d.close()
    }
  }, [])

  // Precargar la anterior y la siguiente para que la navegación sea instantánea.
  useEffect(() => {
    ;[index - 1, index + 1].forEach((i) => {
      const g = images[(i + total) % total]
      const im = new Image()
      im.src = g.src
    })
  }, [index, images, total])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    else if (e.key === 'Home') { e.preventDefault(); onChange(0) }
    else if (e.key === 'End') { e.preventDefault(); onChange(total - 1) }
  }

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return
    start.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose()
  }

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Galería de fotos"
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { start.current = null }}>
        <figure className="lightbox__figure" key={current.src}>
          <img
            src={current.src}
            srcSet={current.srcSet}
            sizes="92vw"
            width={current.width}
            height={current.height}
            alt={current.alt}
            draggable="false"
          />
          <figcaption>
            <span>{current.alt}</span>
            <span className="lightbox__count" aria-live="polite">Foto {index + 1} de {total}</span>
          </figcaption>
        </figure>
      </div>
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Cerrar galería" autoFocus>
        <PiXLight aria-hidden="true" />
      </button>
      <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Foto anterior">
        <PiArrowLeftLight aria-hidden="true" />
      </button>
      <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Foto siguiente">
        <PiArrowRightLight aria-hidden="true" />
      </button>
    </dialog>
  )
}
