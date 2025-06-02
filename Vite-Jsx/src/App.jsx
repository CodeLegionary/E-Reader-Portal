import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import "./App.css";
import coverImagePath from "./assets/cover.jpg";
import coverImagePath2 from "./assets/cover2.jpg";
import coverImagePath3 from "./assets/cover3.jpg";
import NavBar from "./components/NavBar";
import ReadBook from "./pages/ReadBook"; // Updated Read1 to ReadBook
import Support from "./pages/Support";

const coverImages = [coverImagePath, coverImagePath2, coverImagePath3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
      <div className="carousel">
        <button onClick={() => setCurrentIndex((prev) => (prev - 1 + coverImages.length) % coverImages.length)}>&lt;</button>
        <img src={coverImages[currentIndex]} alt={`Cover ${currentIndex + 1}`} style={{ width: "30%", minWidth: "200px" }} />
        <button onClick={() => setCurrentIndex((prev) => (prev + 1) % coverImages.length)}>&gt;</button>
      </div>
  );
};

const RedirectToLogin = () => <Navigate to="http://${VITE_API_URL}:8080" replace />;

const App = () => (
  <Router>
    <div>
      <NavBar />
      <MainContent />
    </div>
  </Router>
);

const MainContent = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/read(\d+)/);
  const bookId = match ? parseInt(match[1], 10) - 1 : null; // Extract bookId dynamically

  if (location.pathname === "/support") {
    return <Support />;
  }
  return (
    <div className="main-content">
      {bookId !== null ? <ReadBook bookId={bookId} /> : <LandingPage />}
    </div>
  );
};

const LandingPage = () => (
  <div className="landing-page">
    <header>
      <div className="wrapper">
        <h1 className="flag">Benvenut@!</h1>
      </div>
      <p>Grazie per aver scelto questo sito! Fai come se fossi a casa tua.. e ricorda ...</p>
      <br/>
      <p>Un libro non si giudica dalla copertina.. ma puoi sempre farti un'idea! Sfoglia il carosello o vai ai <a href="#links" style={{ color: "navy" }}>Links ↓↓↓</a></p>
    </header>
    <div className="carousel-section"><Carousel /></div>
    <main>
      <p>Ora tocca a te: Dai un occhio alle recensioni, accedi alla lettura tramite link in basso, e se ti va recensisci!</p>
      <div className="book-links" id="links">
        {[{ id: 1, title: "Novella 1", desc: "Una novella avvincente..." },
          { id: 2, title: "Novella 2", desc: "... Il tanto atteso seguito" },
          { id: 3, title: "Novella 3", desc: "..Un finale sorprendente" }].map((book) => (
          <BookLink key={book.id} book={book} />
        ))}
      </div>
      <Routes>
        <Route path="/req/login" element={<RedirectToLogin />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </main>
  </div>
);

const BookLink = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const fetchApi = async (url, method = "GET", body = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error("API error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchApi(`/api/books/${book.id}/rating`)
      .then((updatedRating) => setAverageRating(updatedRating ?? 0.0))
      .catch((error) => console.error("Fetch API failed:", error));
  }, [book.id]);

  const handleRatingChange = async (newRating) => {
    setRating(newRating);

    try {
      await fetchApi(`/api/books/${book.id}/rate`, "POST", {
        bookId: book.id,
        rating: newRating
      });

      console.log(`Rating saved successfully for book ${book.id}`);

      const updatedRating = await fetchApi(`/api/books/${book.id}/rating`, "GET");
      setAverageRating(updatedRating ?? 0.0);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="book-link">
      <h2>{book.title}</h2>
      <p className="info">{book.desc}</p>
      <p className="info">Media Recensioni: {averageRating.toFixed(1)} / 5</p>
      <a href={`/read${book.id}`}>Vai alla lettura!</a>
      <div className="rating">
        <p className="info">Recensisci:</p>
        {[...Array(5)].map((_, i) => (
          <span key={i} onClick={() => handleRatingChange(i + 1)} style={{ cursor: "pointer", color: i < rating ? "gold" : "lightblue" }}>★</span>
        ))}
      </div>
    </div>
  );
};

export default App;
