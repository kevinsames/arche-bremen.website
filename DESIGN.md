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
- Zwei Schriftgrößen oberhalb der bisherigen Skala für je eine Stelle der
  Startseite (`--fs-display`, `--fs-numeral`, September 2026)
- Overlay-Darstellung für Popups (`--scrim`, `--blur-overlay`,
  `--shadow-overlay`)
- Vollrunder Knopfradius (`--radius-pill`, September 2026)
- Kachelschatten beim Anheben (`--shadow-card`, September 2026)
- Abdunkelnder Verlauf über dem Hero-Foto (`--scrim-hero`, September 2026)
- Kachelflächen als verdünnte Akzente (`--surface-warm`, `--surface-warm-alt`),
  dazu eine kräftigere Hover-Stufe (`--surface-warm-strong`)
- Glasflächen für sticky Einzelelemente (`--surface-glass`, `--blur-glass`,
  September 2026)
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
Hero-, Vollbild-Sektions- und Overlay-Flächen. Gleiches Prinzip: frei
gewählt, keine Print-Herkunft.

Das Kachel-Muster (Karte + Popup) wiederholt sich mittlerweile ein drittes
Mal: Predigten, Älteste und seit August 2026 auch die 25 Artikel des
Glaubensbekenntnisses (`/glaubensbekenntnis`, vorher eine einzige lange
`.prose`-Seite). Überarbeitet im August 2026 von Rahmen auf Fläche: statt
eines dünnen Akzentstreifens im Kachelkopf trägt jetzt die ganze Kachel eine
verdünnte Akzentfläche, ohne Rahmen und ohne Schatten. Hover/Fokus heben die
Kachel per `translate` an und vertiefen die Fläche auf die zugehörige
`--surface-*-strong`-Stufe, zusätzlich wird der Titel unterstrichen. Ein
erster Versuch mit einem innen liegenden `outline` in `--c-blue` (statt
`border-color`) wurde verworfen: Blau auf einer warmen Fläche wirkte als
Fremdfarbe, und ein umlaufender Ring direkt an der Kachelkante las sich als
„ausgewählt", nicht als Hover — im Ergebnis wieder der Rahmen-Look, der mit
dem Umbau verschwinden sollte. Der Tastatur-Fokus bleibt trotzdem sichtbar
über die globale, außen liegende `:focus-visible`-Regel in `global.css` —
die Kachel braucht dafür keinen eigenen Ring. Vor dieser Überarbeitung wurde
die Kachel per `transform: scale()` vergrößert, was Text unscharf zeichnete
und in `Slider.astro` (`overflow-x: auto`) Scrollweg erzeugte.

