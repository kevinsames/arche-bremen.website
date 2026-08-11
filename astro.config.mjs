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
  // Absolute Adresse der veröffentlichten Seite. Einzige Stelle im Repo, an
  // der die Domain steht — Canonical-Links, Open-Graph-URLs und sitemap.xml
  // leiten sich daraus ab (Astro.site / context.site). Ausnahme:
  // public/robots.txt ist eine statische Datei ohne Template-Schicht und
  // wiederholt die Domain deshalb (siehe Kommentar dort).
  site: 'https://bremen.arche-gemeinde.de',
  output: 'static',
  // SANITY_PROJECT_ID/SANITY_DATASET aren't secret (needed client-side by the
  // embedded Studio in sanity.config.ts), so expose them via import.meta.env
  // alongside Astro's default PUBLIC_ prefix.
  vite: {
    envPrefix: ['PUBLIC_', 'SANITY_'],
  },
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
