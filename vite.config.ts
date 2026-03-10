import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Vite's dev server root is the project root (where index.html lives)
  root: '.',

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:          path.resolve(__dirname, 'index.html'),
        about:         path.resolve(__dirname, 'about.html'),
        projects:      path.resolve(__dirname, 'projects.html'),
        projectDetail: path.resolve(__dirname, 'project-detail.html'),
        sectors:       path.resolve(__dirname, 'sectors.html'),
        innovation:    path.resolve(__dirname, 'innovation.html'),
        careers:       path.resolve(__dirname, 'careers.html'),
        contact:       path.resolve(__dirname, 'contact.html'),
        news:          path.resolve(__dirname, 'news.html'),
      },
    },
  },
});
