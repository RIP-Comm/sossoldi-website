---
title: "Contribuire"
description: "Come segnalare un bug, proporre una funzionalità o aprire una pull request per Sossoldi."
lead: "Sossoldi è costruita da volontari. Codice, design, traduzioni, documentazione e segnalazioni di bug fanno tutti avanzare il progetto."
order: 40
navId: "contributing"
updated: "2026-11-03"
source_hash: "e3be9753fe86e368e1113cf0cb5dd22c66fc0d825a0c37cc9773efec8171933e"
---

## Prima di iniziare

- **Bug e idee** vanno su [GitHub Issues](https://github.com/RIP-Comm/sossoldi/issues). Cerca prima: un duplicato viene chiuso, non risolto.
- **Domande e proposte aperte** vanno su [GitHub Discussions](https://github.com/RIP-Comm/sossoldi/discussions), dove si discute la roadmap.
- **La chat** è su [Discord](https://discord.sossoldi.com). È il posto più rapido per chiedere se una modifica interessa prima di scriverla.

## Le tre guide

- [Stile del codice](/it/docs/contributing/coding-style/) — convenzioni Dart, struttura dei file e messaggi di commit.
- [Guida alle pull request](/it/docs/contributing/pr-guide/) — fork, branch, controlli e review, passo per passo.
- [Lista dei widget](/it/docs/contributing/widget-list/) — i widget condivisi da cui è costruita l'app.

## Com'è fatta una buona pull request

1. **Una modifica, un branch.** Crealo da `upstream/main`, non da un vecchio branch locale.
2. **Esegui i controlli in locale**: `dart run build_runner build --delete-conflicting-outputs`, `dart format`, `flutter analyze`, `flutter test --concurrency=1`. La CI esegue gli stessi comandi.
3. **Di' cosa hai testato.** Uno screenshot o una clip breve dell'app valgono più di un paragrafo.
4. **Tieni onesta la descrizione.** Se qualcosa non è coperto, scrivilo, invece di lasciarlo trovare a chi fa la review.

## Contributi non di codice

- **Design**: l'app è disegnata in Figma con la community; chiedi su Discord prima di iniziare una schermata nuova.
- **Traduzioni**: l'app è in fase di localizzazione; italiano e portoghese sono le prime lingue. Il repository documenta il flusso di lavoro sui file `.arb`.
- **Documentazione**: queste pagine vivono in `sossoldi-website`. Una correzione fattuale è una pull request come le altre.
- **Test su dispositivi**: le segnalazioni su un dispositivo che non abbiamo sono davvero utili, a patto che includano versione, sistema operativo e passi per riprodurre.

## Licenza

Sossoldi è rilasciata con [licenza MIT](https://github.com/RIP-Comm/sossoldi/blob/main/LICENSE). Aprendo una pull request accetti che il tuo contributo sia distribuito con gli stessi termini.
