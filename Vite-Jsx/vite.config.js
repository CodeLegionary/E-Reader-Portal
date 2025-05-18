import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Redirect frontend requests to backend
    }
  }
})


/*export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { //in order to avoid CORS issues
      "/epub": {
        target: "https://www.dropbox.com/scl/fi/5ylax5ckgmb32cqw1g6ok/NOVELLA1-autore.epub?raw=1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/epub/, ""),
      },
      '/api': { // Proxy for API requests
          target: 'http://localhost:8080', // Backend URL
          changeOrigin: true, // Allows the proxy to adjust the origin of the host header to the target URL
          rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite paths
        },
    },
  },
});*/
