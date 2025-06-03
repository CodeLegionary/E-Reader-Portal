import { useEffect, useState } from "react"; // Rimosso useRef
import { ReactReader } from "react-reader";
import { useParams } from "react-router-dom";

const ReadBook = () => {
  const { bookId } = useParams();
  // Non c'è più bisogno di 'location' per il salvataggio/caricamento,
  // ReactReader caricherà il libro dall'inizio per default.
  // Rimosso 'error' e la sua gestione.

  // Rimosse le funzioni fetchApi, savePage, loadPage.
  // Rimosso il ref hasLoadedInitialCfiOrProgress.

  // Rimosso l'useEffect per loadPage e il timeout.
  // Rimosso il secondo useEffect per tracciare il caricamento.

  return (
    <div style={{ border: "1px solid #ddd", width: "100%", height: "100vh" }}>
      {/* Rimosso il display dell'errore */}
      <ReactReader
        url={`/NOVELLA${bookId + 1} - autore.epub`} // Il tuo URL originale (bookId + 1)
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
        }}
        // Non passiamo più 'location' o 'locationChanged'
        // ReactReader caricherà il libro dall'inizio e gestirà la navigazione internamente.
      />
    </div>
  );
};

export default ReadBook;
