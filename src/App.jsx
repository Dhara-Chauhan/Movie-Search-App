import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import MovieDisplay from './components/MovieDisplay'
import MovieModal from './components/MovieModal'
import FavouritesPage from './components/FavouritesPage'

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("harry potter");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favourites, setFavourites] = useState(() => {
      const saved = localStorage.getItem("favourites");
      return saved ? JSON.parse(saved) : [];
    });
    const [page, setPage] = useState("home"); // "home" or "favourites"

    useEffect(() => {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);
  
    // Fetch movies from OMDB API
    const fetchMovies = async (query) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
        const data = await res.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError("No movies found");
        }
      } catch (err) {
        setError("Something went wrong");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieDetails = async (imdbID) => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    };
  
    const toggleFavourite = (movie) => {
      setFavourites((prevFavs) => {
        if (prevFavs.find((fav) => fav.imdbID === movie.imdbID)) {
          return prevFavs.filter((fav) => fav.imdbID !== movie.imdbID); // remove
        } else {
          return [...prevFavs, movie]; // add
        }
      });
    };

    useEffect(() => {
      if (searchTerm) fetchMovies(searchTerm);
    }, [searchTerm]);

    return (
  <>
    <div className="bg-gray-900 min-h-screen">
      <NavBar setSearchTerm={setSearchTerm} />

      {page === "home" && (
        <>
          {loading && <p className="text-center text-white">Loading...</p>}
          {!loading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && movies.length > 0 && (
            <MovieDisplay
              movies={movies}
              onSelectMovie={fetchMovieDetails}
              favourites={favourites}
              toggleFavourite={toggleFavourite}
              goToFavourites={() => setPage("favourites")}
            />
          )}

          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
      )}

      {page === "favourites" && (
        <FavouritesPage
          favourites={favourites}
          onSelectMovie={fetchMovieDetails}
          toggleFavourite={toggleFavourite}
          goBack={() => setPage("home")}
        />
      )}
    </div>
  </>
);
}

export default App
