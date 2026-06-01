export default function MovieModal({ movie, onClose, onToggleFavorite, isFavorite, theme }) {
  const cast = movie.Actors ? movie.Actors.split(',').slice(0, 5).join(', ') : 'N/A';
  const isDark = theme === 'dark';

  return (
    <div className="modal d-block fade show" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className={`modal-content border-0 shadow-lg ${isDark ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
          <div className="modal-header border-0">
            <div>
              <h5 className="modal-title">{movie.Title}</h5>
              <p className={`mb-0 small ${isDark ? 'text-muted' : 'text-secondary'}`}>{movie.Year} · {movie.Runtime || 'N/A'} · {movie.Genre || 'N/A'}</p>
            </div>
            <button type="button" className={`btn-close ${isDark ? 'btn-close-white' : ''}`} aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-5">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img src={movie.Poster} alt={`${movie.Title} poster`} className="img-fluid rounded-4 w-100" />
                ) : (
                  <div className={`d-flex align-items-center justify-content-center rounded-4 ${isDark ? 'bg-secondary bg-opacity-25 text-muted' : 'bg-light text-secondary'}`} style={{ minHeight: '420px' }}>
                    No poster available
                  </div>
                )}
              </div>

              <div className="col-md-7 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex flex-wrap gap-3 align-items-start mb-3">
                    <button type="button" className={`btn ${isFavorite ? 'btn-outline-info' : isDark ? 'btn-info text-dark' : 'btn-primary text-white'}`} onClick={onToggleFavorite}>
                      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </button>
                    <span className={`badge ${isDark ? 'bg-info text-dark' : 'bg-secondary text-white'} align-self-center`}>IMDb {movie.imdbRating || 'N/A'}</span>
                  </div>

                  <p className={isDark ? 'text-muted' : 'text-secondary'}>{movie.Plot || 'Plot details are unavailable.'}</p>

                  <div className="row row-cols-1 row-cols-sm-2 g-3 mt-4">
                    <div>
                      <h6 className={`mb-1 text-uppercase small ${isDark ? 'text-secondary' : 'text-muted'}`}>Director</h6>
                      <p className="mb-0">{movie.Director || 'N/A'}</p>
                    </div>
                    <div>
                      <h6 className={`mb-1 text-uppercase small ${isDark ? 'text-secondary' : 'text-muted'}`}>Cast</h6>
                      <p className="mb-0">{cast}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
