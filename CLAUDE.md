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
4. **Null Client-JavaScript auf Inhaltsseiten.** Ausnahmen ausschließlich für
   Predigtfilter (`SermonFilter.astro`, umgesetzt als Vanilla-Skript, kein
   Astro-Island) und künftig den Audio-Player.
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
   nachgebaut. Seit 10. August 2026 umgesetzt: `src/assets/brand/arche-logo.svg`
   (Header, Hero) und `bogen.svg`, ein daraus herausgelöster Einzelpfad
   (Termine-Sektion). Der Footer behält weiterhin die Textwortmarke — das
   Lockup ist einfarbig Dunkelblau und auf dem dunklen Footer-Hintergrund
   unlesbar, unabhängig vom Dateiformat. Details in `DESIGN.md`, Abschnitt
   „Logo".
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

Zwei Dokumenttypen. Schema von Tag eins vollständig, auch wo die UI noch fehlt —
nachträgliches Verschlagworten von 80 Predigten passiert nie.

### `sermon`

- `title` (string, required)
- `slug` (slug, aus title)
- `date` (date, required)
- `preacher` (string, required) — Freitext, kein eigener Dokumenttyp. Stimmt
  der Name (Groß-/Kleinschreibung und Leerzeichen egal) mit einem
  Ältesten-Profil in `src/content/elders/` überein, verlinkt die Website
  automatisch dorthin; sonst erscheint der Name nur als Text (deckt
  Gastprediger ohne Ältestenamt ab). Ein Tippfehler ergibt keinen Fehler, nur
  keinen Link.
- `series` (string, optional)
- `passages` (array, min. 1 Eintrag, required) — pro Eintrag:
  - `book` — **Liste mit exakt 66 festen Werten. Niemals ein Freitextfeld.**
    Freitext zerstört die Filterbarkeit dauerhaft („Röm 8" / „Römer 8,1" /
    „Rom. 8").
  - `chapterStart`, `verseStart`, `chapterEnd`, `verseEnd` (number)
- `audioUrl` (url) oder `audioFile` (file)
- `description` (text, optional)

### `event`

- `title` (string, required), `start` (datetime, required), `end` (datetime,
  optional), `location` (string), `description` (text)
- **Kein Wiederholungsfeld.** Die wöchentlichen Fixtermine stehen als Konstante
  im Repo, nicht im CMS.

## Inhaltliche Vorgaben

- **Above the fold, mobil, ohne Scrollen: die Information, für die die
  Mehrheit der Besucher kommt.** In der Gründungsphase ist das
  Gründungsstatus und geplanter erster Gottesdienst (`FOUNDING` in
  `src/consts.ts`); sobald der Gottesdienst läuft, wird daraus
  Gottesdienstzeit und Adresse (`SERVICE`, `ADDRESS`). In beiden Fällen
  hartkodiert im Repo — nicht aus dem CMS geladen, nicht aus Terminen
  berechnet, nicht per JavaScript nachgerendert.
- Predigten: **chronologische Liste mit Such-/Filterleiste**
  (`SermonFilter.astro`) über Freitext, Bibelbuch, Prediger und Predigtreihe.
  Alle Kacheln bleiben server-gerendert im HTML; ein Vanilla-Skript blendet
  sie per `hidden` ein und aus (siehe Performance-Budget). Ohne JavaScript
  bleibt die vollständige Liste unverändert sichtbar. **Die Predigtenseite
  verwendet niemals ein `<select>`-Dropdown** — Bibelbuch, Prediger und
  Predigtreihe sind Pill-Gruppen aus Radio-Buttons (versteckt gestylt in
  je einem `<label>`), damit der Bestand ohne Aufklappen sichtbar ist. Gilt
  auch für künftige Filterdimensionen.
- Kontakt über Funktionsadresse (`kontakt@…`), nie personengebunden. WhatsApp
  später als `wa.me`-Link mit separater Nummer, nie einer privaten.
- Pflichtseiten: Impressum, Datenschutzerklärung.

## Performance-Budget

- Inhaltsseiten: 0 KB Client-JS. **Ausnahme:** `/predigten` — die
  Such-/Filterleiste (`SermonFilter.astro`) lädt ein Vanilla-Skript von
  ca. 1,3 KB (minifiziert, inline), inklusive der weichen Übergänge über
  die View-Transitions-API. Reines Progressive Enhancement: Ohne
  JavaScript bleibt die vollständige Kachelliste unverändert stehen. Kein
  Framework, kein Astro-Island — siehe harte Regel 4.
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
