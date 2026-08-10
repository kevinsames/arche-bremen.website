import { defineField, defineType } from 'sanity';

// Kein Wiederholungsfeld. Die wöchentlichen Fixtermine (Sonntagsgottesdienst
// etc.) stehen als Konstante im Repo (src/consts.ts), nicht im CMS — siehe
// CLAUDE.md, "Kein Framework für Wiederholungstermine".
export const event = defineType({
  name: 'event',
  title: 'Termin',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'start',
      title: 'Beginn',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'Ende',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Ort',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', start: 'start' },
    prepare({ title, start }) {
      return { title, subtitle: start };
    },
  },
});
