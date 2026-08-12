# Design — Web-Übersetzung des Brandbooks

Quelle: `Brandbook ARCHE v1.1`, erstellt 2020 mit InDesign, letzte Änderung
2023. Print-Dokument (PDF/X-3, CMYK/Pantone).

Das PDF liegt **nicht** in diesem Repo — 39 MB würden dauerhaft in der
Git-Historie liegen. Es gehört in die geteilte Ablage der Gemeinde, verlinkt in
`MAINTAINERS.md`.

Alle Farb- und Typo-Werte leben in `src/styles/tokens.css`. Diese Datei erklärt
das Warum und dokumentiert, wo wir vom Brandbook abweichen.

---

## Was das Brandbook nicht abdeckt

Kapitel 2.2 ist mit „PRINT" überschrieben, 2.3 mit „ON AIR". Ein Web-Kapitel
existiert nicht. Nicht spezifiziert und für diese Website erfunden:

- Interaktionszustände: Hover, Focus, Active, Disabled, Visited
- Fehler-, Warn- und Erfolgsfarben (Formularvalidierung)
- Typo-Skala über Viewport-Breiten, Zeilenhöhen, maximale Zeilenlänge
- Abstandssystem
- Eckenradius für Flächen (`--radius-sm`, `--radius-md`, `--radius-lg`)
- Verhalten des Logos unter ca. 320 px Breite
- Bewegung/Übergänge (`--duration-fast`, `--duration-slow`, `--ease-out`)
- Zweite Layout-Breite für Raster und Vollbild-Sektionen
  (`--width-content`), zusätzlich zur Fließtext-Breite `--measure`
- Eine Schriftgröße oberhalb der bisherigen Skala für den Startseiten-Hero
  (`--fs-display`)
- Overlay-Darstellung für Popups (`--scrim`, `--blur-overlay`,
  `--shadow-overlay`)
- Kachelflächen als verdünnte Akzente (`--surface-warm`, `--surface-warm-alt`,
  `--surface-nature`), je eine kräftigere Hover-Stufe dazu
  (`--surface-warm-strong`, `--surface-warm-alt-strong`,
  `--surface-nature-strong`)
- Icons (Header/Footer, August 2026): keine Icon-Font, keine Sprite-Datei,
  keine neue Dependency — handgeschriebene Inline-SVGs, `stroke="currentColor"`
  statt festem Farbwert (funktioniert auf hellem Header und dunklem Footer
  gleichermaßen), Größe in `em` statt `px`, damit sie mit der Schriftgröße
  skalieren. Rein dekorativ, `aria-hidden="true"`.
- Navigation unter 64rem als Burger-Menü (August 2026): Ab fünf Reitern
  reicht die Breite nicht mehr für eine ungebrochene Navigationszeile neben
  Logo und Spenden-Knopf. Das Menü öffnet als vollflächiges Sheet über
  dieselbe `Overlay.astro`-Komponente wie die Predigt- und
  Ältesten-Kacheln — native Popover-API, 0 KB JavaScript. Browser ohne
  Popover-Unterstützung (Safari vor 17, Firefox vor 125) bekommen
  stattdessen die vollständige, frei umbrechende Navigation im Header
  zurück (siehe `@supports not selector(:popover-open)` in
  `Header.astro`) — dort wäre ein Knopf, der nichts öffnen kann, sonst eine
  Sackgasse.

Diese Entscheidungen stehen in `tokens.css` und sind dort als erfunden
gekennzeichnet. Sie sollten Hamburg zur Kenntnis gegeben werden — nicht zur
Genehmigung, aber damit ein späteres offizielles Web-Kapitel nicht abweicht.

**Visited-Links:** `--link-visited` verweist auf `--text-secondary` (Braun,
6,15 : 1 gegen Weiß, siehe Tabelle unten) statt auf einen eigenen Rohfarbwert.
Kein neues Pantone nötig, und die Farbe ist bereits AA-geprüft.

