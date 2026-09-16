# Maintainers

Wer im Ausfall eines der beiden Repo-Zugriffsberechtigten übernehmen kann.
Mindestens zwei Namen pro Zeile. Diese Datei aktualisieren, sobald sich ein
Zugriffsrecht ändert — nicht erst beim nächsten Ausfall.

**Das Repo ist öffentlich.** Klarnamen in dieser Tabelle sind für jeden
einsehbar. Wer das nicht möchte, trägt hier die Funktion ein (z. B. „Pastor",
„Stationsältester Technik") und hält Namen sowie Kontaktwege intern fest.

Passwörter, Tokens und API-Schlüssel gehören in keine Zeile dieser Tabelle —
die gehören in den Passwortmanager der Gemeinde.

| Bereich | Hauptverantwortlich | Stellvertretung | Zugang läuft über |
|---|---|---|---|
| Domain `arche-gemeinde.de` | (gehört der Muttergemeinde Arche Hamburg, nicht uns) | | |
| DNS `arche-gemeinde.de` | Zone liegt im Microsoft-365-Tenant der Muttergemeinde (Nameserver `*.bdm.microsoftonline.com`), betreut über den Dienstleister Wielis. Wer den `bremen`-CNAME konkret ändern kann, hier eintragen, sobald geklärt. | | |
| Hosting (Cloudflare Pages) | | | |
| Sanity (Projekt + Studio-Deploy) | | | |
| Repo (GitHub) | | | |
| Postfach `info@bremen.arche-gemeinde.de` | (noch nicht eingerichtet — kein MX auf der Subdomain, siehe README.md „Deployment") | | |
| Futura-Webfont-Lizenz | Kevin Sames | | Freigabe zur Web-Nutzung am 16.09.2026 erteilt; Quelldateien liegen in einem privaten iCloud-Ordner, nicht im Repo. Bei Rückfragen des Lizenzgebers erster Ansprechpartner. Details in `DESIGN.md`, Abschnitt „Futura für Headlines, Source Serif Pro für Fließtext". |
