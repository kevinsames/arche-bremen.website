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
| `preachers` | Vollständige Prediger-Profile | `src/content/preachers/max-mustermann.md` |

Verknüpfung: Ein `preacher`-Dokument in Sanity und ein Markdown-Profil im Repo
gehören zusammen, wenn ihr Slug (Sanity) bzw. Dateiname (Repo) übereinstimmt.
Gibt es keine Übereinstimmung (z.B. Gastprediger), wird nur der Name als Text
angezeigt, ohne Link.

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

## Offene Punkte

Diese Punkte sind bewusst nicht Teil des aktuellen Stands:

- **Platzhalterwerte in `src/consts.ts`:** Gottesdienstzeit, Adresse, Domain,
  Funktionsadresse und Fixtermine sind mit `PLATZHALTER` markiert und müssen
  vor dem ersten Deploy durch echte Werte ersetzt werden.
- **Fonts:** Aktuell Systemfont-Stack. `CLAUDE.md` fordert selbstgehostete
  Fonts (max. zwei Schnitte, `font-display: swap`) — noch nicht umgesetzt.
- **Impressum und Datenschutz:** Im Footer verlinkt (`/impressum`,
  `/datenschutz`), aber die Seiten existieren noch nicht. Beide Links sind
  aktuell tot.
- **Offline-Fallback für Sanity:** Noch kein `sanity dataset export`-Snapshot
  als Fallback, falls die API zur Buildzeit nicht erreichbar ist.
- Kalenderansicht, Predigtfilter, Audio-Player, Über-uns- und
  Gemeindeleben-Seiten, Ältestenprofile, Suche, Deployment, Studio-Deploy.

## Deployment

Noch nicht eingerichtet. Vorgesehen: Cloudflare Pages, Build mit `npm ci` und
`npm run build`. `SANITY_DATASET=production` als Umgebungsvariable im
Hosting-Dashboard setzen (nicht im Repo).
