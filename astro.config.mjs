// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.inkoosub.com',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), sitemap()],
  security: {
    checkOrigin: false,
  },
});
