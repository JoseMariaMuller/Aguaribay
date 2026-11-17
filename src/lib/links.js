import { hotel } from '../data.js'

export const money = (n) => '$ ' + n.toLocaleString('es-AR')

// Todo lo que va a WhatsApp pasa por encodeURIComponent.
export const waLink = (text) =>
  `https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`

// Saca caracteres de control (deja saltos de línea) y recorta el largo.
export const clean = (value, max = 500) =>
  String(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max)

export function openWhatsApp(text) {
  const win = window.open(waLink(text), '_blank', 'noopener,noreferrer')
  if (win) win.opener = null
}
