// Erzeugt public/spenden-qr.svg — den GiroCode (EPC-QR-Code, EPC069-12) für
// die Überweisung auf der Spendenseite (src/content/pages/spenden.md).
//
// Bewusst ein einzelnes Skript statt einer Dependency (harte Regel 1): der
// QR-Generator läuft nur hier, per `npx`, auf dem Rechner der Person, die den
// Code neu erzeugt. Build und Deploy brauchen ihn nie — das SVG-Ergebnis ist
// committed.
//
// Die Bankdaten unten MÜSSEN mit src/content/pages/spenden.md und
// src/content/pages/impressum.md übereinstimmen. Bewusst dupliziert statt
// aus src/consts.ts importiert (harte Regel 2) — Markdown-Inhalte können
// keine TypeScript-Konstanten interpolieren, ein gemeinsamer Ort würde hier
// mehr Kopplung kosten, als er Tippfehler spart.
//
// Aufruf: npm run girocode
// Nach jedem Lauf: den erzeugten Code mit einer echten Banking-App scannen
// (siehe README.md, Abschnitt "QR-Code neu erzeugen").

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const BIC = 'GENODEF1EK1';
const EMPFAENGER = 'Gemeinde und Missionswerk Arche e.V.';
const IBAN = 'DE98520604100007070705'; // ohne Leerzeichen, siehe EPC069-12
// Ohne Namensplatzhalter: Das Feld ist im QR-Code für jeden Scan identisch
// vorbefüllt, ein wörtliches "- Name" würde ohne Nachbearbeitung so
// überwiesen. Die Seite bittet stattdessen darum, den Namen in der
// Banking-App vor dem Absenden selbst zu ergänzen (siehe spenden.md).
const VERWENDUNGSZWECK = 'Arche Bremen - Spende';

const OUTPUT = new URL('../public/spenden-qr.svg', import.meta.url);

// Farben aus src/styles/tokens.css — --text-primary (--c-blue-dark) auf
// --bg-page (Weiß). Kein neues Token: der Hex-Wert steht hier in einem
// generierten Asset, nicht im Komponentencode (siehe DESIGN.md, Abschnitt
// "QR-Code (GiroCode)" — dieselbe Ausnahme wie bei den Logo-SVGs).
const DARK = '003a56';
const LIGHT = 'ffffff';

function assert(condition, message) {
  if (!condition) {
    console.error(`girocode: ${message}`);
    process.exit(1);
  }
}

assert(!IBAN.includes(' '), 'IBAN darf keine Leerzeichen enthalten.');
assert(EMPFAENGER.length <= 70, 'Empfänger darf laut EPC069-12 max. 70 Zeichen haben.');
assert(VERWENDUNGSZWECK.length <= 140, 'Verwendungszweck darf laut EPC069-12 max. 140 Zeichen haben.');

// Elf Zeilen, LF, keine Zeilenschaltung nach der letzten Zeile. Version 002
// (BIC dadurch optional, aber wir geben ihn trotzdem an — schadet nicht und
// hilft älteren Apps). Betrag und Purpose-Code bleiben leer: der Betrag soll
// vom Spender gewählt werden. Zeile 10 (strukturierte Referenz) bleibt leer,
// weil sie sich mit Zeile 11 (Verwendungszweck als Freitext) ausschließt.
const payload = ['BCD', '002', '1', 'SCT', BIC, EMPFAENGER, IBAN, '', '', '', VERWENDUNGSZWECK].join('\n');

const payloadBytes = Buffer.byteLength(payload, 'utf8');
assert(payloadBytes <= 331, `Payload ist ${payloadBytes} Byte, EPC069-12 erlaubt max. 331 Byte.`);

console.log('--- GiroCode-Payload ---');
console.log(payload);
console.log('--- Ende Payload (' + payloadBytes + ' Byte) ---');

// Fehlerkorrektur M ist keine Designentscheidung, sondern von der
// Spezifikation vorgegeben (EPC069-12) — andere Level lehnen manche
// Banking-Apps ab.
execFileSync(
  'npx',
  [
    '--yes',
    'qrcode@1',
    '-e',
    'M',
    '-t',
    'svg',
    '-d',
    DARK,
    '-l',
    LIGHT,
    '-o',
    OUTPUT.pathname,
    payload,
  ],
  { stdio: 'inherit' },
);

const svg = readFileSync(OUTPUT, 'utf8');
const comment = `<!--
  Erzeugt von scripts/girocode.mjs am ${new Date().toISOString().slice(0, 10)}.
  Neu erzeugen: npm run girocode — dann mit einer echten Banking-App scannen
  (siehe README.md, Abschnitt "QR-Code neu erzeugen").

  Payload (EPC069-12 / GiroCode), damit dieser QR-Code auch ohne das
  qrcode-Paket rekonstruierbar bleibt:
${payload
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}
-->
`;
// Die XML-Deklaration muss laut Spezifikation die erste Zeile der Datei
// bleiben — ein vorangestellter Kommentar macht das SVG in <img src="...">
// unrenderbar (von Astro/dev-Server unbemerkt ausgeliefert, aber vom Browser
// verworfen). Deshalb den Kommentar hinter die Deklaration einfügen, nicht
// davor.
const declarationEnd = svg.indexOf('?>') + '?>'.length;
writeFileSync(OUTPUT, svg.slice(0, declarationEnd) + '\n' + comment + svg.slice(declarationEnd));

console.log(`Geschrieben: ${OUTPUT.pathname}`);
