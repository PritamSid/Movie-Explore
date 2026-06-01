import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar.jsx';
import MovieList from './components/MovieList.jsx';
import MovieModal from './components/MovieModal.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { fetchMovies, fetchMovieDetails } from './utils/api.js';
import useDebounce from './hooks/useDebounce.jsx';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import logo from './assets/images/logo.png';

const popularSearches = ['Inception', 'Interstellar', 'Avatar', 'Batman', 'Joker', 'Oppenheimer'];
const defaultSearchTerm = popularSearches[0];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', code: '' });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortOrder, setSortOrder] = useState('default');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('movieFavorites', []);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const apiKey = import.meta.env.VITE_OMDB_API_KEY?.trim();
  const apiKeyMissing = !apiKey;
  const query = debouncedSearchTerm.trim();
  const effectiveQuery = query || defaultSearchTerm;
  const hasSearchTerm = Boolean(query);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
    setShowFavorites(false);
  }, []);

  const handleSuggestionClick = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
    setShowFavorites(false);
  }, []);

  const toggleFavorite = useCallback(
    (movie) => {
      const exists = favorites.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        setFavorites(favorites.filter((item) => item.imdbID !== movie.imdbID));
      } else {
        setFavorites([movie, ...favorites]);
      }
    },
    [favorites, setFavorites]
  );

  const handleOpenMovie = async (movie) => {
    setError({ message: '', code: '' });
    setSelectedMovie(null);

    try {
      const details = await fetchMovieDetails(movie.imdbID);
      setSelectedMovie(details);
    } catch (fetchError) {
      setError({ message: fetchError.message || 'Unable to load movie details.', code: fetchError.code || 'DETAILS_ERROR' });
    }
  };

  const handleCloseModal = () => setSelectedMovie(null);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const loadMovies = useCallback(async () => {
    if (showFavorites) {
      return;
    }

    if (apiKeyMissing) {
      setMovies([]);
      setTotalResults(0);
      setError({ message: 'OMDB API key is missing. Create a .env file in the project root and set VITE_OMDB_API_KEY.', code: 'MISSING_API_KEY' });
      return;
    }

    setLoading(true);
    setError({ message: '', code: '' });

    try {
      const response = await fetchMovies(effectiveQuery, page);
      setMovies(response.Search || []);
      setTotalResults(Number(response.totalResults) || 0);
    } catch (fetchError) {
      if (fetchError.code === 'NO_RESULTS') {
        setMovies([]);
        setTotalResults(0);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
      setError({ message: fetchError.message || 'Unable to load movies.', code: fetchError.code || 'UNKNOWN_ERROR' });
    } finally {
      setLoading(false);
    }
  }, [apiKeyMissing, effectiveQuery, page, showFavorites]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOrder === 'rating') {
      return Number(b.imdbRating || 0) - Number(a.imdbRating || 0);
    }
    return 0;
  });

  const displayedMovies = showFavorites ? favorites : sortedMovies;
  const totalPages = Math.max(1, Math.ceil(totalResults / 10));
  const hasNoResults = !loading && hasSearchTerm && !displayedMovies.length && !error.code && !showFavorites;
  const showFavoritesEmpty = showFavorites && !favorites.length && !loading;

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} min-vh-100`}>
      <div className="container py-5">
        <div className={`card glass-panel border-0 shadow-lg mb-5 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
          <div className="card-body py-5 px-4">
            <div className="row align-items-center gx-4">
              <div className="col-lg-8">
                <p className="text-uppercase text-info fw-semibold mb-3"><img src={logo} alt="Movie Search" className="img-fluid" /></p>
                <h1 className="display-5 fw-bold gradient-text lh-tight">Explore trending movies instantly, then refine your search with precision.</h1>
                <p className={`lead mb-0 ${theme === 'dark' ? 'text-light-50' : 'text-muted'}`}>
                  Smart movie search with fast results, clean visuals, and a seamless browsing experience.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10 col-lg-8">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              showFavorites={showFavorites}
              onFavoritesToggle={() => setShowFavorites((current) => !current)}
              loading={loading}
              theme={theme}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-12">
            <div className={`card glass-panel border-0 shadow-sm py-3 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
              <div className="card-body d-flex flex-wrap justify-content-center gap-2">
                {popularSearches.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => handleSuggestionClick(title)}
                    className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'} rounded-pill px-4 py-2`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          searchTerm={query}
          favorites={favorites}
          showFavorites={showFavorites}
          onRetry={loadMovies}
          onSelect={handleOpenMovie}
          onToggleFavorite={toggleFavorite}
          page={page}
          totalPages={totalPages}
          onPrevPage={() => setPage((current) => Math.max(1, current - 1))}
          onNextPage={() => setPage((current) => Math.min(totalPages, current + 1))}
          theme={theme}
          query={query}
        />

        {hasNoResults && (
          <div className="alert alert-secondary text-center mt-4">No movies found. Try a broader title or remove filters to discover more.</div>
        )}

        {showFavoritesEmpty && (
          <div className="alert alert-secondary text-center mt-4">Your favorites list is empty. Tap the heart icon on a movie card to save it here.</div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          isFavorite={favorites.some((item) => item.imdbID === selectedMovie.imdbID)}
          onToggleFavorite={() => toggleFavorite(selectedMovie)}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
