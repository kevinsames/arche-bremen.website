import { defineField, defineType } from 'sanity';

// Absichtlich minimal. Hält fest, wer eine konkrete Predigt gehalten hat —
// das schließt Gastprediger ohne Ältestenamt ein. Deshalb bleibt der Typ
// "preacher" und wird nicht in "elder" umbenannt, obwohl die Website den
// Reiter "Älteste" nennt: Nicht jeder preacher ist ein Ältester.
//
// Die vollständige Biografie der Ältesten liegt als Markdown im Repo,
// verknüpft über denselben Slug (siehe src/content/elders/). Existiert kein
// passendes Repo-Profil (Gastprediger), wird auf der Website nur der Name
// angezeigt, nicht verlinkt.
//
// Keine Biografien, Fotos oder Kontaktdaten hier: Sanity Free-Datasets sind
// öffentlich lesbar, inklusive Entwürfe.
export const preacher = defineType({
  name: 'preacher',
  title: 'Prediger',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Muss mit dem Dateinamen des Markdown-Profils in src/content/elders/ übereinstimmen, damit der Name verlinkt wird. Ohne Übereinstimmung wird nur der Name als Text angezeigt.',
      type: 'slug',
      options: { source: 'name' },
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
