---
title: "Roadmap"
description: "Dove sta andando il progetto, fase per fase — e cosa è già disponibile."
lead: "Dove sta andando il progetto, fase per fase — e cosa è già disponibile."
order: 30
updated: "2026-11-03"
source_hash: "326ddb4f9d9a9504e97f5d39ae9b0826963c253dcb1c4eae1147da7301ab83b0"
---

Sossoldi è un progetto open source con un'ambizione precisa: **dare alle persone gli strumenti per fare scelte finanziarie consapevoli**. A differenza degli strumenti tradizionali, il progetto non ha ancora date: è nella fase iniziale di sviluppo, come ci si aspetta da un'iniziativa open source in movimento. È pensato come applicazione mobile-first, così puoi tenere sotto controllo il tuo patrimonio netto ovunque, senza bisogno di un PC.
Seguendo questa roadmap, Sossoldi passerà da un semplice tracker di entrate e uscite a uno strumento completo di gestione finanziaria, con una visione d'insieme di tutte le tue finanze.

## Fase 1: Tracciamento di entrate e uscite + budget (Beta)

**Obiettivo:** Costruire una base solida per tracciare entrate e uscite e creare budget di base.

### 1. Design dell'interfaccia (UI) e wireframe

- Disegnare un'interfaccia pulita e facile da usare, che renda la navigazione immediata.
- Creare i wireframe delle schermate essenziali: dashboard, tracciamento di entrate e uscite, budget e aggiunta di una transazione
- Usare grafici e dati per rendere immediato capire come vanno le tue finanze

### 2. Implementare il tracciamento delle spese con categorie personalizzabili.

- Permettere di inserire spese una tantum e spese ricorrenti.
- Dare la possibilità di creare categorie e sottocategorie personalizzate 

### 3. Budget

- Introdurre funzioni di budget di base per aiutarti a fissare limiti di spesa.
- Mostrare notifiche e avvisi quando ti avvicini o superi i limiti di budget.

### 4. Feedback degli utenti e iterazione

- Lanciare una versione beta per un test con un gruppo ristretto di utenti.
- Raccogliere il feedback e fare le migliorie necessarie.

## Fase 2: Gestione dei dati e usabilità

**Obiettivo:** Migliorare import ed export, rendendo la gestione dei dati più semplice.

### 1. Migliorare import ed export (template CSV più leggibile)

Oggi l'app esporta tutti i dati in un formato grezzo, difficile da leggere o modificare. Questo aggiornamento introduce un **template più pulito e strutturato**, con:
- Intestazioni di colonna chiare.
- Una formattazione migliore per date, importi e categorie.
- Un'organizzazione più intuitiva, che rende più facile analizzare o modificare i dati prima di importarli.

### 2. Aggiungere l'import parziale (importare transazioni senza sovrascrivere)

Al momento, importare un nuovo set di dati sostituisce del tutto il precedente: un problema concreto per chi teme di **perdere i dati**. Questa funzione ti permetterà di:
- Importare **nuove transazioni senza cancellare quelle esistenti**.
- Scegliere tra sostituzione completa e **aggiunta di nuovi dati**.

### 3. Supportare l'import da altre app (dati strutturati da banche e altre applicazioni)

Molti utenti seguono già le proprie finanze con **app bancarie o altri strumenti di budgeting**. Questa funzione:
- Supporta import strutturati da **estratti conto bancari e app finanziarie**.
- Riconosce i campi chiave (data, importo, categoria) per **mappare i dati automaticamente**.
- Permette **correzioni manuali** prima di concludere l'import.


### 4. Modalità nascosta (protezione dei dati sensibili)

La modalità nascosta serve a **proteggere i dati finanziari da sguardi indiscreti** quando usi l'app in pubblico. Con un semplice **gesto o un interruttore** puoi:
- **Sfocare o nascondere saldi e transazioni** lasciando l'app pienamente funzionante.
- **Mostrare e nascondere tutto in un attimo**, con un tocco

### 5. Backup dei dati nel cloud (funzione opt-in)

Per **evitare di perdere dati** e poter accedere da più dispositivi, questa funzione:
- Ti permette di **attivare** i backup automatici (opt-in).
- Consente di ripristinare un backup precedente in caso di errori o cancellazioni accidentali.


### 6. Aggiungere categorie predefinite (categorie già pronte + onboarding migliore)

Oggi le categorie vanno create a mano. Questa funzione:
- Propone **un set di categorie comuni** (es. stipendio, affitto, spesa).
- Si integra con l'onboarding, così puoi **personalizzare le categorie di partenza**.
- Suggerisce categorie in base alle tue abitudini di spesa.


