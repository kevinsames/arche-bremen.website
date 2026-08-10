import { sanityClient } from 'sanity:client';
import type { Passage } from './bible';

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

export async function getSermons(): Promise<Sermon[]> {
  return sanityClient.fetch(
    `*[_type == "sermon" && defined(slug.current)] | order(date desc) ${sermonProjection}`,
    {},
    fetchOptions,
  );
}

export async function getSermon(slug: string): Promise<Sermon | null> {
  return sanityClient.fetch(
    `*[_type == "sermon" && slug.current == $slug][0] ${sermonProjection}`,
    { slug },
    fetchOptions,
  );
}

export interface Event {
  _id: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
}

export async function getEvents(): Promise<Event[]> {
  return sanityClient.fetch(
    // start >= now(): now() ist der Build-Zeitpunkt, da die Seite statisch
    // ist. Abgelaufene Termine verschwinden erst mit dem nächsten Build.
    `*[_type == "event" && start >= now()] | order(start asc) {
      _id, title, start, end, location, description
    }`,
    {},
    fetchOptions,
  );
}
