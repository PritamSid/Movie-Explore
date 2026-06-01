const BASE_URL = 'https://www.omdbapi.com/';

const getApiKey = () => import.meta.env.VITE_OMDB_API_KEY?.trim();

const buildUrl = (params) => {
  const apiKey = getApiKey();
  const url = new URL(BASE_URL);
  if (apiKey) {
    url.searchParams.set('apikey', apiKey);
  }
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

const parseResponse = (data) => {
  if (data.Response === 'False') {
    const message = data.Error || 'Unknown OMDB error.';
    if (/invalid api key/i.test(message)) {
      throw new ApiError(
        'Invalid OMDB API key. Check VITE_OMDB_API_KEY in .env and restart the dev server.',
        'INVALID_API_KEY'
      );
    }
    if (/movie not found/i.test(message)) {
      throw new ApiError('No movies matched your search.', 'NO_RESULTS');
    }
    if (/too many results/i.test(message)) {
      throw new ApiError('Too many results. Try a more specific title.', 'NO_RESULTS');
    }
    throw new ApiError(message, 'OMDB_ERROR');
  }
  return data;
};

export const fetchMovies = async (query, page = 1) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new ApiError(
      'OMDB API key is missing. Set VITE_OMDB_API_KEY in .env and restart the dev server.',
      'MISSING_API_KEY'
    );
  }

  try {
    const response = await fetch(buildUrl({ s: query, type: 'movie', page }));
    const data = await response.json();
    return parseResponse(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error while fetching movies. Check your connection and try again.',
      'NETWORK_ERROR'
    );
  }
};

export const fetchMovieDetails = async (imdbID) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new ApiError(
      'OMDB API key is missing. Set VITE_OMDB_API_KEY in .env and restart the dev server.',
      'MISSING_API_KEY'
    );
  }

  try {
    const response = await fetch(buildUrl({ i: imdbID, plot: 'full' }));
    const data = await response.json();
    return parseResponse(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error while loading movie details. Please try again.',
      'NETWORK_ERROR'
    );
  }
};
