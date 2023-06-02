import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel';
import vercelSsr from '@magne4000/vite-plugin-vercel-ssr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercel(), vercelSsr()],
  base: "/cuestionario-oposiciones/"
})
