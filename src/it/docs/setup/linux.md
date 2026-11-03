---
title: "Configurazione su Linux"
navTitle: "Linux"
description: "Dipendenze e configurazione dell'Android SDK per una macchina di sviluppo Linux."
lead: "Dipendenze e configurazione dell'Android SDK per una macchina di sviluppo Linux."
order: 51
parent: "setup"
updated: "2026-11-03"
source_hash: "737d6a6a440d6b63567f239a36ed75dd0ed5bf10655a88f9447e040e58568c83"
---

Le istruzioni qui sotto spiegano come configurare l'ambiente di sviluppo per un'applicazione Flutter
su piattaforma **Linux**, in particolare **Pop!_OS**.

È importante sottolineare che per il software necessario esistono diverse opzioni
e si possono usare vari metodi di installazione.
Sei libero di scegliere un approccio alternativo che si adatti alle tue preferenze.


## Cosa useremo

- **Sistema operativo:**
    - Pop!_OS (derivato da Ubuntu)
- **SDK:**
    - Flutter SDK
    - Android SDK
    - Java JDK 17
- **IDE (Integrated Development Environment):**
    - IntelliJ IDEA Community Edition
- **Dispositivo Android** (consigliato, ma non obbligatorio)
  - testato con Android 13

Assicurati di avere molto spazio disponibile sul pc, almeno 8-10 GB,
per ospitare l'IDE e gli SDK.


## PASSO 1: Clona il progetto

Clona il progetto nella posizione che preferisci:

```
cd ~/projects
git clone https://github.com/RIP-Comm/sossoldi.git
```

## PASSO 2: Installa IntelliJ IDEA Community Edition tramite JetBrains Toolbox

