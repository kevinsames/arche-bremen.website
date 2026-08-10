import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

// Read directly from process.env: this file is loaded by the Studio's own
// Vite dev server, which already has .env.local merged in.
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

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
