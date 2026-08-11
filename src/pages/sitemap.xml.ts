import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getSermons } from '../lib/sanity';

// Handgeschrieben statt @astrojs/sitemap — keine neue Dependency
// (CLAUDE.md, harte Regel 1). Der Preis dafür steht hier oben, damit ihn
// niemand übersieht:
//
//   WER EINE NEUE STATISCHE SEITE ANLEGT, MUSS SIE HIER EINTRAGEN.
//
// Statische Seiten stehen in STATIC_PATHS, dynamische unten bei den
// jeweiligen Sammlungen — dieselben Quellen und Filter wie die zugehörigen
// Seiten-Templates, bewusst dupliziert statt in einen gemeinsamen Helfer
// gezogen (Regel 2). Nach dem Build prüfen: dist/sitemap.xml öffnen und
// zählen, oder `grep -c '<loc>' dist/sitemap.xml` gegen die Anzahl der
// gebauten Seiten (ohne /studio) vergleichen.

const STATIC_PATHS = ['/', '/predigten', '/aelteste', '/glaubensbekenntnis'];

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs: `site` fehlt. Die sitemap.xml braucht absolute URLs.');
  }

  const pages = await getCollection('pages'); //   /impressum, /datenschutz
  const creed = await getCollection('creed');
  const elders = await getCollection('elders');
  const sermons = await getSermons();

  const paths = [
    ...STATIC_PATHS,
    ...pages.map((page) => `/${page.id}`),
    // Nur nummerierte Artikel haben eine Detailseite — gleiche Bedingung
    // wie in src/pages/glaubensbekenntnis/[slug].astro.
    ...creed
      .filter((article) => article.data.number != null)
      .map((article) => `/glaubensbekenntnis/${article.id}`),
    ...elders.map((elder) => `/aelteste/${elder.id}`),
    ...sermons.map((sermon) => `/predigten/${sermon.slug}`),
  ];

  // Kein <lastmod>, <changefreq> oder <priority>: Google ignoriert die
  // letzten beiden vollständig und wertet lastmod nur aus, wenn es
  // durchgängig stimmt. Ein falsches Datum ist schlechter als keines.
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
