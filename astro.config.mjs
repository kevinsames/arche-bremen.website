import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// astro.config.mjs runs outside Vite's own env loading, so .env files are
// read explicitly here. See README.md for the required variables.
const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      // Static build: fetch fresh at build time instead of via the CDN cache.
      useCdn: false,
      studioBasePath: '/studio',
    }),
    // Only needed to embed the Sanity Studio at /studio; content pages stay
    // React-free and ship 0 KB of client JS.
    react(),
  ],
});
