import { defineCliConfig } from 'sanity/cli';
import { loadEnv } from 'vite';

// Gleiches Muster wie astro.config.mjs: die CLI läuft außerhalb von Vites
// eigenem Env-Loading, .env-Dateien werden hier explizit gelesen.
const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
});
