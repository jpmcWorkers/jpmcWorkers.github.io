import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nivoset.github.io',
  base: '/workers.github.io',
  output: 'static',

  redirects: {
    '/qa': '/what-can-i-do/qa',
    '/gender': '/what-can-i-do/gender',
    '/aeiou': '/what-can-i-do/aeiou',
    '/issues': '/what-can-i-do/issues',
    '/join_us': '/what-can-i-do/join-us',
    '/discord': 'https://bit.ly/jpmcworkers',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    AstroPWA({
      mode: 'production',
      base: '/workers.github.io',
      scope: '/workers.github.io',
      includeAssets: ['favicon.ico', 'img/**/*'],
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
        navigateFallback: '/workers.github.io/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
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
    })
  ],
});