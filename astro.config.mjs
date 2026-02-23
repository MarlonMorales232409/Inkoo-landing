// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: ['3df3-139-47-118-234.ngrok-free.app']
    }
  }
});
