export const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

// Filter movies by category: upcoming (future dates), top rated (by rating), popular (by popularity)
export const filterMoviesByCategory = (movies, category) => {
  if (!Array.isArray(movies)) return [];
  const today = new Date();

  switch (category) {
    case 'upcoming': {
      const upcoming = movies.filter((movie) => {
        const release =
          parseDate(movie.releaseDate) ||
          parseDate(movie.release_date) ||
          parseDate(movie.premiered);
        return release && release > today;
      });
      return upcoming.length ? upcoming : movies;
    }
    case 'topRated': {
      const sorted = [...movies].sort(
        (a, b) =>
          (b.rating ?? b.vote_average ?? 0) - (a.rating ?? a.vote_average ?? 0),
      );
      return sorted;
    }
    case 'popular': {
      const sorted = [...movies].sort(
        (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
      );
      return sorted.length ? sorted : movies;
    }
    case 'nowPlaying':
    default:
      return movies;
  }
};

export const getMoviePosterUri = (movie) => {
  if (!movie) return null;
  return (
    movie.posterUrl ??
    movie.poster_path ??
    movie.poster ??
    movie.image ??
    movie.poster_thumbnail ??
    movie.smallImage ??
    movie.backdrop_path ??
    null
  );
};

export const getMovieId = (movie) => {
  if (!movie) return null;
  return movie.id ?? movie.movieId ?? null;
};

export const getMovieTitle = (movie) => {
  if (!movie) return 'Untitled';
  return movie.title ?? movie.name ?? 'Untitled';
};

// Search movies by matching query against title, genre, description, or year
export const searchMovies = (movies, query) => {
  if (!query || !query.trim()) return movies;
  if (!Array.isArray(movies)) return [];

  const searchQuery = query.toLowerCase().trim();
  return movies.filter((movie) => {
    const title = (getMovieTitle(movie) ?? '').toLowerCase();
    const genre = (movie.genre ?? '').toLowerCase();
    const description = (movie.description ?? movie.overview ?? '').toLowerCase();
    const year = String(movie.year ?? movie.releaseDate ?? movie.release_date ?? '');

    return (
      title.includes(searchQuery) ||
      genre.includes(searchQuery) ||
      description.includes(searchQuery) ||
      year.includes(searchQuery)
    );
  });
};

export const buildGenres = (movie) => {
  if (!movie) return '';
  const genres =
    movie.genres ??
    movie.genre ??
    movie.genre_ids ??
    movie.genre_list ??
    [];
  if (Array.isArray(genres)) {
    if (genres.length && typeof genres[0] === 'object') {
      return genres.map((genre) => genre.name).filter(Boolean).join(' • ');
    }
    return genres.filter(Boolean).join(' • ');
  }
  if (typeof genres === 'string') return genres;
  return '';
};

export const extractYear = (movie) => {
  if (!movie) return '';
  const date =
    movie.release_date ??
    movie.releaseDate ??
    movie.first_air_date ??
    movie.premiered;
  if (!date) return '';
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? '' : String(year);
};

export const extractDuration = (movie) => {
  if (!movie) return '';
  const runtime =
    movie.runtime ??
    movie.duration ??
    movie.length ??
    (movie.episode_run_time && movie.episode_run_time[0]);
  if (!runtime) return '';
  if (typeof runtime === 'string') return runtime;
  return `${runtime} minutes`;
};

export const extractRating = (movie) => {
  if (!movie) return 'N/A';
  const value =
    movie.vote_average ??
    movie.rating ??
    movie.score ??
    movie.voteAverage ??
    null;
  if (!value && value !== 0) return 'N/A';
  const numeric = Number(value);
  return Number.isNaN(numeric) ? 'N/A' : numeric.toFixed(1);
};

export const getMovieIdentifier = (movie) => {
  if (!movie) return null;
  return movie.id ?? movie.movieId ?? movie.title ?? movie.name ?? null;
};

