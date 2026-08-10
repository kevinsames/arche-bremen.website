# arche-bremen-website

Website einer Gemeindegründung in Bremen. Muttergemeinde: Arche Hamburg
(arche-gemeinde.de), evangelisch-reformierte Freikirche.

Betreiber sind Freiwillige, überwiegend ohne technische Kenntnisse. Die Seite
muss zehn Jahre laufen und von jemand anderem als dem ursprünglichen Entwickler
übernommen werden können. **Wartbarkeit schlägt Eleganz in jeder Abwägung.**

Inhalte auf Deutsch. Code-Identifier, Dateinamen und Commit-Messages auf
Englisch.

---

## Harte Regeln

Diese Punkte sind entschieden. Nicht davon abweichen, auch nicht mit guter
Begründung — stattdessen fragen.

1. **Keine neuen Dependencies ohne Rückfrage.** Jedes Paket ist eine
   Wartungslast für Leute, die es nicht ausgewählt haben.
2. **Langweiliger, konventioneller Code.** Keine cleveren Abstraktionen, keine
   Generalisierung für hypothetische Zukunftsfälle, keine eigenen Frameworks.
   Doppelter Code ist besser als eine schwer verständliche Abstraktion.
3. **Keine eigene Caching-, Sync- oder Content-Pipeline.**
4. **Null Client-JavaScript auf Inhaltsseiten.** Astro-Islands ausschließlich
   für Predigtfilter (später) und Audio-Player.
5. **Keine Third-Party-Requests aus dem Browser.** Fonts selbst hosten. Keine
   iframes, keine Google-Maps-Embeds (statisches Bild + Link), kein Analytics,
   keine CDN-Skripte. Ziel: kein Consent-Banner nötig.
6. **Mobile first.** Erwartet werden 70–80 % Mobiltraffic. Desktop ist der
   Sonderfall.
7. **Kein Framework für Wiederholungstermine.** Kein RRULE, keine
   Recurrence-Logik.
8. **Keine E-Mail-Adresse als Klartext-`mailto:`** im HTML.
9. **Keine Feature-Erweiterung ohne Auftrag.** Wenn eine Anforderung sinnvoll
   erscheint, aber nicht in der Aufgabe steht: nennen, nicht bauen.

## Stack

- **Astro**, Static Output. Kein SSR, keine Adapter.
- **Plain CSS** in Astro-Scoped-Styles, Design-Tokens als CSS Custom Properties
  in einer globalen Datei. Kein Tailwind, kein CSS-Framework, kein Präprozessor
  — begründet mit Zehnjahreshorizont und Build-Einfachheit.
- **Sanity** (Free Plan) als Headless CMS, Studio unter `/studio`.
- **Cloudflare Pages** als Hosting.
- Node-Version festgenagelt: `.nvmrc` + `engines` in `package.json`, Lockfile
  committed, Build mit `npm ci`.

## Design und Marke

Die Marke ist in zwei Dateien codiert. Das Brandbook-PDF liegt bewusst nicht im
Repo.

- `src/styles/tokens.css` — einzige Quelle für Farben, Schriften, Skala,
  Abstände.
- `DESIGN.md` — Begründungen, Abweichungen vom Brandbook, offene Fragen.

Regeln:

1. **Keine Farb-, Schrift- oder Abstandswerte im Komponentencode.**
   Ausschließlich die Variablen aus `tokens.css`. Kein Hex, kein `rgb()`, kein
   `px` für Abstände in Komponenten.
2. **Nur semantische Tokens verwenden** (`--text-primary`, `--accent-warm`),
   nie die Rohfarben (`--c-yellow`). Die semantische Ebene trägt die
   Kontrastregeln; wer sie umgeht, produziert unlesbaren Text.
3. **Gelb, Orange, Grün, Ocker und Braun-Grau sind niemals Textfarben.**
   Kontrast auf Weiß liegt zwischen 1,44 : 1 und 2,90 : 1 und verfehlt WCAG AA
   auch für große Schrift. Nur Flächen, Rahmen, Stilelemente.
4. Textfarben sind `--text-primary` (Dunkles Blau), `--text-secondary` (Braun)
   und auf dunklem Grund `--text-on-dark`. `--c-blue` nur für große Schrift und
   UI-Rahmen.
5. **Fonts selbst hosten**, WOFF2, `font-display: swap`, maximal zwei Familien.
   Jost für Headlines, Source Serif Pro für Fließtext. Keine Google-Fonts-URL.
6. Headlines primär in Versalien mit `--tracking-display`, entsprechend
   Brandbook 2.1.
7. **Keine neuen Tokens erfinden.** Fehlt ein Wert, in `DESIGN.md` unter offene
   Fragen ergänzen und fragen — nicht im Komponentencode improvisieren.
8. Logo als offizielle SVG-Datei einbinden, nie als Text in einem Webfont
   nachgebaut. **Ausnahme (Interim, August 2026):** Solange Hamburg keine SVG
   liefert, sind die drei JPEGs unter `src/assets/brand/` im Einsatz
   (Header, Hero, Termine-Sektion), mit `mix-blend-mode: multiply` gegen den
   fehlenden Alphakanal. Der Footer behält bewusst die Textwortmarke — kein
   Asset passt zum dunklen Grund. Ausstiegsbedingung und Details in
   `DESIGN.md`, Abschnitt „Logo (Interim, August 2026)".
9. Keine Stock-Fotografie. Brandbook 3.1 verlangt mindestens 70 % Fotos aus der
   lokalen Gemeinde; bis solche existieren, wird typografisch gestaltet.


