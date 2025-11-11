import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  getAllFavorites as fetchFavoritesFromApi,
  addToFavorites,
  removeFromFavorites,
} from '../api/favoritesApi';
import { getData, saveData } from '../utils/storage';

const FAVORITES_STORAGE_KEY = 'favorites';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovieIdentifier = useCallback((movie) => {
    if (!movie) return null;
    return movie.id ?? movie.movieId ?? movie.title ?? movie.name ?? null;
  }, []);

  // Load favorites from local storage first, then sync with API
  // API takes precedence if available, otherwise use local data
  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const storedFavorites = await getData(FAVORITES_STORAGE_KEY);
      let favoritesToSet = [];
      
      if (Array.isArray(storedFavorites) && storedFavorites.length > 0) {
        favoritesToSet = storedFavorites;
      }

      try {
        const apiFavorites = await fetchFavoritesFromApi();
        if (Array.isArray(apiFavorites) && apiFavorites.length > 0) {
          favoritesToSet = apiFavorites;
        }
      } catch (apiErr) {
      }

      // Remove duplicates by identifier
      const seen = new Set();
      const deduplicatedFavorites = favoritesToSet.filter((item) => {
        const identifier = getMovieIdentifier(item);
        if (!identifier || seen.has(identifier)) {
          return false;
        }
        seen.add(identifier);
        return true;
      });

      setFavorites(deduplicatedFavorites);
      await saveData(FAVORITES_STORAGE_KEY, deduplicatedFavorites);
      setError(null);
    } catch (err) {
      setError('Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  }, [getMovieIdentifier]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = useCallback(
    async (movie) => {
      if (!movie) {
        throw new Error('Invalid movie data');
      }

      const identifier = getMovieIdentifier(movie);
      if (!identifier) {
        throw new Error('Movie identifier not available');
      }

      try {
        const addedMovie = await addToFavorites(movie);
        
        // Use functional update to prevent duplicate favorites
        setFavorites((currentFavorites) => {
          const movieId = movie.id ?? movie.movieId;
          const movieTitle = movie.title ?? movie.name;
          
          const existing = currentFavorites.find((item) => {
            const itemId = item.id ?? item.movieId;
            const itemTitle = item.title ?? item.name;
            return (
              (movieId && (itemId === movieId || String(itemId) === String(movieId))) ||
              (movieTitle && (itemTitle === movieTitle || String(itemTitle) === String(movieTitle)))
            );
          });
          
          if (existing) {
            return currentFavorites;
          }
          const updatedFavorites = [...currentFavorites, addedMovie || movie];
          saveData(FAVORITES_STORAGE_KEY, updatedFavorites);
          return updatedFavorites;
        });
        
        setError(null);
        return Promise.resolve();
      } catch (err) {
        setError('Failed to add favorite.');
        throw err;
      }
    },
    [getMovieIdentifier],
  );

  const removeFavorite = useCallback(
    async (identifier) => {
      if (!identifier) {
        throw new Error('Invalid identifier');
      }

      try {
        // Find the movie to get its API id before removing from state
        let movieToRemove = null;
        setFavorites((currentFavorites) => {
          movieToRemove = currentFavorites.find((item) => {
            const itemId = item.id ?? item.movieId;
            const itemTitle = item.title ?? item.name;
            return (
              itemId === identifier ||
              itemTitle === identifier ||
              String(itemId) === String(identifier) ||
              String(itemTitle) === String(identifier)
            );
          });
          
          const updatedFavorites = currentFavorites.filter((item) => {
            const itemId = item.id ?? item.movieId;
            const itemTitle = item.title ?? item.name;
            return !(
              itemId === identifier ||
              itemTitle === identifier ||
              String(itemId) === String(identifier) ||
              String(itemTitle) === String(identifier)
            );
          });
          
          saveData(FAVORITES_STORAGE_KEY, updatedFavorites);
          return updatedFavorites;
        });
        
        // Remove from API using the actual id (may differ from identifier used for matching)
        if (movieToRemove) {
          const apiId = movieToRemove.id ?? movieToRemove.movieId ?? identifier;
          try {
            await removeFromFavorites(apiId);
          } catch (apiErr) {
            // Continue even if API removal fails - local state already updated
          }
        }
        
        setError(null);
        return Promise.resolve();
      } catch (err) {
        setError('Failed to remove favorite.');
        throw err;
      }
    },
    [getMovieIdentifier],
  );

  // Check if movie is favorited by matching id/movieId or title/name
  // Handles cases where movies might have different identifier formats
  const isFavorite = useCallback(
    (identifier) => {
      if (!identifier) return false;
      return favorites.some((item) => {
        const itemId = item.id ?? item.movieId;
        const itemTitle = item.title ?? item.name;
        return (
          itemId === identifier ||
          itemTitle === identifier ||
          String(itemId) === String(identifier) ||
          String(itemTitle) === String(identifier)
        );
      });
    },
    [favorites],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    favorites,
    loading,
    error,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearError,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};

