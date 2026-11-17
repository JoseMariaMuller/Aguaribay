import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En desarrollo, Vite inyecta un script inline (React Refresh), estilos por JS y usa websockets (HMR):
// relajamos la CSP solo en "pnpm dev". El build de producción usa la CSP estricta de index.html.
const devCsp = () => ({
  name: 'dev-csp',
  apply: 'serve',
  transformIndexHtml: (html) =>
    html
      .replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")
      .replace("style-src 'self'", "style-src 'self' 'unsafe-inline'")
      .replace("connect-src 'self'", "connect-src 'self' ws: wss:")
      .replace(' upgrade-insecure-requests', ''),
})

export default defineConfig({
  plugins: [react(), devCsp()],
  build: {
    rollupOptions: {
      output: {
        // GSAP en un chunk propio: se cachea aparte del código de la app.
        manualChunks: (id) => (id.includes('node_modules/gsap') ? 'gsap' : undefined),
      },
    },
  },
})
