import { useEffect, useState, useRef } from "react"; // Aggiunto useRef
import { ReactReader } from "react-reader";
import { useParams } from "react-router-dom";

const ReadBook = () => {
  const { bookId } = useParams();
  const initialCfi = "epubcfi(/6/2[cover]!/4)"; // Il tuo CFI iniziale preferito
  const [location, setLocation] = useState(initialCfi); // Inizializzato con il tuo CFI
  const [error, setError] = useState(null);
  // Un ref per tracciare se ReactReader ha caricato con successo una posizione
  const hasLoadedInitialCfiOrProgress = useRef(false);

  // La tua funzione fetchApi originale (richiede un backend funzionante)
  const fetchApi = async (url, method, body) => {
    const options = {
      method,
      headers: {
        "Content-Type": typeof body === "string" ? "text/plain" : "application/json",
      },
      credentials: "include",
      ...(body && { body: typeof body === "string" ? body : JSON.stringify(body) }),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed request to ${url}: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    return contentType === "application/json" ? response.json() : response.text();
  };

  const savePage = async (bookId, page) => {
    try {
      await fetchApi(`/api/readProgress/${bookId}/save`, "POST", page);
      console.log(`Progress for book ${bookId} saved successfully. Page:`, page);
    } catch (apiError) {
      console.error("Error saving progress:", apiError);
    }
  };

  const loadPage = async (bookId) => {
    try {
      const data = await fetchApi(`/api/readProgress/${bookId}/get`, "GET");
      // Se 'data' è null (nessun progresso salvato), 'location' manterrà il suo valore corrente (il CFI iniziale).
      // Altrimenti, 'location' verrà aggiornato con il progresso salvato.
      setLocation(data || location);
      setError(null);
    } catch (apiError) {
      console.error("Error loading progress:", apiError);
      setError("Failed to load your progress. Please try again.");
    }
  };

  useEffect(() => {
    let timeoutId;

    // Tenta di caricare il progresso salvato o usa il CFI iniziale.
    loadPage(bookId).catch((apiError) => {
      console.error("Initial load progress failed:", apiError.message);
    });

    // Imposta un timeout per il fallback se il lettore non si carica entro 5 secondi.
    // Questo timeout è specifico per il tentativo di caricamento iniziale del CFI.
    timeoutId = setTimeout(() => {
      // Se ReactReader non ha ancora segnalato un caricamento riuscito
      // E la posizione attuale è ancora il CFI iniziale hardcoded,
      // allora forza la posizione a null per riprovare dall'inizio.
      if (!hasLoadedInitialCfiOrProgress.current && location === initialCfi) {
        console.log("Timeout: Forcing location to null as initial CFI failed to load.");
        setLocation(null); // Forza l'inizio del libro
      }
    }, 5000); // Timeout di 5 secondi

    // Funzione di pulizia: cancella il timeout quando il componente viene smontato o le dipendenze cambiano.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [bookId]); // Dipendenza: riesegui solo quando bookId cambia.

  // Un useEffect separato per tracciare quando ReactReader carica con successo
  useEffect(() => {
    // Questo effetto si esegue ogni volta che 'location' cambia.
    // Se 'location' non è più il CFI iniziale e non è null, significa che ReactReader ha caricato con successo qualcosa.
    if (location !== initialCfi && location !== null) {
      hasLoadedInitialCfiOrProgress.current = true;
    }
    // Se la posizione diventa null (a causa del timeout), reimposta il flag per il prossimo tentativo.
    if (location === null) {
        hasLoadedInitialCfiOrProgress.current = false; // Reimposta per il prossimo tentativo
    }
  }, [location, initialCfi]); // Dipendenze: location e initialCfi

  return (
    <div style={{ border: "1px solid #ddd", width: "100%", height: "100vh" }}>
      {error && <div className="error-message">{error}</div>}
      <ReactReader
        url={`/NOVELLA${bookId + 1} - autore.epub`} // Il tuo URL originale (bookId + 1)
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
        }}
        location={location} // Questo sarà il CFI iniziale o null dopo il timeout
        locationChanged={(loc) => {
          // Questo si attiva quando ReactReader visualizza con successo una posizione
          hasLoadedInitialCfiOrProgress.current = true; // Segna come caricato con successo
          if (loc && loc !== location) {
            setLocation(loc);
            savePage(bookId, loc);
          }
        }}
      />
    </div>
  );
};

export default ReadBook;
