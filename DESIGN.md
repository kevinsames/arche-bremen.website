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
- Eckenradius für Flächen (`--radius-sm`)
- Verhalten des Logos unter ca. 320 px Breite

Diese Entscheidungen stehen in `tokens.css` und sind dort als erfunden
gekennzeichnet. Sie sollten Hamburg zur Kenntnis gegeben werden — nicht zur
Genehmigung, aber damit ein späteres offizielles Web-Kapitel nicht abweicht.

**Visited-Links:** `--link-visited` verweist auf `--text-secondary` (Braun,
6,15 : 1 gegen Weiß, siehe Tabelle unten) statt auf einen eigenen Rohfarbwert.
Kein neues Pantone nötig, und die Farbe ist bereits AA-geprüft.

**Radius:** `--radius-sm: 0.25rem` deckt die einzige abgerundete Fläche der
Seite ab (Gottesdienstzeit-Box auf der Startseite). Das Brandbook kennt keine
Eckenradien; der Wert ist frei gewählt, nicht aus Pantone/Print abgeleitet.

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
Vektorkonturen. Damit entfällt die Lizenzfrage für die Wortmarke vollständig.

Falls Hamburg eine Futura-Webfont-Lizenz besitzt, die Bremen mitabdeckt, wird
`--font-display` umgestellt und diese Abweichung entfällt. Lizenzrechtliche
Bewertung nicht durch uns.

## Bildwelt

Brandbook 3.1 verlangt **mindestens 70 % Fotos aus der lokalen Arche**. Eine
Gemeindegründung hat zu Beginn keine. Konsequenz für den Launch:

Zurückhaltendes, typografisch getragenes Design mit wenigen Bildern statt
Stock-Fotografie. Bilder werden ergänzt, wenn echte entstehen. Keine
Platzhalterfotos von lachenden Fremden — das verstößt gegen den Guide und wirkt
bei einer neuen Gemeinde unglaubwürdig.

## Offene Fragen an Hamburg

Diese sollten in einer Mail gebündelt werden, bevor gestaltet wird:

1. Darf die Gemeindegründung Bremen das Arche-Logo führen, und in welcher
   Variante? Brandbook 1.3 und 1.4 regeln Verwendung und Teilbereiche — gibt es
   einen dokumentierten Lockup mit Ortszusatz („Arche Bremen")?
2. Gibt es das Logo als SVG oder EPS? Bitte nicht als PNG oder aus dem PDF
   extrahiert.
3. Besteht eine Futura-Webfont-Lizenz, die Bremen abdeckt?
4. Existiert inzwischen ein Web-Anhang zum Brandbook oder eine v1.2? Unser Stand
   ist v1.1.
5. RGB-Wert für „Dunkles Braun" (Pantone 412 C) — im PDF unlesbar extrahiert.
6. Kapitel 4 beschreibt die Stilelemente „Bogen" und „Abstufung". Diese sind
   rein visuell und aus der Textebene nicht erschließbar. Vor der Gestaltung
   ansehen und hier dokumentieren.