**Radius:** `--radius-sm: 0.25rem` — kleinster Wert der Skala, für kompakte
Rahmenflächen: den Schließen-Button im Popup (`Overlay.astro`) und das
Suchfeld der Predigt-Filterleiste (`SermonFilter.astro`, siehe „Formulare"
unten). Das Brandbook kennt keine Eckenradien; der Wert ist frei gewählt,
nicht aus Pantone/Print abgeleitet. Mit dem Redesign auf ein moderneres, an
Apple/Netflix orientiertes Erscheinungsbild (August 2026) kamen zwei weitere
Stufen dazu: `--radius-md: 0.75rem` für Predigt-Kacheln und, seither
ebenfalls, die Filter-Pills der Predigtenseite; `--radius-lg: 1.25rem` für
Hero- und Vollbild-Sektionsflächen. Gleiches Prinzip: frei gewählt, keine
Print-Herkunft.

Das Kachel-Muster (Karte + Popup) wiederholt sich mittlerweile ein drittes
Mal: Predigten, Älteste und seit August 2026 auch die 25 Artikel des
Glaubensbekenntnisses (`/glaubensbekenntnis`, vorher eine einzige lange
`.prose`-Seite). Überarbeitet im August 2026 von Rahmen auf Fläche: statt
eines dünnen Akzentstreifens im Kachelkopf trägt jetzt die ganze Kachel eine
verdünnte Akzentfläche, ohne Rahmen und ohne Schatten. Radius ist
asymmetrisch — drei Ecken `--radius-md`, die Ecke oben rechts `--radius-lg`
— als Anspielung auf das Bogen-Stilelement aus Brandbook Kapitel 4.
Hover/Fokus heben die Kachel per `translate` an und vertiefen die Fläche auf
die zugehörige `--surface-*-strong`-Stufe, zusätzlich wird der Titel
unterstrichen. Ein erster Versuch mit einem innen liegenden `outline` in
`--c-blue` (statt `border-color`) wurde verworfen: Blau auf einer warmen
Fläche wirkte als Fremdfarbe, und ein umlaufender Ring direkt an der
Kachelkante las sich als „ausgewählt", nicht als Hover — im Ergebnis wieder
der Rahmen-Look, der mit dem Umbau verschwinden sollte. Der Tastatur-Fokus
bleibt trotzdem sichtbar über die globale, außen liegende
`:focus-visible`-Regel in `global.css` — die Kachel braucht dafür keinen
eigenen Ring. Vor dieser Überarbeitung wurde die Kachel per `transform:
scale()` vergrößert, was Text unscharf zeichnete und in `Slider.astro`
(`overflow-x: auto`) Scrollweg erzeugte.

Predigten und Älteste rotieren weiterhin über drei Töne
(`--surface-warm`/`--surface-warm-alt`/`--surface-nature`, nach Index) — bei
wenigen Kacheln grenzt das sie sinnvoll voneinander ab. Die 25
Glaubensbekenntnis-Kacheln bekamen im September 2026 stattdessen einen
einzigen Ton (`--surface-warm`): Bei 25 Stück wirkte die Rotation unruhig,
ohne dass die Farbe etwas bedeutete. Zugleich wurde die Kachel inhaltlich
ergänzt — sie zeigt jetzt neben Nummer und Titel auch einen
zusammenfassenden Satz (`summary`-Feld, siehe `content.config.ts` und
README), damit sich ein Artikel ohne Klick erschließt. Die Artikelnummer
ist dafür von `--fs-xxl` auf `--fs-xs` geschrumpft und dient nur noch als
Eyebrow über dem Titel (`--text-secondary`, Versalien) — vorher war sie das
größte Element der Kachel, obwohl sie die am wenigsten wichtige Information
trägt. Die 25 `summary`-Sätze sind Entwürfe und noch nicht von der Gemeinde
oder Hamburg inhaltlich freigegeben (siehe Kommentar im Schema).

**Bewegung:** `--duration-fast: 150ms` für Hover- und Focus-Übergänge,
`--duration-slow: 400ms` für das Scroll-Reveal der Sektionsüberschriften,
`--ease-out` als gemeinsame Timing-Funktion. Größtenteils reines CSS
(`transition`/`animation`), abschaltbar über die globale
`@media (prefers-reduced-motion: reduce)`-Regel in `global.css`.

