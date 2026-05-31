// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/utils/remark-reading-time';

// https://astro.build/config
export default defineConfig({
  site: 'https://niro.codes',
  server: { host: true },
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  integrations: [react(), mdx(), sitemap()],
});
