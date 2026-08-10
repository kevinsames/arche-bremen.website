import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Statische Repo-Seiten: Impressum, Datenschutz, später Vision, Über uns
// etc. Ändert sich selten; Git-Review ist hier die angemessene
// Zugriffskontrolle (siehe CLAUDE.md, Content-Split).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// Die 25 Artikel des Glaubensbekenntnisses, dazu Vorwort und Quellenangabe.
// Bewusst eine Datei pro Artikel statt eines einzigen langen Dokuments: So
// wird die Seite /glaubensbekenntnis als Kachelraster überflieg- und
// einzeln verlinkbar (siehe dortige Seiten). `number` fehlt bei Vorwort und
// Quelle — nur nummerierte Einträge werden zu Kacheln.
const creed = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/creed' }),
  schema: z.object({
    title: z.string(),
    number: z.number().optional(),
  }),
});

// Profile der Ältesten (Gemeindeleitung). Nicht zu verwechseln mit dem
// `preacher`-Dokument in Sanity, das festhält, wer eine konkrete Predigt
// gehalten hat — das schließt Gastprediger ohne Ältestenamt ein. Verknüpft
// mit `preacher` über den Dateinamen als Slug (siehe
// sanity/schemaTypes/preacher.ts).
const elders = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/elders' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
  }),
});

export const collections = { pages, elders, creed };