### 7. Sottocategorie (categorie annidate per un tracciamento migliore)
Serve un tracciamento delle spese più dettagliato. Questa funzione:
- Permette di **annidare sottocategorie nelle categorie** (es. "Alimentari" → "Spesa" / "Ristoranti").
- Migliora i report finanziari, **dettagliando le spese con più precisione**.
- Supporta sottocategorie personalizzate, in base alle tue preferenze.

## Fase 2: Multivaluta e tracciamento degli investimenti

**Obiettivo:** Allargare il perimetro del tracciamento finanziario oltre il budget di base.

### 1. Tracciamento multivaluta (più valute su conti e transazioni)
Oggi l'app assume una **valuta unica**, il che limita chi vive e opera in più paesi. Questo aggiornamento:
- Permette **più valute per conto**.
- Recupera automaticamente i **tassi di cambio** per le conversioni.
- Mostra il **patrimonio netto totale in una valuta di riferimento**, continuando a tracciare le transazioni in valuta estera.


### 2. Tracciamento degli investimenti (azioni, ETF, obbligazioni e crypto come primo passo)
Vuoi seguire i tuoi **investimenti insieme alle finanze di tutti i giorni**. Questa funzione:
- Supporta **azioni, ETF, obbligazioni e criptovalute**.
- Ti permette di **inserire le posizioni manualmente**.
- Mostra **utili e perdite, allocazione del portafoglio e andamento nel tempo**.

## Fase 3: Budget avanzati e insight finanziari

**Obiettivo:** Ampliare gli strumenti di tracciamento finanziario.

### 1. Budget annuali (su tutto l'anno, non solo mese per mese)
Oggi i budget ripartono **ogni mese**, il che rende difficile programmare a lungo termine. Questo aggiornamento:
- Ti permette di impostare **budget annuali** accanto a quelli mensili.
- Confronta gli anni passati per **analizzare le tendenze di spesa**.

### 2. Patrimonio netto complessivo (nuova pagina dei grafici per una visione più chiara)
Oggi la **vista del patrimonio netto è essenziale**. Il restyling:
- Mette al centro la **crescita del patrimonio nel tempo**, includendo attività, passività e investimenti.
- Offre un **grafico più chiaro con la ripartizione per categoria** (liquidità, investimenti).
- Ti permette di **filtrare i periodi** (es. ultimi 6 mesi, 5 anni).


### 3. Previsioni (pianificazione finanziaria e proiezioni di base)
Vuoi strumenti per **prevedere la salute finanziaria futura**. Si parte da:
- Una **previsione semplice basata sulle tendenze di spesa passate**.
- La possibilità di aggiungere **spese ed entrate pianificate per proiettare i flussi di cassa futuri**.
- Una possibile estensione verso **simulazioni avanzate (es. analisi Monte Carlo)**.

## Fase 4: Automazione e funzioni intelligenti

**Obiettivo:** Rendere il tracciamento finanziario fluido e più intelligente.

### 1. OpenBanking API o alternative (tracciamento automatico delle transazioni bancarie)
Per **ridurre l'inserimento manuale**, questa funzione:
- Si integra con le **API delle banche** (dove disponibili) per recuperare le transazioni in automatico.


### 2. Integrazione con Google Sheets (esportare i dati per analisi più approfondite)
Se preferisci fare **analisi personalizzate**, questa funzione:
- Sincronizza **automaticamente i dati finanziari su Google Sheets**.
- Ti lascia costruire **dashboard personalizzate con aggiornamenti in tempo reale**.
- Supporta **export programmati** per un monitoraggio più costante.


### 3. Strumenti di educazione finanziaria (tooltip, guide e risorse consigliate)
A molti mancano le **basi di finanza personale**. Questa funzione:
- Spiega **dentro l'app i termini finanziari chiave**.
- Propone **link a risorse educative** (blog, libri, video).
- Suggerisce **buone pratiche di finanza personale** in base alle tue abitudini di spesa.

## Fase 5: Collaborazione e condivisione

**Obiettivo:** Permettere la gestione condivisa delle finanze e l'uso da parte di più persone.

### 1. Conto condiviso (più persone sulle stesse finanze)
Pensata per **famiglie, coppie o spese in comune**, questa funzione:
- Ti permette di **invitare altre persone** ad accedere agli stessi dati finanziari.
- Imposta **permessi su misura** (es. sola lettura, accesso completo).
- Supporta **budget condivisi e transazioni divise**.
