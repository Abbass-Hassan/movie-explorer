import { apiClient } from './client';
import { ENDPOINTS } from '../constants/api';

export const getAllFavorites = async () => {
  try {
    console.log('[API] Fetching all favorites');
    const response = await apiClient.get(ENDPOINTS.FAVORITES);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch favorites:', error);
    throw error;
  }
};

export const addToFavorites = async (movie) => {
  try {
    console.log('[API] Adding movie to favorites:', movie?.id || movie);
    const response = await apiClient.post(ENDPOINTS.FAVORITES, movie);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to add movie to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (id) => {
  try {
    console.log(`[API] Removing movie from favorites with id: ${id}`);
    const response = await apiClient.delete(`${ENDPOINTS.FAVORITES}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `[API] Failed to remove movie with id ${id} from favorites:`,
      error,
    );
    throw error;
  }
};

