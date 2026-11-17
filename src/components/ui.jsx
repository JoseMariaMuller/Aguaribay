import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { hotel } from '../data.js'
import { waLink } from '../lib/links.js'

// Imagen con srcset, tamaño intrínseco (evita saltos) y lazy loading por defecto.
export function Img({ photo, alt, sizes = '100vw', priority = false, className, ...rest }) {
  return (
    <img
      sizes={photo.srcSet ? sizes : undefined}
      srcSet={photo.srcSet}
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      {...rest}
    />
  )
}

// Marca: un arco de galería con tres frutos de aguaribay colgando.
export function LogoMark({ className = '' }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M6 38V18a14 14 0 0 1 28 0v20" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M20 6v14" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="23" r="2.6" className="logo-mark__berry" />
      <circle cx="15.5" cy="27.5" r="2.2" className="logo-mark__berry" />
      <circle cx="24.5" cy="27.5" r="2.2" className="logo-mark__berry" />
    </svg>
  )
}

export function Logo({ onClick, className = '' }) {
  return (
    <a href="#inicio" className={`logo ${className}`} onClick={onClick} aria-label={`Hotel ${hotel.name}, ir al inicio`}>
      <LogoMark />
      <span className="logo__word">{hotel.name}</span>
    </a>
  )
}

export function External({ children, ...rest }) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export function Socials({ className = '' }) {
  const items = [
    [waLink('Hola, quiero hacer una consulta.'), 'WhatsApp', FaWhatsapp],
    [hotel.social.facebook, 'Facebook', FaFacebookF],
    [hotel.social.instagram, 'Instagram', FaInstagram],
    [hotel.social.tiktok, 'TikTok', FaTiktok],
    [hotel.social.youtube, 'YouTube', FaYoutube],
  ]
  return (
    <ul className={`socials ${className}`}>
      {items.map(([href, label, Icon]) => (
        <li key={label}>
          <External href={href} aria-label={`${label} (se abre en otra pestaña)`} title={label}>
            <Icon aria-hidden="true" />
          </External>
        </li>
      ))}
    </ul>
  )
}
