// Todos los datos son FICTICIOS. Cambialos acá y se actualiza todo el sitio.

// Imágenes de muestra (picsum.photos). Reemplazá por fotos reales:
// poné tus archivos en /public/fotos y usá por ejemplo  photo('/fotos/hero.jpg', 1600, 1000)
// (si el primer argumento empieza con "/", se usa tal cual y sin srcset).
export const img = (seed, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}.webp`

// Devuelve src + srcset + tamaño intrínseco, para que las fotos no "salten" al cargar.
export const photo = (seed, w, h) => {
  if (seed.startsWith('/')) return { src: seed, width: w, height: h }
  const widths = [0.4, 0.7, 1].map((k) => Math.round(w * k))
  return {
    src: img(seed, w, h),
    srcSet: widths.map((cw) => `${img(seed, cw, Math.round((cw * h) / w))} ${cw}w`).join(', '),
    width: w,
    height: h,
  }
}

export const hotel = {
  name: 'Aguaribay',
  city: 'Capilla del Monte, Córdoba',
  address: 'Av. Los Aromos 1280, Capilla del Monte, Córdoba',
  phone: '+54 9 3548 55-0142',
  whatsapp: '5493548550142', // solo números, con código de país
  email: 'hola@hotelaguaribay.example',
  checkIn: '14:00',
  checkOut: '10:30',
  rating: '4,8',
  reviewsCount: 612,
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    youtube: 'https://youtube.com/',
  },
}

export const nav = [
  ['#habitaciones', 'Habitaciones'],
  ['#servicios', 'Servicios'],
  ['#un-dia', 'Un día acá'],
  ['#galeria', 'Galería'],
  ['#contacto', 'Contacto'],
]

export const hero = {
  // Cada elemento es una línea del titular (se revela de a una).
  title: ['Dormí al pie', 'del Uritorco.'],
  lead: 'Un hotel de sierra de 24 habitaciones, con pileta climatizada, desayuno casero y el cerro asomando por la ventana.',
  image: photo('aguaribay-hero', 1920, 1200),
  imageAlt: 'Fachada del hotel entre árboles, con el cerro de fondo',
}

export const about = {
  title: 'Una casona de 1987 que nunca dejó de ser casa.',
  text: [
    'La levantó la familia Ferreyra con piedra de la zona y la seguimos atendiendo nosotros.',
    'Acá el desayuno se sirve sin apuro, la siesta se respeta y a la tardecita siempre hay mate en la galería.',
  ],
  image: photo('aguaribay-galeria-arcos', 900, 1200),
  imageAlt: 'Galería de la casona con sillones de mimbre',
  image2: photo('aguaribay-piedra', 800, 600),
  image2Alt: 'Muro de piedra con enredadera',
}

// value: número que se anima; decimals: decimales a mostrar; suffix: texto pegado al número.
export const stats = [
  { value: 38, decimals: 0, suffix: '', label: 'años recibiendo viajeros' },
  { value: 24, decimals: 0, suffix: '', label: 'habitaciones con vista' },
  { value: 4.8, decimals: 1, suffix: '', label: 'puntaje de huéspedes' },
  { value: 900, decimals: 0, suffix: ' m', label: 'del centro del pueblo' },
]

// Frases de la cinta infinita.
export const marquee = [
  'Pileta climatizada todo el año',
  'Desayuno serrano con pan casero',
  'Mate en la galería',
  'Excursiones al Uritorco',
  'Cochera cubierta',
  'Pet friendly',
  'Cocina de sierra en El Molle',
]

export const rooms = [
  {
    id: 'doble',
    name: 'Doble Sierra',
    desc: 'Cama queen, balcón al jardín y ducha de lluvia. La favorita de las parejas.',
    size: '28 m²',
    guests: 2,
    price: 98000,
    image: photo('aguaribay-doble', 900, 1100),
  },
  {
    id: 'suite',
    name: 'Suite Uritorco',
    desc: 'Ventanal al cerro, hidromasaje para dos y estar con hogar a leña.',
    size: '42 m²',
    guests: 2,
    price: 145000,
    tag: 'Más elegida',
    image: photo('aguaribay-suite', 900, 1100),
  },
  {
    id: 'familiar',
    name: 'Familiar Los Mogotes',
    desc: 'Dos ambientes comunicados, cocina equipada y galería con parrilla propia.',
    size: '55 m²',
    guests: 4,
    price: 172000,
    image: photo('aguaribay-familiar', 900, 1100),
  },
  {
    id: 'peperina',
    name: 'Single Peperina',
    desc: 'Para viajar liviano: cama de una plaza y media, escritorio y ventana al aromo.',
    size: '18 m²',
    guests: 1,
    price: 72000,
    image: photo('aguaribay-single', 900, 1100),
  },
  {
    id: 'cabana',
    name: 'Cabaña Ongamira',
    desc: 'Aparte del edificio, entre molles: deck propio, kitchenette y silencio total.',
    size: '48 m²',
    guests: 3,
    price: 158000,
    tag: 'Nueva',
    image: photo('aguaribay-cabana', 900, 1100),
  },
]

export const services = [
  { icon: 'pool', title: 'Pileta climatizada', text: 'Abierta todo el año, de 9 a 21 h.' },
  { icon: 'coffee', title: 'Desayuno serrano', text: 'Pan casero, dulces de la zona y café de filtro.' },
  { icon: 'spa', title: 'Spa y masajes', text: 'Sauna seco, ducha escocesa y sala de relax.' },
  { icon: 'wifi', title: 'Wi-Fi 300 megas', text: 'En habitaciones, jardín y pileta.' },
  { icon: 'car', title: 'Cochera cubierta', text: 'Un lugar por habitación, sin cargo.' },
  { icon: 'paw', title: 'Pet friendly', text: 'Tu perro es bienvenido en planta baja.' },
  { icon: 'food', title: 'Restaurante El Molle', text: 'Cocina de sierra: cabrito, trucha y pastas.' },
  { icon: 'hike', title: 'Excursiones', text: 'Uritorco, Los Terrones y Ongamira con guía.' },
]

export const servicesIntro = {
  title: 'Todo incluido en la tarifa, salvo el spa y el restaurante.',
  image: photo('aguaribay-pileta', 900, 1200),
  imageAlt: 'Pileta climatizada rodeada de jardín',
}

// "Un día en Aguaribay": momentos en orden horario.
export const day = [
  { time: '07:30', title: 'Desayuno en la galería', text: 'Pan recién horneado, dulce de membrillo de la vecina y el sol entrando de costado.', image: photo('aguaribay-desayuno', 1200, 900) },
  { time: '10:00', title: 'Subida al Uritorco', text: 'Salimos con guía desde la puerta. Cuatro horas de sendero y la mejor vista del valle.', image: photo('aguaribay-sendero', 1200, 900) },
  { time: '15:00', title: 'Siesta y pileta', text: 'La hora sagrada de la sierra. Reposeras a la sombra del aguaribay grande.', image: photo('aguaribay-siesta', 1200, 900) },
  { time: '19:30', title: 'Mate al atardecer', text: 'El cerro se pone rosado y en la galería siempre hay un termo cargado.', image: photo('aguaribay-atardecer', 1200, 900) },
  { time: '21:30', title: 'Cena en El Molle', text: 'Cabrito, trucha de Los Reartes y vinos de Colonia Caroya junto al hogar.', image: photo('aguaribay-cena', 1200, 900) },
]

export const gallery = [
  { ...photo('aguaribay-g1', 1600, 1100), alt: 'Pileta del hotel al atardecer' },
  { ...photo('aguaribay-g2', 900, 1200), alt: 'Galería con sillones' },
  { ...photo('aguaribay-g3', 1000, 1000), alt: 'Mesa de desayuno' },
  { ...photo('aguaribay-g4', 1000, 1000), alt: 'Sendero en el jardín' },
  { ...photo('aguaribay-g5', 1600, 1000), alt: 'Vista al cerro desde la suite' },
  { ...photo('aguaribay-g6', 900, 1200), alt: 'Hogar a leña encendido en el estar' },
  { ...photo('aguaribay-g7', 1200, 900), alt: 'Huerta del restaurante' },
]

export const reviews = [
  { name: 'Marina G.', from: 'Rosario', text: 'Fuimos por dos noches y nos quedamos cuatro. El desayuno en la galería vale el viaje.' },
  { name: 'Tomás y Vale', from: 'Buenos Aires', text: 'La suite con vista al Uritorco es tal cual las fotos. Atención cálida y sin vueltas.' },
  { name: 'Familia Ibáñez', from: 'Mendoza', text: 'Los chicos no salieron de la pileta. Nosotros, de la parrilla. Volvemos en invierno.' },
  { name: 'Lucía P.', from: 'Córdoba', text: 'Vine a trabajar una semana y terminé de vacaciones. El wifi anda y la siesta también.' },
  { name: 'Héctor R.', from: 'Santa Fe', text: 'La excursión a Ongamira con el guía del hotel fue lo mejor del viaje. Se nota que aman la zona.' },
]

// Ilustración del mapa (archivo local en /public). Reemplazala por una captura real si querés.
export const contactMap = photo('/mapa.svg', 1200, 700)
