import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['localhost', 'proedge.bytesbinary.top'],
  },
  build: {
    chunkSizeWarningLimit: 1200, // 1MB

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group specific libraries into named chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@apollo') || id.includes('graphql')) {
              return 'graphql-vendor';
            }
            if (id.includes('tailwindcss') || id.includes('postcss')) {
              return 'style-vendor';
            }
            // fallback for all other node_modules
            return 'vendor';
          }
        },
      },
    },
  },
});
