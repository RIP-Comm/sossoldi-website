---
title: "Stile del codice"
description: "Convenzioni per il codice Dart, i file e i commit, così la review riguarda la modifica e non la formattazione."
lead: "Convenzioni per il codice Dart, i file e i commit, così la review riguarda la modifica e non la formattazione."
order: 41
parent: "contributing"
updated: "2026-11-03"
source_hash: "e5f6d34a9021968eca2ef2811f0836972246c0d97e7f4ec1562c5e18c8768562"
---

Se vuoi dare una mano al progetto, tieni presenti le linee guida seguenti.

## Formattazione

- Segui la Dart Style Guide ufficiale per la formattazione del codice.
- Usa un'indentazione coerente.
- Limita la lunghezza delle righe a 80 caratteri.

## Import

Importa i pacchetti usando questo formato:
```bash
import 'package:flutter_riverpod/flutter_riverpod.dart';
```
Usa gli import relativi per i file locali:
```bash
import '../../../providers/accounts_provider.dart';
```

## Suddividi le pagine in widget separati

Per migliorare la leggibilità del nostro codice dovremmo suddividere ogni pagina in widget separati salvati in file separati, ognuno dei quali rappresenta una sezione della pagina.
Ogni pagina dovrebbe essere racchiusa in una cartella con lo stesso nome che contiene una sottocartella widgets con i widget personalizzati estratti da quella pagina.
```bash
Example:
├── transactions_page.dart
└── widgets
    ├── accounts_tab.dart
    ├── categories_tab.dart
    ├── custom_sliver_delegate.dart
    ├── list_tab.dart
    └── month_selector.dart
```
La sottocartella widgets dovrebbe contenere i widget specifici di una determinata pagina, mentre quelli condivisi tra più pagine vanno in /lib/custom_widgets.

## Usa la virgola finale

Il codice Flutter implica spesso la costruzione di strutture dati ad albero piuttosto profonde, per esempio in un metodo build. Per ottenere una buona formattazione automatica ti consigliamo di adottare le virgole finali opzionali. La regola per aggiungere una virgola finale è semplice: aggiungi sempre una virgola finale alla fine di una lista di parametri in funzioni, metodi e costruttori in cui ti interessa mantenere la formattazione che hai creato. Questo aiuta il formatter automatico a inserire un numero adeguato di interruzioni di riga per il codice in stile Flutter.
Vedi qui.

## Evita copia/incolla:

Non copiare e incollare blocchi di codice senza averli capiti davvero. Invece di duplicare il codice, valuta di creare una funzione o un metodo condiviso e, se lo fai, aggiungi una riga nell'[Elenco dei widget riutilizzabili](/it/docs/contributing/widget-list/).

## Struttura dei file:

Organizza i file in una struttura di cartelle chiara e coerente. Raggruppa i file correlati, ad esempio mettendo tutti i provider in una cartella 'providers'.

## Convenzioni di denominazione:

Segui il camelCase per i nomi di variabili e funzioni. Usa nomi chiari e descrittivi per variabili, funzioni e classi.

Seguendo queste convenzioni di stile aiuterai a garantire coerenza, leggibilità e manutenibilità del codice nel progetto.
