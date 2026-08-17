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
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      // Porträt, optional — Datei liegt neben der Markdown-Datei
      // (`photo: ./name.jpg`). Ohne Foto bleibt die Kachel typografisch,
      // kein Platzhalterbild (siehe CLAUDE.md, keine Stock-Fotografie).
      photo: image().optional(),
    }),
});

// Geplante Bereiche des Gemeindelebens (Kinder, Jugend, Männer, Frauen,
// Ranger, Bibelunterricht, ...). Bewusst eine Datei pro Bereich statt einer
// langen Fließtextseite: /gemeindeleben wird so als Kachelraster überflieg-
// bar, und ein neuer Bereich entsteht später durch eine zusätzliche Datei,
// ohne Codeänderung (siehe dortige Seite).
const ministries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ministries' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    // Ein Satz für die Kachel. Pflichtfeld statt optional: Browser ohne
    // Popover-Unterstützung blenden das Popup mit dem vollen Body-Text aus
    // (siehe global.css) — dann bleibt nur dieser Satz übrig.
    summary: z.string(),
    // Kleines Label auf der Kachel. In der Gründungsphase überall
    // "geplant"; sobald ein Bereich läuft, hier leeren/streichen — dann
    // verschwindet das Label, ohne dass Code angefasst wird.
    status: z.string().optional(),
  }),
});

export const collections = { pages, elders, creed, ministries };
