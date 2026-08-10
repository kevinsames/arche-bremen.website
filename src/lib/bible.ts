import { bibleBooks } from '../../sanity/bibleBooks';

export interface Passage {
  book: string;
  chapterStart: number;
  verseStart?: number;
  chapterEnd?: number;
  verseEnd?: number;
}

function bookTitle(value: string): string {
  return bibleBooks.find((book) => book.value === value)?.title ?? value;
}

// Formatiert eine einzelne Bibelstelle lesbar, z.B. "Römer 8,1–11".
// Siehe README für die vollständige Beispieltabelle.
export function formatPassage(passage: Passage): string {
  const book = bookTitle(passage.book);
  const { chapterStart, verseStart, chapterEnd, verseEnd } = passage;

  const crossesChapters = chapterEnd != null && chapterEnd !== chapterStart;

  if (!crossesChapters) {
    if (verseStart == null) {
      return `${book} ${chapterStart}`;
    }
    if (verseEnd == null || verseEnd === verseStart) {
      return `${book} ${chapterStart},${verseStart}`;
    }
    return `${book} ${chapterStart},${verseStart}–${verseEnd}`;
  }

  if (verseStart == null && verseEnd == null) {
    return `${book} ${chapterStart}–${chapterEnd}`;
  }

  const start = verseStart != null ? `${chapterStart},${verseStart}` : `${chapterStart}`;
  const end = verseEnd != null ? `${chapterEnd},${verseEnd}` : `${chapterEnd}`;
  return `${book} ${start} – ${end}`;
}

export function formatPassages(passages: Passage[]): string {
  return passages.map(formatPassage).join('; ');
}
