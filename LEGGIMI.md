# E-Reader-Portal
## INTRO
Una piattaforma web per la lettura di eBook con autenticazione, monitoraggio dei progressi di lettura e funzionalità di recensione. Include persistenza dei dati a mezzo di database.

## Come iniziare (Configurazione del database)
### Installare PostgreSQL
Se PostgreSQL non è installato sul tuo computer, dovresti scaricarlo dal [Sito Ufficiale] (https://www.postgresql.org/download/).

Segui i passaggi di installazione per configurare PostgreSQL, che creerà un utente predefinito (postgres). A seconda del sistema operativo, potrebbe essere necessario configurare manualmente una password; ho impostato la mia su 'password', come puoi vedere nel mio application.yml datasource. Inoltre, assicurati che il componente psql sia selezionato durante l'installazione oppure opta per un amministratore grafico di database come pgAdmin per una gestione più semplice.

### Creare il database
A differenza di altri linguaggi di database, PostgreSQL segue un modello di database più formale e sicuro e richiede all'utente di creare manualmente il database.

Quindi, una volta che PostgreSQL è in esecuzione, gli utenti dovrebbero aprire l'amministratore di PostgreSQL (es. pgAdmin) ed eseguire:

```sh
CREATE DATABASE registration;
```

In alternativa, questa riga può essere eseguita anche dal terminale se i comandi psql sono abilitati. Il comando pertinente sarebbe:

```sh
psql -U postgres -c "CREATE DATABASE registration;"
```

## Configurazione e connessione del backend
### Introduzione a Java Spring-Boot
Il backend è progettato per gestire automaticamente la creazione e l'aggiornamento delle tabelle una volta che il database principale è stato configurato manualmente, come precedentemente spiegato.

L'editor consigliato per il backend, essendo un progetto Java, è IntelliJ IDEA. Questo potrebbe migliorare l'esperienza e offrire un'area dedicata per il backend.

### Configurazione del backend
Questo è un progetto basato su Maven. Prima di procedere, assicurati che Maven sia installato sul sistema e che Java 17 o successivo sia disponibile, come richiesto da Spring Boot.

Per installare tutte le dipendenze, esegui:

```sh
mvn clean install
```

### Connessione del backend
Come previsto, questo progetto utilizza il framework Spring Boot, che è lo standard di riferimento per il web in Java e offre molte funzionalità di sicurezza. Il server Tomcat è già incluso per l'esecuzione locale sul computer e basta un solo comando per avviare il backend:

```sh
mvn spring-boot:run
```

## Avvio del frontend
### Introduzione al framework Vite React

Un framework dedicato è ottimale per operazioni dinamiche, mentre i moduli di registrazione e login sono serviti come templates direttamente dal backend. Questo approccio è stato scelto per dare priorità alla sicurezza, riducendo i rischi di cyberattacchi (es. Man-in-the-Middle), e migliorare l'efficienza, riducendo la dimensione del bundle JSX e minimizzando le queries inutili da React al backend. Oltre ai miglioramenti delle prestazioni, ridurre la latenza aumenta anche la sicurezza, limitando l'esposizione ai tentativi di attacco a forza bruta. Questo approccio integra perfettamente efficienza e cybersecurity, garantendo che entrambe si rafforzino reciprocamente.

### Lancio dell'Applicazione Web
Assicurati che Node.js sia installato sul tuo computer. Poi, per avviare l'applicazione in un browser locale, puoi procedere con i seguenti comandi:

```sh
npm install
```

```sh
npm run dev
```

Il primo comando installa tutte le dipendenze necessarie, garantendo che il progetto sia configurato correttamente. Il secondo comando avvia il server di sviluppo, rendendo l'applicazione accessibile nel browser.