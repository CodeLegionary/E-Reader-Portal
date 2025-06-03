import { useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import { useParams } from "react-router-dom";

const ReadBook = () => {
  const { bookId } = useParams();
  // Initialize location to null. This allows ReactReader to default to the beginning.
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Your fetchApi function (simulated) remains the same
  const fetchApi = async (url, method, body) => {
    const options = {
      method,
      headers: {
        "Content-Type": typeof body === "string" ? "text/plain" : "application/json",
      },
      credentials: "include",
      ...(body && { body: typeof body === "string" ? body : JSON.stringify(body) }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed request to ${url}: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("Content-Type");
      // Simulate response for /api/readProgress/bookId/get
      if (url.includes("/api/readProgress/") && url.includes("/get")) {
        // Return null to simulate no saved data, triggering the CFI fallback
        return null;
      }
      return contentType === "application/json" ? response.json() : response.text();
    } catch (apiError) {
      console.error("API call error (simulated):", apiError);
      return null;
    }
  };

  const savePage = async (bookId, page) => {
    try {
      await fetchApi(`/api/readProgress/${bookId}/save`, "POST", page);
      console.log(`Progress for book ${bookId} saved successfully (simulated). Page:`, page);
    } catch (apiError) {
      console.error("Error saving progress (simulated):", apiError);
    }
  };

  const loadPage = async (bookId) => {
    try {
      const data = await fetchApi(`/api/readProgress/${bookId}/get`, "GET");
      // *** MODIFICA QUI: Se 'data' è null (nessun progresso salvato), imposta location a null. ***
      // Questo assicura che ReactReader parta dall'inizio del libro per impostazione predefinita.
      setLocation(data || null);
      setError(null);
    } catch (apiError) {
      console.error("Error loading progress (simulated):", apiError);
      setError("Failed to load your progress. Please try again.");
    }
  };

  useEffect(() => {
    loadPage(bookId).catch((apiError) => {
      console.error("Initial load progress failed:", apiError.message);
    });
  }, [bookId]);

  return (
    <div style={{ border: "1px solid #ddd", width: "100%", height: "100vh" }}>
      {error && <div className="error-message">{error}</div>}
      <ReactReader
        url={`/NOVELLA${bookId} - autore.epub`}
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
        }}
        location={location} // This will be null initially, then updated by loadPage
        locationChanged={(loc) => {
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
