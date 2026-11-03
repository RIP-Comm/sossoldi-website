---
title: "Lanciare un'app open source — il mio viaggio di 2 anni"
description: "Cosa ho imparato costruendo Sossoldi, da una call su Discord all'App Store: ruoli che non funzionano, tutorial hell e perché i primi utenti di un progetto open source sono gli altri sviluppatori."
date: 2025-02-14T20:53:18Z
author: "Marco Perugini"
cover: "/assets/img/blog/launching-sossoldi.webp"
coverWidth: 1600
coverHeight: 963
translationKey: "launching-sossoldi"
category: "Open source"
source_hash: "84ed34e4bc3ca221a1efa599fbc6dc88b2b19904e589acb13cbb628255046b5f"
---

Negli ultimi 3/4 anni ho seguito **[Mr.RIP](http://mr.rip)**, un blogger diventato streamer che parla di **carriera** (soprattutto per chi ha un background in informatica) e di **finanza personale**. Grazie a lui, poco più di due anni fa, sono entrato nel suo [Discord](http://mr.rip/discord) per una call con altre persone che non avevo mai conosciuto, per parlare di creare un'app per tenere traccia del nostro patrimonio netto.

L'idea era partire semplici: prima lasciare che l'utente tenesse traccia solo di entrate e uscite, e poi ampliare l'app per aiutarlo a monitorare altri asset come azioni, obbligazioni, materie prime e così via. Altro punto cardine: l'app doveva essere [**open source** e gratuita](http://sossoldi.com) (almeno finché non saltano fuori dei costi). Sembra semplice, no? Sbagliato.

In questo post parlerò di tutte le cose **belle e un po' meno belle** che ho imparato in questo percorso. Se non vuoi perdere tempo a leggerlo e ti stai solo chiedendo se ne è valsa la pena, te lo dico subito: **100% SÌ**.

## L'inizio

Devo dire che la call a cui ho partecipato non era la prima del progetto. C'erano già alcune persone coinvolte che stavano decidendo **linguaggio** e **framework** da usare, e alcune schermate esistevano già.

Alla fine hanno scelto **Flutter** come framework, perché volevano la possibilità di sviluppare facilmente su più piattaforme, supportando magari desktop e mobile con un solo repository.

Non ricordo i dettagli esatti di quella call, ma due cose mi sono rimaste impresse:

1. **Tutti** erano davvero entusiasti del progetto e volevano aiutare il più possibile.
2. **Non c'era nessuna struttura**, e quello che era stato fatto fino a quel momento era opera di singoli contributor che cercavano sostanzialmente di implementare ogni funzionalità nel modo che sentivano più naturale.

Anche io avevo molta voglia di aiutare, ma c'era un problema non da poco: non avevo mai scritto una singola riga di Dart (il linguaggio usato da Flutter) in vita mia.

Durante la call ho scoperto che c'era qualcuno che aveva già iniziato a lavorare al design dell'UX e della UI dell'app. Quel qualcuno era [Federico](http://federicopozzato.it). Aveva fatto un lavoro fantastico guardando cosa c'era sul mercato, e proprio in quel periodo stava iniziando a creare un [Figma](https://www.figma.com/file/6NyY9yqunpbU7HIkbNEAL3/Sossoldi-App?node-id=0%3A1) con le schermate. È stato in quel momento che mi è venuto in mente che il mio ruolo poteva essere **aiutare a costruire un po' di struttura** nel progetto, scrivendo un Product Brief che spiegasse cosa doveva fare ogni schermata. Così gli sviluppatori avrebbero saputo un po' meglio cosa stavano implementando, e avremmo potuto discutere con Federico se qualcosa non era chiaro o era troppo difficile da realizzare in quel momento. È così che, senza saperne quasi nulla di sviluppo di app mobile, sono diventato il **Project Manager di Sossoldi**.

## I tuoi primi clienti sono gli sviluppatori

![Una sezione del Product Brief](/assets/img/blog/journey-132152.jpg)

Una sezione del Product Brief

Ci è voluto un po' di lavoro, ma dopo qualche giorno [**la prima versione del documento**](https://docs.google.com/document/d/1dVLjDCQJEZb8yul7fIoL48q4DEtYOyED4_M0-A8pyBQ/edit?tab=t.0#heading=h.iq5rgyi97k3x) era pronta: circa 15 pagine di screenshot e punti elenco. All'inizio avevo aggiunto anche una tabella con i diversi ruoli (project manager, maintainer, contributor frontend e backend) in cui ognuno poteva scrivere il proprio nome. L'idea era **iniziare a definire un po' di ruoli** e chiarire chi potesse seguire ciascuna sezione dell'app.

Purtroppo questo approccio **non ha funzionato**. Ha sicuramente aiutato un po' a contare quante persone fossero più o meno coinvolte, ma quello che allora non avevo capito è che non funziona come in azienda: **non puoi aspettarti che le persone facciano qualcosa solo perché hanno detto che potrebbe interessargli**. Quello che serve è "vendere" l'idea del progetto e farle sentire davvero parte di qualcosa di importante. Questa è probabilmente la lezione più importante che ho imparato contribuendo a questo progetto: nell'open source, se non sei tu a fare il 90% o più del lavoro, allora **i tuoi primi clienti sono gli altri sviluppatori**.

Ci ho messo un po' a capirlo, ed è probabilmente il motivo per cui ci è voluto così tanto per arrivare a una beta. Per lunghi periodi ci aspettavamo che le persone arrivassero e costruissero cose solo perché un issue su GitHub lo diceva, ma è molto più complicato. Devi **interagire** il più possibile, **comunicare** cosa stai facendo, cercare di **capire** se ci sono punti critici da risolvere e, soprattutto, mostrare che c'è dell'altro e che hai un **piano** per il futuro.

## Scrivere un po' di codice

![La mia prima PR nel progetto](/assets/img/blog/journey-132351.jpg)

La mia prima PR nel progetto

Dopo un po' di tempo passato a scrivere documentazione e a parlare di cosa dovesse fare e come dovesse apparire l'app, ho sentito che non poteva bastare. Come posso essere la persona che prova a supervisionare il progetto **senza contribuire davvero**? Sono un software engineer, devo essere in grado di dare una mano in qualcosa anche se nello sviluppo mobile non ho ancora fatto molto.

Ed è qui che ho fatto lo stesso errore che faccio sempre quando voglio provare qualcosa di nuovo: sono finito nel **[tutorial hell](https://www.youtube.com/watch?v=343EWZS9O88)**. Ho iniziato a guardare e cercare il corso perfetto su Flutter, gratuiti e a pagamento. Nella mia testa era giustificato dal fatto che volevo anche raccogliere materiale per altre persone che magari volevano far parte del progetto ma avevano bisogno di un punto di partenza.

Dopo parecchi giorni e molte ore su YouTube ho capito che **non avevo imparato** quasi niente, e che se volevo davvero imparare a usare Flutter dovevo **scegliere un issue e provare ad affrontarlo**.

Dopo aver guardato tutti quelli aperti ne ho visto uno che sembrava interessante: si trattava di creare un widget per mostrare grafici a linee nell'app. Mi sembrava non troppo difficile — bastava trovare una buona libreria e farla funzionare per il nostro caso d'uso.

Ci ho sbattuto la testa per un intero weekend, ma alla fine, con molto Google e un po' di aiuto da ChatGPT (cerco di non abusarne, ma può essere uno strumento piuttosto valido) sono riuscito a tirare fuori una soluzione abbastanza buona. Così ho aperto la PR e ho aspettato.

Il processo di review è andato **liscio** e la PR è stata **mergiata** con modifiche minime. È stato uno dei **momenti migliori** da quando sono entrato nel progetto: vedere il proprio lavoro **riconosciuto** e mergiato è una bella sensazione. Dopo ho contribuito anche ad altre sezioni dell'app, per lo più piccole modifiche, ma in futuro voglio provare a misurarmi con **parti più grandi** e vedere se sono davvero capace.

## Achille e la tartaruga

Dopo qualche mese il progetto andava alla grande: molte persone passavano e andavano via, ma c'era quasi sempre un po' di attività.

L'app era venuta bene e aggiungevamo tutto un pezzetto alla volta, al punto che sentivo che una beta fosse dietro l'angolo. Continuavo a dire alle persone che mancavano solo pochi mesi, ma dopo un po' ho capito che **per ogni passo avanti ne facevamo due indietro rispetto al traguardo**.

Abbiamo anche fatto una call con Mr. RIP in cui abbiamo detto che avevamo praticamente finito e che potevamo **iniziare a organizzare una live con lui** per presentare il progetto. Quella call è stata **9 mesi fa**.

Non è stata colpa di nessuno in particolare, ma dovevamo trovare un modo per uscirne. È lì che, dopo qualche call, abbiamo davvero definito quale potesse essere il *Minimum Viable Product* e deciso di ignorare praticamente tutto il resto. *Il tema scuro si resetta ogni volta che riavvii l'app? Chi se ne importa.* Dovevamo concentrarci sulle **basi** e renderle abbastanza buone.

È qui che le cose sono davvero girate, e ci stavamo **davvero** avvicinando.

## Arrivarci, finalmente

![L'annuncio del rilascio](/assets/img/blog/journey-132459.jpg)

Il 4 dicembre 2024 abbiamo finalmente fatto un rilascio silenzioso su GitHub. Lo abbiamo condiviso con le persone del progetto per vedere se andava bene. Abbiamo iniziato a trovare qualche bug qua e là, ma per fortuna **niente di grave** che potesse bloccare il rilascio — in fondo sarebbe stata una beta, e nessuno dovrebbe stupirsi di trovare bug.

È qui che abbiamo avviato la procedura per pubblicare l'app sia sull'App Store sia su Google Play. Per fortuna uno dei maintainer, [Luca](https://github.com/lucaantonelli), aveva già un account sviluppatore su entrambi e si è offerto di usarli, evitando la seccatura di crearne uno nuovo apposta.

Alla fine, dopo il processo di review del 14 febbraio e più di 2 anni da quando sono entrato nel progetto, Sossoldi era disponibile sia per [**Android**](https://play.google.com/store/apps/details?id=com.ripster.sossoldi) sia per [**iOS**](https://apps.apple.com/app/id6740497000).

## Considerazioni finali e cosa ci aspetta

Questo è stato un **percorso incredibile**, e la cosa che mi entusiasma di più è che questo è solo l'**inizio**. Ho avuto il piacere di conoscere un sacco di persone belle e davvero talentuose.

Ho dovuto imparare molto, e non solo su Flutter o lo sviluppo mobile, ma anche a **comunicare** in modo efficace, a **pianificare** e, in generale, ad **accompagnare** le persone a dare il meglio.

Nelle prossime settimane ci saranno alcuni cambiamenti. Prima di tutto ci concentreremo sul rilascio della **prima versione stabile** dell'app, in cui sistemeremo la maggior parte dei bug trovati ma aggiungeremo anche la possibilità di **fare un backup dei tuoi dati** in un file CSV. Se il progetto ti interessa, ti invito a **[entrarci](https://github.com/RIP-Comm/sossoldi)**, a **provare l'app** e a dirci cosa ne pensi.

Se sei arrivato a leggere tutto questo post, ti ringrazio davvero. Ci vediamo al **prossimo**.
