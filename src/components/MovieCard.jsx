export default function MovieCard({ movie, onSelect, onToggleFavorite, isFavorite, theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`card h-100 border-0 shadow-sm movie-card glass-card ${isDark ? 'text-white' : 'text-dark'}`} onClick={onSelect} role="button">
      <div className="position-relative overflow-hidden rounded-top" style={{ minHeight: '20rem' }}>
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="card-img-top"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className={`d-flex h-100 align-items-center justify-content-center rounded-top ${isDark ? 'bg-secondary bg-opacity-25 text-muted' : 'bg-light text-muted'}`}>No poster available</div>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? 'Remove favorite' : 'Add to favorites'}
          className={`btn btn-sm rounded-circle position-absolute top-0 end-0 m-3 ${isDark ? 'btn-dark bg-black bg-opacity-30 text-white border border-white border-opacity-15' : 'btn-light bg-white bg-opacity-90 text-dark border border-secondary border-opacity-30'} ${isFavorite ? 'text-info' : ''}`}
          style={{ width: '2.75rem', height: '2.75rem' }}
        >
          ♥
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
          <div>
            <h3 className="h6 card-title mb-1">{movie.Title}</h3>
            <p className={`text-uppercase small mb-0 ${isDark ? 'text-muted' : 'text-secondary'}`}>{movie.Type || 'Movie'}</p>
          </div>
          <span className={`badge ${isDark ? 'bg-secondary bg-opacity-25 text-white' : 'bg-light text-dark'} align-self-start`}>{movie.Year || 'N/A'}</span>
        </div>

        <button className={`btn ${isDark ? 'btn-info text-dark' : 'btn-primary'} btn-sm w-100 mt-auto shadow-sm`} type="button">View details</button>
      </div>
    </div>
  );
}
