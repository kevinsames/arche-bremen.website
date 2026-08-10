import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

// This file runs in the browser as part of the embedded Studio, so `process`
// isn't available — read from Vite's import.meta.env instead (exposed via
// the envPrefix set in astro.config.mjs).
const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

export default defineConfig({
  name: 'arche-bremen',
  title: 'Arche Bremen',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
