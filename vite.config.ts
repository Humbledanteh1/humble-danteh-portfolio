import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites need VITE_BASE=/portfolio-/; Vercel can use the default '/'.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
})
