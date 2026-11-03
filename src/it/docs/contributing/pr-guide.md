---
title: "Guida alle pull request"
navTitle: "Pull request"
description: "Dal fork al pull request unito, passando per i controlli che esegue la CI."
lead: "Dal fork al pull request unito, passando per i controlli che esegue la CI."
order: 42
parent: "contributing"
updated: "2026-11-03"
source_hash: "cf16f61e143fe50423a5dba95764b2504b388c9e0a310a9ac47692920b879a56"
---

Vuoi partecipare al nostro progetto ma non sai come fare? Nessun problema, questa guida è qui per te.
Nei passaggi che seguono diamo per scontato che tu abbia già completato la configurazione dell'ambiente. Se non l'hai ancora fatto, segui prima *i primi 3 passaggi* di [questa guida](/it/docs/setup/).

## Passaggio 1: Scarica GitHub Desktop

Qui non c'è niente di complicato: vai a questo [link](https://desktop.github.com/) e scarica GitHub Desktop. Con questo strumento sarà più facile gestire e inviare le modifiche che farai.
Dopo il download, configura il tuo account.

## Passaggio 2: Clona il repository

Ora torna sul tuo repository su GitHub e clicca su Code -> Open with GitHub Desktop

<div>
    <img src="/assets/docs/doc-guide/Clone-repo.png" width="1000" alt="Icona di Sossoldi">
</div>

Si aprirà GitHub Desktop, che dovrebbe chiederti di indicare il percorso in cui salvare la cartella con il progetto. Poi clicca su Clone.

## Passaggio 3: Fai le modifiche

Ora puoi aprire il progetto nel tuo IDE preferito e fare le modifiche che vuoi.

## Passaggio 4: Fai il commit delle modifiche

Quando hai finito, torna su GitHub Desktop: a sinistra dovresti vedere le modifiche che hai fatto. Seleziona i file necessari per la funzionalità che hai implementato. Sotto li trovi il campo del commit: scrivi una descrizione delle modifiche e clicca su Commit.
**NOTA:** il più delle volte qui vedrai molte modifiche, ma devi selezionare SOLO i file che hai cambiato e che servono per la funzionalità che hai implementato. Togli anche tutti quelli modificati o creati dal tuo IDE.

<div>
    <img src="/assets/docs/doc-guide/GitHub-Desktop.png" width="1000" alt="Icona di Sossoldi">
</div>

## Passaggio 5: Fai il push delle modifiche

In alto a destra ora dovresti vedere l'opzione per fare il push delle modifiche: dopo saranno visibili nel tuo repository personale.

## Passaggio 6: Crea la pull request

Complimenti, questo è l'ultimo passaggio! Ora torna al [repository principale](https://github.com/RIP-Comm/sossoldi/pulls) e crea una nuova pull request cliccando in alto a destra.

<div>
    <img src="/assets/docs/doc-guide/PR-screen.png" width="1000" alt="Icona di Sossoldi">
</div>

Clicca su “compare across forks” e poi seleziona il tuo repository.
Dopo clicca su “Create pull request” e scrivi un titolo e una descrizione.
Congratulazioni, ora sei pronto a inviarla!

Grazie per il tempo che dedichi al nostro progetto!

*Se vuoi saperne un po' di più sulle differenze tra Git, GitHub e GitHub Desktop, puoi guardare questo [video](https://www.youtube.com/watch?v=8Dd7KRpKeaE&ab_channel=CoderCoder)*
