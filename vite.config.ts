import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  preview: {
    allowedHosts: [
      'portfolio-react-ac-10d36fe1a5df.herokuapp.com',
      "www.ac-portfolio.online",
      'ac-portfolio.online'
    ]
  }
});
