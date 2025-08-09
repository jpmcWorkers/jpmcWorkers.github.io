import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

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
});