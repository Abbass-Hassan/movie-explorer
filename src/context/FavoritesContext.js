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

  const loadFavorites = useCallback(async () => {
    console.log('[FavoritesContext] Loading favorites');
    setLoading(true);
    try {
      const storedFavorites = await getData(FAVORITES_STORAGE_KEY);
      if (Array.isArray(storedFavorites)) {
        console.log(
          `[FavoritesContext] Loaded ${storedFavorites.length} favorites from storage`,
        );
        setFavorites(storedFavorites);
      }

      console.log('[FavoritesContext] Fetching favorites from API');
      const apiFavorites = await fetchFavoritesFromApi();
      if (Array.isArray(apiFavorites)) {
        console.log(
          `[FavoritesContext] Loaded ${apiFavorites.length} favorites from API`,
        );
        setFavorites(apiFavorites);
        await saveData(FAVORITES_STORAGE_KEY, apiFavorites);
      }
      setError(null);
    } catch (err) {
      console.error('[FavoritesContext] Failed to load favorites', err);
      setError('Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = useCallback(
    async (movie) => {
      if (!movie) {
        console.warn('[FavoritesContext] addFavorite called with invalid movie');
        return;
      }

      try {
        console.log(
          `[FavoritesContext] Adding favorite movie with id: ${movie.id}`,
        );
        const existing = favorites.find((item) => item.id === movie.id);
        if (existing) {
          console.log(
            `[FavoritesContext] Movie with id ${movie.id} is already a favorite`,
          );
          return;
        }

        const addedMovie = await addToFavorites(movie);
        const updatedFavorites = [...favorites, addedMovie || movie];
        setFavorites(updatedFavorites);
        await saveData(FAVORITES_STORAGE_KEY, updatedFavorites);
        setError(null);
      } catch (err) {
        console.error('[FavoritesContext] Failed to add favorite', err);
        setError('Failed to add favorite.');
        throw err;
      }
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    async (id) => {
      try {
        console.log(`[FavoritesContext] Removing favorite with id: ${id}`);
        await removeFromFavorites(id);
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(updatedFavorites);
        await saveData(FAVORITES_STORAGE_KEY, updatedFavorites);
        setError(null);
      } catch (err) {
        console.error('[FavoritesContext] Failed to remove favorite', err);
        setError('Failed to remove favorite.');
        throw err;
      }
    },
    [favorites],
  );

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const clearError = useCallback(() => {
    console.log('[FavoritesContext] Clearing error');
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