Eine Ausnahme (September 2026): der Predigtfilter unter `/predigten`
(`SermonFilter.astro`) nutzt `document.startViewTransition`, damit
verbleibende Kacheln beim Filtern in ihre neuen Rasterplätze gleiten statt zu
springen — das kann reines CSS nicht, weil es eine Positionsänderung über
zwei DOM-Zustände hinweg interpolieren muss. Jede Kachel trägt dafür einen
`view-transition-name` (`SermonCard.astro`). Bewegungsprofil bewusst
minimal: nur Ein-/Ausblenden, kein zusätzlicher Versatz. Dauer kommt aus
`--duration-fast`, gesetzt über `::view-transition-group(*)` — dieser
Selektor ist ein Pseudoelement am Dokumentwurzelknoten und von Astros
Scoped Styles nicht erreichbar, daher als `<style is:global>` direkt in
`SermonFilter.astro` statt in `global.css`, damit Auslöser und Dauer
zusammenstehen.

Die pauschale `prefers-reduced-motion`-Regel in `global.css` greift hier
**nicht** — ihr `*`-Selektor trifft keine `::view-transition-*`-
Pseudoelemente. Die Abschaltung liegt deshalb im Skript selbst
(`window.matchMedia('(prefers-reduced-motion: reduce)')`, bei jedem
Filteraufruf neu geprüft) und schaltet ohne Unterstützung oder bei
reduzierter Bewegung auf sofortiges Umschalten zurück — derselbe Effekt wie
vor dieser Änderung.

**Scroll- und Klick-Hinweise (August 2026):** Drei Stellen fehlte ein Signal,
das v. a. auf Touch-Geräten (70–80 % des erwarteten Traffics, siehe
CLAUDE.md) auffällt, weil dort kein Hover existiert:

1. Der Hero endete mit dem Button „So findest du uns" ohne Hinweis, dass
   darunter noch Inhalt folgt. Ergänzt: ein zentrierter Chevron
   (handgeschriebenes Inline-SVG, gleiches Muster wie Header/Footer-Icons
   oben) unter dem Button, `color: var(--text-secondary)`. Er blendet beim
   Scrollen über `animation-timeline: scroll(root block)` innerhalb der
   ersten 20 vh aus (`@supports`-Fallback: bleibt einfach stehen, kein
   Fehlerfall — gleiches Prinzip wie das Heading-Reveal oben).
2. Die Kacheln (Predigten, Glaubensbekenntnis, Älteste) signalisierten
   Klickbarkeit bisher nur über Hover (Flächenwechsel, Lift, Unterstreichung)
   — auf Touch unsichtbar. Ergänzt: der gleiche Chevron, jetzt dauerhaft
   unten rechts in der Kachel, der bei Hover/Fokus zusätzlich 2 px nach
   rechts wandert.
3. Die wischbare Predigt-Reihe (`Slider.astro`) hatte keinen Hinweis auf
   weitere Kacheln außer der angeschnittenen nächsten Kachel. Ergänzt: eine
   schmale `mask-image`-Ausblendung am rechten Rand (`--sp-3` breit). Nur
   rechts — links wäre die Kante an Scrollposition 0 falsch. `black` und
   `transparent` sind hier Alpha-Werte der Maske, keine Markenfarben — die
   einzige Stelle mit einem Farbliteral im Komponentencode.

Verworfen: ein dauerhaft wippender Chevron (hätte ein drittes Motion-Token
gebraucht und bewegt sich ohne Nutzeraktion — passt nicht zum sonst sehr
zurückhaltenden Umgang mit Bewegung) und Textlabels an den Kacheln wie
„Mehr lesen →" (macht die Kacheln voller und müsste pro Kacheltyp anders
lauten). Keine neuen Tokens — verwendet werden ausschließlich
`--text-secondary`, `--sp-3`/`--sp-5`, `--duration-fast`/`--duration-slow`
und `--ease-out`.

**Layout-Breiten:** `--measure` (62ch) bleibt die Breite für Fließtext.
Für Raster (Predigt-Kacheln) und Vollbild-Sektionen kam `--width-content:
72rem` dazu — breiter als eine lesbare Textspalte, aber begrenzt, damit
Inhalte auf großen Monitoren nicht ausufern.

