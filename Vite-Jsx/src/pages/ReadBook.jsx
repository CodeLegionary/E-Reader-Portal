import { useEffect, useState } from "react";
import { ReactReader } from "react-reader";

const ReadBook = ({ bookId }) => {
  const [location, setLocation] = useState("epubcfi(/6/2[cover]!/4)");
  const [error, setError] = useState(null);

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
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const loadPage = async (bookId) => {
    try {
      const data = await fetchApi(`/api/readProgress/${bookId}/get`, "GET");
      setLocation(data || location);
      setError(null);
    } catch (error) {
      console.error("Error loading progress:", error);
      setError("Failed to load your progress. Please try again.");
    }
  };

  useEffect(() => {
    loadPage(bookId).catch((error) => {
      console.error("Error loading progress:", error.message);
    });
  }, [bookId]);

  return (
    <div style={{ border: "1px solid #ddd", width: "100%", height: "100vh" }}>
      {error && <div className="error-message">{error}</div>}
      <ReactReader
        url={`/NOVELLA${bookId + 1} - autore.epub`} // Dynamically set the book
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
        }}
        location={location}
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
