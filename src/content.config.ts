import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Statische Repo-Seiten: Glaubensbekenntnis, Vision, Über uns, Impressum,
// Datenschutz etc. Ändert sich selten; Git-Review ist hier die angemessene
// Zugriffskontrolle (siehe CLAUDE.md, Content-Split).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// Vollständige Prediger-Profile. Verknüpft mit dem `preacher`-Dokument in
// Sanity über den Dateinamen als Slug (siehe sanity/schemaTypes/preacher.ts).
const preachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/preachers' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
  }),
});

export const collections = { pages, preachers };