**Overlay:** Mit dem Slider- und Popup-Muster (August 2026) kamen drei
Werte für die Predigt- und Prediger-Popups dazu: `--scrim` (abgedunkelter,
unscharfer Hintergrund hinter dem Popup), `--blur-overlay` (16px) und
`--shadow-overlay`. Auch hier: frei gewählt, keine Print-Herkunft. Der
Scrim ist aus `--c-blue-dark` gemischt statt aus reinem Schwarz, damit der
abgedunkelte Zustand noch nach der Marke aussieht, nicht nach generischem
UI. Kein eigenes `--z-*`-Token nötig — die Popups nutzen die
HTML-Popover-API und damit den Top-Layer des Browsers, kein manuelles
Stapeln.

**`--fs-display`:** Eine Stufe oberhalb von `--fs-xxl`, ausschließlich für
den Startseiten-Hero. Kein Ersatz für die bestehende Skala, sondern eine
Ausnahme für genau eine Stelle.

**Formulare (August 2026):** Die Such-/Filterleiste unter `/predigten`
(`SermonFilter.astro`) ist die erste Stelle im Repo mit `<input>`,
`<fieldset>`/`<legend>` und `<label>` — es gab dafür keine bestehenden
Muster zum Wiederverwenden. Übernommen aus benachbarten Komponenten statt
neu erfunden: Feldrahmen (`1px solid var(--border-subtle)`, `--radius-sm`,
`--bg-page`) vom Schließen-Button in `Overlay.astro`; Labels
(`--font-display`, Versalien, `--fs-xs`, `--tracking-display`) vom Eyebrow
der Predigt-Kachel (`SermonCard.astro`); der Zurücksetzen-Button als
kompaktes Pill in `--accent-warm`-Fläche mit `--text-primary`-Schrift vom
`.donate`-Knopf im Header.

Bibelbuch, Prediger und Predigtreihe verwenden bewusst **kein** `<select>`
— die Predigtenseite soll niemals Dropdowns benutzen (siehe CLAUDE.md),
weil eine zugeklappte Optionsliste den Bestand (welche Bücher, welche
Prediger gibt es) verbirgt statt ihn zu zeigen. Stattdessen: pro Option ein
`<label class="pill">` um ein per `.visually-hidden` unsichtbares, aber
weiterhin fokussierbares `<input type="radio">`, gruppiert in einem
`<fieldset>` mit `<legend>`. Das Pill selbst trägt dieselbe Feldoptik wie
das Suchfeld (Rahmen, `--bg-page`), nutzt aber `--radius-md` wie die
Predigt-Kacheln statt `--radius-sm` — die Fläche ist größer als ein
Texteingabefeld und wirkt mit dem kleineren Radius abgeschnitten.

