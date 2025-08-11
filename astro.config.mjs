import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import redirectFrom from 'astro-redirect-from';

// https://astro.build/config
export default defineConfig({
  site: 'https://nivoset.github.io',
  base: '/workers.github.io',
  output: 'static',

  redirects: {
    '/qa': '/what-can-i-do/qa',
    'mgr': '/what-can-i-do/mgr',
    '/gender': '/what-can-i-do/cigna',
    '/aeiou': '/what-can-i-do/aeiou',
    '/issues': '/what-can-i-do/issues',
    '/join_us': '/what-can-i-do/join-us',
    '/discord': 'https://bit.ly/jpmcworkers',
    // GitHub Pages redirects
    '/workers.github.io/qa': '/what-can-i-do/qa',
    '/workers.github.io/mgr': '/what-can-i-do/mgr',
    '/workers.github.io/gender': '/what-can-i-do/cigna',
    '/workers.github.io/aeiou': '/what-can-i-do/aeiou',
    '/workers.github.io/issues': '/what-can-i-do/issues',
    '/workers.github.io/join_us': '/what-can-i-do/join-us',
    '/workers.github.io/discord': 'https://bit.ly/jpmcworkers',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(), 
    redirectFrom(),
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
    partytown({
      config: {
        forward: ['openReplayTracker'],
        resolveUrl: (url, location, type) => {
          // Allow OpenReplay domain
          if (url.hostname === 'static.openreplay.com') {
            return url;
          }
          return null;
        }
      }
    })
  ],
});