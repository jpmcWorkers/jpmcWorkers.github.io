import { defineConfig } from 'astro/config';

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
    redirectFrom({
      redirects: {
        '/Vdaycards': '/vdaycards',
        '/VDAYCARDS': '/vdaycards',
        '/VdayCards': '/vdaycards',
        '/VDayCards': '/vdaycards',
      },
    }),
  ],
});