**Auswahl/Aktiv-Zustand:** Der zuvor als offene Frage geführte Zustand
(siehe „Was das Brandbook nicht abdeckt" oben) ist mit den Pills entschieden:
`--bg-inverted` als Fläche, `--text-on-dark` als Schrift (12,07 : 1, AAA
gegen Dunkelblau, siehe Tabelle unten) — bewusst nicht `--accent-warm`, das
direkt daneben schon der Zurücksetzen-Button belegt; zwei gelbe Flächen
nebeneinander wären nicht auseinanderzuhalten. Kein eigener Fokusring für
Suchfeld oder Pills; die globale `:focus-visible`-Regel in `global.css`
reicht, wird am Pill aber per `:has(input:focus-visible)` wiederholt, weil
das eigentliche Radio unsichtbar ist und den Ring sonst nicht zeigen könnte.
Weiterhin ohne Token, weil noch nirgends gebraucht: ein **Disabled**-Zustand
für Formularelemente — der Zurücksetzen-Button ist dauerhaft aktiv, ein
`disabled`-Zustand wäre hier ohne Nutzen.

## Bewusste Abweichungen

### 1. Sekundärfarben tragen keinen Text

Das Brandbook sieht Sanftes Grün und Gelb für „kleine Headlines" vor. Gemessene
WCAG-Kontraste gegen Weiß:

| Token | Farbe | Kontrast | AA Normaltext (4,5) | AA groß (3,0) |
|---|---|---|---|---|
| `--c-blue-dark` | `#003a56` | 12,07 | bestanden | bestanden |
| `--c-brown` | `#666157` | 6,15 | bestanden | bestanden |
| `--c-blue` | `#4e87a0` | 3,96 | verfehlt | bestanden |
| `--c-brown-gray` | `#a19688` | 2,90 | verfehlt | verfehlt |
| `--c-ochre` | `#d9a500` | 2,25 | verfehlt | verfehlt |
| `--c-orange` | `#f7a823` | 1,98 | verfehlt | verfehlt |
| `--c-green` | `#abcc59` | 1,82 | verfehlt | verfehlt |
| `--c-yellow` | `#ffd300` | 1,44 | verfehlt | verfehlt |

Auf gebrochenem Weiß liegen alle Werte noch etwa 12–14 % darunter.

**Kachelflächen sind keine Ausnahme von dieser Regel, sondern ihre Anwendung:**
`--surface-warm`/`--surface-warm-alt`/`--surface-nature` (siehe oben) sind die
Akzente auf 14–16 % gegen Weiß verdünnt — Flächen, kein Text. Beide Textfarben
bleiben auf ihnen im AA-Bereich:

| Fläche | Hex (ca.) | vs. `--text-secondary` (Braun) | vs. `--text-primary` |
|---|---|---|---|
| `--surface-warm` | `#fffbdd` | 5,87 : 1 — AA | ca. 11,4 : 1 — AAA |
| `--surface-warm-alt` | `#fef4e0` | 5,63 : 1 — AA | ca. 11,0 : 1 — AAA |
| `--surface-nature` | `#f2f7e4` | 5,62 : 1 — AA | ca. 10,9 : 1 — AAA |
| `--surface-warm-strong` | `#fff3b8` | 5,51 : 1 — AA | ca. 10,7 : 1 — AAA |
| `--surface-warm-alt-strong` | `#fde7c1` | 5,11 : 1 — AA | ca. 9,9 : 1 — AAA |
| `--surface-nature-strong` | `#e4efca` | 5,25 : 1 — AA | ca. 10,2 : 1 — AAA |

Grün ist auf 16 %/32 % statt 14 %/28 % gemischt, weil es bei gleicher
Verdünnung wie Gelb/Orange farblich fast verschwindet. Die `*-strong`-Stufe
ist die Hover-/Fokus-Fläche derselben Kacheln (siehe Kachel-Absatz oben) —
kräftiger gemischt, aber weiterhin klar innerhalb AA.

**Regel:** Gelb, Orange, Grün, Ocker und Braun-Grau sind Flächen-, Rahmen- und
Stilelementfarben. Textfarben sind ausschließlich Dunkles Blau und Braun, auf
dunklem Grund Weiß. `--c-blue` nur für große Schrift und UI-Rahmen.

Praktische Folge: Die Marke lebt im Web über Flächen, Weißraum und Typografie,
nicht über farbigen Text. Das ist eine gestalterische Einschränkung, kein
Fehler — sie ergibt sich daraus, dass ein für gestrichenes Papier entworfenes
Farbsystem auf Bildschirmen andere Kontraste liefert.

Barrierefreiheitspflichten für Vereine und Kirchen sind rechtlich eine eigene
Frage (BFSG, Ausnahmen für nicht-wirtschaftliche Tätigkeit und
Kleinstunternehmen). Wir halten AA aus Praxisgründen ein; eine verbindliche
Einschätzung gehört zu jemandem mit Fachkunde.

**Zweitverwendung als Hinweisfläche:** Der Hinweisblock für ausgefallene
Termine (`index.astro`, `.notice`) nutzt dieselben Tokens wie die
Kachelflächen — `--surface-warm-alt` als Fläche, `--accent-warm-alt` als
Rahmenstreifen. Kein neues Tokenpaar für „Warnung"/„Hinweis": Die Farbwerte
und ihre Kontrastprüfung oben gelten unverändert, Orange bleibt Fläche und
Rahmen, nie Text. Dieselbe Fläche trägt seit August 2026 auch die
Gebetsanliegen-Liste (`.prayer-list`) — eigene Klasse, gleiche Tokens, aus
demselben Grund: kein drittes Tokenpaar für einen dritten Anwendungsfall
derselben Fläche.

**Hero in der Gründungsphase (August 2026):** Above the fold stand ursprünglich
Gottesdienstzeit und Adresse (`SERVICE`/`ADDRESS`). Es gibt noch keinen
öffentlichen Gottesdienst — an ihrer Stelle stehen jetzt Gründungsstatus und
geplanter erster Gottesdienst (`FOUNDING` in `src/consts.ts`), typografisch in
derselben Struktur (Claim in `--fs-l`, Meilenstein-Datum in `--fs-xl` mit
Eyebrow-Label im `.event-title`-Stil). Keine neuen Tokens dafür nötig. Der
Wechsel zurück zu Gottesdienstzeit und Adresse ist in `README.md`, Abschnitt
„Offene Punkte", vermerkt.

### 2. Jost statt Futura

Brandbook 2.1 schreibt Futura Bold und Medium für Logo und Headlines vor,
primär in Versalien mit Laufweite 70.

Futura ist kommerziell lizenziert. Eine Desktop-Lizenz deckt Webfont-Einbettung
nicht ab; Webfont-Lizenzen werden separat vertrieben. Wir nutzen **Jost**
(SIL Open Font License), eine bewusst an Futura orientierte geometrische
Groteske. In Versalien mit weiter Laufweite ist der Unterschied gering.

Der Fließtext bleibt regelkonform: **Source Serif Pro** ist unter SIL OFL frei
verfügbar und selbst gehostet.

Das **Logo** verwendet keinen Webfont, sondern die offizielle SVG-Datei mit
Vektorkonturen — damit entfällt die Lizenzfrage für die Wortmarke vollständig.
Siehe Abschnitt „Logo" unten.

Falls Hamburg eine Futura-Webfont-Lizenz besitzt, die Bremen mitabdeckt, wird
`--font-display` umgestellt und diese Abweichung entfällt. Lizenzrechtliche
Bewertung nicht durch uns.

## Logo

Seit 10. August 2026 liegt die offizielle Vektordatei vor:
`src/assets/brand/arche-logo.svg` — Lockup „ARCHE" + Unterzeile
„Ev.-Reformierte Freikirche" + Bogen, einfarbig Dunkelblau (`#003a57` — ein
Zeichen abweichend vom Token `--c-blue-dark`, `#003a56`; bekannte, minimale
Abweichung des gelieferten Lockups, hier nicht korrigiert), echter
Alphakanal. Löst die vorherige
JPEG-Interimslösung (Header/Hero/Stilelement über `mix-blend-mode: multiply`)
vollständig ab; die Blend-Mode-Regeln sind entfernt.

