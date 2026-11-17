import { useEffect, useState } from 'react'
import { hotel } from '../data.js'
import { SHOW_LOADER, LOADER_MS, markIntroSeen } from '../lib/motion.js'
import { LogoMark } from './ui.jsx'

// Pantalla de carga breve (≤ 1,3 s). Es solo visual: no bloquea clics (pointer-events: none),
// el contenido ya está renderizado debajo y se anima solo con CSS (transform/opacity).
export default function Loader() {
  const [visible, setVisible] = useState(SHOW_LOADER)

  useEffect(() => {
    if (!visible) return undefined
    markIntroSeen()
    const t = setTimeout(() => setVisible(false), LOADER_MS)
    return () => clearTimeout(t)
  }, [visible])

  if (!visible) return null
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <LogoMark className="loader__mark" />
        <span className="loader__word">
          {hotel.name.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }}>{ch}</span>
          ))}
        </span>
      </div>
    </div>
  )
}