1. **Scarica JetBrains Toolbox App**: puoi scaricare il Toolbox App in formato .tar.gz dalla [pagina ufficiale di JetBrains Toolbox App](https://www.jetbrains.com/toolbox-app/).

2. **Installa JetBrains Toolbox App**:
    - Apri il terminale.
    - Spostati nella directory in cui vuoi installare JetBrains Toolbox. Per esempio, puoi installarlo nella directory `/opt/`:
        ```bash
        cd /opt/
        ```
    - Estrai il file tar.gz scaricato (sostituisci `jetbrains-toolbox-1.xx.xxxx.tar.gz` con il nome del file che hai scaricato):
        ```bash
        sudo tar -xvzf ~/Downloads/jetbrains-toolbox-1.xx.xxxx.tar.gz
        ```
    - (Facoltativo) Rinomina la cartella estratta per accedervi più facilmente in futuro (sostituisci `jetbrains-toolbox-1.xx.xxxx` con il nome della cartella estratta):
        ```bash
        sudo mv jetbrains-toolbox-1.xx.xxxx jetbrains
        ```
    - Apri JetBrains Toolbox:
        ```bash
        /opt/jetbrains/jetbrains-toolbox
        ```
    - Se il file non si apre, potresti dover installare `libfuse2`:
        ```bash
        sudo apt install libfuse2
        ```

3. **Avvia JetBrains Toolbox App**: dopo aver installato il Toolbox App, avvialo. Vedrai la sua icona nell'area di notifica.

4. **Seleziona IntelliJ IDEA Community Edition**: clicca sull'icona del Toolbox App e seleziona IntelliJ IDEA Community Edition per l'installazione.


## PASSO 3: Installa Flutter SDK

Nella [guida ufficiale all'installazione su Linux](https://docs.flutter.dev/get-started/install/linux) segui questi passi:

1. Controlla i [requisiti di sistema](https://docs.flutter.dev/get-started/install/linux#system-requirements)
2. Esegui l'[installazione manuale](https://docs.flutter.dev/get-started/install/linux#method-2-manual-installation) e scarica il Flutter SDK (.tar.xz)
3. Estrai il file .tar.xz in una directory "development" a tua scelta:

   ```
   cd ~/development
   tar xf ~/Downloads/flutter_linux_3.16.2-stable.tar.xz
   ```

4. Aggiungi la directory del binario flutter alla variabile PATH:

   - Assicurati di essere nella directory `development`.
   - Esegui il comando seguente per aggiungere Flutter al file ~/.bashrc:

      ```
      echo "export PATH=\"\$PATH:`pwd`/flutter/bin\"" >> ~/.bashrc
      ```

      <details>
      <summary>Spiegazione del comando</summary>

      *   `echo`: è un comando che stampa le stringhe che riceve come argomenti.
      *   `"export PATH=\"\$PATH:pwd/flutter/bin\""`: è la stringa che `echo` stampa. È un comando per aggiungere la directory `flutter/bin` alla tua `PATH`.
          *   `export`: è un comando che rende la variabile che stai impostando disponibile ai processi figli della shell corrente.
          *   `PATH`: è una variabile d'ambiente che indica alla shell in quali directory cercare i file eseguibili.
          *   `\$PATH`: è la tua `PATH` attuale. Il `\` prima di `$PATH` è un carattere di escape: significa che la variabile `$PATH` verrà scritta così com'è nel file `~/.bashrc`, invece di essere sostituita con il suo valore nel comando `echo`.
          *   \`pwd\`/flutter/bin: è la directory che stai aggiungendo alla tua `PATH`. `pwd` è un comando che stampa il percorso della directory corrente, quindi qui si riferisce alla directory `flutter/bin` nella directory corrente.
      *   `>> ~/.bashrc`: reindirizza l'output del comando `echo` in fondo al file `~/.bashrc`. `~/.bashrc` è uno script che viene eseguito ogni volta che avvii una nuova shell. Aggiungendo il comando `export` a questo file, ti assicuri che la `PATH` aggiornata sia disponibile ogni volta che avvii una nuova shell.
      </details>

    - In alternativa, aggiungi manualmente la riga seguente al tuo ~/.bashrc

      (il comando precedente lo fa automaticamente):

      <pre><code>
      export PATH="$PATH:<i>/your/base/path</i>/development/flutter/bin"
      </code></pre>

      **Nota**: assicurati di sostituire `/your/base/path` con il percorso reale in cui hai estratto il Flutter SDK.

> ⚠️ **Ricordati di aggiornare il terminale.** Puoi farlo chiudendo e riaprendo il terminale oppure eseguendo il comando seguente:
> ```
> source ~/.bashrc
> ```


## PASSO 4: Controlla cosa ti serve

Ora esegui il comando seguente:

```bash
flutter doctor
```

e per avere maggiori dettagli:

```bash
flutter doctor -v
```

Dovresti vedere un output simile a questo:

```
[✗] Linux toolchain - develop for Linux desktop
    ✗ clang++ is required for Linux development.
      It is likely available from your distribution (e.g.: apt install clang), or can be downloaded from https://releases.llvm.org/
    ✗ CMake is required for Linux development.
      It is likely available from your distribution (e.g.: apt install cmake), or can be downloaded from https://cmake.org/download/
    ✗ ninja is required for Linux development.
      It is likely available from your distribution (e.g.: apt install ninja-build), or can be downloaded from https://github.com/ninja-build/ninja/releases
    ✗ GTK 3.0 development libraries are required for Linux development.
      They are likely available from your distribution (e.g.: apt install libgtk-3-dev)

[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.dev/docs/get-started/install/linux#android-setup for detailed instructions).
      If the Android SDK has been installed to a custom location, please use
      `flutter config --android-sdk` to update to that location.
```

Questo ti aiuterà a capire se devi installare:

**Per la build Linux:**
- Alcune dipendenze necessarie sono disponibili nel repository

**Per la build Android:**
- Android SDK
- SDK Tools
- Java JDK


## PASSO 5: Installa le dipendenze Linux

Installa le dipendenze seguenti usando il gestore di pacchetti:

```
sudo apt-get install clang cmake git ninja-build pkg-config libgtk-3-dev liblzma-dev libstdc++-12-dev
```

Queste dipendenze dovrebbero essere sufficienti per il tuo ambiente Linux.

## PASSO 6: Installa le dipendenze Android

### 6.1 Scarica Java JDK

1. Quando apri il progetto in IntelliJ IDEA, potrebbe suggerirti di impostare il JDK 17. Se non è già installato, ti suggerirà di scaricarlo e per impostazione predefinita verrà collocato nella directory `~/.jdks`.
2. Se è apparso qualche suggerimento, vai su `File | Project Structure` e seleziona `Project`.
3. Se il JDK necessario è già definito in IntelliJ IDEA, selezionalo dalla lista `Project SDK`.
4. Se il JDK è installato sul tuo computer ma non è definito nell'IDE, seleziona `Add SDK | JDK` e specifica il percorso della directory home del JDK.
5. Se non hai il JDK necessario sul tuo computer, seleziona `+ Add SDK | Download JDK...`.
6. Nella finestra successiva, specifica il fornitore e la versione del JDK, cambia il percorso di installazione se necessario e clicca su `Download`.
7. Segui le istruzioni per scaricare e installare il JDK 17.
8. Imposta la variabile `JAVA_HOME` nel file `~/.bashrc`:

```
export JAVA_HOME="$HOME/.jdks/corretto-17.x.x/"
export PATH="$PATH:$JAVA_HOME"
```

**Nota**: assicurati di sostituire `corretto-17.x.x` con la versione che hai effettivamente scaricato.

> ⚠️ **Ricordati di aggiornare il terminale.** Puoi farlo chiudendo e riaprendo il terminale oppure eseguendo il comando seguente:
> ```
> source ~/.bashrc
> ```


### 6.2 Installazione di Android SDK

1. Avvia **IntelliJ IDEA**.
2. Avvia la creazione di un nuovo progetto Android.
3. Nella procedura guidata di configurazione che appare, seleziona **Install Android SDK**.
4. Specifica il percorso personalizzato che preferisci per l'installazione.

Dopo l'installazione, puoi impostare l'Android SDK in Flutter eseguendo il comando seguente:

```bash
flutter config --android-sdk /path/of/installation/Android/Sdk
```

**Nota**: sostituisci `/path/of/installation/` con il percorso reale del tuo Android SDK (ad esempio con la directory `development` usata prima)


### 6.3 Installa cmdline-tools con IntelliJ

1. Apri **IntelliJ IDEA**.
2. Vai su **Languages & Frameworks**.
3. Seleziona **Android SDK**.
4. Vai su **SDK Tools**.
5. Metti la spunta su **Android SDK Command-line Tools (latest)**.

![Screenshot_Intellij_cmdline-tools.png](/assets/docs/Screenshot_Intellij_cmdline-tools.png)

## PASSO 7: Accetta la licenza

```
flutter doctor --android-licenses
```

## PASSO 8: Abilita il dispositivo Android

Se vuoi eseguire l'applicazione sul tuo dispositivo Android reale:

Sul tuo dispositivo:
1. Abilita le [opzioni sviluppatore](https://developer.android.com/studio/debug/dev-options#enable)
2. Abilita il [debug USB](https://developer.android.com/studio/debug/dev-options#Enable-debugging)
3. Collega il dispositivo al pc e seleziona `File Transfer/Android Auto`


## PASSO 9: Verifica finale

A questo punto il tuo ambiente dovrebbe essere configurato.

Sul tuo pc:
1. Esegui il comando seguente:
   ```
   flutter doctor -v
   ```

    Questo è un esempio di output corretto:

    ```
    [✓] Flutter (Channel stable, 3.16.2, on Pop!_OS 22.04 LTS 6.5.6-76060506-generic, locale en_US.UTF-8)
        • Flutter version 3.16.2 on channel stable at /media/giovanni/DATI/development/flutter
        • Upstream repository https://github.com/flutter/flutter.git
        • Framework revision 9e1c857886 (9 days ago), 2023-11-30 11:51:18 -0600
        • Engine revision cf7a9d0800
        • Dart version 3.2.2
        • DevTools version 2.28.3

    [✓] Android toolchain - develop for Android devices (Android SDK version 34.0.0)
        • Android SDK at /media/giovanni/DATI/development/Android/Sdk/
        • Platform android-34, build-tools 34.0.0
        • Java binary at: /home/giovanni/.jdks/corretto-17.0.9/bin/java
        • Java version OpenJDK Runtime Environment Corretto-17.0.9.8.1 (build 17.0.9+8-LTS)
        • All Android licenses accepted.

    [✗] Chrome - develop for the web (Cannot find Chrome executable at google-chrome)
        ! Cannot find Chrome. Try setting CHROME_EXECUTABLE to a Chrome executable.

    [✓] Linux toolchain - develop for Linux desktop
        • Ubuntu clang version 14.0.0-1ubuntu1.1
        • cmake version 3.22.1
        • ninja version 1.10.1
        • pkg-config version 0.29.2

    [!] Android Studio (not installed)
        • Android Studio not found; download from https://developer.android.com/studio/index.html
          (or visit https://flutter.dev/docs/get-started/install/linux#android-setup for detailed instructions).

    [✓] IntelliJ IDEA Community Edition (version 2023.2)
        • IntelliJ at /home/giovanni/.local/share/JetBrains/Toolbox/apps/intellij-idea-community-edition
        • Flutter plugin version 76.3.4
        • Dart plugin can be installed from:
          🔨 https://plugins.jetbrains.com/plugin/6351-dart

    [✓] Connected device (2 available)
        • CPH2211 (mobile) • IB69KFDMEEPRFAXG • android-arm64 • Android 13 (API 33)
        • Linux (desktop)  • linux            • linux-x64     • Pop!_OS 22.04 LTS 6.5.6-76060506-generic

    [✓] Network resources
        • All expected network resources are available.
    ```

2. Controlla che le sezioni `Android toolchain` e `Linux toolchain` siano a posto.
3. Le sezioni `Android Studio` e `Chrome` non sono obbligatorie per compilare ed eseguire il progetto.


## PASSO 10: Compila ed esegui il progetto

1. Vai nella directory del progetto `sossoldi`.
2. Collega il dispositivo al pc e seleziona `File Transfer/Android Auto`
3. Esegui il comando `flutter run`
