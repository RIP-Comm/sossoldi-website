---
title: "Guida alla configurazione"
description: "Un ambiente di sviluppo funzionante partendo da una macchina pulita: Git, Flutter, un IDE e il repository."
lead: "Un ambiente di sviluppo funzionante partendo da una macchina pulita: Git, Flutter, un IDE e il repository."
order: 50
navId: "setup"
updated: "2026-11-03"
source_hash: "b08700f7c3221c38faff47860b304d0eec7f63add99f37a4e4f5ee3770a0ee8b"
---

## Passo 1: Installa Git

Scarica e installa Git da [https://git-scm.com/](https://git-scm.com/).

## Passo 2: Installa Flutter (con FVM)

Questo progetto usa [FVM](https://fvm.app/) per gestire le versioni di Flutter, così da garantire coerenza ed evitare problemi di compatibilità tra chi contribuisce.<br />
La procedura di installazione varia leggermente a seconda del sistema operativo (Windows, macOS o Linux). Puoi seguire la guida ufficiale [qui](https://fvm.app/documentation/getting-started/installation).<br />
Una volta installato FVM, entra nella directory principale del progetto ed esegui il comando seguente:

```sh
fvm install
```

Così verrà installata la versione corretta di Flutter prevista per il progetto.

## Passo 3: Configura un IDE

Scegli una di queste opzioni:

### Con Visual Studio Code:

1. Scarica e installa Visual Studio Code da [https://code.visualstudio.com/](https://code.visualstudio.com/).
2. Installa le estensioni Flutter e Dart.

### Con IntelliJ IDEA o Android Studio:

1. Scarica e installa IntelliJ IDEA o Android Studio.
2. Installa i plugin Flutter e Dart.

## Passo 4: Fai il fork del repository

È molto semplice: vai al repository di Sossoldi su GitHub e clicca su “Fork” nell'angolo in alto a destra. In questo modo crei una copia del repository sul tuo account e potrai fare modifiche senza toccare il repository principale.

## (Facoltativo) Scarica GitHub Desktop

Se non hai familiarità con Git, potresti voler usare GitHub Desktop.

1. Vai a questo link e scarica GitHub Desktop. Così sarà più semplice gestire e inviare le modifiche che farai. Dopo il download, configura il tuo account.
2. Ora torna al tuo repository su GitHub e clicca su Code -> Open with GitHub Desktop
3. Si aprirà GitHub Desktop e dovrebbe chiederti il percorso in cui salvare la cartella con il progetto. Poi clicca su clone.
