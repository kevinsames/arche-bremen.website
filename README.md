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

Importiert `sanity/seed/development.ndjson` (zwei Prediger, eine
Beispielpredigt, ein Beispieltermin) fest in das Dataset `development` — das
Zielname steht im npm-Skript, nicht in `SANITY_DATASET`, damit ein falsch
gesetzter Wert nie versehentlich `production` überschreibt. `--replace`
ersetzt nur Dokumente mit gleicher `_id`, leert das Dataset nicht.

Free-Datasets sind öffentlich lesbar (siehe CLAUDE.md) — deshalb im Seed keine
personenbezogenen Daten außer dem Namen, den das `preacher`-Schema ohnehin
vorsieht.

## Datenmodell

Details und Begründung in `CLAUDE.md`, Abschnitt "Datenmodell (Sanity)".
Kurzreferenz:

### Sanity (`sanity/schemaTypes/`)

| Typ | Felder | Datei |
|---|---|---|
| `sermon` | title, slug*, date, preacher→, series, passages[], audioUrl/audioFile, description | `sermon.ts` |
| `preacher` | name, slug | `preacher.ts` |
| `event` | title, start, end, location, description | `event.ts` |

\* Abweichung vom Datenmodell in `CLAUDE.md`: `sermon.slug` ist hier Pflicht,
weil ohne Slug keine Detailseite unter `/predigten/<slug>` erreichbar wäre.

Die 66 Bibelbücher stehen fest in `sanity/bibleBooks.ts` — niemals als
Freitext im Schema, sonst ist Filterbarkeit dauerhaft zerstört.

### Repo (`src/content/`, Astro Content Collections)

| Collection | Zweck | Beispiel |
|---|---|---|
| `pages` | Statische Seiten (Glaubensbekenntnis, später Impressum etc.) | `src/content/pages/glaubensbekenntnis.md` |
| `elders` | Profile der Ältesten (Gemeindeleitung) | `src/content/elders/niklas-meyer.md` |

Verknüpfung: Ein `preacher`-Dokument in Sanity und ein Markdown-Profil im Repo
gehören zusammen, wenn ihr Slug (Sanity) bzw. Dateiname (Repo) übereinstimmt.
Gibt es keine Übereinstimmung (z.B. Gastprediger ohne Ältestenamt), wird nur
der Name als Text angezeigt, ohne Link. `preacher` bleibt bewusst der
technische Name in Sanity — er beantwortet "wer hat gepredigt", nicht "wer ist
Ältester". Die Website zeigt die verknüpften Profile unter `/aelteste`.

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
`grep -n '^[0-9]\+\. ' src/content/pages/*.md` prüfen.

## Markendateien

`src/assets/brand/` enthält das Logo als Interim-JPEG (Hamburg hat noch keine
SVG geliefert). Details, Einschränkungen und Ausstiegsbedingung stehen in
`DESIGN.md`, Abschnitt „Logo (Interim, August 2026)".

Trifft die offizielle SVG ein:

1. `src/assets/brand/logo-lockup-blue.jpg` und `mark-blue.jpg` durch die SVG
   ersetzen, Referenzen in `Header.astro` und `index.astro` anpassen.
2. `mix-blend-mode: multiply`-Regeln in `Header.astro` und `index.astro`
   entfernen (nur für den JPEG-Interim nötig).
3. Footer-Textwortmarke (`Footer.astro`) durch das Logo ersetzen — bisher
   ohne Asset für dunklen Grund ausgelassen.
4. Favicon aus der SVG neu erzeugen, `public/favicon.png` ersetzen. Das
   aktuelle Favicon stammt aus einer JPEG-Quelle:
   ```sh
   sips -s format png "src/assets/brand/mark-white-on-black.jpg" --out public/favicon.png
   ```
5. `DESIGN.md` und `CLAUDE.md` (Design-und-Marke-Regel 8) entsprechend
   aktualisieren.

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
