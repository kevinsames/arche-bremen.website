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
  domain: 'PLATZHALTER: arche-bremen.de',
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
export const FOUNDING = {
  claim: 'Wir gründen eine Gemeinde in Bremen.',
  milestoneLabel: 'Geplanter erster Gottesdienst',
  milestoneDate: '1. April 2027',
};

// PLATZHALTER: Die Anliegen unten sind ein erster Vorschlag und müssen vom
// Team formuliert und freigegeben werden, bevor sie online gehen.
export const PRAYER_REQUESTS = [
  'Passende Räumlichkeiten in Bremen',
  'PLATZHALTER: Mitarbeiter für den Aufbau',
  'PLATZHALTER: Menschen, die das Evangelium hören und annehmen',
];

// Funktionsadresse, nie personengebunden (siehe CLAUDE.md). Getrennt in
// local/domain statt als ein String, damit sich HTML-Entities für die
// @-Ersetzung im Footer sauber anwenden lassen, ohne die Adresse selbst zu
// zerlegen.
export const CONTACT = {
  local: 'info',
  domain: 'bremen.arche-gemeinde.de',
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
