export default function SearchBar({
  value,
  onChange,
  sortOrder,
  onSortChange,
  showFavorites,
  onFavoritesToggle,
  loading,
  theme,
}) {
  const isDark = theme === 'dark';
  return (
    <div className={`card glass-panel border-0 rounded-4 shadow-sm ${isDark ? '' : 'bg-white bg-opacity-90'}`}>
      <div className="card-body py-3">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-lg">
            <div className={`input-group shadow-sm ${isDark ? 'bg-black bg-opacity-15' : 'bg-white bg-opacity-95'}`}>
              <span className={`input-group-text border-0 ${isDark ? 'bg-transparent text-light' : 'bg-transparent text-dark'}`}>🔎</span>
              <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search movies by title..."
                aria-label="Search movies"
                className={`form-control form-control-lg border-0 ${isDark ? 'bg-transparent text-white' : 'bg-transparent text-dark'}`}
              />
              <span className="input-group-text bg-transparent border-0">
                {loading ? (
                  <div className={`spinner-border spinner-border-sm ${isDark ? 'text-light' : 'text-dark'}`} role="status" aria-hidden>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : null}
              </span>
            </div>
          </div>

          <div className="col-12 col-lg-auto">
            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch">
              <button
                type="button"
                onClick={onFavoritesToggle}
                className={`btn ${showFavorites ? 'btn-info text-dark' : isDark ? 'btn-outline-light' : 'btn-outline-dark'} w-100 py-2`}
              >
                {showFavorites ? 'Browse movies' : 'My favorites'}
              </button>

              <select
                value={sortOrder}
                onChange={(event) => onSortChange(event.target.value)}
                aria-label="Sort movies"
                className={`form-select form-select-lg border-secondary ${isDark ? 'bg-dark text-white' : 'bg-white text-dark'}`}
              >
                <option value="default">Sort by latest</option>
                <option value="rating">Sort by rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
