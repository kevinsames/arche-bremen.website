import { defineField, defineType } from 'sanity';
import { bibleBooks } from '../bibleBooks';

// Eine einzelne Bibelstellenangabe. `book` ist immer eine feste Auswahl aus
// bibleBooks.ts, niemals Freitext — sonst ist die Filterbarkeit dauerhaft
// zerstört ("Röm 8" / "Römer 8,1" / "Rom. 8" wären drei verschiedene Werte).
const passage = defineField({
  name: 'passage',
  title: 'Bibelstelle',
  type: 'object',
  fields: [
    defineField({
      name: 'book',
      title: 'Buch',
      type: 'string',
      options: {
        list: bibleBooks.map((book) => ({ value: book.value, title: book.title })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'chapterStart',
      title: 'Kapitel (Start)',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'verseStart',
      title: 'Vers (Start)',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'chapterEnd',
      title: 'Kapitel (Ende)',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'verseEnd',
      title: 'Vers (Ende)',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  preview: {
    select: { book: 'book', chapterStart: 'chapterStart' },
    prepare({ book, chapterStart }) {
      const title = bibleBooks.find((b) => b.value === book)?.title ?? book;
      return { title: chapterStart ? `${title} ${chapterStart}` : title };
    },
  },
});

export const sermon = defineType({
  name: 'sermon',
  title: 'Predigt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Bestimmt die URL der Predigt (/predigten/<slug>). Abweichung vom Datenmodell in CLAUDE.md: dort ist slug optional, hier ist es Pflicht, weil ohne Slug keine Detailseite erreichbar wäre.',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'preacher',
      title: 'Prediger',
      type: 'reference',
      to: [{ type: 'preacher' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Predigtreihe',
      type: 'string',
    }),
    defineField({
      name: 'passages',
      title: 'Bibelstellen',
      type: 'array',
      of: [passage],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio-URL',
      description: 'Alternative zu einer hochgeladenen Audiodatei.',
      type: 'url',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audiodatei',
      description: 'Alternative zu einer externen Audio-URL.',
      type: 'file',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', date: 'date' },
    prepare({ title, date }) {
      return { title, subtitle: date };
    },
  },
});
