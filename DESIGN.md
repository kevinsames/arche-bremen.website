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

### Countdown im Hero

Auf ausdrücklichen Wunsch umgesetzt, gegen meine Empfehlung — ein
Countdown über 226 Tage mit Minutenanzeige ist Effekt, kein Nutzen. Die
Einwände dagegen sind technisch aber lösbar, und so ist es gebaut:

Die Zahlen stehen **zur Buildzeit gerechnet im HTML**, ein synchrones
Inline-Skript unmittelbar hinter dem Element korrigiert sie noch vor dem
ersten Paint auf die Uhr des Besuchers. Damit gibt es weder leere Felder
im ersten Frame noch einen sichtbaren Sprung. Ohne JavaScript bleibt der
Buildzeit-Stand stehen — tagesgenau richtig, solange seit dem letzten
Deploy nicht zu viel Zeit vergangen ist. Dritte benannte Ausnahme von
CLAUDE.md Regel 4, rund 1,0 KB inline und unminifiziert.

Gemessen am ausgelieferten HTML: Startseite 2,0 KB Inline-JavaScript
(Countdown plus Kachel-Reihe), `/gemeindeleben` 0,9 KB (nur Kachel-Reihe),
alle übrigen Inhaltsseiten 0 KB. Kein einziges externes Skript.

`font-variant-numeric: tabular-nums` auf den Ziffern: Ohne das springt die
Zeile in der Breite, sobald die Minutenzahl von 9 auf 10 wechselt.

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

**Gewichte im Code.** Zwei Regeln statt Einzelfallentscheidung, nach
Brandbook (Bold für kleine Bauchbinden/Labels, Medium für große Headlines):

- **500** — große Versalheadlines: `h1`–`h4` (`global.css`), Kachel- und
  Sektionsüberschriften (`.title`/`.name` in `CreedCard.astro`,
  `ElderCard.astro`, `MinistryCard.astro`, sowie die `h1`–`h4` auf
  `SermonCard.astro`/`SermonDetail.astro`/`index.astro`/`kontakt.astro`, die
  denselben globalen Selektor erben).
- **700** — kleine Versal-Labels und Buttons: `.button` (`global.css`), Pills
  und Formularlabels (`SermonFilter.astro`), `.number` (`CreedCard.astro`),
  `.passages`/`.passage` (`SermonDetail.astro`/`SermonCard.astro`), `.status`
  (`MinistryCard.astro`), `.mail-label` (`kontakt.astro`),
  `.milestone-label`/`.event-title` (`index.astro`).

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
Dieses Band wird ersetzt, sobald echte Fotos aus der Bremer Gemeinde
existieren; CLAUDE.md Regel 9 bleibt davon unberührt, sie gilt weiterhin für
Personen-/Gemeindeaufnahmen.

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
