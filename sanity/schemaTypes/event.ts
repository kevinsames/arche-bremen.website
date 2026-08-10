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
    defineField({
      name: 'cancelled',
      title: 'Fällt aus',
      type: 'boolean',
      initialValue: false,
      description:
        'Der Termin bleibt auf der Website sichtbar und wird als Ausfall ' +
        'gekennzeichnet. Bitte nicht stattdessen löschen — wer den Termin ' +
        'schon gesehen hat, erfährt sonst nichts vom Ausfall. Fällt ein ' +
        'wöchentlicher Termin einmalig aus (z. B. Gottesdienst in der ' +
        'Sommerpause), hier einen normalen Termin mit diesem Datum anlegen ' +
        'und das Häkchen setzen.',
    }),
  ],
  preview: {
    select: { title: 'title', start: 'start', cancelled: 'cancelled' },
    prepare({ title, start, cancelled }) {
      return { title, subtitle: cancelled ? `Fällt aus · ${start}` : start };
    },
  },
});
