import { sanityClient } from 'sanity:client';
import type { Passage } from './bible';
// Offline-Fallback (siehe CLAUDE.md, "Lokale Entwicklung"): Wenn die
// Sanity-API zur Buildzeit nicht erreichbar ist, liest dieses Modul aus
// einem zuvor per `npm run snapshot` erzeugten JSON-Snapshot statt den Build
// hart abzubrechen. Der Snapshot selbst enthält nur Daten, die im Sanity
// Free-Plan ohnehin öffentlich lesbar sind (siehe CLAUDE.md).
import snapshotData from '../../sanity/snapshot/content.json';

export interface Sermon {
  _id: string;
  title: string;
  slug: string;
  date: string;
  // Freitext, kein Sanity-Dokument mehr. Wird verlinkt, wenn der Name mit
  // einem Ältesten-Profil übereinstimmt — siehe predigten/index.astro.
  preacher: string;
  series?: string;
  passages: Passage[];
  audioUrl?: string;
  audioFile?: string;
  description?: string;
}

// Projektion 1:1 in scripts/snapshot.mjs gespiegelt — bewusst dupliziert
// statt in ein gemeinsames Modul ausgelagert (siehe CLAUDE.md, harte
// Regel 2). Ändert sich sie hier, dort nachziehen.
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

// Sanity Free-Datasets liefern ohne explizite perspective auch Entwürfe aus.
// "published" stellt sicher, dass unveröffentlichte Predigten nicht auf der
// Website erscheinen.
const fetchOptions = { perspective: 'published' as const };

// Meldet den Rückfall auf den Snapshot klar im Build-Log — der Snapshot
// altert, ein Build während eines Sanity-Ausfalls veröffentlicht den Stand
// von dessen letzter Erzeugung.
function warnFallback(error: unknown): void {
  console.warn(
    `Sanity nicht erreichbar, Fallback auf Snapshot vom ${snapshotData.generatedAt} ` +
      `(sanity/snapshot/content.json, Dataset "${snapshotData.dataset}"). ` +
      `Für einen aktuellen Snapshot: npm run snapshot`,
    error,
  );
}

export async function getSermons(): Promise<Sermon[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "sermon" && defined(slug.current)] | order(date desc) ${sermonProjection}`,
      {},
      fetchOptions,
    );
  } catch (error) {
    warnFallback(error);
    return snapshotData.sermons as Sermon[];
  }
}

export async function getSermon(slug: string): Promise<Sermon | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "sermon" && slug.current == $slug][0] ${sermonProjection}`,
      { slug },
      fetchOptions,
    );
  } catch (error) {
    warnFallback(error);
    const sermons = snapshotData.sermons as Sermon[];
    return sermons.find((sermon) => sermon.slug === slug) ?? null;
  }
}

export interface Event {
  _id: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  cancelled?: boolean;
}

export async function getEvents(): Promise<Event[]> {
  try {
    return await sanityClient.fetch(
      // start >= now(): now() ist der Build-Zeitpunkt, da die Seite statisch
      // ist. Abgelaufene Termine verschwinden erst mit dem nächsten Build —
      // auch abgesagte, ein Ausfallhinweis muss daher nicht separat
      // aufgeräumt werden.
      `*[_type == "event" && start >= now()] | order(start asc) {
        _id, title, start, end, location, description, cancelled
      }`,
      {},
      fetchOptions,
    );
  } catch (error) {
    warnFallback(error);
    // Der Snapshot speichert alle Termine ungefiltert (siehe
    // scripts/snapshot.mjs) — der now()-Filter der Live-Abfrage passiert
    // hier in JavaScript, mit dem Build-Zeitpunkt als Ersatz für now().
    const now = new Date().toISOString();
    return (snapshotData.events as Event[])
      .filter((event) => event.start >= now)
      .sort((a, b) => a.start.localeCompare(b.start));
  }
}
