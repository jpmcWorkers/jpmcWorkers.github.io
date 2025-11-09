import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

import tailwindcss from '@tailwindcss/vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import sitemap from '@astrojs/sitemap';

import redirectFrom from 'astro-redirect-from';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  

  // This only works if not static
  // redirects: {
  //   '/qa': '/resources/qa',
  //   'mgr': '/resources/mgr',
  //   '/gender': '/resources/cigna',
  //   '/aeiou': '/resources/aeiou',
  //   '/issues': '/resources/issues',
  //   '/join_us': '/resources/join-us',
  //   '/discord': 'https://bit.ly/jpmcworkers',
  // },

  vite: {
    plugins: [
      tailwindcss(),
      viteTsconfigPaths(),
    ],
  },

  integrations: [
    // Sitemap for searchyness
    sitemap(), 
    // plugin to help easily generate redirects in files
    redirectFrom(),
    // PWA! offline access and performance things, can technically improve
    AstroPWA({
      mode: 'production',
      includeAssets: ['favicon.ico', 'img/**/*',],
      registerType: 'autoUpdate',
      manifest: {
        name: 'JPMC Workers Alliance',
        short_name: 'JWA',
        description: 'JPMC Workers Alliance - Organizing for better working conditions',
        theme_color: '#1d4ed8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/workers.github.io/',
        start_url: '/workers.github.io/',
        icons: [
          {
            src: 'img/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'img/96x96.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/96x96.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,ico,txt}'],
        globIgnores: ['images/**/*'], // Exclude large images from service worker cache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
  ],
});