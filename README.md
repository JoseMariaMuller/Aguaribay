# Hotel Aguaribay

Sitio de muestra para un hotel boutique de sierra. Vite + React, 100 % responsive. Todos los datos son ficticios.

## Cómo correrlo

Solo con **pnpm**:

```bash
pnpm install
pnpm dev       # desarrollo en http://localhost:5173
pnpm build     # genera /dist para subir a cualquier hosting estático
pnpm preview   # sirve /dist en http://localhost:4173 (para probar el build con la CSP estricta)
pnpm audit     # revisa vulnerabilidades de dependencias
```

Todas las dependencias están con versión exacta (sin `^` ni `~`). Para actualizar: `pnpm update --latest <paquete>` y después `pnpm audit`.

## Librerías

| Librería | Para qué |
| --- | --- |
| `react`, `react-dom` | UI |
| `react-icons` | Íconos (Phosphor "light" para la interfaz y Font Awesome para las redes) |
| `gsap` (+ ScrollTrigger y SplitText) | Animaciones de scroll: titulares que se revelan por líneas, imágenes con máscara (clip-path), contadores, parallax y la sección "Un día en Aguaribay" con pin horizontal |
| `@gsap/react` | Hook `useGSAP`, que limpia las animaciones al desmontar |
| `lenis` | Scroll suave (sincronizado con ScrollTrigger) |
| `embla-carousel-react` | Carruseles de habitaciones y opiniones (swipe, flechas, puntos, teclado) |
| `embla-carousel-autoplay` | Pase automático de las opiniones (se pausa con el mouse o el foco, y tiene botón de pausa) |

El lightbox de la galería es propio (sobre `<dialog>` nativo) y se descarga recién cuando alguien abre una foto (`React.lazy`).
No se incluyó el elemento 3D opcional, porque Blender no estaba disponible en esta sesión.

## Dónde cambiar cosas

- **Textos y datos** → `src/data.js`: nombre, teléfono, WhatsApp, redes, titular del hero, texto del hotel, estadísticas, frases de la cinta, habitaciones, servicios, los momentos de "Un día en Aguaribay", galería y opiniones.
- **Fotos** → también en `src/data.js`. Hoy son de muestra (picsum.photos). Para usar fotos reales, ponelas en `public/fotos/` y usá `photo('/fotos/mi-foto.jpg', ancho, alto)`. El ancho y el alto sirven para que la página no "salte" mientras cargan.
  Si usás otro servicio de imágenes, agregá su dominio en `img-src` de la Content-Security-Policy (`index.html`).
- **Mapa** → `public/mapa.svg` (ilustración). Se puede reemplazar por una captura real.
- **Colores y tipografías** → bloque `:root` al principio de `src/styles.css` (`--grana` es el acento, `--monte` el verde oscuro, `--liquen` el fondo). Las fuentes (Fraunces para títulos y Hanken Grotesk para el cuerpo) se cargan desde Google Fonts en `index.html`. El eje óptico de Fraunces está fijo en `opsz 36` al final de `styles.css` para que los títulos grandes tengan trazos firmes.
- **Logo** → componente `LogoMark` en `src/components/ui.jsx` y `public/favicon.svg`.

## Estructura

```
src/
  data.js                 contenido del sitio
  App.jsx                 orden de las secciones
  styles.css              estilos (mobile first)
  components/             una sección por archivo (Hero, Rooms, DayScroll, Gallery, Lightbox...)
  lib/
    motion.js             registro de GSAP y helpers (movimiento reducido, pantalla de carga)
    useScrollAnimations.js  animaciones declaradas con atributos data-* (data-split, data-reveal, data-img, data-parallax, data-count, data-scale-in). Cada elemento se anima una sola vez; lo que ya está en pantalla al cargar se muestra directo
    smoothScroll.js       Lenis
    links.js              WhatsApp, Maps y limpieza de texto
```

## Accesibilidad y movimiento

- Con `prefers-reduced-motion: reduce` no hay scroll suave, parallax, pin, autoplay ni pantalla de carga: todo queda estático y visible.
- Las animaciones solo esconden un elemento en el momento en que entra en pantalla, así que si el JS de animación falla, el contenido queda visible.
- Carruseles manejables con flechas del teclado, botones con `aria-label`, foco visible y un link para saltar al contenido.
- Se usa el cursor del sistema, con `cursor: pointer` en todo lo clickeable.

## Seguridad

- Sin `dangerouslySetInnerHTML`, `eval` ni HTML armado con datos.
- Todos los links con `target="_blank"` llevan `rel="noopener noreferrer"`.
- Los formularios validan del lado del cliente. Lo que se manda a WhatsApp se limpia (caracteres de control y largo máximo) y se escapa con `encodeURIComponent`.
- La Content-Security-Policy va en un meta tag de `index.html`. En `pnpm dev`, `vite.config.js` la relaja solo para la recarga en caliente; el build usa la versión estricta.
- El formulario de contacto no tiene backend: abre WhatsApp con el mensaje armado.
