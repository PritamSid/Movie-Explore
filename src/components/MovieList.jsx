import MovieCard from './MovieCard.jsx';

const skeletonCards = Array.from({ length: 8 });

export default function MovieList({
  movies,
  loading,
  error,
  searchTerm,
  favorites,
  showFavorites,
  onRetry,
  onSelect,
  onToggleFavorite,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  theme,
  query,
}) {
  const isDark = theme === 'dark';
  const activeMovies = showFavorites ? favorites : movies;
  const showEmptySearch = !loading && !error.code && !activeMovies.length && !showFavorites && searchTerm;
  const showEmptyFavorites = !loading && showFavorites && !favorites.length;
  const hasResults = !loading && !error.code && activeMovies.length > 0;

  return (
    <section className="mt-4">
      {error.code && (
        <div className={`alert ${isDark ? 'alert-danger' : 'alert-warning'} shadow-sm`}>
          <h2 className="h5 mb-2">{error.code === 'MISSING_API_KEY' ? 'API key required' : 'Unable to load movies'}</h2>
          <p className="mb-3">{error.message}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}>
              Retry search
            </button>
          )}
        </div>
      )}

      {!loading && !searchTerm && !showFavorites && !error.code && (
        <div className={`card glass-panel border-0 shadow-sm mb-4 ${isDark ? 'text-light' : 'text-dark'}`}>
          <div className="card-body text-center py-4 px-4">
            <p className="text-uppercase text-info small mb-2">Start browsing</p>
            <h2 className={`${isDark ? 'text-light-50' : 'text-secondary'} mb-2`}>Popular movies to explore.</h2>
            <p className={`${isDark ? 'text-light-50' : 'text-secondary'} mb-0`}>Use the search bar above to refine results and discover cinematic favorites.</p>
          </div>
        </div>
      )}

      {showEmptySearch && (
        <div className={`alert ${isDark ? 'alert-secondary' : 'alert-light'} text-center`}>No movies found. Try a broader title or remove filters to see more results.</div>
      )}

      {showEmptyFavorites && (
        <div className={`alert ${isDark ? 'alert-secondary' : 'alert-light'} text-center`}>No favorites yet. Tap the heart icon on any movie card to save it to your favorites list.</div>
      )}

      {hasResults && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="h5 mb-1">{showFavorites ? 'Saved Favorites' : searchTerm ? 'Search results' : 'Popular picks'}</h2>
            {!showFavorites && (
              <p className={`${isDark ? 'text-light-50' : 'text-secondary'} mb-0`}>
                {searchTerm ? `Showing ${activeMovies.length} results for ` : 'Showing popular movies for '}
                <span className={isDark ? 'text-light-50' : 'text-dark'}>{searchTerm || query}</span>
              </p>
            )}
          </div>
          <div className={isDark ? 'text-muted' : 'text-secondary'}>
            {showFavorites ? `${favorites.length} saved ${favorites.length === 1 ? 'movie' : 'movies'}` : `Page ${page} of ${totalPages}`}
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {loading
          ? skeletonCards.map((_, index) => (
              <div key={index} className="col">
                <div className={`card h-100 ${isDark ? 'bg-secondary bg-opacity-10' : 'bg-white'} border-0 shadow-sm`}>
                  <div className="placeholder-glow" style={{ height: '20rem' }}>
                    <span className="placeholder col-12 h-100"></span>
                  </div>
                  <div className="card-body">
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-8"></span>
                    </p>
                    <p className="placeholder-glow mb-0">
                      <span className="placeholder col-5"></span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          : activeMovies.map((movie) => (
              <div key={movie.imdbID} className="col">
                <MovieCard
                  movie={movie}
                  onSelect={() => onSelect(movie)}
                  onToggleFavorite={() => onToggleFavorite(movie)}
                  isFavorite={favorites.some((item) => item.imdbID === movie.imdbID)}
                  theme={theme}
                />
              </div>
            ))}
      </div>

      {!loading && !showFavorites && activeMovies.length > 0 && totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button type="button" disabled={page === 1} onClick={onPrevPage} className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`} aria-label="Previous page">
            Previous
          </button>
          <span className={isDark ? 'text-muted' : 'text-secondary'}>Page {page} of {totalPages}</span>
          <button type="button" disabled={page === totalPages} onClick={onNextPage} className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`} aria-label="Next page">
            Next
          </button>
        </div>
      )}
    </section>
  );
}
