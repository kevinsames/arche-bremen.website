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
  domain: 'PLATZHALTER: arche-bremen.de',
};

export const SERVICE = {
  // Anzeigetext, keine berechnete Uhrzeit.
  display: 'Sonntags um 11 Uhr',
};

export const ADDRESS = {
  street: 'Norderoog 2',
  postalCode: '28259',
  city: 'Bremen',
};

// Funktionsadresse, nie personengebunden (siehe CLAUDE.md). Getrennt in
// local/domain statt als ein String, damit sich HTML-Entities für die
// @-Ersetzung im Footer sauber anwenden lassen, ohne die Adresse selbst zu
// zerlegen.
//
// Noch keine Funktionsadresse eingerichtet — PLATZHALTER bleibt bewusst
// stehen. Eine personengebundene Adresse (niklas.meyer@…) wurde geprüft und
// verworfen: widerspricht CLAUDE.md ("Kontakt über Funktionsadresse, nie
// personengebunden"). Nicht erneut diskutieren, sondern kontakt@… einrichten.
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
    time: '11 Uhr',
    location: 'Norderoog 2',
  },
];