Bis August 2026 trug die Kachel dazu einen asymmetrischen Radius — drei
Ecken `--radius-md`, die Ecke oben rechts `--radius-lg` — als Anspielung auf
das Bogen-Stilelement aus Brandbook Kapitel 4. Im September 2026 mit der
Farbrotation (nächster Absatz) zusammen zurückgenommen: Bei 20+ Kacheln im
Raster (Predigten, Glaubensbekenntnis) las sich die eine abweichende Ecke
nicht als Anspielung, sondern als Unregelmäßigkeit. Alle vier Kacheltypen
(`SermonCard`, `ElderCard`, `CreedCard`, `MinistryCard`) sowie das
Ältesten-Porträt auf der Detailseite (`gemeindeleitung/[slug].astro`)
nutzen seither einheitlich `--radius-md`. Der Bogen bleibt als eigenes
Stilelement in Termine-Sektion und Favicon erhalten — als Hintergrundfläche
hinter dem Predigt-Raster wurde er im September 2026 kurz erprobt und
wieder verworfen (siehe „Formulare" weiter unten), ohne dass der Radius
davon betroffen war.

Predigten und Älteste rotierten bis September 2026 über drei Töne
(`--surface-warm`/`--surface-warm-alt`/`--surface-nature`, nach Index) — in
der Annahme, das grenze wenige Kacheln sinnvoll voneinander ab. Die 25
Glaubensbekenntnis-Kacheln bekamen im September 2026 als erste einen
einzigen Ton (`--surface-warm`): Bei 25 Stück wirkte die Rotation unruhig,
ohne dass die Farbe etwas bedeutete. Bei einer Rückfrage zum
Gesamteindruck der Kacheln stellte sich dieselbe Begründung auch für
Predigten und Älteste als zutreffend heraus — dort fiel es bei wenigen
Kacheln nur weniger auf. Alle vier Kacheltypen tragen seither einheitlich
`--surface-warm`. Nebeneffekt: Die Rotation zwang `SermonFilter.astro`
dazu, beim Filtern die Flächen der sichtbar bleibenden Kacheln neu zu
vergeben (`card.dataset.surface`) — reine Folgelogik der Dekoration, mit ihr
entfernt. `--surface-nature`, `--surface-nature-strong` und
`--surface-warm-alt-strong` sind seither ungenutzt und aus `tokens.css`
gestrichen; `--surface-warm-alt` bleibt, `.notice`/`.prayer-list` in
`index.astro` und seit der Kontaktseite (September 2026) `.mail` in
`kontakt.astro` nutzen es weiterhin. Grün (`--accent-nature`) hat damit keine
Verwendung mehr auf der Website — die Rohfarbe bleibt trotzdem in
`tokens.css` stehen, sie ist Markenpalette aus dem Brandbook, nicht an eine
Anwendung gebunden.

Die Glaubensbekenntnis-Kachel bekam im September 2026 testweise einen
zusammenfassenden Satz pro Artikel (`summary`-Feld). Die Sätze waren
Entwürfe und nie von der Gemeinde oder Hamburg inhaltlich freigegeben; sie
wurden im August 2026 wieder entfernt, das Feld ist aus dem Schema
gestrichen. Die Kachel zeigt seither wieder nur Nummer und Titel. Die
Artikelnummer bleibt trotzdem von `--fs-xxl` auf `--fs-xs` geschrumpft und
dient als Eyebrow über dem Titel (`--text-secondary`, Versalien) — sie ist
die am wenigsten wichtige Information der Kachel und muss nicht das größte
Element sein.

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

**`--fs-display` und `--fs-numeral`:** Zwei Stufen oberhalb von `--fs-xxl`,
je für genau eine Stelle der Startseite — `--fs-display` für die Überschrift
des abschließenden Kontaktbands, `--fs-numeral` für die Datumszahlen der
Meilenstein-Fläche. Kein Ersatz für die bestehende Skala, sondern Ausnahmen
für zwei benannte Stellen. Bis September 2026 war `--fs-display` für den
Hero-Titel vorgesehen und dort tatsächlich ungenutzt (der Titel ist die
Wortmarke als SVG); der Anspruch unter der Wortmarke steht heute bei
`--fs-xxl` und soll die Marke darüber nicht überbieten.

**`--radius-pill`, `--shadow-card`, `--scrim-hero` (September 2026):** drei
Werte für die Neugestaltung (siehe eigener Abschnitt weiter unten).
`--radius-pill: 999rem` ist bewusst ein fester, absurd großer Wert und keine
Stufe der Radius-Skala: Er soll bei jeder Knopfhöhe eine Halbkreiskante
ergeben, nicht mitskalieren. `--shadow-card` ist die schwächere zweite Stufe
desselben Musters wie `--shadow-overlay`, in derselben Farbe (Dunkles Blau
statt Schwarz). `--scrim-hero` ist vollständig als Gradient-Wert in
`tokens.css` abgelegt statt im Komponentencode aus `color-mix()`
zusammengesetzt — die Prozentsätze darin sind Farbwerte und gehören nach
CLAUDE.md Design-Regel 1 nicht in eine Komponente.

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

**Sticky Glasstreifen (September 2026):** Der obere Teil der Filterleiste —
Suchfeld, Zurücksetzen-Button, Trefferzähler, zusammen in `.bar` — bleibt
beim Scrollen unter dem Header stehen (`position: sticky; top:
var(--header-height)`), mit derselben transluzenten Fläche wie der Header
selbst (`--surface-glass`, `--blur-glass`, per `@supports`-Block mit
deckendem Rückfall — exakt das Muster aus `Header.astro`). Grund: Ohne
Sticky-Verhalten scrollt die Leiste bei wachsendem Predigtbestand weg,
gerade wenn man mitten in der langen Bücher-Pill-Liste nach unten gescrollt
hat und den Filter ändern will. Bewusst **nicht** die ganze Leiste sticky —
nur der kompakte obere Streifen. Bei 60+ Bibelbuch-Pills würde eine
mitlaufende Vollleiste auf dem Handy den halben Bildschirm einnehmen; die
Pill-Gruppen scrollen deshalb normal weg wie der Rest der Seite.

`--header-height` hält den Streifen exakt unter dem (ebenfalls sticky)
Header — der Wert ist aus dem Header-Markup abgeleitet (Logohöhe bei
`--size-logo-header`, zweimal `--sp-2` Padding, 1px Unterkante) und muss von
Hand nachgezogen werden, falls sich die Höhe des Headers ändert (siehe
Kommentar am Token in `tokens.css`). Kein CSS-Mechanismus im Repo berechnet
das automatisch — ein `ResizeObserver` wäre client-seitiges JavaScript für
etwas, das sich in der Praxis so gut wie nie ändert.

Der Streifen bekommt außerdem denselben Randabfluss-Trick wie
`Slider.astro`: `Section.astro` gibt links/rechts `--sp-3` Innenabstand vor,
per negativem `margin-inline` aufgehoben und als eigenes `padding`
zurückgegeben. Ohne das reichte die Glasfläche nicht bis an den Rand des
Containers — direkt unter dem randlos bündigen Header wirkte der schmale,
unverglaste Streifen links und rechts wie eine offene Kante statt wie eine
saubere Fortsetzung.

Glassmorphism ist damit auf genau zwei Stellen begrenzt: Header und dieser
Filterstreifen — beide sticky Einzelelemente mit echtem, scrollendem Inhalt
dahinter. Bewusst **nicht** eingesetzt für Kacheln, Hero oder
Sektionsflächen: Dahinter liegt nur `--bg-page`/`--bg-muted`, eine
transluzente Fläche über reinem Weiß bringt keinen Effekt, den man nicht
auch durch einen schlichteren, deckenden Ton hätte. Zusätzlich wäre der
Textkontrast auf den Kacheln nicht mehr durchgehend berechenbar (siehe
Kontrasttabelle oben — sie setzt eine deckende Fläche voraus), und
`backdrop-filter` auf 20+ Rasterkacheln ist auf einfacher Mobil-Hardware
spürbar teuer (70–80 % erwarteter Traffic ist mobil, siehe CLAUDE.md).

Ein Bogen als blasses Hintergrundelement hinter dem Predigt-Raster (Ersatz
für die entfernte Farbrotation) wurde im September 2026 kurz erprobt und
wieder verworfen — er wirkte trotz geringer Deckkraft als Fremdkörper hinter
den Kacheln. Ein Kreuz als Alternative wurde ebenfalls nicht umgesetzt: Das
Brandbook kennt kein Kreuz als Stilelement, es wäre ein erfundenes
Markenzeichen (siehe Design-Regel 8) und stünde als zweites Symbol neben
dem Arche-Bildzeichen. Die Bildlücke auf `/predigten` (siehe „Bildwelt"
unten) bleibt vorerst offen, statt sie mit einem Stilelement zu füllen, das
nicht überzeugt.

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

## Neugestaltung September 2026 („mehr Anspruch")

Auftrag war, die Seite insgesamt hochwertiger wirken zu lassen; als
Anregung lagen Entwürfe eines eigenständig neu gebauten Seitenkonzepts vor.
Übernommen wurde daraus die **Gestaltungssprache**, nicht der Code — die
Entwürfe verletzten mehrere harte Regeln des Projekts (Client-JavaScript auf
Inhaltsseiten, Klartext-`mailto:`, Hex-Werte im Komponentencode, gemischte
Groß-/Kleinschreibung mit negativer Laufweite in den Headlines). Was
übernommen wurde und wie es hier umgesetzt ist:

**Überschriftenskala.** Bis September 2026 setzte `global.css` für `h1`–`h4`
zwar Schriftfamilie, Versalien und Laufweite, aber **keine Größe** — es
galten die Browser-Vorgaben (`h1` = 2em, `h2` = 1.5em, `h3` = 1.17em), die
weder zur Skala in `tokens.css` passten noch eine sichtbare Hierarchie
ergaben. Das war der größte einzelne Grund, warum die Seite schlicht wirkte.
Jetzt: `h1` = `--fs-xxl`, `h2` = `--fs-xl`, `h3` = `--fs-l`, `h4` = `--fs-m`,
dazu einheitliche Außenabstände für `h1`–`h4` und `p`.

**Überschriften und deutsche Komposita.** Mit den Größenstufen kam ein
Problem hoch, das vorher nur unsichtbar war: „GLAUBENSBEKENNTNIS" braucht in
Versalien mit `--tracking-display` rund 14 em und passt auf einem
360-px-Gerät bei keiner vertretbaren Überschriftgröße in eine Zeile — mit der
alten Browser-Vorgabe (`h1` = 2em) lief es rechts aus dem Bild, und
`html { overflow-x: hidden }` kappte den Überstand, ohne dass eine
Scrollleiste darauf hinwies. `h1`–`h4` haben deshalb jetzt
`hyphens: auto` (`lang="de"` steht in `BaseLayout.astro`) plus
`overflow-wrap: break-word` als Rückfall für Browser ohne deutsches
Trennwörterbuch — dort bricht die Silbe hart um, was unschön, aber lesbar
und im Bild ist. Bewusst **keine** Weichtrennzeichen (U+00AD) in den Titeln:
unsichtbare Zeichen in Content-Dateien sind für spätere Redakteure eine
Falle, und Predigttitel kommen ohnehin aus Sanity und lassen sich hier
nicht annotieren.

**Knöpfe.** `.button` ist von einer Rechteckfläche (`--radius-md`) auf eine
Pille (`--radius-pill`) umgestellt, hebt beim Überfahren an
(`translate` + `--shadow-card`) statt nur die Deckkraft zu senken, und hat
drei Zusatzklassen: `.button--accent` (gelbe Fläche, Text bleibt
`--text-primary`), `.button--outline` (Umriss für dunkle Flächen) und
`.button--arrow` (Pfeil ↗ als `::after`). Der Pfeil ist bewusst **nicht**
Teil von `.button`: Der Spenden-Knopf im Header trägt schon ein Herz-Icon
und soll keinen zweiten Bildzusatz bekommen.

**Sektionsbreite.** `Section.astro` hatte zwei Container-Breiten, und
`width="measure"` verengte den Container selbst auf `--measure` und
zentrierte ihn im Viewport. Unterseiten standen dadurch sichtbar anders als
die Startseite — der Textblock schwebte in der Bildschirmmitte statt am
linken Anschlag des Logos. Jetzt ist der Container immer `--width-content`
breit; `width="measure"` begrenzt nur noch die Zeilenlänge **innerhalb** des
Containers. Alle Bänder haben damit denselben linken Anschlag wie die
Kopfzeile. Wo eine Spalte zentriert stehen soll (Kontaktband der
Startseite), setzt die Seite das selbst mit `margin-inline: auto`.

**Vertikaler Rhythmus.** Der Innenabstand der Bänder wächst zwischen
`--sp-6` und `--sp-7` mit (`clamp(var(--sp-6), 8vw, var(--sp-7))`) — keine
neue Abstandsstufe, eine Interpolation zwischen zwei bestehenden.

**Hero der Startseite.** Aus Wortmarke auf Weiß wurde Wortmarke auf dem
Ortsbild, darüber `--scrim-hero`, Schrift in `--text-on-dark`. Dazu der
Anspruch (`FOUNDING.claim`) als Versal-Schauzeile in `--fs-xxl` und der
Meilenstein als Fußzeile des Heros über einer Haarlinie. Die Höhe kommt
weiterhin aus dem Inhalt (`min-height`, keine `vh`/`svh`-Einheit) — die
Vorgabe aus CLAUDE.md, dass Gründungsstatus und geplanter erster
Gottesdienst ohne Scrollen sichtbar sein müssen, gilt unverändert und ist
mobil geprüft. Die Wortmarke ist `arche-logo-white.svg`, dieselbe Datei wie
im Fuß.

**Datumsfläche.** Der geplante erste Gottesdienst steht ein zweites Mal als
gelbes Vollband mit den Zahlen in `--fs-numeral`. Neuer `tone="accent"` in
`Section.astro`: Gelb ausschließlich als Fläche, Schrift `--text-primary`
(8,38 : 1). Der Schrägstrich zwischen Tag und Monat ist **kleiner gesetzt**
statt abgeblendet — eine Deckkraft unter 1 mischt auf Gelb ein Olivgrün ein,
das wie eine vierte Markenfarbe aussieht. Damit die Zahlen nicht neben dem
Anzeigetext gepflegt werden müssen, steht das Datum in `consts.ts` nur noch
einmal als ISO-String; Anzeigetext, Wochentag und Einzelziffern leitet
`Intl.DateTimeFormat` zur Buildzeit daraus ab (Zeitzone explizit
`Europe/Berlin` — ein reines Datum ist UTC-Mitternacht und würde in einer
westlicheren Build-Zeitzone den Vortag ergeben).

**Gebetsanliegen.** Statt einer Aufzählung auf `--surface-warm-alt` jetzt
drei nummerierte Felder nebeneinander. Gleiche Inhalte aus
`PRAYER_REQUESTS`, nur als Raster. Bewusst **ohne** Hover-Zustand: Die
Felder sind Text, keine Kacheln — es gibt nichts zu öffnen.

**Kontaktband.** Neues dunkles Abschlussband über dem (ebenfalls dunklen)
Fuß, mit `--fs-display` als größter Schrift der Seite. Der Satz darin stammt
aus `/kontakt` und steht hier bewusst ein zweites Mal; er ist der Einstieg
in genau diese Seite.

### Gelbe Schrift auf Dunklem Blau (freigegeben September 2026)

CLAUDE.md Design-Regel 3 und der Abschnitt „Sekundärfarben tragen keinen
Text" weiter unten verbieten Gelb als Schriftfarbe ohne Einschränkung. Diese
Regel ist aus dem Kontrast **auf Weiß** begründet: Gelb auf Weiß liegt bei
1,44 : 1 und verfehlt AA auch für große Schrift deutlich. Auf **Dunklem
Blau** liegt dasselbe Gelb bei **8,38 : 1** — AAA für große, AA für normale
Schrift. Die Regel war also nicht zu weit gedacht, sondern zu weit
formuliert.

Zunächst als offene Frage notiert, im September 2026 vom Projektverantwortlichen
ausdrücklich freigegeben. Umgesetzt als eigenes semantisches Token, nicht als
Griff zur Rohfarbe:

```css
--text-accent-on-dark: var(--c-yellow);   /* 8.38 : 1 auf --bg-inverted */
```

Der Name trägt die Bedingung. Wer stattdessen `--accent-warm` oder
`--c-yellow` als `color` benutzt, umgeht die Bindung an den Hintergrund und
landet früher oder später bei gelber Schrift auf Weiß — genau dem Fall, den
Regel 3 verhindern soll. **Auf hellem Grund bleibt Gelb ausnahmslos Fläche.**

Eingesetzt an genau zwei Stellen, beide auf `--bg-inverted`: der zweite Teil
des Anspruchs im Hero (`FOUNDING.claimAccent`) und das zweite Wort der
Überschrift im Kontaktband. Beide über `.accent` mit `display: block`, damit
die Hervorhebung immer eine eigene Zeile bekommt — sonst hängt sie je nach
Viewport-Breite als Wortrest am Ende der Vorzeile und liest sich wie ein
Zufall, nicht wie Gestaltung. Mehr Stellen wären keine Hervorhebung mehr.

Dass der Anspruch dafür in `consts.ts` in zwei Felder (`claim`,
`claimAccent`) zerfällt, ist der Preis: Ein einzelner String ließe sich nur
per Zeichenkettensuche zerlegen, und eine spätere Textänderung bräche das
still. Zwei benannte Felder sind sichtbar.

**Fuß.** Dreispaltige Kopfzeile (Wortmarke, Selbstbeschreibung aus
`SITE.description`, Anschrift), darunter eine Haarlinie und die Rechtszeile
mit Copyright links und Links rechts. Die Selbstbeschreibung ist dieselbe,
die als Meta-Description ausgeliefert wird — kein zweiter Satz, der
auseinanderlaufen kann.

**Was bewusst nicht übernommen wurde:**

- **Gemischte Groß-/Kleinschreibung in den Headlines** mit negativer
  Laufweite, wie in den Entwürfen. Brandbook 2.1 und CLAUDE.md
  Design-Regel 6 verlangen Versalien mit `--tracking-display`. Der
  gehobenere Eindruck kommt hier stattdessen aus Größe, Raster, Kontrast
  und Rhythmus.
- **Ein über dem Hero transparent liegender Header.** Er bräuchte einen
  seitenabhängigen Zustand (helle Schrift nur auf der Startseite) und eine
  zweite Logo-Variante im Header. Zwei Zustände mehr für einen kleinen
  Gewinn — der Header bleibt auf jeder Seite gleich.
- **Scroll-Reveal per JavaScript** (`app.js`/`.motion .reveal` in den
  Entwürfen). Das bestehende reine CSS-Reveal über
  `animation-timeline: view()` bleibt und gilt jetzt zusätzlich für
  Elemente mit `data-reveal`. Wo der Browser das nicht kennt, ist der
  Inhalt schlicht sofort sichtbar.

Das Client-JS-Budget ist unverändert: 0 KB auf allen Inhaltsseiten, einzige
Ausnahme weiterhin die Filterleiste unter `/predigten`.

### Bibelvers auf dunklem Grund (September 2026)

Die Überschrift „Auf festem Grund gebaut." (Startseite, Sektion „Wer wir
sind", `<Section tone="dark">`) spielt auf einen konkreten Vers an. Der steht
jetzt als Beleg da: 1. Korinther 3,11, als Abschluss des Fließtexts in der
rechten Spalte, nach dem Absatz mit dem Glaubensbekenntnis-Link.

Das bestehende Zitat-Muster `.prose blockquote` (siehe „Sekundärfarben tragen
keinen Text" bzw. `global.css`) scheidet aus: Es setzt `color:
var(--text-secondary)`, Braun, gebaut für hellen Grund. Auf `--bg-inverted`
wäre das nicht lesbar. Der neue Block `.verse` ist darum eine eigene,
schmale Deklaration statt einer Wiederverwendung — kein neues Token, nur eine
neue Zusammenstellung bestehender:

- Randlinie in `--accent-warm`: Gelb trägt hier **Fläche**, nicht Schrift —
  Regel 3 bleibt unverändert in Kraft.
- Verstext in `--fs-m`, eine Stufe über dem Fließtext (bis 23. September
  2026 erbte er `--fs-s`). Mit Fließtextgröße stand die gelbe Versangabe
  optisch stärker da als der Vers selbst. `--fs-m` bleibt unter dem
  Vorspann im Seitenkopf (`--fs-l`) und weit unter der `h2` (`--fs-xxl`).
  Ausnahme Startseite: dort `--fs-l`, weil der Vers direkt unter Fließtext
  steht und sich mit `--fs-m` zu wenig davon abhob.
- Versangabe in Futura 500 statt 700 — kleiner als `--fs-xs` geht die Skala
  nicht, also über den Schnitt zurückgenommen.
- Quellenzeile („Die Bibel · 1. Korinther 3,11", seit 23. September 2026
  ohne Übersetzungsnamen, siehe unten) in
  `--text-accent-on-dark` — dieselbe, oben freigegebene Ausnahme für Gelb auf
  `--bg-inverted` (8,38 : 1), hier auf ein kleines Versal-Label angewandt statt
  auf einen Fließtextteil.

Erster Versuch stand links unter der Überschrift, mit eigener Schaugröße
(`--fs-l`) und Einzug. Verworfen: Ein eingerückter Block unter einer bündig
linken Schauüberschrift bricht die linke Kante, die die ganze Seite trägt.

Kein `cite`-Attribut am `<blockquote>`: Es gäbe keine URL, auf die es zeigen
könnte, und Dritt-Requests sind ausgeschlossen (Regel 5). Die Quellenangabe
steht stattdessen als `<figcaption>`.

**Übersetzungsname entfernt (23. September 2026), bewusste Entscheidung
des Betreibers.** Bis dahin stand „Schlachter 2000" in der Quellenzeile,
mit der Begründung, der Name sei Bedingung des Zitatrechts an der
geschützten Übersetzung. Jetzt heißt es überall nur „Die Bibel · <Stelle>".
Offen und nicht geprüft: ob die Nutzungsbedingungen der Genfer
Bibelgesellschaft (Schlachter 2000) und von SCM R. Brockhaus (Elberfelder)
das zulassen. Wer das klärt und einen Quellenhinweis braucht: Welche
Übersetzung zitiert wird, steht als Kommentar an jedem Vers im Code.

Seit 23. September 2026 steht dasselbe Muster auch im Seitenkopf
(`PageHeader.astro`, Prop `verse`) auf den Unterseiten. Stand
24. September 2026: Gemeindeleitung (1. Thessalonicher 2,8), Gemeindeleben
(Kolosser 3,16), Predigten (Hebräer 4,12), Glaubensbekenntnis
(Philipper 2,16). Die Übersetzung steht jeweils als Kommentar am Vers. Die CSS-Regeln sind
bewusst in beiden Dateien dupliziert.

## Neugestaltung, zweiter Durchgang (September 2026)

Nach der ersten Runde (Abschnitt oben) lag ein zweiter, ausführlicherer
Entwurf vor: eine vollständig neu gebaute Ein-Seiten-Website mit
WebGL-Hero, Live-Countdown, Kachel-Reihe, Marquee und Detail-Dialogen.
Auftrag war, sich **wesentlich enger** daran zu orientieren — ausdrücklich
auch beim Menü und bei den Animationen, und „insbesondere die Kacheln".

Übernommen wurde erneut die Gestaltungssprache, nicht der Code. Zwei
Grundsatzfragen wurden vorher entschieden und sind unten dokumentiert:
gemischte Schreibweise für Schauüberschriften (freigegeben) und das
JavaScript-Budget (auf zwei zusätzliche, benannte Ausnahmen erweitert).

### Gemischte Schreibweise für Schauüberschriften

Brandbook 2.1 verlangt Headlines „**primär** in Versalien" mit weiter
Laufweite. Bis September 2026 war das im Projekt als „ausschließlich"
umgesetzt: `h1`–`h4` trugen `text-transform: uppercase` und
`--tracking-display`. Der Entwurf setzt große Überschriften dagegen in
Futura Bold, gemischt, mit leicht negativer Laufweite — der deutlichste
sichtbare Unterschied zwischen beiden Ständen.

Freigegeben im September 2026. Das Wort „primär" trägt eine zweite Stufe;
sie ist jetzt benannt statt implizit:

| Ebene | Schreibweise | Laufweite | Gewicht |
|---|---|---|---|
| `h1`, `h2` (Schaugröße) | gemischt | `--tracking-tight` (−0.02em) | 700 |
| `h3`, `h4` | gemischt | `--tracking-tight` | 700 |
| `.eyebrow`, `.button`, Navigation, Kachel-Status | **Versalien** | `--tracking-label` (0.18em) | 700 |

Drei Folgeentscheidungen:

1. **Gewicht 700 statt 500.** Im Versalsatz trug die weite Laufweite die
   Präsenz der Überschrift. Gemischt gesetzt muss das Gewicht das tun —
   Futura Medium wirkte in gemischter Schreibweise kraftlos.
2. **`--tracking-label` = 0.18em liegt über dem Brandbook-Wert.** 0.07em
   ist für Versalien in Schaugröße gemessen; dieselben Versalien in
   0.875rem laufen damit sichtbar zu eng. Der Brandbook-Wert
   `--tracking-display` bleibt in `tokens.css` stehen, wird aber derzeit
   nirgends verwendet — es gibt keine Versalzeile in Schaugröße mehr.
3. **`--fs-xxl` von 3.5rem auf 4.5rem angehoben.** Gemischter Satz mit
   negativer Laufweite baut bei gleicher Punktgröße rund ein Drittel
   schmaler als Versalsatz und verträgt deshalb einen größeren Grad.

Nebeneffekt, der eine echte Fehlerquelle beseitigt hat: Die Zeilenlängen-
begrenzung `width="measure"` in `Section.astro` begrenzte bis dahin auch
die `h1`. „Glaubensbekenntnis" passt in keine 62ch breite Spalte und brach
mitten im Wort um. `.inner--measure` gibt die Breite jetzt an jedes direkte
Kind weiter und nimmt `h1`/`h2` davon aus — Schauüberschriften laufen bis
zur vollen Containerbreite.

### Kachel-Muster, zweite Fassung

Das Leitmuster steht in `MinistryCard.astro`; `SermonCard`, `CreedCard` und
`ElderCard` wiederholen es bewusst, statt eine gemeinsame Komponente zu
bilden (CLAUDE.md Regel 2 — die vier unterscheiden sich in Aufbau,
Seitenverhältnis und Inhalt genug, dass eine Abstraktion mehr Bedingungen
bräuchte, als sie Code spart).

- **Hochformat 4:5**, `--radius-lg` (im selben Zug von 1.25rem auf 1.5rem
  angehoben — beim größeren Format wirkte der kleinere Radius
  abgeschnitten), `overflow: clip`.
- **Dunkelblaue Fläche mit einer weichen Farbwolke.** Der Entwurf liefert
  dafür acht generierte JPEGs (je rund 70 KB, erzeugt mit einem
  Python-Skript, das nicht mitgeliefert wird). Hier stattdessen vier
  CSS-Verlaufsvarianten in `tokens.css` (`--cloud-1` … `--cloud-4`): keine
  Binärdateien im Repo, keine Generierungspipeline, die niemand mehr hat,
  wenn eine neunte Kachel dazukommt, und die Farben kommen zwingend aus
  der Markenpalette. Die Kachel wählt ihre Variante über den Listenindex
  (`index % 4`).
- **Verlauf darüber** (`--scrim-card`), damit die Schrift am Kachelfuß
  trägt.
- **Status-Pill oben links, Plus-Kreis oben rechts**, beide als Glasfläche
  mit `backdrop-filter`. Der Plus-Kreis dreht sich beim Überfahren um 90°.
- **Hover:** Kachel hebt um 8px an (`--shadow-card` → `--shadow-card-hover`),
  die Farbwolke zoomt auf 1.06.
- **Ältesten-Kacheln** tragen statt der Farbwolke das echte Foto und haben
  Name und Rolle **unter** dem Bild: Ein Verlauf über dem Gesicht würde
  das Porträt beschädigen. Statt des Plus-Kreises blendet sich unten links
  ein „Mehr lesen →"-Pill ein.
- **Glaubensbekenntnis-Kacheln** haben bewusst **kein** 4:5-Format,
  sondern eine Mindesthöhe: Bei 25 Artikeln ergäbe Hochformat eine Seite
  von mehreren Bildschirmhöhen.

Eine Falle, die dabei zweimal zugeschnappt ist und deshalb hier steht:
`overflow-wrap: break-word` verkleinert die **min-content-Breite nicht**.
Ein Grid-Item mit der Voreinstellung `min-width: auto` bleibt damit so
breit wie sein längstes Wort und sprengt die Kachel, ohne dass der Umbruch
je greift — sichtbar als abgeschnittener Titel und verschobener
Plus-Kreis. Jedes Grid, das Kacheltext hält, braucht deshalb
`grid-template-columns: minmax(0, 1fr)`.

### Kachel-Reihe

`Slider.astro` ist von Flexbox auf `grid-auto-flow: column` mit
`grid-auto-columns: min(78vw, 20rem)` umgestellt, ohne sichtbare
Rollleiste, mit Randabfluss bis zur Containerkante. `/gemeindeleben` nutzt
seither die Reihe statt eines dreispaltigen Rasters — acht Kacheln im
Hochformat ergäben sonst eine sehr lange Seite.

Dazu zwei Pfeil-Knöpfe für Zeigegeräte (unter 48rem ausgeblendet, dort
wird gewischt). Sie sind die zweite benannte Ausnahme von CLAUDE.md
Regel 4: rund 0,9 KB inline und unminifiziert, ohne Zustandslogik — der Browser kappt den
Scrollwert an den Rändern selbst, ein deaktivierter Knopf wäre nur mehr
Code. Ohne JavaScript werden die Knöpfe gar nicht erst eingeblendet.

### Menü-Sheet und Animationen, ohne JavaScript

Der Entwurf schaltet das Menü per Skript (`.sheet.open`). Hier macht das
die Popover-API: Das Sheet ist ein `[popover]`, das über
`transition-behavior: allow-discrete` und `@starting-style` von oben
einfährt. Geschlossen wird über das runde Kreuz im Sheet — genau wie im
Entwurf; ein Burger, der sich zum Kreuz morpht, bräuchte einen Zustand am
Knopf, den das Popover nicht zurückmeldet.

Die Menüpunkte laufen gestaffelt ein. Als **Animation**, nicht als
Transition: Ein Popover wird beim Schließen auf `display: none` gesetzt,
wodurch die Animation beim nächsten Öffnen von selbst neu startet.
`animation-delay: calc(120ms + var(--i) * 45ms)` mit `backwards`.

Das Scroll-Reveal (`animation-timeline: view()`) gilt jetzt zusätzlich für
alles mit `data-reveal`. Der Versatz zwischen nebeneinanderstehenden
Kacheln entsteht über `--reveal-offset` im `animation-range` — bei einer
View-Timeline greift `animation-delay` nicht, weil der Fortschritt aus der
Scrollposition kommt und nicht aus der Zeit.

Bewusst **nicht** übernommen: der WebGL-Wasser-Hero des Entwurfs. Er
bräuchte eine Shader-Schleife im Browser, kostet auf Mobilgeräten Akku und
wäre in zehn Jahren der erste Teil der Seite, den niemand mehr warten
kann. Stattdessen trägt das vorhandene Marktplatz-Foto den Hero, darüber
der Bogen aus dem Lockup als schwebendes Stilelement.

### Countdown im Hero — eingebaut und wieder entfernt

Auf ausdrücklichen Wunsch gebaut, gegen meine Empfehlung: ein Live-Countdown
bis zum ersten Gottesdienst, Tage/Stunden/Minuten. Die technischen Einwände
waren lösbar und waren gelöst — die Zahlen standen zur Buildzeit gerechnet
im HTML, ein synchrones Inline-Skript korrigierte sie vor dem ersten Paint
auf die Uhr des Besuchers, `font-variant-numeric: tabular-nums` verhinderte
das Springen der Zeile beim Wechsel von 9 auf 10.

Im selben Monat wieder entfernt, mit der Begründung „zu viel". Das deckt
sich mit dem ursprünglichen Einwand: Ein Countdown über 226 Tage mit
Minutenanzeige ist Effekt, kein Nutzen, und er nimmt dem Meilenstein-Datum
darüber die Ruhe. Der Hero trägt den Termin unverändert als Label plus
Datum; die große Datumsfläche weiter unten bleibt das Schaubild dazu.

Festgehalten, damit die Frage nicht ein drittes Mal aufkommt: Die Mechanik
ist in der Git-Historie nachlesbar, falls sie je wieder gebraucht wird.
`FOUNDING.milestoneIso` bleibt im Repo — die Datumsfläche braucht es für
`<time datetime>`.

### Dunkle Kopfzeile

Der Header ist auf jeder Seite dunkelblau mit weißer Wortmarke (vorher
hell und transluzent). Auf der Startseite geht er dadurch in den dunklen
Hero über und liest sich als dessen Oberkante; auf hellen Unterseiten
rahmt er die Seite oben. Der Entwurf schaltet den Header je nach Sektion
zwischen hell und dunkel um — das bräuchte einen seitenabhängigen Zustand
und eine zweite Logo-Variante. Ein Zustand ist billiger zu warten als
zwei.

`--header-height` ist dabei von einem aus dem Inhalt gerechneten Wert auf
eine feste Mindesthöhe (3.5rem) umgestellt, die `Header.astro` als
`min-height` setzt: Unter 64rem gibt der Burger-Knopf die Höhe vor,
darüber das Logo, und beide sind unterschiedlich hoch — der sticky
Filterstreifen auf `/predigten` saß dadurch auf einer der beiden Breiten
falsch.

### Bewegung an den Kacheln (September 2026)

Beim Nachziehen fiel auf, dass das Scroll-Reveal **seit seiner Einführung
nie etwas bewirkt hat**. Die Regel stand im Code, die Animation war am
Element angehängt und lief — nur hatte sie keinen Effekt:

Eine scrollgebundene Animation (`animation-timeline: view()`) hat vor dem
Beginn ihres Bereichs eine negative Fortschrittszeit. Ohne
`animation-fill-mode` zeigt das Element dann seinen **ungeanimierten**
Zustand, also volle Deckkraft. Sichtbar wurde davon nur der schmale
Moment, in dem ein Element gerade im Bereich lag. Mit `both` hält die
Animation vor dem Bereich ihren Anfangs- und danach ihren Endzustand —
erst damit blendet überhaupt etwas ein.

Aus `both` folgen drei Dinge, die alle im Code stehen und hier begründet
sind:

1. **Die Animation hält ihren Endzustand dauerhaft** und überschreibt
   damit jede Eigenschaft, die ein Hover-Zustand später ändern will.
   `translate` an einer Kachel wäre dadurch blockiert. `data-reveal`
   trägt deshalb immer die Hülle (`.card-wrap`), nie die Kachel selbst —
   `MinistryCard` hat dafür eine bekommen, die anderen drei hatten sie
   schon.
2. **`@media screen`.** Vor ihrem Bereich steht die Deckkraft auf 0, und
   beim Drucken wird nicht gescrollt: Ohne diese Einschränkung käme alles
   unterhalb der ersten Bildschirmhöhe leer aus dem Drucker. Auf dieser
   Seite wird gedruckt (Glaubensbekenntnis, Predigttexte).
3. **Der Bereich endet früh** (`entry 15%` bis `entry 90%`, also fertig,
   sobald das Element ganz im Bild ist). Eine scrollgebundene Animation
   läuft rückwärts, wenn man zurückscrollt; endet sie früh, liegt der
   Rückwärtsgang unten am Bildrand und fällt beim Lesen nicht auf. Das ist
   der eine Unterschied zur JavaScript-Variante des Entwurfs, die einmal
   einblendet und danach nie wieder etwas tut.

**Kacheln in einer waagerecht scrollenden Reihe sind ausgenommen.** Ihr
nächster Scroll-Container ist die Reihe selbst (`overflow-x: auto` macht
auch die Block-Achse zum Scroll-Container), und deren Block-Achse scrollt
nie — die Timeline bliebe im Zweifel bei 0 stehen und die Kachel dauerhaft
unsichtbar. Dort blendet die Reihe als Ganzes ein (`data-reveal` an
`.rail-wrap`).

**Wandernde Farbwolke.** Die Wolke jeder Kachel bewegt sich langsam hin
und her (14 s, `alternate`), damit die Fläche lebt statt ein Standbild zu
sein.

Der erste Anlauf war unbrauchbar und ist als Warnung festgehalten: ±3 %
Weg über 26 Sekunden mit `--ease-out` ergaben rund **einen Pixel pro
Sekunde**, und die Kurve legt 85 % der Bewegung in das erste Fünftel — die
Fläche stand die meiste Zeit scheinbar still. Zwei Lehren daraus:

1. **Dauerschleifen brauchen `--ease-in-out`**, nicht `--ease-out`. Das
   Token ist dafür im September 2026 ergänzt worden; `--ease-out` bleibt
   für Hover und Übergänge.
2. **Verschieben allein reicht nicht.** Die Farbflecken bewegen sich dabei
   alle gleich, und das Auge liest gleichförmige Verschiebung einer
   unscharfen Fläche als Stillstand. Erst die Drehung (±10°) lässt sie
   gegeneinander wandern. Ein Fleck legt damit etwa 6 px pro Sekunde
   zurück — sichtbar, ohne zu zappeln.

Bewegt werden `translate` und `rotate`, nicht `background-position`: Das
läuft auf dem Compositor und kostet keine Neuzeichnung pro Bild — bei acht
Kacheln auf einem Telefon der Unterschied zwischen flüssig und ruckelig.
Die Wolke ist dafür deutlich größer als die Kachel (`inset: -26%`), sonst
holten Weg und Drehung eine Kante ins Bild. `scale` bleibt unangetastet
und gehört dem Hover-Zustand: Animation und Transition fassen verschiedene
Eigenschaften an und geraten sich nicht in die Quere. Dasselbe Bild und
dieselbe Bewegung trägt der Kopf des Popups, damit es als Fortsetzung der
Kachel liest. Der schwebende Bogen im Hero hatte dasselbe Kurvenproblem
und ist mit umgestellt worden.

**Hover-Choreografie.** Kachel hebt an, Wolke zoomt, Plus-Kreis dreht sich
um 90°, Textblock rückt ein Stück weiter nach oben als die Kachel selbst —
die unterschiedlichen Wege geben der Bewegung Tiefe, statt alles starr zu
verschieben.

Bei `prefers-reduced-motion: reduce` entfällt alles davon vollständig
(geprüft: keine laufende Animation, alle Kacheln sichtbar).

### Popup, zweite Fassung

Die erste Fassung war eine weiße Fläche, in der ein freigestellter
Schließen-Knopf oben rechts schwebte (`float: right` plus `position:
sticky`) und über dem Titel eine leere Zeile stehen ließ. Es war nicht zu
erkennen, von welcher Kachel das Popup kam — der Zusammenhang zwischen
Antippen und Ergebnis fehlte völlig.

`Overlay.astro` ist seither zweiteilig:

- **Kopf** in der Bildsprache der Kachel: dunkelblaue Fläche, dieselbe
  Farbwolke (über die neue `cloud`-Prop, die die Kachel aus ihrem
  Listenindex durchreicht), darüber `--scrim-card`, darauf Versal-Kicker
  und Titel — genau die Anordnung, die auch die Kachel zeigt. Der
  Schließen-Knopf sitzt als Glaskreis in der Ecke, passend zum Plus-Kreis
  der Kachel.
- **Inhalt** darunter auf hellem Grund.

Der Kopf kommt über einen benannten Slot `head` herein. Mobil bekommt das
Sheet zusätzlich eine Griffleiste, wie bei einem nativen Bottom Sheet.

Folgeänderung in `SermonDetail.astro`: neue Prop `showPassages` (im Popup
`false`). Die Bibelstelle steht dort jetzt als Kicker im Kopf und hätte
sonst zweimal im selben Feld gestanden. Auf der Detailseite gibt es keinen
Kopf, dort bleibt sie im Fließtext.

### Seitenkopf für alle Unterseiten (September 2026)

Nach dem Umbau von Hero, Kacheln und Popups begann jede Unterseite immer
noch mit einer `<h1>` auf weißem Grund. Das war der letzte Rest der alten
Seite und ließ jede Unterseite unfertig aussehen, obwohl darunter alles
neu war.

`PageHeader.astro` ist jetzt der gemeinsame Auftakt: dunkelblaues Band mit
Farbwolke und Verlauf, darauf Versal-Kicker, Überschrift und optional ein
Einleitungssatz — dieselbe Bildsprache wie die Kacheln und der Kopf der
Popups. Wer von einer Kachel auf eine Detailseite geht, bleibt damit in
derselben Welt. Detailseiten (Artikel, Profile, Predigten) bekommen
zusätzlich einen Rücksprung als Versal-Label über dem Kicker.

Verwendet auf allen Unterseiten inklusive `/404`. Die Startseite behält
ihren eigenen Hero — dort trägt das Ortsbild, nicht eine Farbwolke.

Die `cloud`-Prop verteilt die vier Wolkenvarianten über die Seiten, damit
nicht jede Seite gleich aussieht; Artikelseiten leiten sie aus der
Artikelnummer ab.

**Zwei Größenkorrekturen, die daraus folgten:**

- `.prose h2` steht jetzt auf `--fs-xl` statt auf der globalen
  `h2`-Größe (`--fs-xxl`, bis 4.5 rem). Die ist für Schaubänder über die
  volle Seitenbreite gedacht; in einer 62ch breiten Textspalte stand
  „Überweisung oder Dauerauftrag" damit über drei Zeilen und war größer
  als die Seitenüberschrift im Kopf darüber. `h3`/`h4` entsprechend.
- Das Ältesten-Porträt auf der Detailseite trägt `--radius-lg` und
  `--shadow-card` wie die Kacheln; mit dem kleineren Radius wirkte es
  allein auf weißem Grund wie ein Rest der alten Seite.

**Letzte Flächen der alten Bildsprache.** Zwei blassorange Kästen mit
linker Akzentkante waren übrig:

- Die E-Mail-Adresse auf `/kontakt` ist der Inhalt dieser Seite und
  bekommt deshalb die stärkste Fläche des Projekts: dieselbe Wolkenkachel
  wie Gemeindeleben, Predigten und Glaubensbekenntnis.
- Der Hinweis auf ausgefallene Termine auf der Startseite bleibt bewusst
  hell und behält die Akzentkante. Er ist eine Warnung und soll sich von
  den dunklen Kacheln unterscheiden, nicht mit ihnen verschmelzen —
  angeglichen wurden nur Radius und Innenabstand.

Die Filter-Pills und das Suchfeld auf `/predigten` laufen seither auf
`--radius-pill` statt `--radius-md`/`--radius-sm`, wie die Knöpfe.

### Zwei Fehler am Sheet (September 2026)

**Tippen daneben öffnete die nächste Kachel.** Die Popover-API schließt
beim Klick daneben („light dismiss"), aber das darauf folgende
`click`-Ereignis erreicht trotzdem das Element darunter. Auf einer
Kachelseite hieß das: Ein Tipp neben das Popup schloss es und öffnete im
selben Moment die Kachel, die darunter lag.

Behoben ohne JavaScript, durch einen Umbau von `Overlay.astro`: Das
Popover ist jetzt die bildschirmfüllende Hülle, darin liegen ein
Verdunkler-Knopf (`popovertargetaction="hide"`) und die eigentliche Karte.
Damit ist ein Tipp auf den Verdunkler „innerhalb" des Popovers — es gibt
kein Light Dismiss, der Knopf schließt selbst, und das Ereignis kommt
nirgends sonst an. Das `::backdrop`-Pseudoelement wird dafür nicht mehr
gebraucht; es ist nicht trefferempfindlich und konnte den Klick deshalb
nie abfangen.

Nebenbei aufgefallen und mitbehoben: Die Farbwolke im Kopf ist deutlich
größer als der Kopf (`inset: -26%`) und leuchtete ohne `overflow: clip`
unten in den hellen Inhalt und seitlich über die Karte hinaus.

**Die Griffleiste versprach eine Geste, die es nicht gab.** Das Sheet sah
aus wie ein natives Bottom Sheet, ließ sich aber nicht wegwischen. Dafür
gibt es jetzt ein Skript in `BaseLayout.astro` — vierte benannte Ausnahme
von CLAUDE.md Regel 4 und die erste, die auf *jeder* Seite liegt (die
übrigen sind seitengebunden). Rund 2,4 KB inline und unminifiziert.

Zwei Entscheidungen darin:

- **`touch`- statt `pointer`-Ereignisse.** Die Geste muss dem Browser
  weggenommen werden, solange gewischt wird, sonst scrollt er stattdessen
  die Karte. Das geht nur mit `preventDefault()` auf einem nicht-passiven
  `touchmove` — `pointermove` kann das nicht, weil `touch-action` schon
  bei Gestenbeginn feststeht.
- **Ein Skript je Seite, nicht je Popup.** Auf `/glaubensbekenntnis` gibt
  es 25 Popups; ein Skript pro Komponente wäre 25-mal im HTML gelandet.
  Das Skript sucht sich `[popover][data-swipe]` selbst zusammen;
  `data-swipe="down"` für die Kachel-Sheets, `up` für das Menü, das von
  oben einfährt.

**Nachtrag: eckiges Rechteck nach dem Schließen.** Beim Schließen setzt
der Browser den Fokus auf den Auslöser zurück — bei Predigt-, Artikel- und
Ältesten-Kacheln ist das der unsichtbare, deckungsgleiche Knopf `.open`.
Der hat keinen Eckenradius, also zeichnete iOS Safari dort ein eckiges
Rechteck um die runde Kachel. Chromium zeigt es nicht: Dessen Heuristik
wertet den zurückgesetzten Fokus nicht als „sichtbar", Safaris schon.

`.open` ist über `tabindex="-1"` aus der Tab-Reihenfolge genommen; ein Ring
kann dort also nie aus der Tastaturnavigation stammen, sondern nur aus
dieser Rücksetzung. Er ist deshalb abgeschaltet — an `:focus` **und**
`:focus-visible`, weil Safari ihn teils schon am ersten hängt.

Bei Gemeindeleben-Kacheln ist der Auslöser dagegen die Kachel selbst, ein
echter, tabbarer Knopf. Dort wäre dasselbe Vorgehen falsch: Der Ring ist
die einzige Anzeige, wo eine Tastaturnutzerin gerade steht, und ihn zu
löschen hieße, sie blind zu machen. Das eigentliche Ärgernis ist auch
nicht der Ring, sondern **wann** er erscheint — nach einem Tipp, nicht
nach dem Tabben.

Genau das trennt ein kurzer Zusatz im Skript in `BaseLayout.astro`: Er
merkt sich, ob zuletzt gezeigt oder getastet wurde
(`pointerdown` / `keydown` in der Capture-Phase), und nimmt beim
`toggle`-Ereignis eines Popovers den Fokus nur weg, wenn zuletzt gezeigt
wurde. Geprüft: Nach Maus- oder Tippbedienung liegt der Fokus danach auf
`body` und es ist kein Ring zu sehen; nach Enter zum Öffnen und Escape zum
Schließen steht er wieder auf der Kachel, mit dem 2-px-Ring, abgerundet
auf den Kachelradius. Ohne JavaScript verhält es sich wie vorher — der
Ring bleibt stehen, nichts ist kaputt.

Die Geste greift erst, wenn der Inhalt am Anfang steht (`scrollTop <= 0`)
— sonst wäre sie dem Scrollen im Popup im Weg. Ohne JavaScript bleiben
Kreuz, Verdunkler und Escape; die Griffleiste ist dann wieder nur
Dekoration, aber nichts ist kaputt.

### Bogen im Hero

Auf dem Telefon steht der Bogen unten rechts, nicht oben. Der Hero-Inhalt
ist senkrecht zentriert; oben rechts lag der Bogen auf der Eyebrow-Zeile
und der ersten Headline-Zeile — auf einem echten Gerät deutlich
störender als in der Desktop-Vorschau. Unterhalb der Knöpfe ist Platz, und
die Marke bleibt sichtbar. Auf Desktop bleibt er oben rechts, dort hält
die Textbreite (`max-width: 16ch`) die Headline links genug frei.

### Was aus dem Entwurf nicht übernommen wurde

- **WebGL-Hero** und **Parallax-Pinning** — siehe oben.
- **Blau (`--c-blue`) als Farbe kleiner Labels** (im Entwurf die Rolle
  unter den Ältesten-Porträts). `--c-blue` erreicht auf Weiß 3,96 : 1 und
  ist laut `tokens.css` nur für große Schrift und UI-Rahmen zugelassen;
  ein `--fs-xs`-Label verfehlte damit AA. Hier trägt `--text-secondary`
  (6,15 : 1).
- **Ein-Seiten-Struktur.** Der Entwurf legt alles auf eine Seite. Dieses
  Projekt hat echte Unterseiten mit Content Collections und einem
  Predigt-Archiv mit Filter; sie zusammenzufalten hieße, Filter, Permalinks
  und Suchmaschinen-Sichtbarkeit aufzugeben.
- **Marquee der Artikel-Titel** auf dem Glaubensbekenntnis. Reizvoll, aber
  eine Endlosschleife, die 25 Titel vorbeischiebt, macht sie schlechter
  auffindbar als das Kachelraster, das es schon gibt.
- **Der eigene Dunkelton `#00202f` („Tiefsee")** des Entwurfs. Keine
  Brandbook-Farbe. Die Tiefe entsteht hier über die Verläufe, nicht über
  einen zweiten Blauton.

### Bekannte Einschränkung

Kachel- und Seitenüberschriften trennen lange deutsche Komposita über
`hyphens: auto` (`lang="de"` steht in `BaseLayout.astro`). Browser ohne
deutsches Trennwörterbuch — dazu gehört unter anderem ein frisch
installiertes Chromium ohne Sprachpaket — brechen stattdessen hart um
(`overflow-wrap: break-word`), also „Sonntagsgottesdie/nste" statt
„Sonntags-/gottesdienste". Lesbar und im Bild, aber unschön. Bewusst keine
Weichtrennzeichen (U+00AD) in den Titeln: unsichtbare Zeichen in
Content-Dateien sind für spätere Redakteure eine Falle, und Predigttitel
kommen ohnehin aus Sanity und lassen sich hier nicht annotieren.

## Typografische Durchsicht (September 2026)

Auftrag war, die komplette Seite typografisch zu prüfen und anzupassen. Der
Makro-Satz — Skala, Schreibweise, Laufweiten, Gewichte — war nach dem zweiten
Durchgang stimmig; gefunden wurden vor allem Lücken zwischen dem, was die
Tokens und diese Datei behaupten, und dem, was tatsächlich ausgeliefert wird.

### Geändert

1. **`--tracking-body` wurde nirgends angewandt.** Der Token stand seit
   September 2026 in `tokens.css`, beschrieben als „Fließtext", und trug den
   Brandbook-Wert („min. 7"). Kein Selektor hat ihn je gesetzt — Fließtext lief
   mit der Voreinstellung 0. Jetzt einmal auf `body` in `global.css`, von dort
   geerbt. Überschriften (`--tracking-tight`) und Versal-Labels
   (`--tracking-label`) überschreiben ihn ohnehin, der Effekt ist also auf
   Fließtext begrenzt und mit 0.007em bewusst winzig.

2. **`.lead` lief mit Überschriften-Durchschuss.** `--lh-tight` (1.15) ist die
   Stufe für `h3`/`h4` und Kacheltitel, also für ein bis zwei Zeilen. Der
   Vorspann ist Fließtext und läuft regelmäßig über drei (`/glaubensbekenntnis`,
   `/gemeindeleben`). Bei 1.15 stoßen im deutschen Satz die Umlautpunkte der
   einen Zeile an die Unterlängen der vorigen — Ü, Ä und Ö setzen ihre Punkte
   über die Versalhöhe. Jetzt `--lh-body`. Siehe offene Frage unten.

3. **Trennung und Absatzumbruch für Fließtext.** `hyphens: auto` lag nur auf
   `h1`–`h4` und den Kacheltiteln. In der schmalen Spalte auf dem Telefon reißen
   deutsche Komposita („Datenschutz-Aufsichtsbehörde") im Flattersatz Löcher
   von einem Drittel Zeilenbreite. Jetzt zusätzlich auf `.prose` und `.lead`,
   dort zusammen mit `text-wrap: pretty` gegen Schusterjungen. Beides fällt
   ohne Unterstützung auf das bisherige Verhalten zurück, und weiterhin ohne
   Weichtrennzeichen in den Inhaltsdateien (siehe „Bekannte Einschränkung").

4. **Futura 500 wurde geladen, aber nie gesetzt.** Seit der Umstellung auf
   gemischten Satz mit Gewicht 700 setzt keine Regel mehr Gewicht 500 — der
   `rel="preload"` in `BaseLayout.astro` holte trotzdem auf jeder Seite rund
   11 KB, die nichts rendert. Vorabruf entfernt, `@font-face` behalten. Details
   im Abschnitt „Gewichte im Code".

5. **Bibelstellen: Bindestrich statt Halbgeviertstrich.** `formatPassage()` in
   `src/lib/bible.ts` setzt Versbereiche aus Sanity seit jeher mit `–`
   („Römer 8,1–4"), die 266 Fußnoten des Glaubensbekenntnisses standen dagegen
   mit `-` („Römer 8,1-4"). Dieselbe Angabe in zwei Schreibweisen auf derselben
   Seite. 114 Bereiche in 23 Dateien unter `src/content/creed/` auf `–`
   umgestellt; die Fußnoten-IDs (`[^4-1]`) sind Bezeichner und ausdrücklich
   **nicht** angefasst worden. Duden (Bis-Strich) und die bereits vorhandene
   Stelle „Art. 15–21 DSGVO" in `datenschutz.md` sprechen für `–`.

6. **`datenschutz.md`, drei Funde.** Der Anschriftenblock des
   Verantwortlichen hatte keine `<br>` wie das Impressum — Markdown zog
   „Gemeinde und Missionswerk Arche e.V." und „Evangelisch-reformierte
   Freikirche" zu einer Zeile zusammen. „z.B." zweimal ohne Spatium (Duden
   D 13). Und der Abschnitt „Schriftarten" nannte nur Source Serif Pro,
   obwohl seit dem 16. September 2026 auch Futura selbst gehostet
   ausgeliefert wird — in einem Text, der gerade die Aussage trägt, dass
   keine Schrift von Dritten geladen wird.

### Geprüft und bewusst nicht geändert

- **Verwendungszweck in `spenden.md`** („Arche Bremen - Spende - Dein Name").
  Typografisch wäre hier ein Halbgeviertstrich richtig. Der String ist aber
  keine Prosa, sondern eine Eingabe für ein Bankformular, und derselbe String
  steckt im GiroCode (`public/spenden-qr.svg`). Der eingeschränkte
  SEPA-Zeichensatz kennt `–` nicht; eine Änderung könnte die Überweisung
  scheitern lassen und würde Text und QR-Code auseinanderlaufen lassen.
  Bindestrich bleibt.

- **Geschützte Leerzeichen.** Typografisch gehören sie in „z. B.", „§ 5 TMG",
  „Art. 6 Abs. 1", „10 €" und in die IBAN, damit dort keine Zeile umbricht.
  Nicht gesetzt: U+00A0 ist in einer Markdown-Datei genauso unsichtbar wie das
  Weichtrennzeichen, das an anderer Stelle aus genau diesem Grund abgelehnt
  wurde (siehe „Bekannte Einschränkung"). Wenn das kommen soll, dann als
  bewusste Entscheidung für alle Inhaltsdateien, nicht nebenbei.

- **`h1` und `h2` sind beide `--fs-xxl`.** Im selben Textfluss stehen sie nie
  nebeneinander: Die `h1` liegt im dunklen Seitenkopf (`PageHeader.astro`),
  die `h2` in den hellen Bändern darunter, und in `.prose` und im Popup sind
  beide ohnehin eine Stufe kleiner gesetzt. Die Trennung leistet hier der
  Hintergrund, nicht der Grad. Unverändert gelassen — aber es ist die Stelle,
  an der eine künftige Seite mit `h1` und `h2` im selben weißen Band auffallen
  würde.

- **`--tracking-display` (0.07em) bleibt ungenutzt.** Begründung steht
  unverändert in `tokens.css`: Brandbook-Vorgabe, nicht an eine Anwendung
  gebunden.

- **`.nav-sheet a` in `Header.astro`** trägt mit
  `font-size: clamp(1.75rem, 7vw, 3.25rem)` den einzigen fest verdrahteten
  Schriftgrad im Komponentencode und weicht damit von CLAUDE.md Design-Regel 1
  ab. Der Wert ist begründet (bei 8vw lief „Glaubensbekenntnis" auf einem
  360-px-Gerät über den Innenabstand des Sheets) und ließ sich mit keiner
  vorhandenen Stufe ersetzen. Siehe offene Frage unten.

### Offene Fragen aus dieser Durchsicht

1. **Eine Durchschuss-Stufe zwischen 1.15 und 1.6 fehlt.** Der Vorspann
   (`.lead`, `--fs-l`) läuft mit `--lh-body` (1.6) jetzt eine Spur großzügig;
   richtig wären etwa 1.35. Nach CLAUDE.md Design-Regel 7 wird ein fehlender
   Wert hier eingetragen und nicht im Code erfunden — also: soll `tokens.css`
   ein `--lh-snug: 1.35` bekommen?
2. **Eigene Stufe für die Sheet-Navigation?** Der Grad oben ist der einzige
   im Komponentencode. Entweder bekommt `tokens.css` eine Schaustufe dafür,
   oder die Abweichung bleibt dokumentiert stehen — beides ist vertretbar,
   entschieden ist es nicht.
3. **Geschützte Leerzeichen in Inhaltsdateien: ja oder nein?** Siehe oben.

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
`--surface-warm`/`--surface-warm-alt` (siehe oben) sind die Akzente auf 14 %
gegen Weiß verdünnt — Flächen, kein Text. Beide Textfarben bleiben auf ihnen
im AA-Bereich:

| Fläche | Hex (ca.) | vs. `--text-secondary` (Braun) | vs. `--text-primary` |
|---|---|---|---|
| `--surface-warm` | `#fffbdd` | 5,87 : 1 — AA | ca. 11,4 : 1 — AAA |
| `--surface-warm-alt` | `#fef4e0` | 5,63 : 1 — AA | ca. 11,0 : 1 — AAA |
| `--surface-warm-strong` | `#fff3b8` | 5,51 : 1 — AA | ca. 10,7 : 1 — AAA |

`--surface-warm-strong` ist die Hover-/Fokus-Fläche aller vier Kacheltypen
(siehe Kachel-Absatz oben) — kräftiger gemischt, aber weiterhin klar
innerhalb AA. Bis September 2026 gab es zusätzlich `--surface-warm-alt` als
Rotationsfläche sowie `--surface-nature`/`--surface-nature-strong` (Grün,
16 %/32 % statt 14 %/28 % gemischt, weil Grün bei gleicher Verdünnung wie
Gelb/Orange farblich fast verschwindet) und `--surface-warm-alt-strong` —
mit der Farbrotation entfernt, siehe Kachel-Absatz oben. `--surface-glass`
steht bewusst nicht in dieser Tabelle: Es ist keine Textfläche — der
Filterstreifen bleibt im Rückfall ohne `backdrop-filter` deckend `--bg-page`.

**Regel:** Gelb, Orange, Grün, Ocker und Braun-Grau sind Flächen-, Rahmen- und
Stilelementfarben. Textfarben sind ausschließlich Dunkles Blau und Braun, auf
dunklem Grund Weiß. `--c-blue` nur für große Schrift und UI-Rahmen.

**Eine Ausnahme, seit September 2026 freigegeben:** Die Tabelle oben misst
gegen **Weiß**. Auf Dunklem Blau (`--bg-inverted`) liegt Gelb bei
**8,38 : 1** und trägt dort Schrift ohne Einschränkung. Dafür gibt es das
Token `--text-accent-on-dark`, dessen Name die Bedingung mitträgt — es ist
ausschließlich auf `--bg-inverted` zulässig, an aktuell zwei Stellen der
Startseite. Für alle anderen Sekundärfarben und für jeden hellen Grund gilt
die Regel oben unverändert. Details und Begründung im Abschnitt „Gelbe
Schrift auf Dunklem Blau" weiter oben.

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
Gebetsanliegen-Liste (`.prayer-list`) und seit September 2026 den
Adressblock auf `/kontakt` (`.mail`) — jeweils eigene Klasse, gleiche
Tokens, aus demselben Grund: kein weiteres Tokenpaar für einen weiteren
Anwendungsfall derselben Fläche.

**Hero in der Gründungsphase (August 2026):** Above the fold stand ursprünglich
Gottesdienstzeit und Adresse (`SERVICE`/`ADDRESS`). Es gibt noch keinen
öffentlichen Gottesdienst — an ihrer Stelle stehen jetzt Gründungsstatus und
geplanter erster Gottesdienst (`FOUNDING` in `src/consts.ts`), typografisch in
derselben Struktur (Claim in `--fs-l`, Meilenstein-Datum in `--fs-xl` mit
Eyebrow-Label im `.event-title`-Stil). Keine neuen Tokens dafür nötig. Der
Wechsel zurück zu Gottesdienstzeit und Adresse ist in `README.md`, Abschnitt
„Offene Punkte", vermerkt.

### 2. Futura für Headlines, Source Serif Pro für Fließtext

Brandbook 2.1 schreibt Futura Bold und Medium für Logo und Headlines vor,
primär in Versalien mit Laufweite 70. Von August bis September 2026 stand die
Seite komplett in Source Serif Pro, weil keine Web-Nutzungsrechte für Futura
vorlagen (siehe Git-Historie dieses Abschnitts). Diese Abweichung ist seit dem
16. September 2026 aufgehoben.

**Freigabe.** Kevin Sames (Repo- und Domain-Zugriff, siehe `MAINTAINERS.md`)
hat am 16. September 2026 bestätigt, die Schriftdateien aus
`Church - Arche/Teams & responsibilities/Website/Logos & Corporate
Design/Schriftarten/futura/` (privater iCloud-Ordner, nicht im Repo) für die
Website verwenden zu dürfen. Die lizenzrechtliche Bewertung liegt bei ihm, nicht
bei der Entwicklung. Bei Rückfragen des Lizenzgebers ist er der erste
Ansprechpartner.

**Quelldateien.** Aus demselben Ordner: `Futura Medium.otf` (500) und
`Futura Bold.otf` (700), Adobe/Neufville-Digitalisierung. Gewählt, weil das
Brandbook-PDF (`#1 Brandbook_v_1.1.pdf`) exakt diese Digitalisierung
einbettet — `/BaseFont` nennt `Futura-Medium` und `Futura-Bold`. Verworfene
Alternativen aus demselben Ordner:

- `Futura.ttc` (Neufville Digital, 5 Schnitte) — vollständigere
  Glyphenabdeckung, aber rund 8 % breiter laufende Zeichen (Vergleich der
  Versal- und Kleinbuchstaben-Laufweiten). Mit `--tracking-display: 0.07em`
  auf mobilen Versalheadlines zu breit. Zweitbeste Wahl, falls die
  Adobe-Schnitte optisch nicht überzeugen.
- `Tilde - Futura TL *.ttf`, `futura-book-bt-22240.ttf` — Bitstream-Linie,
  andere Zeichnung als das Brandbook-PDF.
- `Futura Std/Light/SCTOT *` — ausschließlich Light-Schnitte, im Brandbook
  nicht vorgesehen.
- `Gloss_And_Bloom.ttf` (anderer Ordner, `Schriftarten/gloss_and_bloom/`) —
  laut beiliegender `Read Me.rtf` „free for PERSONAL USE ONLY", für die
  Website nicht nutzbar.

**Bekannte Lücke:** `Futura Medium.otf` enthält kein €-Zeichen. Im gesamten
Quelltext kommt € nur einmal vor (`src/content/pages/spenden.md`, Fließtext,
Source Serif Pro) — Headlines sind nicht betroffen. Falls künftig ein Betrag
in einer Headline auftaucht, greift der `€`-lose Fallback des Browsers auf den
nächsten Font in `--font-display`.

**Konvertierung.** `fontTools` (`pyftsubset`) lokal installiert, keine
Projekt-Dependency — dieselbe Vorgehensweise wie bei den
`source-serif-*.woff2`-Dateien. Beide Schnitte auf das Latin-Subset reduziert:

```
pyftsubset "Futura Medium.otf" \
  --output-file=futura-500.woff2 --flavor=woff2 \
  --layout-features='' --desubroutinize --name-IDs='*' \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

Gleicher Befehl für `Futura Bold.otf` → `futura-700.woff2`. `--name-IDs='*'`
ist Absicht: ohne diese Option entfernt `pyftsubset` standardmäßig Copyright-,
Trademark- und Lizenz-Einträge aus der Name-Tabelle — die sollen in der
ausgelieferten Datei bleiben.

Zwei Nacharbeiten am Ergebnis:

1. **Vertikalmetriken angeglichen.** Die beiden Adobe-Schnitte haben ab Werk
   unterschiedliche `hhea`/`OS-2`-Werte (Medium: `ascent` 995, `lineGap` 0;
   Bold: `ascent` 830, `lineGap` 218 — auf 1000 em normiert). In Zeilen ohne
   eigene `line-height`, in denen Medium- und Bold-Text nebeneinanderstehen
   (z. B. Pills in `SermonFilter.astro`), säße Bold sonst sichtbar versetzt
   zur Grundlinie. `hhea.ascent/descent/lineGap` sowie
   `OS/2.sTypoAscender/sTypoDescender/usWinAscent/usWinDescent` von
   `futura-700.woff2` per `fontTools.ttLib` auf die Werte von
   `futura-500.woff2` gesetzt.
2. **Interne Familiennamen korrigiert.** Der Windows-Plattform-Eintrag (name
   ID 1, Plattform 3.1) von `Futura Bold.otf` lautete im Original „Futura
   Book" statt „Futura" — ein Mislabel in der Quelldatei selbst, nicht
   relevant für `@font-face`-Matching (das läuft über den in der CSS-Regel
   deklarierten `font-family`-Wert), aber verwirrend für jeden, der die Datei
   später mit einem Font-Inspector öffnet. In beiden Dateien auf allen
   Plattform-Einträgen vereinheitlicht: Familie „Futura", Subfamilie
   „Medium"/„Bold".

Ergebnis: `public/fonts/futura-500.woff2` (~11 KB), `public/fonts/futura-700.woff2`
(~11 KB).

**Gewichte im Code.** Der Absatz beschrieb bis zur typografischen Durchsicht
(September 2026) eine Zweiteilung — 500 für große Versalheadlines, 700 für
kleine Labels. Diese Zweiteilung gibt es seit der Umstellung auf gemischte
Schreibweise nicht mehr; der Text war schlicht nicht nachgezogen worden. Sie
ist mit Absicht aufgegeben worden, nicht vergessen: Im Versalsatz trug die
weite Laufweite die Präsenz der Überschrift, im gemischten Satz muss das
Gewicht sie tragen (siehe Abschnitt „Gemischte Schreibweise für
Schauüberschriften", Folgeentscheidung 1).

Tatsächlicher Stand — **eine** Regel:

- **700 (Futura Bold)** — alles, was `--font-display` benutzt: `h1`–`h4`
  (`global.css`), `.eyebrow`, `.button`, Kachel- und Sektionsüberschriften
  (`.title`/`.name` in `CreedCard.astro`, `ElderCard.astro`,
  `MinistryCard.astro`), Pills und Formularlabels (`SermonFilter.astro`),
  `.number` (`CreedCard.astro`), `.passages`/`.passage`
  (`SermonDetail.astro`/`SermonCard.astro`), `.status`
  (`MinistryCard.astro`), `.mail-label` (`kontakt.astro`),
  `.milestone-label`/`.event-title`/`.numeral` (`index.astro`).
- **500 (Futura Medium)** — derzeit **keine einzige Regel**. Der Schnitt
  bleibt als `@font-face` in `global.css` deklariert (Brandbook-Schnitt,
  CLAUDE.md Design-Regel 5), wird aber nicht mehr vorab geladen: Ein
  `rel="preload"` in `BaseLayout.astro` holte ihn bis zur Durchsicht auf
  jeder Seite, obwohl ihn nichts rendert. Ohne Vorabruf lädt der Browser die
  Datei erst, wenn wieder eine Regel Gewicht 500 verlangt — der Schnitt
  bleibt also verfügbar, kostet aber nichts.

Damit sind von den vier geladenen Schnitten (Performance-Budget in CLAUDE.md)
drei tatsächlich in Gebrauch: Futura 700, Source Serif Pro 400 und 600.

`font-weight: 600` kommt in Zusammenhang mit `--font-display` nicht mehr vor
— es lag zwischen den beiden geladenen Schnitten und wäre per
CSS-Font-Matching zufällig auf 700 gefallen. `600` bleibt ausschließlich beim
`@font-face`-Deskriptor für Source Serif Pro (`<strong>` im Fließtext, z. B.
`spenden.md`).

**Cap-Height.** Futura hat Cap-Height 754/1000 em, Source Serif Pro 669/1000
em — bei gleicher `font-size` wirken Versalheadlines in Futura rund 13 %
größer. `--fs-*` und `--lh-tight` sind unverändert geblieben; falls eine
künftige Anpassung nötig wird, gehört sie in `tokens.css`, mit Begründung
hier.

**Fallback.** `--font-display: "Futura", "Source Serif Pro", Georgia, serif`
— fällt Futura aus (Netzwerkfehler, künftige Lizenzänderung), soll die Seite
wie vor dieser Änderung aussehen, nicht in eine dritte Optik kippen.

Das **Logo** verwendet weiterhin keinen Webfont, sondern die offizielle
SVG-Datei mit Vektorkonturen — die Lizenzfrage für die Wortmarke war nie an
Futura als Webfont gekoppelt. Siehe Abschnitt „Logo" unten.

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
| `arche-logo-white.svg` | Vollständiges Lockup, identisch zu `arche-logo.svg`, einzige Änderung: die drei `fill:#003a57` auf `fill:#ffffff` gesetzt | Footer (dunkler Grund, `--bg-inverted`) |
| `bogen.svg` | Nur der Bogen — ein einzelner Pfad aus `arche-logo.svg` herausgelöst, viewBox auf diesen Pfad zugeschnitten (plus Rand), sonst keine Änderung | Stilelement (Termine-Sektion) |
| `public/favicon.svg` / `public/favicon.png` | Derselbe Pfad wie `bogen.svg`, unverändert übernommen, per `transform` auf `<g>` in ein quadratisches 64×64-Format zentriert (kein Neuzeichnen). Farbe Dunkelblau (`#003a56`, Token `--c-blue-dark`), Hintergrund transparent | Tab-Icon |
| `og.svg` / `public/og.png` | Vollständiges Lockup, unverändert, zentriert auf `--c-offwhite`-Fläche mit schmalem `--c-blue-dark`-Abschlussbalken, 1200×630. Kein `<text>`-Element (Source Serif Pro ist kein Systemfont, siehe „Futura für Headlines, Source Serif Pro für Fließtext" oben) | Open-Graph-Vorschaukarte (`BaseLayout.astro`) |

Eingebunden per direktem Astro-Asset-Import (`import logo from
'.../arche-logo.svg'`, `<img src={logo.src} ...>`), nicht über die
`Image`-Komponente — deren Sharp-Pipeline ist für Rasterbilder gedacht und
verarbeitet Vektorgrafiken nicht sinnvoll. Ausnahme `favicon.svg`/`.png`: liegt
in `public/` und wird unverändert kopiert, kein Asset-Import (Browser laden
Icons direkt per `<link rel="icon">` aus `BaseLayout.astro`).

**Kommentare in diesen SVG-Dateien dürfen kein `--` enthalten.** XML verbietet
den doppelten Bindestrich im Kommentar; ein `<img src="…svg">` scheitert dann
stumm am strikten XML-Parser des Browsers und zeigt nur den `alt`-Text — ohne
Build- oder Konsolenfehler (passiert am 16. September 2026 bei
`arche-logo-white.svg` durch `--bg-inverted` im Kommentar). CSS-Custom-Property-
Namen in Kommentaren deshalb ohne führendes `--` schreiben. Prüfen mit
`xmllint --noout src/assets/brand/*.svg public/*.svg`.

**Gelöst (16. September 2026):** Footer trägt jetzt das Logo. `Footer.astro`
bindet `arche-logo-white.svg` genau wie `Header.astro` das Original einbindet
(Asset-Import, `<img src={logoWhite.src} width height alt={SITE.name}>`,
Breite über `--size-logo-header`, kein neues Token). Die vorherige
Textwortmarke (`.site-name` in Source Serif Pro) entfällt; die bewusste
Abweichung von harter Regel 8 ist damit aufgehoben.

**Weiterhin offen:**

1. **Kein Ortszusatz.** Das Lockup zeigt „ARCHE", nicht „Arche Bremen" —
   unverändert gegenüber dem Interim-Zustand, siehe offene Frage 1 oben.
   „Bremen" steht weiterhin im Seitentitel, im `alt`-Text und im Footer.
2. **Hero-h1 (SEO, September 2026):** Das Lockup zeichnet „ARCHE" und
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

## QR-Code (GiroCode)

`public/spenden-qr.svg` (Spendenseite, `src/content/pages/spenden.md`) ist ein
EPC-QR-Code (EPC069-12) für eine vorausgefüllte Überweisung — Empfänger, IBAN
und Verwendungszweck „Arche Bremen" stehen im Code, nur der Betrag bleibt
offen. Erzeugt von `scripts/girocode.mjs` (`npm run girocode`), siehe
`README.md`, Abschnitt „QR-Code neu erzeugen".

Farbe Dunkelblau (`#003a56`, Token `--c-blue-dark`) auf Weiß statt Markengelb:
Gelb liegt mit 1,44:1 Kontrast weit unter dem, was Scanner brauchen (üblich
sind etwa 4:1), Dunkelblau erreicht 12,07:1. Wie beim Logo (siehe oben) steckt
der Hex-Wert dabei in einem **generierten Asset**, nicht im Komponentencode —
dieselbe Ausnahme von Design-Regel 1 aus demselben Grund: Es ist keine
Handentscheidung im Template, sondern ein Parameter eines Erzeugungsskripts.

Größe 180×180 px, per `width`/`height` am `<img>` festgelegt (kein
Layout-Sprung). Fehlerkorrekturlevel M ist keine Design-, sondern eine
Format-Vorgabe von EPC069-12 — andere Level lehnen manche Banking-Apps ab.

**Bewusste Einschränkung:** Bei 70–80 % Mobiltraffic (CLAUDE.md) kann die
Mehrheit der Besucher den Code nicht auf dem eigenen Bildschirm scannen. Der
Bankdaten-Textblock bleibt deshalb auf der Seite über dem QR-Code die primäre
Information; der Code ist ein Zusatzangebot für Desktop-Besuch und künftige
gedruckte Flyer.

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
  „Verlorene Utility" unten), die Überschrift bleibt deshalb sichtbar. Das passt hier sogar
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
4:5 (Hochformat), `object-fit: cover`, mit demselben Kachel-Radius wie der
Rest des Kachel-Musters (`--radius-md`, siehe oben) — kein Kreis-Avatar, das
würde die eckige Formensprache des Brandbooks brechen. Neuer Token
`--size-portrait: 18rem` (Abschnitt Bildgrößen), verwendet auf der Kachel
(`ElderCard.astro`) und der Detailseite (`/gemeindeleitung/<slug>`). Das
Popup-Overlay der Kachel bleibt bewusst textlich — ein zweites, kleineres
Foto dort brächte keinen Mehrwert.

**Zweites Profilfoto (`familyPhoto`, September 2026):** optionales Feld,
bisher nur bei Niklas gesetzt (Familienfoto). Steht unter dem Profiltext auf
der Detailseite, in Spaltenbreite (`--measure`), ohne `aspect-ratio` oder
`object-fit` — anders als das Porträt oben wird hier nichts beschnitten, das
Bild bestimmt sein Format selbst. Erscheint bewusst nicht auf der Kachel und
nicht im Popup-Overlay — der Satz oben („bewusst textlich") gilt dort
weiterhin unverändert.

Für `/predigten` bleibt dieselbe Lücke vorerst offen. Ein Bogen als blasses
Hintergrundelement wurde im September 2026 als Ersatz für die entfernte
Farbrotation erprobt und wieder verworfen (siehe „Formulare" oben) — er
wirkte trotz geringer Deckkraft als Fremdkörper hinter den Kacheln.

**Ortsbild auf der Startseite** (12. August 2026, seit September 2026 im
Hero): `src/assets/photos/bremen-marktplatz.jpg` — Giebelhäuser am Bremer
Marktplatz. Bis September 2026 ein Vollbild-Band zwischen „Wer wir sind" und
„Bete und bau mit"; seither liegt dasselbe Bild hinter dem Hero, mit
`--scrim-hero` darüber (siehe Abschnitt „Neugestaltung September 2026").
Das Band in der Seitenmitte ist damit entfallen — ein Foto zweimal auf
derselben Seite wäre Wiederholung, nicht Bildwelt. Der Zuschnitt ist im Hero
`object-fit: cover` mit `object-position: 50% 40%`: Das Bild ist ein
Querformat (etwa 2,5 : 1), im hochformatigen Ausschnitt auf dem Telefon
bleiben dadurch die Giebel im Bild statt des Pflasters. Bewusste Abweichung von CLAUDE.md
Regel 9 / Brandbook 3.1: Das Bild ist Stock-Fotografie, keine echte Aufnahme
aus der Gemeinde. Regel 9 zielt laut dem Absatz oben („Keine Platzhalterfotos
von lachenden Fremden") auf inszenierte Gemeindeszenen; ein Stadtbild
behauptet nichts über die Gemeinde selbst und wird deshalb als engere,
begründete Ausnahme behandelt statt als Regelbruch. Bedingung, unter der
diese Ausnahme steht: keine erkennbaren Personen im Bild — das vermeidet
zugleich Persönlichkeitsrechts- und DSGVO-Fragen. Quelle: Pexels-Foto 7018479,
Fotograf Nikolai Kolosov, `https://www.pexels.com/de-de/foto/wahrzeichen-historisch-touristenattraktion-reiseziel-7018479/`,
Pexels-Lizenz (frei kommerziell nutzbar, keine Attributionspflicht — deshalb
keine Bildunterschrift und kein Eintrag im Impressum; die Nennung hier reicht,
damit spätere Betreiber die Herkunft nachvollziehen können). Technisch:
`<Image>` mit `widths`/`sizes="100vw"` statt `densities`, weil das Bild mit
dem Viewport skaliert statt eine feste Layoutbreite zu haben (anders als das
Ältesten-Porträt oben); Zuschnitt 4:3 mobil, 21:9 ab 48rem. Steht als
`<figure>` außerhalb von `Section.astro`, weil dessen `.container` das Bild
auf Inhaltsbreite begrenzen würde — hier soll es Kante zu Kante laufen.
**18. September 2026:** Dieses Bild bleibt. Es wird nicht gegen eine
Gemeindeaufnahme getauscht — ausdrücklich bestätigt. Vorher stand hier, es
werde ersetzt, sobald echte Fotos aus Bremen existieren; das gilt nicht mehr.
Die Festlegung ist keine Formalie: Von ihr hängt die Kontrastzusage der
gelben Dachzeile im Hero ab (siehe „Gelbe Dachzeile im Hero"), denn deren
Wert ist an den Bildpunkten genau dieses Fotos gemessen. Wer das Bild doch
einmal tauscht, misst die Dachzeile neu oder stellt sie auf Weiß zurück.
CLAUDE.md Regel 9 bleibt im Übrigen unberührt, sie gilt weiterhin für
Personen- und Gemeindeaufnahmen.

## Verlorene Utility

**18. September 2026.** Beim Umbau der Typografie am 17. September ist
`.visually-hidden` aus `global.css` verschwunden. Nicht durch eine
Entscheidung, sondern durch einen Fehler beim Ersetzen eines CSS-Blocks:
Der Ersatztext wurde an die Stelle des alten Blocks geschrieben, ohne den
Rest der Datei wieder anzuhängen — die Regel stand am Dateiende und fiel
mit ab.

Folge: Auf `/predigten` standen 13 nackte Radio-Knöpfe (13 × 13 px,
`position: static`) links vor den Filter-Pills. Das verletzt CLAUDE.md
direkt, denn dort ist für die Predigtenseite festgehalten, dass Bibelbuch,
Prediger und Predigtreihe „versteckt gestylt in je einem `<label>`" liegen.
Die Regel ist wortgleich wiederhergestellt.

Zwei Dinge daraus, die über den Einzelfall hinausgehen:

- **Reine CSS-Utilities haben keinen Compiler, der ihr Fehlen meldet.** Ein
  gelöschter Astro-Import bricht den Build; eine gelöschte Klasse rendert
  weiter, nur falsch. Wer `global.css` ändert, prüft die Aufrufer selbst:
  `grep -rn 'visually-hidden' src/`
- **Die Regel steht jetzt mit einem Kommentar da, der ihre Aufrufer nennt.**
  Das ist Absicht und keine Redundanz: Die nächste Person, die am Dateiende
  aufräumt, soll sehen, was daran hängt, bevor sie es anfasst.

Im selben Durchgang gefunden und behoben, alle aus derselben
Umbauphase:

- **Das geschlossene Menü-Sheet lag im Tab-Fokus jeder Seite.**
  `.sheet` stand auf `display: grid`, ohne `:not(:popover-open)`-Ausnahme.
  Gemessen: neun Tab-Stopps ins Nichts, bevor der erste sichtbare Link kam.
- **Der Verdunkler über den Wolken lag falsch in der Stapelung.** In
  `Overlay.astro` und `PageHeader.astro` lief die Abdunklung als
  `background-image` auf demselben Element wie die Wolke und konnte sie
  deshalb nicht überlagern. Jetzt eine eigene `::after`-Ebene auf
  `z-index: -1`, die Wolke auf `-2`. Negative `z-index`-Kinder malen über
  den Hintergrund des Elternelements, aber unter dessen Inhalt — genau die
  gewünschte Reihenfolge, ohne den Text in einen eigenen Kontext zu heben.
- **Die Pfeil-Knöpfe der Kachel-Reihe erschienen auch ohne Überlauf.**
  `Slider.astro` blendet sie jetzt nur ein, wenn `scrollWidth` die
  `clientWidth` übersteigt (Toleranz 4 px, Neuprüfung bei `resize`). Auf
  dem Desktop zeigte die Startseite mit drei Predigten zwei tote Knöpfe.
- **Sprungziele landeten hinter der klebenden Kopfzeile.** `html` bekommt
  `scroll-padding-top: var(--header-height)`.
- **Die Gemeindeleitungsseite gab ihrer Kachel-Reihe kein `label`.**
  Die Reihe hatte damit keine zugängliche Benennung.
- **`futura-500.woff2` wurde vorgeladen, aber nirgends benutzt.** Am selben
  Tag unabhängig auch von der typografischen Durchsicht gefunden; beim
  Zusammenführen ist deren ausführlichere Fassung stehen geblieben, siehe
  Abschnitt „Typografische Durchsicht", Punkt 4.
- **`ElderCard.astro` brach ohne Foto.** Jetzt fällt die Kachel auf die
  Wolkenfläche zurück, wie die übrigen Kachelarten auch.
- **Das Eyebrow im Hero trug Gelb auf hellem Grund.** Gemessen 3,44 : 1,
  also unter WCAG AA — die Ausnahme aus CLAUDE.md Regel 3 gilt
  ausschließlich auf `--bg-inverted`, und der Hero ist ein helles Foto.
  Jetzt Weiß, gemessen 5,00 : 1.

## Der Hero war zu gedrungen

**18. September 2026.** Rückmeldung vom Telefon: Der Hero wirke „sehr
gedrungen". Vorschlag war, die Eyebrow („Arche Bremen ·
Evangelisch-reformierte Freikirche") kleiner zu setzen. Gemessen wurde
etwas anderes.

Die Eyebrow ist 32 von 619 Pixeln Hero-Höhe, also fünf Prozent. Auf
0.75rem verkleinert spart sie sieben Pixel — und bricht weiterhin auf zwei
Zeilen, weil die Zeile mit `--tracking-label` (0.18em) rund 580 px breit
ist und ein Telefon 343 px Textspalte hat. Der Grad ist dort nicht das
Problem.

Das Problem war die Überschrift, an zwei Stellen:

1. **Der Grad widersprach der eigenen Dokumentation.** In `tokens.css`
   steht seit August: „Der Anspruch im Hero bleibt bei `--fs-xxl` — dort
   steht die Wortmarke darüber und soll nicht überboten werden." Die
   Neugestaltung im September hat `.hero-claim` auf `--fs-display` gesetzt
   und den Satz stehen lassen. Auf 390 px sind das 48 statt 39 px.
2. **Der Durchschuss war für diese Zeilenzahl zu knapp.** `--lh-display`
   (1.02) lässt bei 48 px genau einen Pixel zwischen der Unterlänge der
   einen und der Versalhöhe der nächsten Zeile. Für ein- bis zweizeilige
   Schauzeilen ist das die Absicht des Tokens; drei Zeilen daraus lesen
   sich als geschlossene Fläche. Genau das beschreibt „gedrungen".

Dazu kam ein Bruch, der auf dem Gerät des Melders nicht auftrat: Bei
390 px Breite — iPhone ohne „Pro Max", der häufigste Fall — zerfiel „Wir
gründen eine Gemeinde" in drei Zeilen, von denen eine nur „eine" trug.
`text-wrap: balance` kann daran nichts ändern, weil „Gemeinde" allein
schon fast die volle Spalte füllt.

Umgesetzt, mobil zuerst (CLAUDE.md Regel 6): `.hero-claim` steht auf
`--fs-xxl` mit `--lh-tight` und wechselt erst ab 48rem auf `--fs-display`
mit `--lh-display`. Kein neuer Token, keine neue Ausnahme.

Gemessen, jeweils Hero-Höhe und Luft zwischen zwei Überschriftzeilen:

| Breite | vorher | nachher |
| --- | --- | --- |
| 375 px | 614 px / 1 px | 555 px / 6 px |
| 390 px | 619 px / 1 px | 558 px / 6 px |
| 430 px | 579 px / 1 px | 564 px / 6 px |
| ab 768 px | unverändert | unverändert |

Der Meilenstein („Geplanter erster Gottesdienst / 2. Mai 2027") endet auch
auf dem kleinsten geprüften Gerät bei 403 px und bleibt damit über der
Falz — die inhaltliche Vorgabe aus CLAUDE.md ist eingehalten.

`--lh-tight` ist in `tokens.css` mit „h3/h4, Kacheltitel" beschrieben und
trägt jetzt zusätzlich die Hero-Zeile auf schmalen Schirmen. Das ist eine
Ausweitung der Beschreibung, kein neuer Wert; 1.15 ergibt bei 39 px sechs
Pixel Luft, was für drei Zeilen die richtige Größenordnung ist.

**Offen, inhaltlich:** Die Eyebrow wiederholt mit
„Evangelisch-reformierte Freikirche" wörtlich, was 200 px darüber im
Logo-Lockup steht. Auf „Arche Bremen" gekürzt wäre sie einzeilig (spart
weitere 16 px) und stünde nicht mehr in Konkurrenz zur Überschrift. Das
ist eine Textentscheidung und liegt bei der Gemeinde, nicht im Design.

**Nachtrag vom selben Abend: Die Verkleinerung war falsch.** Siehe den
folgenden Abschnitt. Der Durchschuss war die richtige Hälfte der
Diagnose, der Schriftgrad die falsche.

## Der umgekehrte Rhythmus im Hero

**18. September 2026, abends.** Zweite Rückmeldung vom Telefon am selben
Tag, per Sprachnachricht, sinngemäß: Der Desktop sei „wirklich top" — dort
lese man zuerst die Überschrift, „dann liest du entspannt: ah okay,
evangelisch-reformierte Freikirche, da oben in weiß, und geplanter
Gottesdienst, und das ist so richtig clean". Auf dem Telefon dagegen sei
die Schrift „jetzt so klein", alles sei „so ähnlich", man wisse nicht,
wohin man schauen solle. Zwei Vorschläge: die kleine Zeile in Gelb, oder
die Überschrift wieder größer.

Das war die unmittelbare Antwort auf die Änderung vom Nachmittag. Die
erste Meldung („gedrungen") hatte zur Verkleinerung von 47,8 auf 38,8 px
geführt; die zweite ist die Gegenrückmeldung dazu. Beide Male stimmte die
Beobachtung, beide Male war die vorgeschlagene Ursache eine andere als die
tatsächliche.

### Der eigentliche Fehler: die Gruppierung stand auf dem Kopf

Gemessen im ausgelieferten HTML, senkrechte Abstände im Hero:

| von → nach | vorher |
| --- | --- |
| kleine Versalzeile → Überschrift | **40 px** |
| Überschrift → Terminlabel | 24 px |
| Terminlabel → Knöpfe | 32 px |

Der größte Abstand saß zwischen der Dachzeile und der Überschrift, zu der
sie gehört; der kleinste zwischen zwei Blöcken, die nichts miteinander zu
tun haben. Die Folge ist genau der beschriebene Eindruck: Die kleine Zeile
steht als eigene erste Stufe frei („es fängt oben an"), Überschrift und
Termin verkleben zu einer Masse („dann ist es erschlagend").

Die 40 px waren keine Entscheidung, sondern eine Addition: der `gap` des
Flex-Containers plus das globale `margin-bottom` von `.eyebrow` aus
`global.css`. Beim Meilenstein-Label ist dieses Margin längst auf `0`
überschrieben — oben war es vergessen worden. Der Fehler steckt seit dem
Umbau im September drin und ist auf dem Desktop unsichtbar, weil dort
16 px neben einer über 300 px hohen Überschrift nicht ins Gewicht fallen.

Jetzt aufsteigend, **nur unter 48rem**: 8 / 24 / 32. Die Dachzeile sitzt
eng an der Überschrift, der Terminblock steht ab, die Knöpfe stehen weiter
ab. Nur vorhandene Abstands-Tokens. Auf dem Desktop bleibt alles, wie es
ist — die Fassung ist ausdrücklich gelobt worden, und dieselbe Inversion
richtet dort keinen Schaden an. Dass sie dort formal weiterbesteht, ist
bewusst hingenommen und hier vermerkt.

### Der Schriftgrad geht zurück auf --fs-display

Die Verkleinerung vom Nachmittag wird zurückgenommen, der Durchschuss
(`--lh-tight` statt `--lh-display`) bleibt. Damit ist der Befund vom
Nachmittag zur Hälfte bestätigt und zur Hälfte korrigiert: Die geschlossene
Fläche kam vom Durchschuss, nicht vom Grad.

Gemessen im Verhältnis Überschrift zu Dachzeile — auf dem gelobten Desktop
liegt es bei 7,5:

| | Verhältnis |
| --- | --- |
| Telefon, vor dem Nachmittag | 3,43 |
| Telefon, nach dem Nachmittag | 2,77 |
| Telefon, jetzt | 3,41 |

Der Preis: Bei 375 und 390 px Breite steht „eine" allein auf einer Zeile.
Bei 430 px nicht — deshalb hat es auf dem meldenden Gerät nie jemand
gesehen. Gemessen bricht „eine Gemeinde" ab 43,5 px Schriftgrad um;
`--fs-display` liefert dort 46,8 px. Ein Zwischenwert wäre ein neuer
Token und damit nach Regel 7 nichts, was im Komponentencode entsteht —
er steht unten unter den offenen Fragen.

### Was geprüft und verworfen wurde

Alle Varianten wurden bei 375, 390 und 430 px gerendert und am echten
Bildpunkt gemessen, Kontraste gegen den hellsten Hintergrundpixel:

- **Gelbe Dachzeile.** Zunächst abgelehnt, dann doch umgesetzt — siehe
  den eigenen Abschnitt „Gelbe Dachzeile im Hero" weiter unten. Die
  Ablehnung stützte sich auf zwei Gründe, von denen einer nicht trug.
- **Dachzeile dämpfen** auf 75 % Weiß, wie das Meilenstein-Label es trägt:
  3,42 : 1 gegen den hellsten Bildpunkt. Durchgefallen.
- **Bewusster ungleicher Umbruch** der Dachzeile („Arche Bremen ·" /
  „Evangelisch-reformierte Freikirche"): ergibt drei Zeilen statt zwei und
  einen um 16 px höheren Hero. Schlechter als der automatische Umbruch.
- **Dachzeile auf „Arche Bremen" kürzen:** typografisch die stärkste
  Lösung — einzeilig, Verhältnis 8,38, also der Desktop-Wert, ohne
  dunkleres Foto und ohne Kontrastrisiko. Wird nicht umgesetzt: Es ist
  eine Inhaltsänderung, und sie nimmt ausgerechnet die Zeile vom ersten
  mobilen Bildschirm, die in der Sprachnachricht namentlich gelobt wurde.
  Bleibt als Angebot bei der Gemeinde.

## Gelbe Dachzeile im Hero

**18. September 2026, später am Abend.** Der Wunsch aus der Sprachnachricht
— die kleine Zeile über der Überschrift in Gelb statt in Weiß — war zuerst
mit zwei Gründen abgelehnt worden:

1. Gelb erreicht dort 3,22 bis 3,24 : 1 und verfehlt AA deutlich. Die Zeile
   ist 14 px und zählt nicht als große Schrift, es gilt 4,5 : 1.
2. Auf die Schwelle käme sie nur mit einem dunkleren Verlauf, und der
   gemessene Wert hinge dann an den Bildpunkten genau dieses Fotos — das
   laut damaliger Dokumentation ersetzt werden sollte. Wer es tauscht,
   sähe nicht, dass er eine Zugänglichkeitsschwelle reißt.

**Grund 2 ist hinfällig:** Das Bild bleibt, es wird nicht getauscht (siehe
„Bildwelt"). Damit war die Ablehnung neu zu prüfen — und Grund 1 ließ sich
billiger auflösen als zunächst gemessen.

### Der Fehler in der ersten Messung

Die ersten Varianten hatten den Verlauf als Ganzes verstärkt, also den Stop
bei 0 % **und** den bei 45 %. Der bei 45 % liegt auf Giebelhöhe. Ihn
mitzuverdunkeln kostete ein Drittel der Bildhelligkeit, ohne der Zeile zu
helfen — die steht 400 px weiter oben. Verstärkt man **nur den obersten
Stop**, bleibt das Bild, wo es zählt:

| oberster Stop | Gelb, hellster Bildpunkt | Foto oben | Foto auf Giebelhöhe |
| --- | --- | --- | --- |
| 58 % (vorher) | 3,22 – 3,24 | 25 | 9 |
| 70 % | 4,04 – 4,05 | 21 | 8 – 9 |
| 75 % | 4,42 – 4,44 | 19 | 8 – 9 |
| **80 %** | **4,84 – 4,92** | 18 | 8 – 9 |
| 85 % | 5,31 – 5,38 | 17 | 8 |

Gewählt: 80 %, nur unter 48rem. Im obersten Streifen ist ohnehin fast nur
Himmel; die Giebel behalten ihre Farbe. Im ausgelieferten Zustand misst die
Zeile 4,92 bis 5,00 : 1 über alle drei Telefonbreiten.

### Seit 24. September 2026 auch auf dem Desktop

Auf Wunsch jetzt auf allen Breiten gelb; derselbe verstärkte oberste Stop
(80 %) gilt dafür auch auf dem Desktop. Nachmessung am hellsten
Hintergrundpixel, nur über der Textfläche (nicht über der ganzen
Absatzbreite — dort läge rechts der gelbe Bogen):

| Breite | Kontrast Gelb |
| --- | --- |
| 360, 390, 430, 768 px | 4,69 : 1 |
| 1024, 1440 px | 4,61 : 1 |
| 1280, 1920 px | 4,62 : 1 |

Alle über 4,5 : 1, aber knapp. Die Telefonwerte liegen unter den am
18. September dokumentierten 4,92 bis 5,00 : 1, obwohl sich dort am CSS
nichts geändert hat — vermutlich ein Unterschied in der Messmethode;
der niedrigere Wert ist der vorsichtigere. Der Abschnitt unten ist der
Stand vom 18. September.

### Warum damals nur auf dem Telefon

Auf dem Desktop blieb die Zeile weiß. Sie ist dort einzeilig, steht neben
einer über 300 px hohen Überschrift und braucht keine eigene Farbebene —
und in der Sprachnachricht ist genau dieser Zustand benannt und gelobt
worden („da oben in weiß … das ist so richtig clean"). Eine Farbe, die sich
mit der Bildschirmbreite ändert, ist erklärungsbedürftig; deshalb steht sie
hier und im Komponentenkommentar begründet.

### Was das für Regel 3 bedeutet

CLAUDE.md Regel 3 band `--text-accent-on-dark` bisher ausschließlich an
`--bg-inverted`, also an ein Volltonfeld. Hier steht der Token auf 80 %
desselben Dunkelblaus über einem Foto. Das ist eine Erweiterung, keine
Umgehung: Der Tonwert liegt nah am Volltonfeld, der Kontrast ist am
ungünstigsten Bildpunkt gemessen statt am Mittelwert, und die Regel nennt
die Bedingung jetzt ausdrücklich — das Foto bleibt. Wird es doch getauscht,
ist neu zu messen oder die Zeile auf Weiß zurückzustellen; beides sind zwei
Regeln in `index.astro`.

### Was daran lehrreich ist

Die erste Ablehnung war nicht falsch gerechnet, sondern zu grob modelliert.
„Verlauf verstärken" wurde als eine Entscheidung behandelt, obwohl der
Verlauf drei Stützstellen hat und nur eine davon dem Text dient. Aus einer
Messung, die eine Option zu teuer erscheinen ließ, wurde ein „geht nicht".
Wer hier etwas ablehnt, weil eine Messung dagegen spricht, prüfe zuerst, ob
die Messung die billigste Fassung der Option abbildet.

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
6. Eine Schaustufe zwischen `--fs-xxl` und `--fs-display` fehlt. Auf dem
   Telefon liefert `--fs-xxl` 38,1 px und `--fs-display` 46,8 px; der
   Umbruchpunkt von „eine Gemeinde" liegt gemessen bei 43,5 px. Ein Wert
   dazwischen (etwa `clamp(2.6rem, 1.4rem + 5.2vw, 5.5rem)`) gäbe der
   Hero-Zeile die Führung ohne die Waisenzeile. Nach CLAUDE.md Regel 7
   wird ein solcher Token nicht im Komponentencode erfunden — hier als
   Antrag notiert. Siehe „Der umgekehrte Rhythmus im Hero".
7. Kapitel 4 beschreibt die Stilelemente „Bogen" und „Abstufung". Der Bogen
   liegt jetzt als eigene Datei vor (`bogen.svg`, siehe Abschnitt „Logo" oben)
   und ist als dekoratives Element in der Termine-Sektion umgesetzt.
   „Abstufung" bleibt offen, aus der Textebene nicht erschließbar.
