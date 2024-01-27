import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        //Fill in with details relevant to your app
        name: 'Budgeting App',
        short_name: 'BudgetApp',
        description: 'A comprehensive budget management application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // Include other sizes as needed
        ],
      },
      workbox: {
        // Workbox options...
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Adjust as needed
        runtimeCaching: [],
        navigateFallbackDenylist: [/^\/@vite\//, /other-patterns/], // Exclude development assets
      },
    }),
  ],
});
