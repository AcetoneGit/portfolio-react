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
      'portfolio-ac-react-f04eed26ef43.herokuapp.com',
      "www.ac-portfolio.online"
    ]
  }
});
