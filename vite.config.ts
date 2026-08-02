import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    visualizer({ filename: 'bundle-analysis.html', open: false })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/@tanstack/react-query/')) {
            return 'query-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'ui-vendor';
          }
          if (id.includes('node_modules/axios/')) {
            return 'api-vendor';
          }
        }
      }
    }
  }
});
