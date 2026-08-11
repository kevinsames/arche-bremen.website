// Gemeinsame Normalisierung für den Predigt-Filter (SermonCard.astro baut
// damit den Suchindex zur Buildzeit, SermonFilter.astro importiert dieselbe
// Funktion im Browser-Skript). Eine Funktion an einer Stelle statt zweier
// Kopien, die auseinanderlaufen können.
//
// Entfernt Diakritika, damit "romer" auch "Römer" findet.
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}
