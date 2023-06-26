import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel';
import vercelSsr from '@magne4000/vite-plugin-vercel-ssr';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercel(), vercelSsr(), ViteMinifyPlugin({})],
  base: "/cuestionario-oposiciones/",
  build: {
    minify: 'terser',
  },
})