Verwendung:

| Datei | Inhalt | Einsatz |
|---|---|---|
| `arche-logo.svg` | Vollständiges Lockup, wie geliefert, unverändert | Header, Hero |
| `bogen.svg` | Nur der Bogen — ein einzelner Pfad aus `arche-logo.svg` herausgelöst, viewBox auf diesen Pfad zugeschnitten (plus Rand), sonst keine Änderung | Stilelement (Termine-Sektion) |
| `public/favicon.svg` / `public/favicon.png` | Derselbe Pfad wie `bogen.svg`, unverändert übernommen, per `transform` auf `<g>` in ein quadratisches 64×64-Format zentriert (kein Neuzeichnen). Farbe Dunkelblau (`#003a56`, Token `--c-blue-dark`), Hintergrund transparent | Tab-Icon |
| `og.svg` / `public/og.png` | Vollständiges Lockup, unverändert, zentriert auf `--c-offwhite`-Fläche mit schmalem `--c-blue-dark`-Abschlussbalken, 1200×630. Kein `<text>`-Element (Jost ist kein Systemfont, siehe „Jost statt Futura" oben) | Open-Graph-Vorschaukarte (`BaseLayout.astro`) |

Eingebunden per direktem Astro-Asset-Import (`import logo from
'.../arche-logo.svg'`, `<img src={logo.src} ...>`), nicht über die
`Image`-Komponente — deren Sharp-Pipeline ist für Rasterbilder gedacht und
verarbeitet Vektorgrafiken nicht sinnvoll. Ausnahme `favicon.svg`/`.png`: liegt
in `public/` und wird unverändert kopiert, kein Asset-Import (Browser laden
Icons direkt per `<link rel="icon">` aus `BaseLayout.astro`).

**Weiterhin offen:**

1. **Footer bekommt kein Logo.** Das Lockup ist einfarbig Dunkelblau; auf dem
   dunklen Footer-Hintergrund (`--bg-inverted`) unlesbar, unabhängig vom
   Dateiformat. Footer behält die Textwortmarke (`SITE.name` in Jost) — eine
   bewusste Abweichung von harter Regel 8, siehe dort. Löst sich erst mit
   einer hellen Logo-Variante für dunklen Grund.
2. **Kein Ortszusatz.** Das Lockup zeigt „ARCHE", nicht „Arche Bremen" —
   unverändert gegenüber dem Interim-Zustand, siehe offene Frage 1 oben.
   „Bremen" steht weiterhin im Seitentitel, im `alt`-Text und im Footer.
3. **Hero-h1 (SEO, September 2026):** Das Lockup zeichnet „ARCHE" und
   „Ev.-Reformierte Freikirche" bereits als Vektorpfade — für Suchmaschinen
   und Screenreader ist das aber kein Text. `index.astro` ergänzt das `<h1>`
   deshalb um ein visuell verborgenes `<span class="visually-hidden">`
   (`global.css`) mit `SITE.titleHome` als Transkription dieses Textes, nicht
   als zusätzliche Aussage. Optisch keine Änderung. `alt` am Logo-Bild wird
   dabei auf `""` gesetzt (im Header bleibt `alt={SITE.name}`, dort ist das
   Logo der Home-Link und braucht einen Accessible Name).

**Favicon, bewusste Abweichung von der Kontrastregel:** Der Favicon-Bogen ist
Dunkelblau auf transparentem Grund — eine der Ausnahmen, in denen eine
Nicht-Textfarbe als Fläche gedacht war (siehe Regel 3 oben), hier aber
zugunsten von Transparenz verworfen wurde. In einer dunklen Browser-Tableiste
(Dark Mode) ist der Bogen dadurch kaum sichtbar. Bewusst in Kauf genommen,
nicht versehentlich übersehen.

**Tokens** (`tokens.css`, Abschnitt Bildgrößen): `--size-logo-header`,
`--size-logo-hero`, `--size-mark` — reine Layout-Werte, keine
Auflösungsgrenze mehr (Vektorgrafik).

## Fußnoten

Seit August 2026 stehen die Bibelstellen des Glaubensbekenntnisses (siehe
`src/content/creed/`) als GFM-Fußnoten unter jedem Artikel statt als
Klammerverweise im Fließtext — Details und Konvention in `README.md`,
Abschnitt „Wie ein Artikel des Glaubensbekenntnisses geändert wird".

Gestaltung ausschließlich mit bestehenden Tokens (`.prose .footnotes` in
`global.css`): Trennlinie (`--border-subtle`) statt eigener Farbe, Text in
`--fs-xs` / `--text-secondary` — dasselbe Muster wie `.quelle` in
`glaubensbekenntnis.astro`.

Zwei Eigenheiten des generierten Markups, bewusst hingenommen statt
umgebaut (CLAUDE.md Regel 2/3 — keine eigene Rendering-Pipeline für einen
kosmetischen Randfall):

- **Überschrift ist sichtbar, nicht nur für Screenreader.** `satteri()`
  erzeugt `<h2 class="sr-only">Bibelstellen</h2>`. „sr-only" ist im Projekt
  nicht definiert (unser Pendant heißt `.visually-hidden`, siehe Abschnitt
  „Logo"), die Überschrift bleibt deshalb sichtbar. Das passt hier sogar
  gut — „Bibelstellen" als kleine Überschrift über der Liste ist ohnehin
  sinnvoll. Wer projektweit `.sr-only` einführt, macht sie unsichtbar; dann
  bräuchte `.prose .footnotes h2` eine eigene, wieder sichtbare Regel.
- **`id="footnote-label"` mehrfach im Dokument.** `/glaubensbekenntnis`
  rendert alle 25 Artikelkörper plus Vorwort auf einer Seite
  (`CreedCard.astro`-Popover), jeder mit eigenem `<section class="footnotes">`
  und identischem `id="footnote-label"`. Ein HTML-Validator meldet das als
  doppelte ID. Folgenlos für Funktion und Screenreader: Alle 26
  Überschriften tragen denselben Text, `aria-describedby="footnote-label"`
  löst deshalb inhaltlich immer richtig auf, und die Sprungziele selbst sind
  über die Fußnotenkennung eindeutig (siehe README, Präfix-Regel). Die
  Alternative — ein eigenes hast-Plugin, das IDs pro Artikel nachträglich
  präfigiert — wäre exakt die Art eigener Rendering-Pipeline, die Regel 2/3
  ausschließt.

## Bildwelt

Brandbook 3.1 verlangt **mindestens 70 % Fotos aus der lokalen Arche**. Eine
Gemeindegründung hat zu Beginn keine. Konsequenz für den Launch:

Zurückhaltendes, typografisch getragenes Design mit wenigen Bildern statt
Stock-Fotografie. Bilder werden ergänzt, wenn echte entstehen. Keine
Platzhalterfotos von lachenden Fremden — das verstößt gegen den Guide und wirkt
bei einer neuen Gemeinde unglaubwürdig.

**Ältesten-Porträts** (September 2026) sind das erste zugelassene Fotoformat:
echte Fotos der Gemeindeleitung, kein Stock — genau die Art Bild, die
Brandbook 3.1 verlangt. `elders.photo` in `content.config.ts` ist optional;
ohne hinterlegtes Foto bleibt die Ältesten-Kachel wie bisher rein
typografisch, es gibt kein Platzhalterbild und keine Silhouette. Zuschnitt
4:5 (Hochformat), `object-fit: cover`, mit denselben asymmetrischen
Kachel-Radien wie der Rest des Kachel-Musters (`--radius-md`/`--radius-lg`,
siehe oben) — kein Kreis-Avatar, das würde die eckige Formensprache des
Brandbooks brechen. Neuer Token `--size-portrait: 18rem` (Abschnitt
Bildgrößen), verwendet auf der Kachel (`ElderCard.astro`) und der
Detailseite (`/aelteste/<slug>`). Das Popup-Overlay der Kachel bleibt
bewusst textlich — ein zweites, kleineres Foto dort brächte keinen Mehrwert.

## Offene Fragen an Hamburg

Diese sollten in einer Mail gebündelt werden, bevor gestaltet wird:

1. Darf die Gemeindegründung Bremen das Arche-Logo führen, und in welcher
   Variante? Brandbook 1.3 und 1.4 regeln Verwendung und Teilbereiche — gibt es
   einen dokumentierten Lockup mit Ortszusatz („Arche Bremen")?
2. Gibt es das Logo als SVG oder EPS? Bitte nicht als PNG oder aus dem PDF
   extrahiert. **Stand 10. August 2026:** Ja, geliefert und eingebunden, siehe
   Abschnitt „Logo" oben (Header, Hero, Termine-Sektion umgestellt,
   `mix-blend-mode`-Regeln entfernt). Offen: Footer-Textwortmarke (keine
   Variante für dunklen Grund) und Favicon (noch nicht neu erzeugt).
3. Besteht eine Futura-Webfont-Lizenz, die Bremen abdeckt?
4. Existiert inzwischen ein Web-Anhang zum Brandbook oder eine v1.2? Unser Stand
   ist v1.1.
5. RGB-Wert für „Dunkles Braun" (Pantone 412 C) — im PDF unlesbar extrahiert.
6. Kapitel 4 beschreibt die Stilelemente „Bogen" und „Abstufung". Der Bogen
   liegt jetzt als eigene Datei vor (`bogen.svg`, siehe Abschnitt „Logo" oben)
   und ist als dekoratives Element in der Termine-Sektion umgesetzt.
   „Abstufung" bleibt offen, aus der Textebene nicht erschließbar.
