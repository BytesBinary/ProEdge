import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: 'localhost',
    port: 3001,
  },
  build: {
    // Increase the chunk size warning limit to suppress the warning if you prefer
    chunkSizeWarningLimit: 1000, // Set the limit to 1MB (1000KB)

    rollupOptions: {
      output: {
        // Manual chunking for vendor libraries (node_modules)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group all node_modules into a single chunk called "vendor"
            return 'vendor';
          }
        },
      },
    },
  },
});
