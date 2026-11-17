import { useCallback, useEffect, useState } from 'react'
import { PiArrowLeftLight, PiArrowRightLight } from 'react-icons/pi'

// Estado compartido por los carruseles Embla: slide actual, puntos y flechas.
export function useCarouselState(api) {
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!api) return undefined
    const onInit = () => setSnaps(api.scrollSnapList())
    const onSelect = () => {
      setSelected(api.selectedScrollSnap())
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    onInit()
    onSelect()
    api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    return () => {
      api.off('reInit', onInit).off('reInit', onSelect).off('select', onSelect)
    }
  }, [api])

  const prev = useCallback(() => api?.scrollPrev(), [api])
  const next = useCallback(() => api?.scrollNext(), [api])
  const go = useCallback((i) => api?.scrollTo(i), [api])

  // Flechas del teclado cuando el foco está dentro del carrusel.
  const onKeyDown = useCallback(
    (e) => {
      if (e.target.closest('input, textarea, select')) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    },
    [prev, next],
  )

  return { selected, snaps, canPrev, canNext, prev, next, go, onKeyDown }
}

export function Arrows({ state, label, className = '', loop = false }) {
  return (
    <div className={`arrows ${className}`}>
      <button type="button" className="arrow" onClick={state.prev} disabled={!loop && !state.canPrev} aria-label={`${label} anterior`}>
        <PiArrowLeftLight aria-hidden="true" />
      </button>
      <button type="button" className="arrow" onClick={state.next} disabled={!loop && !state.canNext} aria-label={`${label} siguiente`}>
        <PiArrowRightLight aria-hidden="true" />
      </button>
    </div>
  )
}

export function Dots({ state, label, className = '' }) {
  if (state.snaps.length < 2) return null
  return (
    <div className={`dots ${className}`}>
      {state.snaps.map((_, i) => (
        <button
          key={i}
          type="button"
          className={`dot ${i === state.selected ? 'is-active' : ''}`}
          aria-label={`Ir a ${label} ${i + 1} de ${state.snaps.length}`}
          aria-current={i === state.selected ? 'true' : undefined}
          onClick={() => state.go(i)}
        />
      ))}
    </div>
  )
}
