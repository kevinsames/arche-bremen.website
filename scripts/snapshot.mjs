// Erzeugt sanity/snapshot/content.json — den Offline-Fallback, auf den
// src/lib/sanity.ts zurückfällt, wenn die Sanity-API zur Buildzeit nicht
// erreichbar ist (siehe CLAUDE.md, Abschnitt "Lokale Entwicklung").
//
// Bewusst ein einzelnes Skript statt einer Pipeline (harte Regel 3): ein
// Sanity-Client, zwei Abfragen, eine JSON-Datei. Läuft außerhalb von Astro,
// deshalb `@sanity/client` direkt statt der virtuellen `sanity:client`.
//
// Aufruf: npm run snapshot [dataset]  (Vorgabe: production)

import { createClient } from '@sanity/client';
import { loadEnv } from 'vite';
import { writeFile } from 'node:fs/promises';

// Gleiches Muster wie sanity.cli.ts und astro.config.mjs: .env-Dateien
// werden hier explizit geladen, weil das Skript außerhalb von Vites eigenem
// Env-Loading läuft.
const { SANITY_PROJECT_ID } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

const dataset = process.argv[2] ?? 'production';

if (!SANITY_PROJECT_ID) {
  console.error('SANITY_PROJECT_ID fehlt. .env.local prüfen (siehe .env.example).');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
});

// Projektion 1:1 aus src/lib/sanity.ts übernommen — bewusst dupliziert statt
// in ein gemeinsames Modul ausgelagert (harte Regel 2). Ändert sich dort die
// Projektion, hier nachziehen.
const sermonProjection = `{
  _id,
  title,
  "slug": slug.current,
  date,
  preacher,
  series,
  passages,
  audioUrl,
  "audioFile": audioFile.asset->url,
  description
}`;

const [sermons, events] = await Promise.all([
  client.fetch(`*[_type == "sermon" && defined(slug.current)] | order(date desc) ${sermonProjection}`),
  client.fetch(`*[_type == "event"] | order(start asc) {
    _id, title, start, end, location, description, cancelled
  }`),
]);

// events wird ungefiltert gespeichert (auch vergangene Termine) — der Filter
// auf start >= now() passiert erst beim Lesen des Snapshots in
// src/lib/sanity.ts, genau wie bei der Live-Abfrage.
const snapshot = {
  generatedAt: new Date().toISOString(),
  dataset,
  sermons,
  events,
};

await writeFile('sanity/snapshot/content.json', `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `Snapshot geschrieben: ${sermons.length} Predigten, ${events.length} Termine, Dataset "${dataset}", ` +
    `sanity/snapshot/content.json.`,
);