## Content-Split — die zentrale Architekturentscheidung

Inhalte liegen an zwei Orten. Diese Grenze ist bewusst gezogen und darf nicht
verwischt werden.

### Im Repo (Astro Content Collections, Markdown/MDX)

Glaubensbekenntnis, Vision, Über uns, Profile von Pastor und Ältesten,
Impressum, Datenschutzerklärung.

Begründung: Ändert sich selten, aber eine stille Änderung wäre ein Problem.
Zugriffskontrolle über Git-Review ist hier die angemessene Hürde. Enthält
personenbezogene Daten, die nicht über eine offene API abfragbar sein sollen.

### In Sanity

Termine, Predigten, Neuigkeiten.

Begründung: Hohe Änderungsfrequenz, geringer Schaden bei Fehlern, muss von
Nicht-Technikern ohne Git pflegbar sein.

### Wichtige Randbedingung

Der Sanity Free Plan kennt nur zwei Rollen — Administrator und Viewer. Jeder
Redakteur ist faktisch Administrator. Deshalb darf in Sanity nichts liegen,
dessen versehentliche Änderung oder Löschung nicht verkraftbar ist. Zusätzlich
sind Free-Datasets **öffentlich lesbar, inklusive Entwürfe**: Es gibt kein
„intern". Nichts in Sanity anlegen, das nicht veröffentlicht werden darf.

## Datenmodell (Sanity)

Drei Dokumenttypen. Schema von Tag eins vollständig, auch wo die UI noch fehlt —
nachträgliches Verschlagworten von 80 Predigten passiert nie.

### `sermon`

- `title` (string, required)
- `slug` (slug, aus title)
- `date` (date, required)
- `preacher` (reference → `preacher`, required)
- `series` (string, optional)
- `passages` (array, min. 1 Eintrag, required) — pro Eintrag:
  - `book` — **Liste mit exakt 66 festen Werten. Niemals ein Freitextfeld.**
    Freitext zerstört die Filterbarkeit dauerhaft („Röm 8" / „Römer 8,1" /
    „Rom. 8").
  - `chapterStart`, `verseStart`, `chapterEnd`, `verseEnd` (number)
- `audioUrl` (url) oder `audioFile` (file)
- `description` (text, optional)

### `preacher`

Absichtlich minimal: `name` (string, required), `slug` (slug, optional).

Die vollständige Biografie liegt als Markdown im Repo, verknüpft über denselben
Slug. Existiert kein passendes Repo-Profil (Gastprediger), wird der Name nur
angezeigt, nicht verlinkt. Keine Biografien, Fotos oder Kontaktdaten in diesem
Dokumenttyp.

### `event`

- `title` (string, required), `start` (datetime, required), `end` (datetime,
  optional), `location` (string), `description` (text)
- **Kein Wiederholungsfeld.** Die wöchentlichen Fixtermine stehen als Konstante
  im Repo, nicht im CMS.

## Inhaltliche Vorgaben

- **Above the fold, mobil, ohne Scrollen: Gottesdienstzeit und Adresse.** Das
  ist die Information, für die die Mehrheit der Besucher kommt. Hartkodiert im
  Repo — nicht aus dem CMS geladen, nicht aus Terminen berechnet, nicht per
  JavaScript nachgerendert.
- Predigten in v1: **chronologische Liste, kein Filter-UI.** Filter erst ab
  ca. 50 Einträgen.
- Kontakt über Funktionsadresse (`kontakt@…`), nie personengebunden. WhatsApp
  später als `wa.me`-Link mit separater Nummer, nie einer privaten.
- Pflichtseiten: Impressum, Datenschutzerklärung.

## Performance-Budget

- Inhaltsseiten: 0 KB Client-JS.
- Bilder über Astros Image-Komponente, AVIF/WebP.
- Fonts selbst gehostet, `font-display: swap`, maximal zwei Schnitte.

## Dokumentation

Drei Dokumente, unterschiedliche Zielgruppen:

- `README.md` — für Entwickler: Setup, Env-Variablen, lokaler Start, Deploy,
  Datenmodell, wie ein neuer Dokumenttyp entsteht.
- `MAINTAINERS.md` — wer hat Zugriff auf Domain, DNS, Hosting, Sanity und Repo,
  und wer übernimmt bei Ausfall. Mindestens zwei Namen.
- Redakteursanleitung — **nicht im Repo**, sondern im Sanity Studio selbst.
  Eine Seite mit Screenshots. Wird sie länger, ist das Interface zu kompliziert.

Dokumentation befähigt keine Nicht-Techniker zur Inhaltspflege — dafür ist das
Studio zuständig. Doku richtet sich an die zwei Personen mit Repo-Zugriff.

## Lokale Entwicklung

- Zwei Datasets: `production` (Deployment) und `development` (lokal), gesetzt
  über `SANITY_DATASET`. Damit sind beide Free-Datasets belegt.
- Lokales Studio bearbeitet gehostete Daten. Ohne korrektes `SANITY_DATASET`
  editiert man vom Laptop aus die Produktivinhalte.
- Offline-Fallback: `sanity dataset export` erzeugt einen JSON-Snapshot, auf den
  der Fetch-Layer zurückfällt, wenn die API nicht erreichbar ist. Zwei Dutzend
  Zeilen, kein Framework. Siehe Regel 3.
- `.env.local` niemals committen. `.env.example` mit leeren Werten dagegen ja.
- Secrets und Tokens gehören in keine Datei im Repo und in keinen Chat.
