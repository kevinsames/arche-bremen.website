# arche-bremen-website

Website der Gemeindegründung Arche Bremen. Architektur und harte Regeln stehen
in [`CLAUDE.md`](./CLAUDE.md) — vor jeder Änderung lesen.

## Voraussetzungen

- Node-Version aus `.nvmrc` (aktuell 24): `nvm use`
- Ein Sanity-Projekt mit zwei Datasets: `production` und `development`

## Setup

```sh
nvm use
npm ci
cp .env.example .env.local
# .env.local mit echten Werten füllen, siehe unten
```

## Umgebungsvariablen

Definiert in `.env.local` (nie committen — steht in `.gitignore`).
`.env.example` dokumentiert die Variablen mit leeren Werten.

| Variable | Bedeutung |
|---|---|
| `SANITY_PROJECT_ID` | Projekt-ID aus [sanity.io/manage](https://sanity.io/manage) |
| `SANITY_DATASET` | `development` für lokale Arbeit, `production` ist dem Deployment vorbehalten |

**Wichtig:** Mit `SANITY_DATASET=production` bearbeitet das lokale Studio die
echten Live-Inhalte. Für die tägliche Arbeit immer `development` verwenden.

## Lokaler Start

```sh
npm run dev
```

Startet Astros Dev-Server. Das Sanity Studio ist dabei unter `/studio`
erreichbar und bearbeitet das in `SANITY_DATASET` konfigurierte Dataset.

```sh
npm run build    # statischer Build nach dist/
npm run preview  # Vorschau des Builds
```

## Beispieldaten für `development`

```sh
npx sanity login              # einmalig
npm run seed:development
```

Importiert `sanity/seed/development.ndjson` (20 Beispielpredigten, neun
Beispieltermine) fest in das Dataset `development` — das Zielname steht im
npm-Skript, nicht in `SANITY_DATASET`, damit ein falsch gesetzter Wert nie
versehentlich `production` überschreibt. `--replace` ersetzt nur Dokumente
mit gleicher `_id`, leert das Dataset nicht.

Zwei der Beispieltermine liegen absichtlich in der Vergangenheit und
erscheinen deshalb nicht auf der Startseite (`getEvents()` filtert auf
`start >= now()`) — sie testen genau diesen Fall. Die künftigen Termine sind
fest datiert bis Sommer 2027; danach im Seed neue nachtragen. Ein weiterer
Termin (`event-beispiel-ausfall-gottesdienst`) hat `cancelled: true` gesetzt
und testet den Hinweisblock für ausgefallene Termine — zugleich das Muster,
wie ein einmaliger Ausfall eines wöchentlichen Fixtermins (`WEEKLY_EVENTS` in
`src/consts.ts`) abgebildet wird: als normaler Sanity-Termin mit dem
passenden Datum und gesetztem Häkchen, nicht als eigenes Konzept.

Free-Datasets sind öffentlich lesbar (siehe CLAUDE.md) — deshalb im Seed keine
personenbezogenen Daten außer dem Namen, den das Freitextfeld `preacher` bei
`sermon` ohnehin vorsieht.

## Datenmodell

Details und Begründung in `CLAUDE.md`, Abschnitt "Datenmodell (Sanity)".
Kurzreferenz:

### Sanity (`sanity/schemaTypes/`)

| Typ | Felder | Datei |
|---|---|---|
| `sermon` | title, slug*, date, preacher (Freitext), series, passages[], audioUrl/audioFile, description | `sermon.ts` |
| `event` | title, start, end, location, description, cancelled | `event.ts` |

\* Abweichung vom Datenmodell in `CLAUDE.md`: `sermon.slug` ist hier Pflicht,
weil ohne Slug keine Detailseite unter `/predigten/<slug>` erreichbar wäre.

Die 66 Bibelbücher stehen fest in `sanity/bibleBooks.ts` — niemals als
Freitext im Schema, sonst ist Filterbarkeit dauerhaft zerstört.

### Repo (`src/content/`, Astro Content Collections)

| Collection | Zweck | Beispiel |
|---|---|---|
| `pages` | Statische Seiten (Impressum, Datenschutz, später Vision etc.) | `src/content/pages/impressum.md` |
| `elders` | Profile der Ältesten (Gemeindeleitung), inkl. optionalem Foto (`photo`) | `src/content/elders/niklas-meyer.md` |
| `creed` | Die 25 Artikel des Glaubensbekenntnisses, dazu Vorwort und Quelle — eine Datei pro Artikel, siehe `/glaubensbekenntnis` | `src/content/creed/01-die-heilige-schrift.md` |

Verknüpfung: `sermon.preacher` ist reiner Freitext in Sanity. Stimmt der Name
(Groß-/Kleinschreibung und Leerzeichen egal) mit `name` in einem
Markdown-Profil unter `src/content/elders/` überein, verlinkt die Website
automatisch dorthin. Gibt es keine Übereinstimmung (z.B. Gastprediger ohne
Ältestenamt, oder ein Tippfehler), wird nur der Name als Text angezeigt, ohne
Link und ohne Fehler. Die verknüpften Profile erscheinen unter `/aelteste`.

### Wie ein neuer Dokumenttyp entsteht (Sanity)

1. Neue Datei unter `sanity/schemaTypes/`, `defineType` verwenden (siehe
   bestehende Typen als Vorlage).
2. In `sanity/schemaTypes/index.ts` in `schemaTypes` aufnehmen.
3. Bei Bedarf eine Fetch-Funktion in `src/lib/sanity.ts` ergänzen und eine
   Route unter `src/pages/` anlegen.

### Wie eine neue statische Repo-Seite entsteht

1. Markdown-Datei unter `src/content/pages/<slug>.md` mit Frontmatter
   `title` (und optional `description`) anlegen.
2. Fertig — `src/pages/[slug].astro` rendert sie automatisch unter `/<slug>`.

**Achtung bei Bibelstellen:** Beginnt eine Zeile mit `1. ` (etwa
`1. Korinther 9,22`), liest Markdown das als numerierte Liste und reißt den
Absatz auf. In solchen Fällen den Punkt maskieren: `1\. Korinther`. Nur die
Ziffer `1` ist betroffen. Nach dem Neuumbrechen einer Datei mit
`grep -n '^[0-9]\+\. ' src/content/pages/*.md src/content/creed/*.md` prüfen.

### Wie ein Foto zu einem Ältesten-Profil hinzukommt

`elders.photo` ist optional — ohne Foto bleibt die Kachel wie bisher rein
typografisch (siehe DESIGN.md, Abschnitt „Bildwelt"). Zum Hinzufügen:

1. Foto neben die passende Markdown-Datei legen, gleicher Basename, z. B.
   `src/content/elders/niklas-meyer.jpg`.
2. Im Frontmatter ergänzen: `photo: ./niklas-meyer.jpg`.
3. Anforderung an die Datei: Hochformat (Zuschnitt 4:5), mindestens 1200 px
   breit, JPEG. Astro erzeugt daraus beim Build automatisch die WebP-Varianten
   für Kachel und Detailseite.

`niklas-meyer.jpg` unterschreitet diese Vorgabe bewusst (640×960 px, 2:3, keine
höher aufgelöste Aufnahme vorhanden) — `object-fit: cover` schneidet im Browser
mittig auf 4:5 zu, ohne die Datei zu bearbeiten. Für künftige Fotos bleibt
Schritt 3 die Vorgabe.

### Wie ein Artikel des Glaubensbekenntnisses geändert wird

Jeder Artikel ist eine eigene Datei unter `src/content/creed/<nn>-<slug>.md`
mit Frontmatter `title` und `number` (Vorwort und Quelle haben kein
`number` — sie erscheinen nicht als Kachel). `/glaubensbekenntnis` rendert
die Kacheln sortiert nach `number`, `/glaubensbekenntnis/<slug>` ist die
Detailseite dazu. Einen neuen Artikel einfügen heißt: neue Datei mit der
nächsten Nummer anlegen — die Nummern in den bestehenden Dateinamen und
`title` bleiben davon unberührt (keine automatische Umnummerierung).

## Markendateien

`src/assets/brand/` enthält das offizielle Logo als SVG (seit 10. August 2026,
siehe `DESIGN.md`, Abschnitt „Logo"):

- `arche-logo.svg` — vollständiges Lockup, unverändert wie geliefert.
  Eingebunden in Header und Hero.
- `bogen.svg` — nur der Bogen, ein einzelner Pfad aus dem Lockup
  herausgelöst, viewBox auf ihn zugeschnitten. Eingebunden als Stilelement in
  der Termine-Sektion.

Beide als reiner Asset-Import eingebunden (`import x from '.../datei.svg'`,
`<img src={x.src} width={x.width} height={x.height} ... />`), nicht über die
`Image`-Komponente — deren Sharp-Pipeline ist für Rasterbilder gedacht und
verarbeitet Vektorgrafiken nicht sinnvoll.

Noch offen:

- **Footer** behält die Textwortmarke. Das Lockup ist einfarbig Dunkelblau,
  auf dem dunklen Footer-Hintergrund unlesbar — unabhängig vom Dateiformat.
- **Favicon** (`public/favicon.png`) ist noch nicht erneuert, zeigt weiterhin
  den alten schwarzen Bogen aus der früheren JPEG-Quelle. Eine Neufassung aus
  `bogen.svg` braucht eine Entscheidung zu Zuschnitt und Innenabstand im
  quadratischen Format.

## Offene Punkte

Diese Punkte sind bewusst nicht Teil des aktuellen Stands:

- **Platzhalterwerte in `src/consts.ts`:** Gottesdienstzeit und Adresse sind
  gesetzt. `CONTACT` ist mit `info@bremen.arche-gemeinde.de` eingerichtet.
  `SITE.domain` bleibt `PLATZHALTER`, bis die Domain feststeht.
- **Impressum:** `/impressum` ist vorhanden, Angaben 1:1 von arche-gemeinde.de
  übernommen. **Juristisch nicht bestätigt** — nur korrekt, wenn Arche Bremen
  rechtlich Teil des Hamburger Vereins ist. Vor dem ersten Deploy von
  fachkundiger Seite prüfen lassen, ebenso Registereintrag und USt-IdNr.
- **Datenschutz:** `/datenschutz` existiert, eigens für diese Seite verfasst
  (nicht von arche-gemeinde.de übernommen — dort werden Dienste beschrieben,
  die es hier nicht gibt). **Juristisch nicht bestätigt**, insbesondere die
  Einschätzung, dass mangels Cookies/Tracking kein Consent-Banner nötig ist.
  Sobald ein Dienst mit Speicherzugriff dazukommt (eingebettete Karte,
  Newsletter, Zahlungsformular auf der eigenen Seite), wird ein
  Consent-Banner Pflicht und diese Erklärung muss erweitert werden.
- **Offline-Fallback für Sanity:** Noch kein `sanity dataset export`-Snapshot
  als Fallback, falls die API zur Buildzeit nicht erreichbar ist.
- Kalenderansicht, Predigtfilter, Audio-Player, Über-uns- und
  Gemeindeleben-Seiten, Ältestenprofile, Suche, Deployment, Studio-Deploy.

## Deployment

Noch nicht eingerichtet. Vorgesehen: Cloudflare Pages, Build mit `npm ci` und
`npm run build`. `SANITY_DATASET=production` als Umgebungsvariable im
Hosting-Dashboard setzen (nicht im Repo).
