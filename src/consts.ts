// Hartkodierte Eckdaten der Gemeinde.
//
// Bewusst nicht aus Sanity geladen: Gottesdienstzeit und Adresse sind die
// Information, für die die Mehrheit der Besucher kommt, und müssen above the
// fold ohne Netzwerk-Roundtrip zur Buildzeit feststehen (siehe CLAUDE.md).
//
// Mit "PLATZHALTER" markierte Werte sind noch nicht final und müssen vor dem
// ersten Deploy ersetzt werden.

export const SITE = {
  name: 'Arche Bremen',
  // Nur der Tab-Titel der Startseite. Unterseiten setzt BaseLayout aus dem
  // Seitentitel und `name` zusammen.
  titleHome: 'Arche Bremen — Evangelisch-reformierte Freikirche',
  // Die Domain steht bewusst NICHT hier, sondern als `site` in
  // astro.config.mjs — dort liest Astro sie für Canonical-Links, Open Graph
  // und sitemap.xml aus (Astro.site).
  //
  // Meta-Description der Startseite. In index.astro um FOUNDING.milestoneDate
  // ergänzt, damit sie mit dem Hero synchron bleibt.
  description:
    'Wir gründen in Bremen eine evangelisch-reformierte Freikirche — als ' +
    'Stationsgemeinde der Arche Hamburg.',
};

// Gründungsphase (siehe FOUNDING unten): Es gibt noch keine feste
// Gottesdienstzeit. SERVICE kehrt zurück, sobald der erste Gottesdienst
// stattfindet — dann zusammen mit ADDRESS wieder above the fold im Hero.

// PLATZHALTER: voraussichtliche Adresse, noch nicht bestätigt. Deshalb aktuell
// nirgends öffentlich gerendert (nicht im Hero, nicht im Footer) — erst wenn
// sie feststeht.
export const ADDRESS = {
  street: 'Norderoog 2',
  postalCode: '28259',
  city: 'Bremen',
};

// Gründungsphase: Es gibt noch keinen öffentlichen Termin. Das Team trifft
// sich wöchentlich intern zur Vorbereitung; das ist kein Angebot an Besucher
// und steht deshalb nicht auf der Seite. claim/milestone tragen above the
// fold, was Gottesdienstzeit + Adresse vorher trugen.
//
// Seit 24. September 2026 steht hier kein festes Datum mehr, sondern nur
// Jahreszeit, Jahr und Stadtteil — der genaue Termin steht noch nicht fest.
// Bis dahin gab es ein ISO-Datum, aus dem Anzeigetext, Wochentag und die
// Ziffern der Datumsfläche per Intl.DateTimeFormat abgeleitet wurden (siehe
// Git-Historie). Steht der Termin fest, kann das zurückkommen.
const MILESTONE_SEASON = 'Frühjahr';
const MILESTONE_YEAR = '2027';

export const FOUNDING = {
  // Anspruch above the fold, in zwei Teile getrennt: Der Hero setzt den
  // zweiten Teil in --text-accent-on-dark ab. Zwei Felder statt eines
  // Strings, den das Template per Zeichenkettensuche zerlegen müsste —
  // eine Textänderung bräche das sonst still. Die Teile werden mit einem
  // Leerzeichen aneinandergesetzt gelesen.
  claim: 'Wir gründen eine Gemeinde',
  claimAccent: 'in Bremen.',
  milestoneLabel: 'Geplanter erster Gottesdienst',
  /** "Frühjahr" — steht als Kicker über der Datumsfläche. */
  milestoneSeason: MILESTONE_SEASON,
  /** "2027" — die große Zahl der Datumsfläche auf der Startseite. */
  milestoneYear: MILESTONE_YEAR,
  /** "Frühjahr 2027" — Fließtext-Schreibweise, im Hero. */
  milestoneDate: `${MILESTONE_SEASON} ${MILESTONE_YEAR}`,
  /** Stadtteil, keine Adresse — die steht noch nicht fest (siehe ADDRESS). */
  milestonePlace: 'Bremen Süd',
};

export const PRAYER_REQUESTS = [
  'Passende Räumlichkeiten in Bremen',
  'Weitere Mitarbeiter für den Aufbau',
  'Menschen, die das Evangelium hören und annehmen',
];

// Funktionsadresse, nie personengebunden (siehe CLAUDE.md). Getrennt in
// local/domain statt als ein String, damit sich HTML-Entities für die
// @-Ersetzung im Footer sauber anwenden lassen, ohne die Adresse selbst zu
// zerlegen.
//
// Bewusst `info.bremen@arche-gemeinde.de` und nicht `info@bremen.…`: Die
// Subdomain `bremen.arche-gemeinde.de` ist ein reiner CNAME auf Cloudflare
// Pages und hat keinen MX-Eintrag. Das Postfach liegt im
// Microsoft-365-Tenant der Muttergemeinde auf der Hauptdomain. Nicht auf die
// Subdomain-Form zurückändern.
export const CONTACT = {
  local: 'info.bremen',
  domain: 'arche-gemeinde.de',
};

// Reiner Anzeigetext für die wöchentlichen Fixtermine. Keine
// Wiederholungslogik, kein RRULE — jede Zeile ist unabhängig gepflegt.
//
// Gründungsphase: aktuell leer. Das Team trifft sich zwar wöchentlich, aber
// intern zur Vorbereitung — kein öffentlicher Termin, also nicht hier
// eintragen. Erster Eintrag kommt mit dem ersten öffentlichen Gottesdienst
// oder Treffen.
export const WEEKLY_EVENTS: {
  title: string;
  weekday: string;
  time: string;
  location: string;
}[] = [];
