import { apiClient } from './client';
import { ENDPOINTS } from '../constants/api';

export const getAllMovies = async () => {
  try {
    console.log('[API] Fetching all movies');
    const response = await apiClient.get(ENDPOINTS.MOVIES);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch all movies:', error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    console.log(`[API] Fetching movie with id: ${id}`);
    const response = await apiClient.get(`${ENDPOINTS.MOVIES}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[API] Failed to fetch movie with id ${id}:`, error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    console.log(`[API] Searching movies with query: "${query}"`);
    const response = await apiClient.get(ENDPOINTS.MOVIES, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error(`[API] Failed to search movies with query "${query}":`, error);
    throw error;
  }
};

