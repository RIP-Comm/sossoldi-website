---
title: "Guida alla documentazione"
navTitle: "Scrivere la documentazione"
description: "Come viene scritta e revisionata la documentazione e come si tiene allineata all'app."
lead: "Come viene scritta e revisionata la documentazione e come si tiene allineata all'app."
order: 60
updated: "2026-11-03"
source_hash: "06bbd2ef97958881075898ae12375fa58d175de5f7a287c2c86b5423f081c483"
---

Per la nostra documentazione usiamo GitHub Pages, che ci permette di avere una pagina statica con tutte le informazioni sul repo. Per noi è molto utile, perché rende i docs facili da leggere e da mantenere usando solo file .md che vengono poi convertiti in HTML.
Se vuoi puoi leggere di più su GitHub Pages nella [documentazione ufficiale](https://pages.github.com/), e puoi anche leggere di più sui file markdown [qui](https://www.markdownguide.org/getting-started/).
Nei passaggi che seguono diamo per scontato che tu abbia già completato la configurazione. Se non l'hai ancora fatto, segui prima [questa guida](/it/docs/setup/).

## Passaggio 1: Attiva GitHub Pages nel tuo fork

GitHub offre già una buona guida su come farlo, ma in sostanza quello che devi fare è:

1. Entra nel tuo repository e seleziona Settings

<div>
    <img src="/assets/docs/doc-guide/Repo-screen.png" width="1000" alt="Sossoldi icon">
</div>

2. Clicca **Pages** nella sezione *Code and automation*.
3. Poi seleziona **Deploy from branch** in *Source* e assicurati di scegliere il branch main e la cartella */docs*

<div>
    <img src="/assets/docs/doc-guide/Settings-screen.png" width="1000" alt="Sossoldi icon">
</div>

4. Ora puoi cliccare **Save** e nel giro di pochi secondi la tua pagina dovrebbe essere online su **{your-username}.github.io/sossoldi/**

## Passaggio 2: Fai le modifiche nel tuo repository

Ora che hai attivato la pagina GitHub puoi iniziare a fare modifiche, ed è piuttosto semplice. Puoi semplicemente modificare i file markdown dentro la cartella *docs* o crearne di nuovi se serve.
Se stai creando una nuova pagina, assicurati che sia collegata a un'altra, così che chi legge possa raggiungerla. Collegare i file markdown è piuttosto semplice e puoi trovare molti esempi nel nostro repo (puoi anche leggere di più [qui](https://www.codecademy.com/resources/docs/markdown/links)).

Quando hai finito di fare tutte le modifiche puoi creare un commit nel tuo fork e nel giro di pochi secondi la pagina dovrebbe aggiornarsi con tutte le modifiche. A questo punto dovresti verificare che sia tutto a posto e che non ci siano problemi a raggiungere la pagina.

## Passaggio 3: Crea una pull request

Se è andato tutto secondo i piani, ora dovresti essere in grado di creare una pull request che spiega le modifiche che hai fatto. Per facilitare il processo di revisione, assicurati di spiegare cosa hai fatto e di aggiungere screenshot utili (se preferisci puoi semplicemente condividere il link *{your-username}.github.io/sossoldi/*).
Dopo il processo di revisione la tua pull request verrà unita e le tue modifiche saranno online!

*Non sai come aprire una pull request? Non preoccuparti, puoi leggere la [guida](/it/docs/contributing/pr-guide/)*
