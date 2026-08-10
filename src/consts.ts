// Hartkodierte Eckdaten der Gemeinde.
//
// Bewusst nicht aus Sanity geladen: Gottesdienstzeit und Adresse sind die
// Information, für die die Mehrheit der Besucher kommt, und müssen above the
// fold ohne Netzwerk-Roundtrip zur Buildzeit feststehen (siehe CLAUDE.md).
//
// Alle mit "PLATZHALTER" markierten Werte sind noch nicht final und müssen vor
// dem ersten Deploy ersetzt werden.

export const SITE = {
  name: 'Arche Bremen',
  domain: 'PLATZHALTER: arche-bremen.de',
};

export const SERVICE = {
  // Anzeigetext, keine berechnete Uhrzeit.
  display: 'Sonntags um PLATZHALTER Uhr',
};

export const ADDRESS = {
  street: 'PLATZHALTER Straße 1',
  postalCode: 'PLATZHALTER',
  city: 'Bremen',
};

// Funktionsadresse, nie personengebunden (siehe CLAUDE.md). Getrennt in
// local/domain statt als ein String, damit sich HTML-Entities für die
// @-Ersetzung im Footer sauber anwenden lassen, ohne die Adresse selbst zu
// zerlegen.
export const CONTACT = {
  local: 'kontakt',
  domain: 'PLATZHALTER-arche-bremen.de',
};

// Reiner Anzeigetext für die wöchentlichen Fixtermine. Keine
// Wiederholungslogik, kein RRULE — jede Zeile ist unabhängig gepflegt.
export const WEEKLY_EVENTS = [
  {
    title: 'Gottesdienst',
    weekday: 'Sonntag',
    time: 'PLATZHALTER Uhr',
    location: 'PLATZHALTER Ort',
  },
];
