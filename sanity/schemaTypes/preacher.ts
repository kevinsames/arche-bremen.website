import { defineField, defineType } from 'sanity';

// Absichtlich minimal. Die vollständige Biografie liegt als Markdown im Repo,
// verknüpft über denselben Slug (siehe src/content/preachers/). Existiert kein
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
        'Muss mit dem Dateinamen des Markdown-Profils in src/content/preachers/ übereinstimmen, damit der Name verlinkt wird. Ohne Übereinstimmung wird nur der Name als Text angezeigt.',
      type: 'slug',
      options: { source: 'name' },
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
